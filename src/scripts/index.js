import { initialCards } from "./cards";
import { createCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  initClosedPopups,
} from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
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
const updateProfileForm = (evt) => {
  evt.preventDefault();
  profileDescription.textContent = profileJobInput.value;
  profileTitle.textContent = profileNameInput.value;
  closePopup(popupEditProfile);
};
const addNewCardForm = (evt) => {
  evt.preventDefault();
  placesList.prepend(
    createCard(
      cardTemplate,
      inputNewCardUrl.value,
      inputNewCardName.value,
      openImagePopup
    )
  );
  closePopup(popupAddNewCard);
  evt.target.reset();
};

//Установка всем popup события закрытия
initClosedPopups();
//вывод всех карточек из массива
initialCards.forEach((el) => {
  placesList.append(createCard(cardTemplate, el.link, el.name, openImagePopup));
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddNewCard);
});

formNewCard.addEventListener("submit", addNewCardForm);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

profileEditForm.addEventListener("submit", updateProfileForm);