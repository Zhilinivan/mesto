import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCardFullscreen = document.querySelector(
      ".popup__image-fullscreen"
    );
    this._titleCardFullscreen = document.querySelector(
      ".popup__title-fullscreen"
    );
  }

  open(link, name) {
    this._imageCardFullscreen.src = link;
    this._titleCardFullscreen.textContent = name;
    this._imageCardFullscreen.alt = "Тут должно быть изображение " + name;

    document.addEventListener("keyup", super._handleEscClose);
    this._popupSelector.classList.add("popup_opened");
  }
}
