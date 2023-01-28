const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');



const popupSubmitButtonProfile = document.querySelector('.popup__form_profile');
const popupSubmitButtonCard = document.querySelector('.popup__form_addcard');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupInputName = document.querySelector('.popup__input_data_name');
const popupInputProfession = document.querySelector('.popup__input_data_profession');

const popupCardInputName = document.querySelector('.popup__input_name');
const popupCardInputSrc = document.querySelector('.popup__input_src');

const elementsList = document.querySelector('.elements__list');

let popup;
let popupCloseButton;

let cardImage = document.querySelector('.popup__image-fullscreen');
let cardTitle = document.querySelector('.popup__title-fullscreen');

initialCards.forEach(function (card) {elementsList.append(createCard(card.name, card.link));});

function openPopup(popupType) {
  
  popup = document.querySelector(popupType);
  popupCloseButton = popup.querySelector('.popup__close-button');

  if (popup.classList.contains("popup__profile")) {
    
    document.querySelector('.popup__form_profile').reset();
  }

  if (popup.classList.contains("popup__addcard")) {
    document.querySelector('.popup__form_addcard').reset();
  }
  
  popup.classList.add('popup_opened');

  popupSubmitButtonProfile.addEventListener('submit', popupSubmit);
  popupSubmitButtonCard.addEventListener('submit', popupSubmit);
  popupCloseButton.addEventListener('click', closePopup);
}

function closePopup() {popup.classList.remove('popup_opened');}

function popupSubmit (evt) {
    
  evt.preventDefault();

  if (popup.classList.contains("popup__profile")) {
    
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProfession.value;
  }

  if (popup.classList.contains("popup__addcard")) {elementsList.prepend(createCard(popupCardInputName.value, popupCardInputSrc.value));}

  closePopup();
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

    openPopup('.popup__fullscreen');  
  }
}); 

profileEditButton.addEventListener('click', function () { openPopup('.popup__profile'); });
profileAddButton.addEventListener('click', function () { openPopup('.popup__addcard'); });