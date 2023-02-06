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

const closePopup = popup => {
  document.removeEventListener('keydown', checkCloseEsc);
  popup.classList.remove('popup_opened');
}
const openPopup = popup => {popup.classList.add('popup_opened');}

initialCards.forEach(function (card) {cardsContainer.append(createCard(card));});

function openPopupProfile () {
  document.addEventListener('keydown', checkCloseEsc);
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputProfession.value = profileProfession.textContent;
  hideInputError(config, popupProfileForm, popupProfileInputName);
  hideInputError(config, popupProfileForm, popupProfileInputProfession);

  popupProfileFormSaveButton.disabled = false;
  popupProfileFormSaveButton.classList.remove('popup__save-button_disabled');

  openPopup(popupProfile);
}

function openPopupCreateCard() {
  document.addEventListener('keydown', checkCloseEsc);
  popupCardForm.reset();
  hideInputError(config, popupCardForm, popupCardInputTitle);
  hideInputError(config, popupCardForm, popupCardInputSrc);
  
  popupCardFormSaveButton.disabled = true;
  popupCardFormSaveButton.classList.add('popup__save-button_disabled');

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

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = 'Здесь должно быть изображение ' + cardData.name;
 
  cardsContainer.addEventListener("click", checkCardClick);
  return cardElement;
}

function checkCardClick(event) {

  const deleteButtonClick = event.target.classList.contains('card__delete-button');
  const likeButtonClick = event.target.classList.contains('card__like-button');
  const cardClick = event.target.closest('.card');
  
  if (deleteButtonClick) {
    event.target.closest('.card').remove();
    return;
  } 

  if (likeButtonClick) {
    event.target.classList.toggle('card__like-button_active');
    return;
  } 

  if (cardClick) {
    
    cardImage.src = cardClick.querySelector('.card__image').src; 
    cardTitle.textContent = cardClick.querySelector('.card__title').textContent; 
    cardImage.alt = 'Тут должно быть изображение ' + cardTitle.textContent;
    document.addEventListener('keydown', checkCloseEsc);
    openPopup(popupCardFullscreen);  
  }
}; 

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
