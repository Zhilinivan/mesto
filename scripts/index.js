let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.popup__input_data_name');
let inputProfession = document.querySelector('.popup__input_data_profession');

function openPopup() {
  
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  
  popup.classList.remove('popup_opened');
}
  
function formSubmit (evt) {
    
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
    
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmit);