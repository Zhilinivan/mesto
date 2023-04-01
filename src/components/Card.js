import { api, popupCardFullscreen, myId } from "../pages/index.js";
export class Card {
  constructor(
    { likes, name, link, owner, _id },
    templateSelector,
    deletePopup
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._deletePopup = deletePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setLikes() {
    this._likes.forEach((owner) => {
      if (owner._id === myId) {
        this._isLike = "true";
      }
    });

    if (this._isLike) {
      this._buttonLike.classList.add("card__like-button_active");
    } else {
      this._buttonLike.classList.remove("card__like-button_active");
    }

    this._valueLikes.textContent = this._likes.length;
  }

  _setEventListeners() {
    const buttonDelete = this._element.querySelector(".card__delete-button");
    const deleteCardButton = document.querySelector(
      ".popup__save-button_deleteavatar"
    );

    this._buttonLike.addEventListener("click", () => {
      if (!this._isLike) {
        this._buttonLike.classList.add("card__like-button_active");
        api.setLike(this._id).then((result) => {
          this._valueLikes.textContent = result.length;
        });
        this._isLike = true;
      } else {
        this._buttonLike.classList.remove("card__like-button_active");
        api.deleteLike(this._id).then((result) => {
          this._valueLikes.textContent = result.length;
        });
        this._isLike = false;
      }
    });

    if (myId != this._owner._id) {
      buttonDelete.style.display = "none";
    } else {
      buttonDelete.addEventListener("click", () => {
        this._deletePopup.open();
        deleteCardButton.addEventListener("click", () => {
          this._deletePopup.close();
          this._element.remove();

          api.deleteCard(this._id);
        });
      });
    }

    this._image.addEventListener("click", () => {
      popupCardFullscreen.open(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._buttonLike = this._element.querySelector(".card__like-button");
    this._valueLikes = this._element.querySelector(".card__likes");
    this._setLikes();
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}
