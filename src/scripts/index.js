import {
  createCard,
  removeCardById,
  getCardID,
  likeCard,
  itLikedCard,
} from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  addNewCardToServer,
  updateProfileToServer,
  updateAvatarToServer,
  likeCardRequest,
  unLikeCardRequest,
  deleteCardFromServer,
  itImage,
  requestsProfileCards,
} from "../components/api.js";
import {
  openPopup,
  closePopup,
  handleOverlayPopupClose,
} from "../components/modal.js";

let userID = "";
let removedCardID = "";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//Модальные окна
const popups = document.querySelectorAll(".popup");

const modal = {};
popups.forEach((elem) => {
  Object.assign(modal, {
    [elem.id]: elem,
  });
});

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileImage = document.querySelector(".profile__image-avatar");

const formEditAvatar = document.forms.editProfileAvatar;
const editAvatarButton = document.querySelector(
  ".profile__image-avatar-button"
);
const avatarUrl = formEditAvatar.querySelector("#avatar-link-input");

const formEditProfile = document.forms.editProfile;
const inputProfileName = formEditProfile.querySelector("#name-input");
const inputProfileJob = formEditProfile.querySelector("#description-input");

const cardAddButton = document.querySelector(".profile__add-button");

const formNewPlace = document.forms.newPlace;
const saveBtnNewPlace = formNewPlace.querySelector(".button");
const inputPlaceName = formNewPlace.querySelector("#place-name");
const inputPlaceLink = formNewPlace.querySelector("#link-input");
const imageFromPopup = modal.popupImagePreview.querySelector(".popup__image");
const captionFromPopup =
  modal.popupImagePreview.querySelector(".popup__caption");

const questButton = modal.popupQuestion.querySelector(".popup__button");
const questTitle = modal.popupQuestion.querySelector(".popup__title");

// Установка обработчиков закрытия для всех Popup, по Overlay и кнопке "Х"
const initClosedPopups = (popups) => {
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
    // Клик по кнопке закрытия
    popup.querySelector(".popup__close").addEventListener("click", () => {
      closePopup(popup);
    });
    popup.addEventListener("click", handleOverlayPopupClose);
  });
};
// универсальное окно с вопросом
const openQuestModal = (qestionConfig) => {
  questTitle.textContent = qestionConfig.titleText;
  questButton.textContent = qestionConfig.buttonText;
  modal.popupQuestion.setAttribute("data", qestionConfig.data);
  questButton.addEventListener("click", qestionConfig.handle);
  openPopup(modal.popupQuestion);
};
//Удаление карточки после подверждения
function handleQuestButtonDeleteCard(evt) {
  deleteCardFromServer(removedCardID)
    .then((res) => {
      removeCardById(removedCardID);
      closePopup(modal.popupQuestion);
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  questButton.removeEventListener("click", handleQuestButtonDeleteCard);
}
//Вызов окна с подтверждением удаления и с передачей
// функции удаления карточки для кнопки "Ок" в окне подтверждения
const handleDeleteCard = (evt) => {
  removedCardID = getCardID(evt);
  openQuestModal({
    titleText: "Вы уверены?",
    buttonText: "Ок",
    data: removedCardID,
    handle: handleQuestButtonDeleteCard,
  });
};
//Обработчик кнопки лайка
const handleLikeCard = (evt) => {
  const cardID = getCardID(evt);
  if (itLikedCard(cardID)) {
    unLikeCardRequest(cardID)
      .then((res) => likeCard(res.likes, cardID, userID))
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else {
    likeCardRequest(cardID)
      .then((res) => likeCard(res.likes, cardID, userID))
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
};
// Загрузка данных с карточки в модальное окно
const openImagePopup = (card) => {
  imageFromPopup.src = card.link;
  imageFromPopup.alt = card.name;
  imageFromPopup.title = card.name;
  captionFromPopup.textContent = card.name;
  openPopup(modal.popupImagePreview);
};
//Добавления новой карточки
const addNewCardForm = (evt) => {
  evt.preventDefault();
  saveBtnNewPlace.textContent = "Сохранение...";
  addNewCardToServer(inputPlaceName.value, inputPlaceLink.value)
    .then((card) => {
      placesList.prepend(
        createCard(
          cardTemplate,
          card,
          userID,
          openImagePopup,
          handleDeleteCard,
          handleLikeCard
        )
      );
      closePopup(modal.popupAddNewCard);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
      placesList.append(
        createCard(
          cardTemplate,
          {
            _id: err,
            link: err,
            name: err,
            owner: { _id: userID },
            likes: [],
          },
          userID,
          openImagePopup,
          handleDeleteCard,
          handleLikeCard
        )
      );
    })
    .finally(() => {
      clearValidation(formNewPlace, validationConfig);
      saveBtnNewPlace.textContent = "Сохранить";
    });
};

cardAddButton.addEventListener("click", () => {
  clearValidation(formNewPlace, validationConfig);
  openPopup(modal.popupAddNewCard);
});

formNewPlace.addEventListener("submit", addNewCardForm);

//Редактирования профиля
const renderProfileInfo = (profile) => {
  profileImage.src = profile.avatar;
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  userID = profile._id;
};

const submitUpdateProfileForm = (evt) => {
  evt.preventDefault();
  const saveButton = formEditProfile.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  updateProfileToServer(inputProfileName.value, inputProfileJob.value)
    .then((profile) => {
      renderProfileInfo(profile);
      closePopup(modal.popupEditProfile);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
};

profileEditButton.addEventListener("click", () => {
  clearValidation(formEditProfile, validationConfig);
  inputProfileName.value = profileTitle.textContent;
  inputProfileJob.value = profileDescription.textContent;
  openPopup(modal.popupEditProfile);
});

formEditProfile.addEventListener("submit", submitUpdateProfileForm);

//Редактирования аватара
const submitUpdateAvatar = (evt) => {
  evt.preventDefault();
  const saveButton = formEditAvatar.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  itImage(avatarUrl.value)
    .then((url) => {
      updateAvatarToServer(url)
        .then((res) => {
          profileImage.src = res.avatar;
          closePopup(modal.popupEditAvatar);
          formEditAvatar.reset();
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
          clearValidation(formEditAvatar, validationConfig);
          saveButton.textContent = "Сохранить";
        });
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => (saveButton.textContent = "Сохранить"));
};

editAvatarButton.addEventListener("click", () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(modal.popupEditAvatar);
});

formEditAvatar.addEventListener("submit", submitUpdateAvatar);

//Запрос с сервера информации о пользователе и все карточки карточки
Promise.all(requestsProfileCards)
  .then(([userInfo, cardsInfo]) => {
    //Вывод информации о пользователе
    renderProfileInfo(userInfo);
    //Вывод карточек
    cardsInfo.forEach((card) => {
      placesList.append(
        createCard(
          cardTemplate,
          card,
          userID,
          openImagePopup,
          handleDeleteCard,
          handleLikeCard
        )
      );
    });
  })
  .catch((err) => console.error(`Ошибка: ${err}`))
  .finally(() => {
    //Установка валидации на все формы
    enableValidation(validationConfig);
    //Установка всем popup события закрытия
    initClosedPopups(popups);
  });
