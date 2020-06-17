'use strict';
var MAX_PRICE = 1000000;
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

var DataRenterList = [
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

var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

document.querySelector('.map').classList.remove('.map--faded');

var getRandomElement = function (arrayElement) {
  var indexElement = Math.floor(Math.random() * Math.floor(arrayElement.length));
  return arrayElement[indexElement];
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

var getArrayDataRenterElement = function (arrayList) {
  var locationX = getRandomInt(100, 800);
  var locationY = getRandomInt(130, 630);
  var minPrice = 0;
  var typeHouse = getRandomElement(arrayList[4]);
  switch (typeHouse) {
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
  }
  var arrayDataRenter = {
    author: {
      avatar: getRandomElement(arrayList[0])
    },
    offer: {
      title: getRandomElement(arrayList[1]),
      address: [locationX + ', ' + locationY],
      price: getRandomInt(minPrice, MAX_PRICE),
      type: typeHouse,
      rooms: getRandomElement(arrayList[5]),
      guests: getRandomElement(arrayList[6]),
      checkin: getRandomElement(arrayList[7]),
      checkout: getRandomElement(arrayList[8]),
      features: getRandomElement(arrayList[9]),
      description: getRandomElement(arrayList[10]),
      photos: [getRandomElement(arrayList[11])]
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
  var DOMRenterItem = adsPinTemplate.cloneNode(true);

  DOMRenterItem.style.left = arrayRenters.location.x;
  DOMRenterItem.style.top = arrayRenters.location.y;

  var DOMRenterItemImage = DOMRenterItem.querySelector('img');

  DOMRenterItemImage.src = arrayRenters.author.avatar;
  DOMRenterItemImage.alt = arrayRenters.offer.title;

  return DOMRenterItem;
};

var createDOMRenterList = function (pDataRenterList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < COUNT_RENTERS; i++) {
    arrayDataRenterList[i] = getArrayDataRenterList(pDataRenterList);
    fragment.appendChild(createDOMRenterItem(arrayDataRenterList[i]));
  }
  return fragment;
};

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(createDOMRenterList(DataRenterList));


// module3-task3

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


/* Если один элемент

var feature = arrayDataRenterList[0].offer.features;
var popup__features = cardTemplateContent.querySelector('.popup__features');
  for (var k = 0; k < popup__features.children.length; k++) {
    var popup__featureClass = popup__features.children[k].classList.value;
    var popup__featureSlice = popup__featureClass.slice(31);
    if (popup__featureSlice !== feature) {
      var popup__feature = popup__features.children[k];
      popup__feature.parentNode.removeChild(popup__feature);
      k--;
    }
}*/

// Иммитация отображения массива преимуществ больше одного элемента

var renderFeature = function () {
  var feature = [];
  feature = ['wifi', 'washer', 'dishwasher'];
  var popupFeatures = cardTemplateContent.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();
  for (var l = 0; l < feature.length; l++) {
    for (var k = 0; k < popupFeatures.children.length; k++) {
      var popupFeaturesClass = popupFeatures.children[k].classList.value;
      var popupFeaturesSlice = popupFeaturesClass.slice(31);
      if (popupFeaturesSlice === feature[l]) {
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

renderFeature();

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
