"use strict";

var cardTemplate = document.querySelector("#card-template").content;
var placesList = document.querySelector(".places__list");

var deleteCard = function deleteCard(evt) {
  evt.target.parentElement.remove();
};

function createCard(template, cardLink, cardName, del) {
  var card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = cardLink;
  card.querySelector(".card__image").setAttribute("alt", cardName);
  card.querySelector(".card__title").textContent = cardName;
  card.querySelector(".card__delete-button").addEventListener("click", del);
  return card;
} //вывод всех карточек из массива


initialCards.forEach(function (el) {
  placesList.append(createCard(cardTemplate, el.link, el.name, deleteCard));
});