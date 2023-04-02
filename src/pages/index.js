import "./index.css";

import {
  validationConfig,
  profileInfo,
  profileInput,
  cardsContainer,
} from "../utils/constants.js";

import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileChangeAvatar = document.querySelector(".profile__avatar-button");

export const myId = "59b1a4ef6ec5de05f7051b7a";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "0d4aa734-94f5-4c60-944b-f739a988caac",
    "Content-Type": "application/json",
  },
});

const popupProfile = new PopupWithForm(
  ".popup_profile",
  handleSubmitProfileForm
);

const popupAvatar = new PopupWithForm(".popup_avatar", handleSubmitAvatarForm);

const popupDeleteCard = new PopupWithConfirmation(".popup_delete-card");

const popupCreateCard = new PopupWithForm(
  ".popup_addcard",
  handleSubmitCardForm
);

export const popupCardFullscreen = new PopupWithImage(".popup_fullscreen");

const userInfo = new UserInfo(profileInfo);

const validationPopupProfileForm = new FormValidator(
  validationConfig,
  popupProfile.formSelector
);

const validationPopupCardForm = new FormValidator(
  validationConfig,
  popupCreateCard.formSelector
);

const validationPopupChangeAvatar = new FormValidator(
  validationConfig,
  popupAvatar.formSelector
);

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        ".elements__template",
        popupDeleteCard,
        myId,
        popupCardFullscreen,
        api
      );
      cardList.addItem(card.generateCard());
    },
  },
  cardsContainer
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((results) => {
    userInfo.setUserInfo(results[0]);
    userInfo.setUserAvatar(results[0]);
    cardList.renderItems(results[1]);
  })
  .catch((err) => {
    console.log(err);
  });

function openPopupProfile() {
  const userData = userInfo.getUserInfo();

  profileInput.name.value = userData.name.textContent;
  profileInput.about.value = userData.about.textContent;
  validationPopupProfileForm.removeValidationErrors();
  validationPopupProfileForm.toggleButtonState(false);
  popupProfile.open();
}

function openPopupCreateCard() {
  validationPopupCardForm.removeValidationErrors();
  validationPopupCardForm.toggleButtonState(true);
  popupCreateCard.open();
}

function openPopupChangeAvatar() {
  validationPopupChangeAvatar.removeValidationErrors();
  validationPopupChangeAvatar.toggleButtonState(true);
  popupAvatar.open();
}

function handleSubmitProfileForm(evt, info) {
  evt.preventDefault();
  popupProfile.delayOnSubmitButton();

  api
    .setUserInfo(info)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      popupProfile.delayOffSubmitButton();
    });
}

function handleSubmitCardForm(evt, info) {
  evt.preventDefault();

  popupCreateCard.delayOnSubmitButton();

  api
    .addCard(info)
    .then((res) => {
      cardList.renderer(res);
      popupCreateCard.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      popupCreateCard.delayOffSubmitButton();
    });
}

function handleSubmitAvatarForm(evt, info) {
  evt.preventDefault();
  popupAvatar.delayOnSubmitButton();

  api
    .setUserAvatar(info)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupAvatar.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      popupAvatar.delayOffSubmitButton();
    });
}

validationPopupProfileForm.enableValidation();
validationPopupCardForm.enableValidation();
validationPopupChangeAvatar.enableValidation();

profileEditButton.addEventListener("click", openPopupProfile);
profileAddButton.addEventListener("click", openPopupCreateCard);
profileChangeAvatar.addEventListener("click", openPopupChangeAvatar);

popupProfile.setEventListeners();
popupCreateCard.setEventListeners();
popupCardFullscreen.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
