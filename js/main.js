'use strict';

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var MAX_PRICE = 1000000;
var MIN_PRICE = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;


var COUNT_RENTERS = 8;

var ADS_AUTHOR_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var ADS_OFFER_TITLES = ['Заголовк 1', 'Заголовк 2', 'Заголовк 3', 'Заголовк 4', 'Заголовк 5', 'Заголовк 6', 'Заголовк 7', 'Заголовк 8'];
var ADS_OFFER_ADDRESSES;
var ADS_OFFER_PRICES = [];
var ADS_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_OFFER_ROOMS = ['1', '2', '3', '100'];
var ADS_OFFER_GUESTS = ['1', '2', '3', 'не для гостей'];
var ADS_OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var ADS_OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var ADS_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_OFFER_DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
var ADS_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_LOCATION_X;
var ADS_LOCATION_Y;

var DATA_RENTER_LIST = [
  ADS_AUTHOR_AVATARS,
  ADS_OFFER_TITLES,
  ADS_OFFER_ADDRESSES,
  ADS_OFFER_PRICES,
  ADS_OFFER_TYPES,
  ADS_OFFER_ROOMS,
  ADS_OFFER_GUESTS,
  ADS_OFFER_CHECKIN,
  ADS_OFFER_CHECKOUT,
  ADS_OFFER_FEATURES,
  ADS_OFFER_DESCRIPTIONS,
  ADS_OFFER_PHOTOS,
  ADS_LOCATION_X,
  ADS_LOCATION_Y
];

var arrayDataRenterList = [];

var activationPage = function () {

  var mapPins = document.querySelector('.map__pins');

  mapPins.appendChild(createDOMRenterList(DATA_RENTER_LIST));

  return arrayDataRenterList;
};


