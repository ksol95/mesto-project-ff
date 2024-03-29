import { initialCards } from "./cards";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const deleteCard = (evt) => {
  evt.target.parentElement.remove();
};

function createCard(template, cardLink, cardName, del) {
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = cardLink;
  card.querySelector(".card__image").setAttribute("alt", cardName);
  card.querySelector(".card__title").textContent = cardName;
  card.querySelector(".card__delete-button").addEventListener("click", del);
  return card;
}
//вывод всех карточек из массива
initialCards.forEach((el) => {
  placesList.append(createCard(cardTemplate, el.link, el.name, deleteCard));
});