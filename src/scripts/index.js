import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup, openImagePopup } from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");

const profileForm = document.querySelector(".popup__form[name='editProfile']");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileJobInput = profileForm.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsForm = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = profileForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = profileForm.querySelector(".popup__input_type_card-url");

function loadProfileToPopup() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

function handleProfileForm(evt) {
  evt.preventDefault();
  profileDescription.textContent = profileJobInput.value;
  profileTitle.textContent = profileNameInput.value;
  closePopup(popupEditProfile);
}

function handleCardsForm(evt) {
  evt.preventDefault();
  console.log(evt);
  //createCard(cardTemplate, );
  closePopup(popupAddNewCard);
}

profileForm.addEventListener("submit", handleProfileForm);
cardsForm.addEventListener("submit", handleCardsForm);

profileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  loadProfileToPopup();
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddNewCard);
});

//вывод всех карточек из массива
initialCards.forEach((el) => {
  placesList.append(
    createCard(
      cardTemplate,
      el.link,
      el.name,
      deleteCard,
      likeCard,
      openImagePopup
    )
  );
});