var getRandomElement = function (arrayElement) {
  var indexElement = Math.floor(Math.random() * Math.floor(arrayElement.length));
  return arrayElement[indexElement];
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

var getArrayDataRenterElement = function () {
  var locationX = getRandomInt(100, 800);
  var locationY = getRandomInt(130, 630);
  var arrayDataRenter = {
    author: {
      avatar: getRandomElement(ADS_AUTHOR_AVATARS)
    },
    offer: {
      title: getRandomElement(ADS_OFFER_TITLES),
      address: [locationX + ', ' + locationY],
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(ADS_OFFER_TYPES),
      rooms: getRandomElement(ADS_OFFER_ROOMS),
      guests: getRandomElement(ADS_OFFER_GUESTS),
      checkin: getRandomElement(ADS_OFFER_CHECKIN),
      checkout: getRandomElement(ADS_OFFER_CHECKOUT),
      features: getRandomElement(ADS_OFFER_FEATURES),
      description: getRandomElement(ADS_OFFER_DESCRIPTIONS),
      photos: getRandomElement(ADS_OFFER_PHOTOS)
    },
    location: {
      x: locationX + 'px',
      y: locationY + 'px'
    }
  };
  return arrayDataRenter;
};

var getArrayDataRenterList = function (arrayRenters) {
  return getArrayDataRenterElement(arrayRenters);
};

var createDOMRenterItem = function (arrayRenters) {
  var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createDOMRenterItemClone = adsPinTemplate.cloneNode(true);

  createDOMRenterItemClone.style.left = arrayRenters.location.x;
  createDOMRenterItemClone.style.top = arrayRenters.location.y;

  var createDOMRenterItemCloneImage = createDOMRenterItemClone.querySelector('img');

  createDOMRenterItemCloneImage.src = arrayRenters.author.avatar;
  createDOMRenterItemCloneImage.alt = arrayRenters.offer.title;

  return createDOMRenterItemClone;
};

var createDOMRenterList = function (pDataRenterList) {
  var fragment = document.createDocumentFragment();


  for (var i = 0; i < COUNT_RENTERS; i++) {
    arrayDataRenterList[i] = getArrayDataRenterList(pDataRenterList);
    fragment.appendChild(createDOMRenterItem(arrayDataRenterList[i]));
  }
  return fragment;
};


// module3-task3
/* var createRenderCard = function (arrayDataRenterList) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardTemplateContent = cardTemplate.cloneNode(true);
  cardTemplateContent.querySelector('.popup__title').textContent = arrayDataRenterList[0].offer.title;
  cardTemplateContent.querySelector('.popup__text--address').textContent = arrayDataRenterList[0].offer.address;
  cardTemplateContent.querySelector('.popup__text--price').textContent = arrayDataRenterList[0].offer.price + 'P/ночь';
  cardTemplateContent.querySelector('.popup__type').textContent = arrayDataRenterList[0].offer.type;
  cardTemplateContent.querySelector('.popup__text--capacity').textContent = arrayDataRenterList[0].offer.rooms + ' комнаты(а) для ' + arrayDataRenterList[0].offer.guests + ' гостей(я)';
  cardTemplateContent.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayDataRenterList[0].offer.checkin + ' ,выезд до ' + arrayDataRenterList[0].offer.checkout;
  cardTemplateContent.querySelector('.popup__description').textContent = arrayDataRenterList[0].offer.description;
  cardTemplateContent.querySelector('.popup__avatar').src = arrayDataRenterList[0].author.avatar;

  var renderFeatures = function () {
    var features = [];
    features = ['wifi', 'washer', 'dishwasher'];
    var popupFeatures = cardTemplateContent.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();
    for (var l = 0; l < features.length; l++) {
      for (var k = 0; k < popupFeatures.children.length; k++) {
        var popupFeaturesClass = popupFeatures.children[k].classList.value;
        var popupFeaturesSlice = popupFeaturesClass.slice(31);
        if (popupFeaturesSlice === features[l]) {
          var popupFeature = popupFeatures.children[k];
          fragment.appendChild(popupFeature);
        }
      }
    }
    popupFeature = popupFeatures.querySelectorAll('.popup__feature');
    for (var m = 0; m < popupFeature.length; m++) {
      popupFeature[m].remove(popupFeature[m]);
    }
    popupFeatures.append(fragment);
  };

  renderFeatures();

  var renderPhotos = function (pArrayDataRenterList) {
    var popupPhotos = cardTemplateContent.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    for (var j = 0; j < pArrayDataRenterList.offer.photos.length; j++) {
      popupPhoto.src = pArrayDataRenterList.offer.photos[j];
      popupPhotos.append(popupPhoto);
      popupPhoto = cardTemplateContent.querySelector('.popup__photo').cloneNode(true);
    }
  };

  renderPhotos(arrayDataRenterList[0]);

  mapPins.after(cardTemplateContent);
};*/

// module4-task2
var adForm = document.querySelector('.ad-form');
var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
var addressAdForm = adForm.querySelector('.ad-form__address');

var mapFiltersForm = document.querySelector('.map__filters');
mapFiltersForm.classList.add('ad-form--disabled');
var selectMapFiltersForm = mapFiltersForm.querySelectorAll('select');

var preActivationForm = function () {
  fieldsetsAdForm.forEach(function (fieldset) {
    fieldset.setAttribute('disabled', '');
  });

  selectMapFiltersForm.forEach(function (select) {
    select.setAttribute('disabled', '');
  });

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMapSvg = mapPinMain.querySelector('.map__pin-svg');
  var centerX = mapPinMapSvg.getAttribute('width') / 2;
  var centerY = mapPinMapSvg.getAttribute('height') / 2;
  addressAdForm.value = centerX + ', ' + centerY;

  var setAddressMapPin = function () {
    var localPinMap = activationPage();

    var left = parseInt(localPinMap[0].location.x, 10);
    var top = parseInt(localPinMap[0].location.y, 10);
    addressAdForm.value = Math.round(left + left / 2) + ', ' + Math.round(top + 70);
  };

  var enabledElementForm = function (evt) {
    if (evt.button === 0 || evt.keyCode === 13) {

      document.querySelector('.map').classList.remove('.map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFiltersForm.classList.remove('ad-form--disabled');

      fieldsetsAdForm.forEach(function (fieldset) {
        fieldset.removeAttribute('disabled');
      });

      selectMapFiltersForm.forEach(function (select) {
        select.removeAttribute('disabled');
      });
      setAddressMapPin();
    }
  };

  mapPinMain.addEventListener('mousedown', enabledElementForm);

  mapPinMain.addEventListener('keydown', enabledElementForm);
};

preActivationForm();


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
  if (valueLength < MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + 'симв.');
  } else {
    adFormTitle.setCustomValidity('');
  }
});


var adFormType = adForm.querySelector('.ad-form__type');
var adFormPrice = adForm.querySelector('.ad-form__price');
var adFormPricePlaceholder = MIN_PRICE_FLAT;
var adFormTypeChild = adFormType.querySelector('[value=flat]');
adFormPrice.value = adFormPricePlaceholder;

adFormType.addEventListener('change', function () {
  var adFormTypeValue = adFormType.value;
  switch (adFormTypeValue) {
    case 'bungalo':
      adFormPricePlaceholder = MIN_PRICE;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
    case 'flat':
      adFormPricePlaceholder = MIN_PRICE_FLAT;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
    case 'house':
      adFormPricePlaceholder = MIN_PRICE_HOUSE;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
    case 'palace':
      adFormPricePlaceholder = MIN_PRICE_PALACE;
      adFormPrice.value = adFormPricePlaceholder;
      adFormTypeChild = adFormType.querySelector('[value=' + adFormTypeValue + ']');
      break;
  }
});

adFormPrice.addEventListener('change', function () {
  var adFormPriceValue = parseInt(adFormPrice.value, 10);
  if (adFormPriceValue < adFormPricePlaceholder) {
    adFormPrice.setCustomValidity('Минимальная цена для типа жилья: ' + adFormTypeChild.textContent + ' составляет ' + adFormPricePlaceholder);
  } else if (adFormPriceValue > MAX_PRICE) {
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
