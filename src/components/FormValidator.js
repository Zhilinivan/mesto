export class FormValidator {
  constructor(config, checkForm) {
    this._config = config;
    this._checkForm = checkForm;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._checkForm.querySelector(
      `.${inputElement.name}-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._checkForm.querySelector(
      `.${inputElement.name}-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  toggleButtonState(isDisabled) {
    if (this._hasInvalidInput(this._inputList) || isDisabled) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  removeValidationErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setListener() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._inputList = Array.from(
      this._checkForm.querySelectorAll(this._config.inputSelector)
    );

    this._buttonElement = this._checkForm.querySelector(
      this._config.submitButtonSelector
    );

    this.toggleButtonState();
    this._setListener();
  }
}
