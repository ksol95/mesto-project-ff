import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openPopup, closePopup, openImagePopup } from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const profileForm = document.querySelector(".popup__form[name='editProfile']");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileJobInput = profileForm.querySelector(
  ".popup__input_type_description"
);

const cardsForm = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = profileForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = profileForm.querySelector(".popup__input_type_card-url");

function loadProfileToPopup() {
  let profileTitle = document.querySelector(".profile__title").textContent;
  let profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;

  profileNameInput.value = profileTitle;
  profileJobInput.value = profileDescription;
}

function handleProfileForm(evt) {
  evt.preventDefault();
  closePopup(popupEditProfile);
}

function handleCardsForm(evt) {
  evt.preventDefault();
  closePopup(popupNewCard);
}

profileForm.addEventListener("submit", handleProfileForm);
cardsForm.addEventListener("submit", handleCardsForm);

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.querySelector(".popup__close").addEventListener("click", (evt) => {
    closePopup(popup);
  });

  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  loadProfileToPopup();
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
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
