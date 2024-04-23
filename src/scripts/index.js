import { initialCards } from "./cards";
import { createCard } from "../components/card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  openPopup,
  closePopup,
  initClosedPopups,
} from "../components/modal.js";

const token = "a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697";
const cohortId = "wff-cohort-12";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

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

const updateProfileFormSubmit = (evt) => {
  evt.preventDefault();
  updateProfileToServer(profileNameInput.value, profileJobInput.value);
  closePopup(popupEditProfile);
};

const addNewCardForm = (evt) => {
  evt.preventDefault();
  addNewCardToServer(inputNewCardName.value, inputNewCardUrl.value);
  closePopup(popupAddNewCard);
  evt.target.reset();
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddNewCard);
});

formNewCard.addEventListener("submit", addNewCardForm);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, validationConfig);
  openPopup(popupEditProfile);
});

profileEditForm.addEventListener("submit", updateProfileFormSubmit);

const getProfileInfo = () => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then((res) => renderProfileInfo(res))
    .catch((err) =>
      renderProfileInfo({
        name: `Ошибка: ${err}`,
        about: `Ошибка: ${err}`,
        avatar: "./images/avatar.jpg",
      })
    );
};

const renderProfileInfo = (profile) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.src = profile.avatar;
};

const updateProfileToServer = (name, about) => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => res.json())
    .then((profile) => renderProfileInfo(profile))
    .catch((err) =>
      renderProfileInfo({
        name: `Ошибка: ${err}`,
        about: `Ошибка: ${err}`,
        avatar: "./images/avatar.jpg",
      })
    );
};

const getCards = () => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: "a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then((res) => {
      res.forEach((card) => {
        placesList.append(
          createCard(cardTemplate, card.link, card.name, openImagePopup)
        );
      });
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
};

const addNewCardToServer = (name, link) => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .then((card) => {
      placesList.prepend(
        createCard(cardTemplate, card.link, card.name, openImagePopup)
      );
    })
    .catch((err) => console.log(`Ошибка ${err}`));
};

//Получить информацию о пользователе с серверва
getProfileInfo();
//Установка валидации на все формы
enableValidation(validationConfig);
//Установка всем popup события закрытия
initClosedPopups();
//Загрузить карточки с сервера
getCards();
