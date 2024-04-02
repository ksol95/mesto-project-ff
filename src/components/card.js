const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

function createCard(template, cardLink, cardName, openImagePopup) {
  const card = template.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = cardLink;
  card.querySelector(".card__image").setAttribute("alt", cardName);
  card.querySelector(".card__image").addEventListener("click", openImagePopup);
  card.querySelector(".card__title").textContent = cardName;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  card.querySelector(".card__like-button").addEventListener("click", likeCard);
  return card;
}

export { createCard, deleteCard, likeCard };