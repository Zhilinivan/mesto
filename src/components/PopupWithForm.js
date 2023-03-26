import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this.formSelector = this._popupSelector.querySelector(".popup__form");
    this._formSubmit = formSubmit;
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList = this.formSelector.querySelectorAll(".popup__input");
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formSelector.addEventListener("submit", (evt) =>
      this._formSubmit(evt, this._getInputValues())
    );
  }

  close() {
    if (this._popupSelector.classList.contains("popup_addcard")) {
      this.formSelector.reset();
    }
    super.close();
  }
}
