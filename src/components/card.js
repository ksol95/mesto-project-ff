const removeCardById = (cardID) => {
  document.querySelector(`.card[id='${cardID}']`).remove();
};

const getCardID = (evt) => evt.target.closest(".card").getAttribute("id");

const itLikedCard = (cardID) =>
  document.querySelector(`.card[id='${cardID}']`).getAttribute("liked");

const likeCard = (likes, cardID, userID) => {
  const card = document.querySelector(`.card[id='${cardID}']`);
  const likeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  if (likes.some((user) => user._id === userID)) {
    card.setAttribute("liked", true);
    likeButton.classList.add("card__like-button_is-active");
  } else {
    card.removeAttribute("liked");
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardLikeCounter.textContent = likes.length;
};

function createCard(
  template,
  cardInfo,
  userID,
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
  if (cardInfo.owner._id === userID) {
    cardDeleteButton.addEventListener("click", handleDeleteButton);
  } else {
    cardDeleteButton.classList.add("hidden");
  }

  cardLikeButton.addEventListener("click", handleLikeCard);
  card.querySelector(".card__like-counter").textContent = cardInfo.likes.length;

  //Определяем ставил ли лайк пользователь
  if (cardInfo.likes.some((user) => user._id === userID)) {
    card.setAttribute("liked", true);
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    card.removeAttribute("liked");
  }
  return card;
}

export { createCard, getCardID, removeCardById, likeCard, itLikedCard };
