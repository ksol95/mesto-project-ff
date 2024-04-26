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

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileImage = document.querySelector(".profile__image-avatar");
const formEditAvatar = document.querySelector(
  ".popup__form[name='editProfileAvatar']"
);
const profileEditAvatarButton = document.querySelector(
  ".profile__image-avatar-button"
);
const avatarUrl = formEditAvatar.querySelector(".popup__input_type_avatar");
const popupEditAvatar = document.querySelector(".popup_type_edit_avatar");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileEditForm = document.querySelector(
  ".popup__form[name='editProfile']"
);
const profileNameInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const cardAddButton = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.querySelector(".popup__form[name='new-place']");
const inputNewCardName = formNewCard.querySelector(
  ".popup__input[name='place-name']"
);
const inputNewCardUrl = formNewCard.querySelector(".popup__input[name='link']");
const popupTypeImage = document.querySelector(".popup_type_image");
const imageFromPopup = popupTypeImage.querySelector(".popup__image");
const captionFromPopup = popupTypeImage.querySelector(".popup__caption");

//Модальные окна
const popups = document.querySelectorAll(".popup");
const popupTypeQuestion = document.querySelector(".popup_type_question");
const questButton = popupTypeQuestion.querySelector(".popup__button");
const questTitle = popupTypeQuestion.querySelector(".popup__title");

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
  popupTypeQuestion.setAttribute("data", qestionConfig.data);
  questButton.addEventListener("click", qestionConfig.handle);
  openPopup(popupTypeQuestion);
};
//Удаление карточки после подверждения
function handleQuestButtonDeleteCard(evt) {
  deleteCardFromServer(removedCardID)
    .then((res) => {
      removeCardById(removedCardID);
      closePopup(popupTypeQuestion);
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
  openPopup(popupTypeImage);
};
//Добавления новой карточки
const addNewCardForm = (evt) => {
  evt.preventDefault();
  const saveButton = formNewCard.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  addNewCardToServer(inputNewCardName.value, inputNewCardUrl.value)
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
      closePopup(popupAddNewCard);
      formNewCard.reset();
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
      clearValidation(formNewCard, validationConfig);
      saveButton.textContent = "Сохранить";
    });
};

cardAddButton.addEventListener("click", () => {
  clearValidation(formNewCard, validationConfig);
  openPopup(popupAddNewCard);
});

formNewCard.addEventListener("submit", addNewCardForm);

//Редактирования профиля
const renderProfileInfo = (profile) => {
  profileImage.src = profile.avatar;
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  userID = profile._id;
};

const submitUpdateProfileForm = (evt) => {
  evt.preventDefault();
  const saveButton = profileEditForm.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  updateProfileToServer(profileNameInput.value, profileJobInput.value)
    .then((profile) => {
      renderProfileInfo(profile);
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
};

profileEditButton.addEventListener("click", () => {
  clearValidation(profileEditForm, validationConfig);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

profileEditForm.addEventListener("submit", submitUpdateProfileForm);

//Редактирования аватара
const submitUpdateAvatar = (evt) => {
  evt.preventDefault();
  const saveButton = formEditAvatar.querySelector(".button");
  saveButton.textContent = "Сохранение...";
  itImage(avatarUrl.value)
    .then((url) => {
      updateAvatarToServer(url)
        .then((res) => {
          closePopup(popupEditAvatar);
          formEditAvatar.reset();
          updateAvatar(res.avatar);
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

const updateAvatar = (avatar) => {
  profileImage.src = avatar;
};

profileEditAvatarButton.addEventListener("click", () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
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

const OKcontentType = ["image/webp", "image/jpeg", "image/gif", "image/jpg"];
const requestConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697",
    "Content-Type": "application/json",
  },
};