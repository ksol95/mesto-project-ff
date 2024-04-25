const removeCardById = (cardID) => {
  document.querySelector(`.card[id='${cardID}']`).remove();
};

const getCardID = (evt) => evt.target.closest(".card").getAttribute("id");

function createCard(
  template,
  cardInfo,
  myID,
  openImagePopup,
  handleDeleteButton,
  handleLikeCard
) {
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");

  card.setAttribute("id", cardInfo._id);
  cardImage.src = cardInfo.link;
  cardImage.setAttribute("alt", cardInfo.name);
  cardImage.addEventListener("click", () => openImagePopup(cardInfo));

  card.querySelector(".card__title").textContent = cardInfo.name;
  if (cardInfo.owner._id === myID) {
    cardDeleteButton.addEventListener("click", handleDeleteButton);
  } else {
    cardDeleteButton.classList.add("hidden");
  }

  cardLikeButton.addEventListener("click", handleLikeCard);
  card.querySelector(".card__like-counter").textContent = cardInfo.likes.length;

  //Определяем ставил ли лайк пользователь
  if (cardInfo.likes.some((user) => user._id === myID)) {
    card.setAttribute("liked", true);
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    card.removeAttribute("liked");
  }
  return card;
}

export { createCard, getCardID, removeCardById };
