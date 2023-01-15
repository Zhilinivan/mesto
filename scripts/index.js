let profileEditButton = document.querySelector('.profile__name-group_edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name-group_name');
let profileProfession = document.querySelector('.profile__profession');
let formName = document.querySelector('.popup__input_data_name');
let formProfession = document.querySelector('.popup__input_data_profession');

function openClick() {
  
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

function closeClick() {
  
  popup.classList.remove('popup_opened');
}
  
function formSubmit (evt) {
    
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
    
  closeClick();
}

profileEditButton.addEventListener('click', openClick);
popupCloseButton.addEventListener('click', closeClick);
popup.addEventListener('submit', formSubmit);