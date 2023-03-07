export class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _popupCardFullscreen = document.querySelector(".popup_fullscreen");
  _imageCardFullscreen = document.querySelector(".popup__image-fullscreen");
  _titleCardFullscreen = document.querySelector(".popup__title-fullscreen");

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _openFullscreenPopup() {
    this._imageCardFullscreen.src = this._link;
    this._titleCardFullscreen.textContent = this._name;
    this._imageCardFullscreen.alt = "Тут должно быть изображение " + this._name;

    this._openPopup(this._popupCardFullscreen);
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector(".card__like-button");
    const buttonDelete = this._element.querySelector(".card__delete-button");

    buttonLike.addEventListener("click", () => {
      buttonLike.classList.toggle("card__like-button_active");
    });
    buttonDelete.addEventListener("click", () => {
      this._element.remove();
    });
    this._image.addEventListener("click", () => {
      this._openFullscreenPopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
