const popupImage = document.querySelector(".popup_type_image");

function keyHandler(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
    document.removeEventListener("keydown", keyHandler);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

const openImagePopup = (evt) => {
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  image.setAttribute("title", evt.target.getAttribute("alt"));
  image.setAttribute("src", evt.target.getAttribute("src"));
  caption.textContent = evt.target.getAttribute("alt");
  openPopup(popupImage);
};

export { openPopup, closePopup, openImagePopup };
