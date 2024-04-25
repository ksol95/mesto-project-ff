const popups = document.querySelectorAll(".popup");

const popupTypeQuestion = document.querySelector(".popup_type_question");
const questButton = popupTypeQuestion.querySelector(".popup__button");
const questTitle = popupTypeQuestion.querySelector(".popup__title");

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

// универсальное окно с вопросом
function openQuestModal(qestionConfig) {
  return new Promise((resolve) => {
    questTitle.textContent = qestionConfig.titleText;
    questButton.textContent = qestionConfig.buttonText;
    popupTypeQuestion.setAttribute("data", qestionConfig.data);
    questButton.addEventListener("click", () => {
      closePopup(popupTypeQuestion);
      resolve(true);
    });
    openPopup(popupTypeQuestion);
  });
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

export { openPopup, closePopup, initClosedPopups, openQuestModal };
