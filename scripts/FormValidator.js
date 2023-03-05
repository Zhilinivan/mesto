export class FormValidator {
  
  constructor(config, checkForm) {
    
    this._config = config;
    this._checkForm = checkForm;    
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._checkForm.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._checkForm.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _toggleButtonState(inputList, buttonElement)  {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {return !inputElement.validity.valid;});
  };

  enableValidation(){
    const inputList = Array.from(this._checkForm.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._checkForm.querySelector(this._config.submitButtonSelector);
 
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
};



