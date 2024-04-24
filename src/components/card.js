import {
  deleteCardFromServer,
  likeCardRequest,
  unLikeCardRequest,
} from "../scripts/api";
import { openQuestModal } from "./modal";

const deleteCard = (evt) => {
  openQuestModal({
    buttonText: "Ок",
    titleText: "Вы уверены?",
    data: evt.target.closest(".card").getAttribute("id"),
  })
    .then(() => {
      deleteCardFromServer(evt.target.closest(".card").getAttribute("id"))
        .then(() => {
          evt.target.closest(".card").remove();
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
    })
    .catch(() => {
      console.error("Ошибка");
    });
};

const likeCard = (evt) => {
  const likeButton = evt.target;
  const card = likeButton.closest(".card");
  const cardID = card.getAttribute("id");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  if (!card.getAttribute("liked")) {
    likeCardRequest(cardID)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      })
      .then((res) => {
        card.setAttribute("liked", true);
        likeButton.classList.add("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  } else {
    unLikeCardRequest(cardID)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      })
      .then((res) => {
        card.removeAttribute("liked");
        likeButton.classList.remove("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      });
  }
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

  if (cardInfo.likes.some((user) => user._id === myID)) {
    card.setAttribute("liked", true);
    card
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  } else {
    card.removeAttribute("liked");
  }
  return card;
}

export { createCard, deleteCard, likeCard };
