//Начни с приведения файла к единой структуре
// сначала все константы
// потом все переменные
// потом все функции описываются
// уже потом идут вызовы
'use strict';

(function () {

  var DONT_GUESTS = '100';

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var BUTTON_MOUSE_LEFT = 0;
  var BUTTON_KEY_ESC = 27;
  var BUTTON_KEY_ENTER = 13;

  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
    MAX: 1000000
  };

  var main;
  var coordX;
  var coordY;
  var numberRooms;
  var messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  var adForm = document.querySelector('.ad-form');
  var adFormTitle = adForm.querySelector('.ad-form__title');
  var adFormAddress = adForm.querySelector('.ad-form__address');
  var adFormType = adForm.querySelector('.ad-form__type');
  var adFormPrice = adForm.querySelector('.ad-form__price');
  var adFormImages = adForm.querySelector('.ad-form__images');
  var adFormAvatar = adForm.querySelector('.ad-form-header__avatar');

  var timeIn = adForm.querySelector('.ad-form__timeIn');
  var timeOut = adForm.querySelector('.ad-form__timeOut');

  var buttonReset = document.querySelector('.ad-form__reset');

  var adFormPriceValue;

  var rooms = adForm.querySelector('.ad-form__rooms');
  var capacity = adForm.querySelector('.ad-form__capacity');

  var adFormPricePlaceholder = Price.FLAT;
  var adFormTypeChild = adFormType.querySelector('[value=flat]');
  adFormPrice.placeholder = adFormPricePlaceholder;

  var changeNumberRooms = function () {

    numberRooms = rooms.value;
    numberRooms = (numberRooms === DONT_GUESTS) ? '0' : rooms.value;
    capacity.value = numberRooms;

    //здесь переписать через forEach - пример в модуле card
    // if-else можно заменить на тернарный оператор:
    // capacity.forEach(function(item, i) {
    //   item.value === numberRooms ? item.setAttribute('selected', '') : item.removeAttribute('selected', '')
    // })
    //также поступи со всеми штуками в этой функции - их два для комнат и два для гостей
    //вторым этапом вынеси все эти мелкие кусочки в отдельную функцию
    //не забудь, что 100 - это константа!

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
  };

  var listenTitleInvalid = function () {
    if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле!');
    } else {
      adFormTitle.setCustomValidity('');
    }
  };

  var listenTitleInput = function () {
    var valueLength = adFormTitle.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      adFormTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + 'симв.');
    } else {
      adFormTitle.setCustomValidity('');
    }
  };

  var listenTypeChange = function () {
    var adFormTypeValue = adFormType.value;
    switch (adFormTypeValue) {
      case 'bungalo':
        adFormPricePlaceholder = Price.BUNGALO;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case 'flat':
        adFormPricePlaceholder = Price.FLAT;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case 'house':
        adFormPricePlaceholder = Price.HOUSE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case 'palace':
        adFormPricePlaceholder = Price.PALACE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
    }
  }

  var listenPriceInvalidKeydown = function () {
    adFormPriceValue = parseInt(adFormPrice.value, 10);

    if (adFormPriceValue < adFormPricePlaceholder) {
      adFormPrice.setCustomValidity('Минимальная цена для типа жилья: ' + adFormTypeChild.textContent + ' составляет ' + adFormPricePlaceholder);
    } else if (adFormPriceValue > Price.MAX) {
      adFormPrice.setCustomValidity('Максимальная цена жилья составляет 1 000 000');
    } else if (isNaN(adFormPriceValue)) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  };

  var listenTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var listenTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var listenImagesChange = function () {
    var adFormPhotoFileType = adFormImages.files[0].type;
    if (adFormPhotoFileType === 'image/png' || adFormPhotoFileType === 'image/jpeg') {
      adFormImages.setCustomValidity('Файл выбран');
    } else {
      adFormImages.setCustomValidity('Выберите, пожалуйста, файл с расширеним JPG или PNG');
    }
  };

  var listenAvatarChange = function () {
    var adFormPhotoFileType = adFormAvatar.files[0].type;
    if (adFormPhotoFileType === 'image/png' || adFormPhotoFileType === 'image/jpeg') {
      adFormImages.setCustomValidity('Файл выбран');
    } else {
      adFormImages.setCustomValidity('Выберите, пожалуйста, файл с расширеним JPG или PNG');
    }
  };

  var setAdFormAddress = function () {
    var mapMainPinAddress = document.querySelector('.map__pin--main');

    var mapMainPinRect = mapMainPinAddress.getBoundingClientRect();
    var mapMainPinTailHeight = parseInt(window.getComputedStyle(mapMainPinAddress, ':after').getPropertyValue('height'), 10);

    window.form.coordX = Math.round(mapMainPinRect.left + mapMainPinRect.width / 2 + window.scrollX);
    window.form.coordY = Math.round(mapMainPinRect.top + mapMainPinRect.height + mapMainPinTailHeight + window.scrollY);

    adFormAddress.value = window.form.coordX + ', ' + window.form.coordY;
  };

  var closeMessageSuccess = function (evt) {
    if (evt.keyCode === BUTTON_KEY_ESC || evt.button === BUTTON_MOUSE_LEFT) {
      messageSuccess.remove();
      document.removeEventListener('keydown', closeMessageSuccess);
      document.removeEventListener('mousedown', closeMessageSuccess);
    }
  };

  var closeMessageError = function () {
    if (evt.keyCode === BUTTON_KEY_ESC || evt.button === BUTTON_MOUSE_LEFT || (evt.srcElement === buttonCloseMessageError && evt.keyCode === BUTTON_KEY_ENTER)) {
      messageError.remove();

      document.removeEventListener('keydown', closeMessageError);
      document.removeEventListener('mousedown', closeMessageError);

      buttonCloseMessageError.removeEventListener('keydown', closeMessageError);
      buttonCloseMessageError.removeEventListener('mousedown', closeMessageError);
    }
  };

  var onSuccessSendDataServer = function () {
    adForm.reset();

    window.main.disableElementForm();

    main.appendChild(messageSuccess);

    document.addEventListener('keydown', closeMessageSuccess);
    document.addEventListener('mousedown', closeMessageSuccess);


  };

  var onErrorSendDataServer = function (evt) {
    var messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var buttonCloseMessageError = messageError.querySelector('.error__button');

    main.appendChild(messageError);

    document.addEventListener('keydown', closeMessageError);
    document.addEventListener('mousedown', closeMessageError);

    buttonCloseMessageError.addEventListener('keydown', closeMessageError);
    buttonCloseMessageError.addEventListener('mousedown', closeMessageError);

  };

  var onSubmitFormServer = function (evt) {
    main = document.querySelector('main');
    window.backend.save(new FormData(adForm), onSuccessSendDataServer, onErrorSendDataServer);
    evt.preventDefault();
  };

  var resetForm = function () {
    adForm.reset();
    window.main.disableElementForm();
  };

  adFormTitle.addEventListener('invalid', listenTitleInvalid);
  adFormTitle.addEventListener('input', listenTitleInput);
  adFormType.addEventListener('change', listenTypeChange);
  adFormPrice.addEventListener('keydown', listenPriceInvalidKeydown);
  adFormPrice.addEventListener('invalid', listenPriceInvalidKeydown);
  timeIn.addEventListener('change', listenTimeInChange);
  timeOut.addEventListener('change', listenTimeOutChange);
  adFormImages.addEventListener('change', listenImagesChange);
  adFormAvatar.addEventListener('change', listenAvatarChange);
  adForm.addEventListener('submit', onSubmitFormServer);
  rooms.addEventListener('change', changeNumberRooms);
  buttonReset.addEventListener('click', resetForm);

  window.form = {
    setAdFormAddress: setAdFormAddress,
    coordX: coordX,
    coordY: coordY
  };

})();
