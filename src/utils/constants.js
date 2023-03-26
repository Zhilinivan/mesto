import arhiz from "../images/arkhyz.jpg";
import chelyabinsk from "../images/chelyabinsk-oblast.jpg";
import ivanovo from "../images/ivanovo.jpg";
import kamchatka from "../images/kamchatka.jpg";
import holmogor from "../images/kholmogorsky-rayon.jpg";
import baikal from "../images/baikal.jpg";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const initialCards = [
  {
    title: "Архыз",
    link: arhiz,
  },
  {
    title: "Челябинская область",
    link: chelyabinsk,
  },
  {
    title: "Иваново",
    link: ivanovo,
  },
  {
    title: "Камчатка",
    link: kamchatka,
  },
  {
    title: "Холмогорский район",
    link: holmogor,
  },
  {
    title: "Байкал",
    link: baikal,
  },
];

export const profileInfo = {
  name: document.querySelector(".profile__name"),
  profession: document.querySelector(".profile__profession"),
};

export const profileInput = {
  name: document.querySelector(".popup__input_name"),
  profession: document.querySelector(".popup__input_profession"),
};

export const cardsContainer = ".elements__list";

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
