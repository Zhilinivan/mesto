let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');

let popupProfileCloseButton = document.querySelector('.popup-profile__close-button');
let popupCardCloseButton = document.querySelector('.popup-addcard__close-button');
let popupCardFullscreenCloseButton = document.querySelector('.popup-cardfullscreen__close-button');

let popupProfile = document.querySelector('.popup-profile');
let popupCard = document.querySelector('.popup-addcard');
let popupCardFullscreen = document.querySelector('.popup-cardfullscreen');

let popupProfileForm = document.querySelector('.popup-profile__form');
let popupCardForm = document.querySelector('.popup-addcard__form');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

let popupProfileInputName = document.querySelector('.popup-profile__input_data_name');
let popupProfileInputProfession = document.querySelector('.popup-profile__input_data_profession');

let popupCardInputName = document.querySelector('.popup-addcard__input_name');
let popupCardInputSrc = document.querySelector('.popup-addcard__input_src');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

initialCards.forEach(function (card) {

  const cardTemplate = document.querySelector('.elements__template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const elementsList = document.querySelector('.elements__list')

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').alt = 'Загрузка не удаласть';

  elementsList.append(cardElement);
});

function openPopupProfile() {
  
  popupProfileInputName.value = '';
  popupProfileInputProfession.value = '';
  popupProfileInputName.placeholder = profileName.textContent;
  popupProfileInputProfession.placeholder = profileProfession.textContent;
  popupProfile.classList.add('popup-profile_opened');
}

function openPopupCard() {

  popupCardInputName.value = '';
  popupCardInputSrc.value = '';
  popupCardInputName.placeholder = 'Название';
  popupCardInputSrc.placeholder = 'Ссылка на картинку';
  popupCard.classList.add('popup-addcard_opened');
}

function closePopupProfile() {
  
  popupProfile.classList.remove('popup-profile_opened');
}

function closePopupCard() {
  
  popupCard.classList.remove('popup-addcard_opened');
}

function closePopupCardFullscreen() {

  popupCardFullscreen.classList.remove('popup-cardfullscreen_opened');
}
  
function popupProfileFormSubmit (evt) {
    
  evt.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileProfession.textContent = popupProfileInputProfession.value;
    
  closePopupProfile();
}

function popupCardFormSubmit (evt) {
    
  evt.preventDefault();
  
  const cardTemplate = document.querySelector('.elements__template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const elementsList = document.querySelector('.elements__list')

  cardElement.querySelector('.card__image').src = popupCardInputSrc.value;;
  cardElement.querySelector('.card__title').textContent = popupCardInputName.value;
  cardElement.querySelector('.card__image').alt = 'Загрузка не удаласть';
  elementsList.prepend(cardElement);

  closePopupCard();
}

let cardClick = document.querySelector('.elements__list');

cardClick.addEventListener("click", function (event) {

  const deleteButtonClick = event.target.closest('.card__delete-button');
  const likeButtonClick = event.target.closest('.card__like-button');
  const cardClick = event.target.closest('.card');

  if (deleteButtonClick) {
    const listItem = deleteButtonClick.closest('.card');
    listItem.remove();
  } else
  if (likeButtonClick) {
    event.target.classList.toggle('card__like-button_active');
  } else
  if (cardClick) {
    popupCardFullscreen.classList.add('popup-cardfullscreen_opened');
    const cardImage = document.querySelector('.popup-cardfullscreen__image');
    const cardTitle = document.querySelector('.popup-cardfullscreen__title');

    cardImage.src = cardClick.querySelector('.card__image').src;
    cardTitle.textContent = cardClick.querySelector('.card__title').textContent;
    cardImage.alt = 'Загрузка не удаласть';
  }
});
  
profileEditButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfileForm.addEventListener('submit', popupProfileFormSubmit);

profileAddButton.addEventListener('click', openPopupCard);
popupCardCloseButton.addEventListener('click', closePopupCard);
popupCardForm.addEventListener('submit', popupCardFormSubmit);

popupCardFullscreenCloseButton.addEventListener('click', closePopupCardFullscreen);