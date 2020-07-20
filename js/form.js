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

  var Title = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var main;
  var coordX;
  var coordY;
  var numberRooms;
  var messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  var adForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adFormTitle = adForm.querySelector('.ad-form__title');
  var adFormAddress = adForm.querySelector('.ad-form__address');
  var adFormType = adForm.querySelector('.ad-form__type');
  var adFormPrice = adForm.querySelector('.ad-form__price');
  var adFormImages = adForm.querySelector('.ad-form__images');
  var adFormAvatar = adForm.querySelector('.ad-form-header__avatar');

  var timeIn = adForm.querySelector('.ad-form__timeIn');
  var timeOut = adForm.querySelector('.ad-form__timeOut');

  var buttonReset = document.querySelector('.ad-form__reset');

  var messageError;
  var buttonCloseMessageError;

  var adFormPriceValue;

  var rooms = adForm.querySelector('.ad-form__rooms');
  var capacity = adForm.querySelector('.ad-form__capacity');

  var adFormPricePlaceholder = Price.FLAT;

  var adFormTypeChild = adFormType.querySelector('[value=flat]');
  adFormPrice.placeholder = adFormPricePlaceholder;

  var onChangeNumberRooms = function () {

    numberRooms = rooms.value;
    numberRooms = (numberRooms === DONT_GUESTS) ? '0' : rooms.value;
    capacity.value = numberRooms;

    Object.keys(capacity).forEach(function (item) {
      return capacity[item].value === numberRooms ? capacity[item].setAttribute('selected', '') : capacity[item].removeAttribute('selected', '');
    });

    Object.keys(capacity).forEach(function (item) {
      return capacity[item].value <= numberRooms && capacity[item].value > '0' || numberRooms === '0' && capacity[item].value === '0' ? capacity[item].removeAttribute('disabled', '') : capacity[item].setAttribute('disabled', '');
    });

  };

  var resetCapacityValue = function () {
    Object.keys(capacity).forEach(function (item) {
      capacity[item].removeAttribute('disabled', '');
      capacity[item].removeAttribute('selected', '');
    });
    capacity[2].setAttribute('selected', '');
  };

  var onTitleInvalid = function () {
    if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле!');
    } else {
      adFormTitle.setCustomValidity('Нужно ввести количество символов в диапазоне от ' + MIN_TITLE_LENGTH + ' до ' + MAX_TITLE_LENGTH + ' включительно');
    }
  };

  var onTitleInput = function () {
    var valueLength = adFormTitle.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      adFormTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + 'симв.');
    } else {
      adFormTitle.setCustomValidity('');
    }
  };

  var onTypeChange = function () {
    var adFormTypeValue = adFormType.value;
    switch (adFormTypeValue) {
      case Title.BUNGALO:
        adFormPricePlaceholder = Price.BUNGALO;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case Title.FLAT:
        adFormPricePlaceholder = Price.FLAT;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case Title.HOUSE:
        adFormPricePlaceholder = Price.HOUSE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case Title.PALACE:
        adFormPricePlaceholder = Price.PALACE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
    }
  };

  var onPriceInvalidKeydown = function () {
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

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var onImagesChange = function () {
    var adFormPhotoFileType = adFormImages.files[0].type;
    if (adFormPhotoFileType === 'image/png' || adFormPhotoFileType === 'image/jpeg') {
      adFormImages.setCustomValidity('Файл выбран');
    } else {
      adFormImages.setCustomValidity('Выберите, пожалуйста, файл с расширеним JPG или PNG');
    }
  };

  var onAvatarChange = function () {
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

  var onMessageSuccessClose = function (evt) {
    if (evt.keyCode === BUTTON_KEY_ESC || evt.button === BUTTON_MOUSE_LEFT) {
      messageSuccess.remove();
      document.removeEventListener('keydown', onMessageSuccessClose);
      document.removeEventListener('mousedown', onMessageSuccessClose);
    }
  };

  var onSuccessSendDataServer = function () {
    adForm.reset();
    mapFiltersForm.reset();

    adFormPrice.placeholder = Price.FLAT;

    resetCapacityValue();

    window.main.disableElementForm();

    main.appendChild(messageSuccess);

    document.addEventListener('keydown', onMessageSuccessClose);
    document.addEventListener('mousedown', onMessageSuccessClose);

  };

  var onErrorSendDataServer = function () {
    messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    buttonCloseMessageError = messageError.querySelector('.error__button');

    main.appendChild(messageError);

    document.addEventListener('keydown', closeMessageError);
    document.addEventListener('mousedown', closeMessageError);

    buttonCloseMessageError.addEventListener('keydown', closeMessageError);
    buttonCloseMessageError.addEventListener('mousedown', closeMessageError);

  };

  var closeMessageError = function (evt) {
    if (evt.keyCode === BUTTON_KEY_ESC || evt.button === BUTTON_MOUSE_LEFT || (evt.srcElement === buttonCloseMessageError && evt.keyCode === BUTTON_KEY_ENTER)) {
      messageError.remove();

      document.removeEventListener('keydown', closeMessageError);
      document.removeEventListener('mousedown', closeMessageError);

      buttonCloseMessageError.removeEventListener('keydown', closeMessageError);
      buttonCloseMessageError.removeEventListener('mousedown', closeMessageError);
    }
  };

  var onSubmitFormServer = function (evt) {
    main = document.querySelector('main');
    window.backend.save(new FormData(adForm), onSuccessSendDataServer, onErrorSendDataServer);
    evt.preventDefault();
  };

  var onFormReset = function () {
    adForm.reset();
    mapFiltersForm.reset();
    window.main.disableElementForm();
  };

  adFormTitle.addEventListener('invalid', onTitleInvalid);
  adFormTitle.addEventListener('input', onTitleInput);
  adFormType.addEventListener('change', onTypeChange);
  adFormPrice.addEventListener('keydown', onPriceInvalidKeydown);
  adFormPrice.addEventListener('invalid', onPriceInvalidKeydown);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  adFormImages.addEventListener('change', onImagesChange);
  adFormAvatar.addEventListener('change', onAvatarChange);
  adForm.addEventListener('submit', onSubmitFormServer);
  rooms.addEventListener('change', onChangeNumberRooms);
  buttonReset.addEventListener('click', onFormReset);

  window.form = {
    setAdFormAddress: setAdFormAddress,
    coordX: coordX,
    coordY: coordY,
    price: Price
  };

})();
