const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  errorClass = "popup__error_visible",
  inputErrorClass = "popup__input_type_error"
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  errorClass = "popup__error_visible",
  inputErrorClass = "popup__input_type_error"
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  errorClass,
  inputErrorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      errorClass,
      inputErrorClass
    );
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  inactiveButtonClass = "popup__button_disabled"
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(
      form.querySelectorAll(validationConfig.inputSelector)
    );
    const formButton = form.querySelector(
      validationConfig.submitButtonSelector
    );

    toggleButtonState(
      inputList,
      formButton,
      validationConfig.inactiveButtonClass
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(
          form,
          inputElement,
          validationConfig.errorClass,
          validationConfig.inputErrorClass
        );
        toggleButtonState(
          inputList,
          formButton,
          validationConfig.inactiveButtonClass
        );
      });
    });
  });
};

const clearValidation = (formElement, validationConfig) => {
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputList.forEach((input) => {
    input.setCustomValidity("");
    hideInputError(
      formElement,
      input,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  });

  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};

export { enableValidation, clearValidation };
