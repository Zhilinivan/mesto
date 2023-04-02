import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this.formSelector = this._popupSelector.querySelector(".popup__form");
    this._submitButton = this.formSelector.querySelector(".popup__save-button");
    this._submitButtonValue = this._submitButton.textContent;
    this._inputList = this.formSelector.querySelectorAll(".popup__input");
    this._formValues = [];
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  delayOnSubmitButton() {
    this._blockedButtonText = "Сохранение...";
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._blockedButtonText;
  }

  delayOffSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._submitButtonValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formSelector.addEventListener("submit", (evt) =>
      this._formSubmit(evt, this._getInputValues())
    );
  }

  close() {
    this.formSelector.reset();
    super.close();
  }
}
