import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const popupCreateCard = document.querySelector('.popup_addcard');

const popupProfileForm = document.querySelector('.popup__form_profile');
const popupCardForm = document.querySelector('.popup__form_addcard');

const popupProfileFormSaveButton = popupProfileForm.querySelector('.popup__save-button'); 
const popupCardFormSaveButton = popupCardForm.querySelector('.popup__save-button'); 

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupProfileInputName = document.querySelector('.popup__input_name');
const popupProfileInputProfession = document.querySelector('.popup__input_profession');

const popupCardInputTitle = document.querySelector('.popup__input_title');
const popupCardInputSrc = document.querySelector('.popup__input_src');

const cardsContainer = document.querySelector('.elements__list');

const closePopup = popup => {
  document.removeEventListener('keydown', checkCloseEsc);
  popup.classList.remove('popup_opened');
}
const openPopup = popup => {
  document.addEventListener('keydown', checkCloseEsc);
  popup.classList.add('popup_opened');
}


initialCards.forEach((item) => {cardsContainer.append(createCard(item))});

function createCard(item) {
  const card = new Card(item, '.elements__template');
  return card.generateCard();
}

function validationForm(form) {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
}

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

function openPopupProfile () {
  
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputProfession.value = profileProfession.textContent;

  hideError(popupProfileForm, popupProfileInputName);
  hideError(popupProfileForm, popupProfileInputProfession);
  validationForm(popupProfileForm);

  setSubmitButtonState(popupProfileFormSaveButton, false);
  openPopup(popupProfile);
};

function openPopupCreateCard() {
  
  popupCardForm.reset();

  hideError(popupCardForm, popupCardInputTitle);
  hideError(popupCardForm, popupCardInputSrc);
  validationForm(popupCardForm);
  
  setSubmitButtonState(popupCardFormSaveButton, true);
  openPopup(popupCreateCard);
}

function handleSubmitProfileForm (evt) {
  
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileProfession.textContent = popupProfileInputProfession.value;
  closePopup(popupProfile);
}

function handleSubmitCardForm (evt) {

  evt.preventDefault();
  cardsContainer.prepend(createCard({name: popupCardInputTitle.value, link: popupCardInputSrc.value}));
  closePopup(popupCreateCard);
}

function setSubmitButtonState(buttonSubmit, isDisabled) {
  
  if (!isDisabled) {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove('popup__save-button_disabled');
  } else {
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add('popup__save-button_disabled');
  }
}

function checkCloseClick(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {closePopup(popup);};
}

function checkCloseEsc(evt) {if (evt.key === 'Escape') {closePopup(document.querySelector('.popup_opened'));};}

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCreateCard);

popupProfileForm.addEventListener('submit', handleSubmitProfileForm);
popupCardForm.addEventListener('submit', handleSubmitCardForm);

popupProfile.addEventListener("click", (evt) => checkCloseClick(evt, popupProfile));
popupCreateCard.addEventListener("click", (evt) => checkCloseClick(evt, popupCreateCard));

