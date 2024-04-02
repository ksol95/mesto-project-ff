import { initialCards } from "./cards";
import { createCard } from "../components/card.js";
import {
  openPopup,
  closePopup,
  initClosedPopups,
} from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupAddNewCard = document.querySelector(".popup_type_new-card");
const newCardsForm = document.querySelector(".popup__form[name='new-place']");
const newCardNameInput = newCardsForm.querySelector(
  ".popup__input[name='place-name']"
);
const newCardUrlInput = newCardsForm.querySelector(
  ".popup__input[name='link']"
);
const popupTypeImage = document.querySelector(".popup_type_image");
const imageFromPopup = popupTypeImage.querySelector(".popup__image");
const captionFromPopup = popupTypeImage.querySelector(".popup__caption");

const openImagePopup = (evt) => {
  imageFromPopup.setAttribute("title", evt.target.getAttribute("alt"));
  imageFromPopup.setAttribute("alt", evt.target.getAttribute("alt"));
  imageFromPopup.setAttribute("src", evt.target.getAttribute("src"));
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
      newCardUrlInput.value,
      newCardNameInput.value,
      openImagePopup
    )
  );
  closePopup(popupAddNewCard);
  evt.target.reset();
};

function loadProfileToPopup() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
}

profileEditForm.addEventListener("submit", updateProfileForm);
newCardsForm.addEventListener("submit", addNewCardForm);

profileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  loadProfileToPopup();
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAddNewCard);
});

initClosedPopups();
//вывод всех карточек из массива
initialCards.forEach((el) => {
  placesList.append(createCard(cardTemplate, el.link, el.name, openImagePopup));
});
