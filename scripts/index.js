const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const popupCreateCard = document.querySelector('.popup_addcard');
const popupCardFullscreen = document.querySelector('.popup_fullscreen');

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

const cardImage = document.querySelector('.popup__image-fullscreen');
const cardTitle = document.querySelector('.popup__title-fullscreen');

const cardTemplate = document.querySelector('.elements__template').content;
const cardElement = cardTemplate.querySelector('.card');

const closePopup = popup => {
  document.removeEventListener('keydown', checkCloseEsc);
  popup.classList.remove('popup_opened');
}
const openPopup = popup => {
  document.addEventListener('keydown', checkCloseEsc);
  popup.classList.add('popup_opened');
}

initialCards.forEach(function (card) {cardsContainer.append(createCard(card));});

function setSubmitButtonState(buttonSubmit, isDisabled) {
  
  if (isDisabled === popupProfile) {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove('popup__save-button_disabled');
  } else {
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add('popup__save-button_disabled');
  }
}

function openPopupProfile () {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputProfession.value = profileProfession.textContent;
  hideInputError(validationConfig, popupProfileForm, popupProfileInputName);
  hideInputError(validationConfig, popupProfileForm, popupProfileInputProfession);
  setSubmitButtonState(popupProfileFormSaveButton ,popupProfile);
  openPopup(popupProfile);
}

function openPopupCreateCard() {
  popupCardForm.reset();
  hideInputError(validationConfig, popupCardForm, popupCardInputTitle);
  hideInputError(validationConfig, popupCardForm, popupCardInputSrc);
  setSubmitButtonState(popupCardFormSaveButton, popupCreateCard);
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

function createCard(cardData) { 

  const newCard = cardElement.cloneNode(true);

  const buttonLike = newCard.querySelector('.card__like-button');
  const buttonDelete = newCard.querySelector('.card__delete-button');
  const image = newCard.querySelector('.card__image');

  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').alt = 'Здесь должно быть изображение ' + cardData.name;
 
  buttonLike.addEventListener('click', () => {
    
    buttonLike.classList.toggle('card__like-button_active');
  });
  
  buttonDelete.addEventListener('click', () => {

    newCard.remove(); 
  });
  
  image.addEventListener('click', () => {
  
    cardImage.src = image.src;  
    cardTitle.textContent = newCard.querySelector('.card__title').textContent;  
    cardImage.alt = 'Тут должно быть изображение ' + cardTitle.textContent; 
    openPopup(popupCardFullscreen);
  });

  return newCard;
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
popupCardFullscreen.addEventListener("click", (evt) => checkCloseClick(evt, popupCardFullscreen));
