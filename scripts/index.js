const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const popupCreateCard = document.querySelector('.popup_addcard');
const popupCardFullscreen = document.querySelector('.popup_fullscreen');

const popupProfileForm = document.querySelector('.popup__form_profile');
const popupCardForm = document.querySelector('.popup__form_addcard');


const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupCreateCardCloseButton = popupCreateCard.querySelector('.popup__close-button');
const popupCardFullscreenCloseButton = popupCardFullscreen.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupProfileInputName = document.querySelector('.popup__input_name');
const popupProfileInputProfession = document.querySelector('.popup__input_profession');

const popupCardInputTitle = document.querySelector('.popup__input_title');
const popupCardInputSrc = document.querySelector('.popup__input_src');

const elementsList = document.querySelector('.elements__list');

const closePopup = popup => {popup.classList.remove('popup_opened');}
const openPopup = popup => {popup.classList.add('popup_opened');}

const cardImage = document.querySelector('.popup__image-fullscreen');
const cardTitle = document.querySelector('.popup__title-fullscreen');

initialCards.forEach(function (card) {elementsList.append(createCard(card.name, card.link));});

function openPopupProfile () {

  popupProfileInputName.value = profileName.textContent;
  popupProfileInputProfession.value = profileProfession.textContent;
  hideInputError(popupProfileForm, popupProfileInputName);
  hideInputError(popupProfileForm, popupProfileInputProfession);
  openPopup(popupProfile);
}

function openPopupCreateCard() {
  popupCardForm.reset();
  hideInputError(popupCardForm, popupCardInputTitle);
  hideInputError(popupCardForm, popupCardInputSrc);
  openPopup(popupCreateCard);
}

function popupProfileSubmit (evt) {
    
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileProfession.textContent = popupProfileInputProfession.value;
  closePopup(popupProfile);
}  

function popupCreateCardSubmit (evt) {
    
  evt.preventDefault();
  elementsList.prepend(createCard(popupCardInputTitle.value, popupCardInputSrc.value));
  closePopup(popupCreateCard);
}  

function createCard(nameValue, srcValue) {

  const cardTemplate = document.querySelector('.elements__template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = srcValue;
  cardElement.querySelector('.card__title').textContent = nameValue;
  cardElement.querySelector('.card__image').alt = 'Здесь должно быть изображение ' + nameValue;
 
  return cardElement;
}

elementsList.addEventListener("click", function (event) {

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

    openPopup(popupCardFullscreen);  
  }
}); 

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCreateCard);

popupProfileForm.addEventListener('submit', popupProfileSubmit);
popupCardForm.addEventListener('submit', popupCreateCardSubmit);

function checkCloseClick(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {closePopup(popup);}; 
}

function checkCloseEsc(evt) {
  if (evt.key === 'Escape') {
    if (popupProfile.classList.contains('popup_opened')) {
      closePopup(popupProfile); 
      return;
    };
    if (popupCreateCard.classList.contains('popup_opened')) {
      closePopup(popupCreateCard); 
      return;
    };
    if (popupCardFullscreen.classList.contains('popup_opened')) {closePopup(popupCardFullscreen);};
  }
}

document.addEventListener('keydown', checkCloseEsc);

popupProfile.addEventListener("click", (evt) => checkCloseClick(evt, popupProfile));
popupCreateCard.addEventListener("click", (evt) => checkCloseClick(evt, popupCreateCard));
popupCardFullscreen.addEventListener("click", (evt) => checkCloseClick(evt, popupCardFullscreen));
