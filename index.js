let popupOpen = document.querySelector('.profile__edit-buttom');
let popupClose = document.querySelector('.popup__close');
let formSave = document.querySelector('.popup');

let startName = document.querySelector('.profile__name');
let yName = document.querySelector('.popup__input-name');

let startProf = document.querySelector('.profile__profession');
let yProf = document.querySelector('.popup__input-profession');

yName.setAttribute('value', startName.textContent);
yProf.setAttribute('value', startProf.textContent);

function OpenClick() {
    let cl = document.querySelector('.popup');
    cl.classList.add('popup_opened');
  }

  function CloseClick() {
    let cl = document.querySelector('.popup');
    cl.classList.remove('popup_opened');
  }
  
  function FormSubmit (evt) {
    evt.preventDefault();
    let nm = document.querySelector('.popup__input-name');
    let pr = document.querySelector('.popup__input-profession');

    startName.textContent = nm.value;
    startProf.textContent = pr.value;

    CloseClick();
}
  
  popupOpen.addEventListener('click', OpenClick);
  popupClose.addEventListener('click', CloseClick);
  formSave.addEventListener('submit', FormSubmit);