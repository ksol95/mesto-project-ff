import { deleteCardFromServer } from "../scripts/index";

const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
  deleteCardFromServer(evt.target.closest(".card").getAttribute("id"));
};
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

function createCard(template, cardInfo, myID, openImagePopup) {
  const card = template.querySelector(".card").cloneNode(true);
  card.setAttribute("id", cardInfo._id);
  card.querySelector(".card__image").src = cardInfo.link;
  card.querySelector(".card__image").setAttribute("alt", cardInfo.name);
  card.querySelector(".card__image").addEventListener("click", openImagePopup);
  card.querySelector(".card__title").textContent = cardInfo.name;
  if (cardInfo.owner._id === myID) {
    card
      .querySelector(".card__delete-button")
      .addEventListener("click", deleteCard);
  } else {
    card.querySelector(".card__delete-button").classList.add("hidden");
  }

  card.querySelector(".card__like-button").addEventListener("click", likeCard);
  card.querySelector(".card__like-counter").textContent = cardInfo.likes.length;
  return card;
}

export { createCard, deleteCard, likeCard };
