'use strict';

var adForm = document.querySelector('.ad-form');
var validateNumberRoomsGuestsForm = function () {
  var rooms = adForm.querySelector('.ad-form__rooms');
  var capacity = adForm.querySelector('.ad-form__capacity');

  rooms.addEventListener('change', function () {
    var numberRooms = rooms.value;

    numberRooms = (numberRooms === '100') ? '0' : rooms.value;

    for (var i = 0; i < capacity.length; i++) {
      if (capacity[i].value === numberRooms) {
        capacity[i].setAttribute('selected', '');
      } else {
        capacity[i].removeAttribute('selected', '');
      }
    }

    for (var j = 0; j < capacity.length; j++) {
      if (capacity[j].value <= numberRooms && capacity[j].value > '0' || (numberRooms === '0' && capacity[j].value === '0')) {
        capacity[j].removeAttribute('disabled', '');
      } else {
        capacity[j].setAttribute('disabled', '');
      }
    }
  });

  capacity.addEventListener('change', function () {
    var numberRooms = capacity.value;

    numberRooms = (numberRooms === '0') ? '100' : capacity.value;

    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].value === numberRooms) {
        rooms[i].setAttribute('selected', '');
      } else {
        rooms[i].removeAttribute('selected', '');
      }
    }

    for (var j = 0; j < rooms.length; j++) {
      if (parseInt(rooms[j].value, 10) <= numberRooms && numberRooms !== '100' || (numberRooms === '100' && rooms[j].value === '100')) {
        rooms[j].removeAttribute('disabled', '');
      } else {
        rooms[j].setAttribute('disabled', '');
      }
    }
  });
};

validateNumberRoomsGuestsForm();

/* var adForm = document.querySelector('.ad-form');
adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var adFormTitle = adForm.querySelector('.ad-form__title');
    console.log(adFormTitle);
    var lengthString = adFormTitle.value.length;
    console.log(lengthString);
    if (lengthString < 30) {
      adFormTitle.setCustomValidity('Нужно ввести минимум 30 символов!');
      console.log(lengthString);
    } else if (lengthString > 100) {
      adFormTitle.setCustomValidity('Строка не должна быть больше 100 символов!');
    } else {
      adFormTitle.setCustomValidity('');
    }
});*/

var adFormTitle = adForm.querySelector('.ad-form__title');


adFormTitle.addEventListener('invalid', function () {
  if (adFormTitle.validity.valueMissing) {
    adFormTitle.setCustomValidity('Обязательное поле!');
  } else {
    adFormTitle.setCustomValidity('');
  }
});

adFormTitle.addEventListener('input', function () {
  var valueLength = adFormTitle.value.length;
  if (valueLength < window.util.MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity('Ещё ' + (window.util.MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > window.util.MAX_TITLE_LENGTH) {
    adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - window.util.MAX_TITLE_LENGTH) + 'симв.');
  } else {
    adFormTitle.setCustomValidity('');
  }
});


var adFormType = adForm.querySelector('.ad-form__type');
var adFormPrice = adForm.querySelector('.ad-form__price');
var adFormPricePlaceholder = window.util.MIN_PRICE_FLAT;
var adFormTypeChild = adFormType.querySelector('[value=flat]');
adFormPrice.value = adFormPricePlaceholder;

adFormType.addEventListener('change', function () {
  var adFormTypeValue = adFormType.value;
  switch (adFormTypeValue) {
    case 'bungalo':
      adFormPricePlaceholder = window.util.MIN_PRICE;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
    case 'flat':
      adFormPricePlaceholder = window.util.MIN_PRICE_FLAT;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
    case 'house':
      adFormPricePlaceholder = window.util.MIN_PRICE_HOUSE;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
    case 'palace':
      adFormPricePlaceholder = window.util.MIN_PRICE_PALACE;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
  }
});

adFormPrice.addEventListener('change', function () {
  var adFormPriceValue = parseInt(adFormPrice.value, 10);
  if (adFormPriceValue < adFormPricePlaceholder) {
    adFormPrice.setCustomValidity('Минимальная цена для типа жилья: ' + adFormTypeChild.textContent + ' составляет ' + adFormPricePlaceholder);
  } else if (adFormPriceValue > window.util.MAX_PRICE) {
    adFormPrice.setCustomValidity('Максимальная цена жилья составляет 1 000 000');
  } else {
    adFormPrice.setCustomValidity('');
  }
});

var timeIn = adForm.querySelector('.ad-form__timeIn');
var timeOut = adForm.querySelector('.ad-form__timeOut');

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});

var adFormImages = adForm.querySelector('.ad-form__images');

adFormImages.addEventListener('change', function () {
  // var adFormPhoto = adForm.querySelector('.ad-form__photo');
  var adFormPhotoFileType = adFormImages.files[0].type;
  if (adFormPhotoFileType === 'image/png' || adFormPhotoFileType === 'image/jpeg') {
    adFormImages.setCustomValidity('Файл выбран');
  } else {
    adFormImages.setCustomValidity('Выберите, пожалуйста, файл с расширеним JPG или PNG');
  }
  /*  var img = new Image(70, 70);
    img.src = adFormImages.value;
    adFormPhoto.appendChild(img);*/
});

var adFormAvatar = adForm.querySelector('.ad-form-header__avatar');
adFormAvatar.addEventListener('change', function () {
  // var adFormPhoto = adForm.querySelector('.ad-form__photo');
  var adFormPhotoFileType = adFormAvatar.files[0].type;
  if (adFormPhotoFileType === 'image/png' || adFormPhotoFileType === 'image/jpeg') {
    adFormImages.setCustomValidity('Файл выбран');
  //  console.log('Файл выбран');
  } else {
    adFormImages.setCustomValidity('Выберите, пожалуйста, файл с расширеним JPG или PNG');
  //  console.log('Выберите файл с расширением JPG или PNG');
  }
  /*  var img = new Image(70, 70);
    img.src = adFormImages.value;
    adFormPhoto.appendChild(img);*/
});
