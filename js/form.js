'use strict';

(function () {
  var main;

  var coordX;
  var coordY;

  var adForm = document.querySelector('.ad-form');
  //  var mapFiltersForm = document.querySelector('.map__filters');
  //  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  //  var selectMapFiltersForm = mapFiltersForm.querySelectorAll('select');
  var adFormAddress = adForm.querySelector('.ad-form__address');
  var rooms = adForm.querySelector('.ad-form__rooms');
  var capacity = adForm.querySelector('.ad-form__capacity');

  var validateNumberRoomsGuestsForm = function () {

    var numberRooms;

    var changeNumberRooms = function () {

      numberRooms = rooms.value;

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
    };

    var changeNumberCapacity = function () {
      numberRooms = capacity.value;

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
    };

    //  changeNumberRooms();
    rooms.addEventListener('change', changeNumberRooms);
    capacity.addEventListener('change', changeNumberCapacity);
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
    if (valueLength < window.data.MIN_TITLE_LENGTH) {
      adFormTitle.setCustomValidity('Ещё ' + (window.data.MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.data.MAX_TITLE_LENGTH) {
      adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - window.data.MAX_TITLE_LENGTH) + 'симв.');
    } else {
      adFormTitle.setCustomValidity('');
    }
  });

  var adFormType = adForm.querySelector('.ad-form__type');
  var adFormPrice = adForm.querySelector('.ad-form__price');
  var adFormPricePlaceholder = window.data.MIN_PRICE_FLAT;
  var adFormTypeChild = adFormType.querySelector('[value=flat]');
  adFormPrice.placeholder = adFormPricePlaceholder;
  var adFormPriceValue;

  adFormType.addEventListener('change', function () {
    var adFormTypeValue = adFormType.value;
    switch (adFormTypeValue) {
      case 'bungalo':
        adFormPricePlaceholder = window.data.MIN_PRICE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case 'flat':
        adFormPricePlaceholder = window.data.MIN_PRICE_FLAT;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case 'house':
        adFormPricePlaceholder = window.data.MIN_PRICE_HOUSE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
      case 'palace':
        adFormPricePlaceholder = window.data.MIN_PRICE_PALACE;
        adFormPrice.placeholder = adFormPricePlaceholder;
        adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
        break;
    }
  });

  var validatePriceOfType = function () {
    adFormPriceValue = parseInt(adFormPrice.value, 10);

    if (adFormPriceValue < adFormPricePlaceholder) {
      adFormPrice.setCustomValidity('Минимальная цена для типа жилья: ' + adFormTypeChild.textContent + ' составляет ' + adFormPricePlaceholder);
    } else if (adFormPriceValue > window.data.MAX_PRICE) {
      adFormPrice.setCustomValidity('Максимальная цена жилья составляет 1 000 000');
    } else if (isNaN(adFormPriceValue)) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  };

  adFormPrice.addEventListener('keydown', validatePriceOfType);

  adFormPrice.addEventListener('invalid', validatePriceOfType);

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

  var onAddressClick = function (evt) {
    if (evt.keyCode === 13 || evt.button === 0) {
      adFormAddress.setCustomValidity('Значение этого поля соответствует расположению маркера. Ручной ввод координат запрещён');
    }
  };

  adFormAddress.addEventListener('mousedown', onAddressClick);
  adFormAddress.addEventListener('keydown', onAddressClick);

  var setAdFormAddress = function () {
    var mapMainPinAddress = document.querySelector('.map__pin--main');

    var mapMainPinRect = mapMainPinAddress.getBoundingClientRect();
    var mapMainPinTailHeight = parseInt(window.getComputedStyle(mapMainPinAddress, ':after').getPropertyValue('height'), 10);

    window.form.coordX = Math.round(mapMainPinRect.left + mapMainPinRect.width / 2 + window.scrollX);
    window.form.coordY = Math.round(mapMainPinRect.top + mapMainPinRect.height + mapMainPinTailHeight + window.scrollY);

    adFormAddress.value = window.form.coordX + ', ' + window.form.coordY;
  };

  var onSuccessSendDataServer = function () {
    adForm.reset();

    window.main.disableElementForm();

    var messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    main.appendChild(messageSuccess);
    var closeMessageSuccess = function (evt) {
      if (evt.keyCode === 27 || evt.button === 0) {
        messageSuccess.remove();
        document.removeEventListener('keydown', closeMessageSuccess);
        document.removeEventListener('mousedown', closeMessageSuccess);
      }
    };
    document.addEventListener('keydown', closeMessageSuccess);
    document.addEventListener('mousedown', closeMessageSuccess);
  };

  var onErrorSendDataServer = function (evt) {
    var messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var buttonCloseMessageError = messageError.querySelector('.error__button');

    main.appendChild(messageError);

    var closeMessageError = function () {
      if (evt.keyCode === 27 || evt.button === 0 || (evt.srcElement === buttonCloseMessageError && evt.keyCode === 13)) {
        messageError.remove();

        document.removeEventListener('keydown', closeMessageError);
        document.removeEventListener('mousedown', closeMessageError);

        buttonCloseMessageError.removeEventListener('keydown', closeMessageError);
        buttonCloseMessageError.removeEventListener('mousedown', closeMessageError);
      }
    };

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

  adForm.addEventListener('submit', onSubmitFormServer);

  var resetForm = function () {
    adForm.reset();

    window.main.disableElementForm();
  };

  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', resetForm);

  window.form = {
    setAdFormAddress: setAdFormAddress,
    coordX: coordX,
    coordY: coordY
  };

})();
