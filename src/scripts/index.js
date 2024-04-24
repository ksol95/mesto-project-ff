import { createCard } from "../components/card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  addNewCardToServer,
  updateProfileToServer,
  updateAvatarToServer,
  itImage,
  getAllInfo,
} from "./api.js";
import {
  openPopup,
  closePopup,
  initClosedPopups,
} from "../components/modal.js";

let userID = "";

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

const openImagePopup = (evt) => {
  imageFromPopup.src = evt.target.getAttribute("src");
  imageFromPopup.alt = evt.target.getAttribute("alt");
  imageFromPopup.title = evt.target.getAttribute("alt");
  captionFromPopup.textContent = evt.target.getAttribute("alt");
  openPopup(popupTypeImage);
};

//Модальное окно добавления новой карточки
const addNewCardForm = (evt) => {
  evt.preventDefault();
  formNewCard.querySelector(".button").textContent = "Сохранение...";
  addNewCardToServer(inputNewCardName.value, inputNewCardUrl.value)
    .then((card) => {
      placesList.prepend(
        createCard(cardTemplate, card, userID, openImagePopup)
      );
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
      placesList
        .append(
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
            openImagePopup
          )
        )
        .finally(() => {
          clearValidation(formNewCard, validationConfig);
          formNewCard.querySelector(".button").textContent = "Сохранить";
        });
    });
  closePopup(popupAddNewCard);
  evt.target.reset();
};
cardAddButton.addEventListener("click", () => {
  clearValidation(formNewCard, validationConfig);
  openPopup(popupAddNewCard);
});
formNewCard.addEventListener("submit", addNewCardForm);

//Модальное окно редактирования профиля
const renderProfileInfo = (profile) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.src = profile.avatar;
  userID = profile._id;
};

const submitUpdateProfileForm = (evt) => {
  evt.preventDefault();
  profileEditForm.querySelector(".button").textContent = "Сохранение...";
  updateProfileToServer(profileNameInput.value, profileJobInput.value)
    .then((profile) => renderProfileInfo(profile))
    .catch((err) =>
      renderProfileInfo({
        name: `Ошибка: ${err}`,
        about: `Ошибка: ${err}`,
      })
    )
    .finally(() => {
      profileEditForm.querySelector(".button").textContent = "Сохранить";
      closePopup(popupEditProfile);
    });
};

profileEditButton.addEventListener("click", () => {
  clearValidation(formNewCard, validationConfig);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});
profileEditForm.addEventListener("submit", submitUpdateProfileForm);

//Модальное окно редактирования аватара
const submitUpdateAvatar = (evt) => {
  evt.preventDefault();
  formEditAvatar.querySelector(".button").textContent = "Сохранение...";
  itImage(avatarUrl.value)
    .then((url) => {
      updateAvatarToServer(url)
        .then((res) => updateAvatar(res.avatar))
        .catch((err) => console.error(`Ошибка: ${err}`))
        .finally(() => {
          clearValidation(formEditAvatar, validationConfig);
          closePopup(popupEditAvatar);
        });
    })
    .catch((err) => {
      console.log(`Неподходящий тип : ${err}`);
      clearValidation(formEditAvatar, validationConfig);
    });
  formEditAvatar.querySelector(".button").textContent = "Сохранить";
};

const updateAvatar = (avatar) => {
  profileImage.src = avatar;
};
profileEditAvatarButton.addEventListener("click", () => {
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});
formEditAvatar.addEventListener("submit", submitUpdateAvatar);

// //Получить информацию о пользователе с серверва
// getMyProfileInfo()
//   .then((res) => {
//     renderProfileInfo(res);
//     userID = res._id;
//   })
//   .catch((err) =>
//     renderProfileInfo({
//       name: `Ошибка: ${err}`,
//       about: `Ошибка: ${err}`,
//       avatar: "./images/avatar.jpg",
//     })
//   );
// //Загрузить карточки с сервера
// getCards()
//   .then((res) => {
//     res.forEach((card) => {
//       placesList.append(createCard(cardTemplate, card, userID, openImagePopup));
//     });
//   })
//   .catch((err) => {
//     console.error(`Ошибка: ${err}`);
//     placesList.append(
//       createCard(
//         cardTemplate,
//         { _id: err, link: err, name: err, owner: { _id: userID }, likes: [] },
//         userID,
//         openImagePopup
//       )
//     );
//   });

Promise.all(getAllInfo)
  .then(([userInfo,cardsInfo]) => {
    //Вывод информации о пользователе
    renderProfileInfo(userInfo);
    //Вывод карточек
    cardsInfo.forEach((card) => {
      placesList.append(createCard(cardTemplate, card, userID, openImagePopup));
    });
  })
  .catch((err) => console.error(`Ошибка: ${err}`))
  .finally(() => {
    //Установка валидации на все формы
    enableValidation(validationConfig);
    //Установка всем popup события закрытия
    initClosedPopups();
  });
