export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const profileInfo = {
  name: document.querySelector(".profile__name"),
  about: document.querySelector(".profile__about"),
  avatar: document.querySelector(".profile__avatar-image"),
};

export const profileInput = {
  name: document.querySelector(".popup__input_name"),
  about: document.querySelector(".popup__input_about"),
  avatar: document.querySelector(".popup__input_avatarsrc"),
};

export const cardsContainer = ".elements__list";
