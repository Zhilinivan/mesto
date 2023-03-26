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
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });

    this.formSelector.addEventListener("submit", (evt) =>
      this._formSubmit(evt, this._getInputValues())
    );
  }

  close() {
    if (this._popupSelector.classList.contains("popup_addcard")) {
      this.formSelector.reset();
    }
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupSelector.classList.remove("popup_opened");
  }
}
