import "./index.css";

import {
  validationConfig,
  initialCards,
  profileInfo,
  profileInput,
  cardsContainer,
} from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

let profileEditButton = document.querySelector(".profile__edit-button");
let profileAddButton = document.querySelector(".profile__add-button");

const popupProfile = new PopupWithForm(
  ".popup_profile",
  handleSubmitProfileForm
);
const popupCreateCard = new PopupWithForm(
  ".popup_addcard",
  handleSubmitCardForm
);
const popupCardFullscreen = new PopupWithImage(".popup_fullscreen");

const userInfo = new UserInfo(profileInfo);

const validationPopupProfileForm = new FormValidator(
  validationConfig,
  popupProfile.formSelector
);
const validationPopupCardForm = new FormValidator(
  validationConfig,
  popupCreateCard.formSelector
);

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, ".elements__template", openPopupFullscreen);
      cardList.addItem(card.generateCard());
    },
  },
  cardsContainer
);

cardList.renderItems(initialCards);

function openPopupFullscreen(link, name) {
  popupCardFullscreen.open(link, name);
}

function openPopupProfile() {
  const userData = userInfo.getUserInfo();

  profileInput.name.value = userData.name.textContent;
  profileInput.profession.value = userData.profession.textContent;
  validationPopupProfileForm.removeValidationErrors();
  validationPopupProfileForm.disableSubmitButton(false);
  popupProfile.open();
}

function openPopupCreateCard() {
  validationPopupCardForm.removeValidationErrors();
  validationPopupCardForm.disableSubmitButton(true);
  popupCreateCard.open();
}

function handleSubmitProfileForm(evt, info) {
  evt.preventDefault();
  userInfo.setUserInfo(info);
  popupProfile.close();
}

function handleSubmitCardForm(evt, info) {
  evt.preventDefault();
  cardList.renderer(info);
  popupCreateCard.close();
}

validationPopupProfileForm.enableValidation();
validationPopupCardForm.enableValidation();

profileEditButton.addEventListener("click", openPopupProfile);
profileAddButton.addEventListener("click", openPopupCreateCard);

popupProfile.setEventListeners();
popupCreateCard.setEventListeners();
popupCardFullscreen.setEventListeners();
