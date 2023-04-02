export class Card {
  constructor(
    { likes, name, link, owner, _id },
    templateSelector,
    deleteCardPopup,
    myId,
    popupImageOpen,
    api
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._popupImageOpen = popupImageOpen;

    this._owner = owner;
    this._templateSelector = templateSelector;
    this._deleteCardPopup = deleteCardPopup;
    this._api = api;
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
      if (owner._id === this._myId) {
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

    this._buttonLike.addEventListener("click", () => {
      if (!this._isLike) {
        this._api
          .setLike(this._id)
          .then((result) => {
            this._buttonLike.classList.add("card__like-button_active");
            this._valueLikes.textContent = result.length;
          })
          .catch((err) => console.error(err));
        this._isLike = true;
      } else {
        this._api
          .deleteLike(this._id)
          .then((result) => {
            this._buttonLike.classList.remove("card__like-button_active");
            this._valueLikes.textContent = result.length;
          })
          .catch((err) => console.error(err));
        this._isLike = false;
      }
    });

    if (this._myId != this._owner._id) {
      buttonDelete.style.display = "none";
    } else {
      buttonDelete.addEventListener("click", () => {
        this._deleteCardPopup.open(this._element, this._api, this._id);
      });
    }

    this._image.addEventListener("click", () => {
      this._popupImageOpen.open(this._link, this._name);
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
