export class Card {
  constructor({ title, link }, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector(".card__like-button");
    const buttonDelete = this._element.querySelector(".card__delete-button");

    buttonLike.addEventListener("click", () => {
      buttonLike.classList.toggle("card__like-button_active");
    });
    buttonDelete.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._link, this._title);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    return this._element;
  }
}
