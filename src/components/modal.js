const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

const openImagePopup = (evt) => {
  image.setAttribute("title", evt.target.getAttribute("alt"));
  image.setAttribute("alt", evt.target.getAttribute("alt"));
  image.setAttribute("src", evt.target.getAttribute("src"));
  caption.textContent = evt.target.getAttribute("alt");
  openPopup(popupImage);
};

function closedKeyHandler(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closedKeyHandler);
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closedKeyHandler);
}

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

export { openPopup, closePopup, openImagePopup, initClosedPopups };
