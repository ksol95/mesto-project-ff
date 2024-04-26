const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closedKeyHandler);
};
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closedKeyHandler);
};
const closedKeyHandler = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

// Обработчик клика по "оверлэй"
const handleOverlayPopupClose = (evt) =>{
  const popup = evt.target;
  if (popup.classList.contains("popup_is-opened")) {
    closePopup(popup);
  }
}

export { openPopup, closePopup, handleOverlayPopupClose  };
