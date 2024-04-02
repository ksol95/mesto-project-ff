const popups = document.querySelectorAll(".popup");
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

// Добавляю события закрытия по кнопке и оверлей всем popup
function initClosedPopups() {
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
    // Клик по кнопке закрытия
    popup.querySelector(".popup__close").addEventListener("click", () => {
      closePopup(popup);
    });
    // Клик по "оверлэй"
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
    });
  });
}

export { openPopup, closePopup, initClosedPopups };
