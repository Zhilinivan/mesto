function showInputError(config, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

function hideInputError(config, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(config,formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

function setEventListeners(config, popupForm){
  const inputList = Array.from(popupForm.querySelectorAll(config.inputSelector));
  const buttonElement = popupForm.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, popupForm, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

function toggleButtonState(config, inputList, buttonElement)  {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {return !inputElement.validity.valid;});
};

function enableValidation(config){
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((popupForm) => {setEventListeners(config, popupForm); });
};

enableValidation(config);