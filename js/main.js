'use strict';

var arrayDataRenterList = [];

var activationPage = function () {

  var mapPins = document.querySelector('.map__pins');

  mapPins.appendChild(createDOMRenterList(window.util.DATA_RENTER_LIST));

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
      avatar: getRandomElement(window.util.ADS_AUTHOR_AVATARS)
    },
    offer: {
      title: getRandomElement(window.util.ADS_OFFER_TITLES),
      address: [locationX + ', ' + locationY],
      price: getRandomInt(window.util.MIN_PRICE, window.util.MAX_PRICE),
      type: getRandomElement(window.util.ADS_OFFER_TYPES),
      rooms: getRandomElement(window.util.ADS_OFFER_ROOMS),
      guests: getRandomElement(window.util.ADS_OFFER_GUESTS),
      checkin: getRandomElement(window.util.ADS_OFFER_CHECKIN),
      checkout: getRandomElement(window.util.ADS_OFFER_CHECKOUT),
      features: getRandomElement(window.util.ADS_OFFER_FEATURES),
      description: getRandomElement(window.util.ADS_OFFER_DESCRIPTIONS),
      photos: getRandomElement(window.util.ADS_OFFER_PHOTOS)
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


  for (var i = 0; i < window.util.COUNT_RENTERS; i++) {
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
