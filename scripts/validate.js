function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
  };
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };
  
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function setEventListeners(popupForm){
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    const buttonElement = popupForm.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
        checkInputValidity(popupForm, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  function toggleButtonState(inputList, buttonElement)  {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__save-button_disabled');
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__save-button_disabled');
    }
  }; 
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {return !inputElement.validity.valid;});
  }; 
  
  function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {setEventListeners(formElement); });
  };

  enableValidation();
  