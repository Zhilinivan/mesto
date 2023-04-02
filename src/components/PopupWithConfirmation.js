import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupSelector.querySelector(
      ".popup__save-button"
    );
  }

  _deleteCard = () => {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this.close();
        this._card.remove();
      })
      .catch((err) => console.error(err));
  };

  open(deleteCard, api, id) {
    this._card = deleteCard;
    this._api = api;
    this._id = id;

    this._submitButton.addEventListener("click", this._deleteCard);
    super.open();
  }

  close() {
    this._submitButton.removeEventListener("click", this._deleteCard);
    super.close();
  }
}
