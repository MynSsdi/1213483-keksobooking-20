'use strict';

var ADS_AUTHOR_AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var ADS_OFFER_TITLE = ['Заголовк 1', 'Заголовк 2', 'Заголовк 3', 'Заголовк 4', 'Заголовк 5', 'Заголовк 6', 'Заголовк 7', 'Заголовк 8'];
var ADS_OFFER_ADDRESS = ['100, 130', '200, 200', '300', '270', '400, 340', '500, 410', '600, 500', '700, 600', '800, 630'];
var ADS_OFFER_PRICE = ['100', '200', '300', '400', '500', '600', '700', '800'];
var ADS_OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_OFFER_ROOMS = ['1', '2', '3'];
var ADS_OFFER_GUESTS = ['1', '2', '3'];
var ADS_OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var ADS_OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var ADS_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_OFFER_DESCRIPTION = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
var ADS_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_LOCATION_X = ['100px', '200px', '300px', '400px', '500px', '600px', '700px', '800px'];
var ADS_LOCATION_Y = ['130px', '200px', '270px', '340px', '410px', '500px', '600px', '630px'];

var COUNT_RENTER = 8;

var DataRenterList = [
  ADS_AUTHOR_AVATAR,
  ADS_OFFER_TITLE,
  ADS_OFFER_ADDRESS,
  ADS_OFFER_PRICE,
  ADS_OFFER_TYPE,
  ADS_OFFER_ROOMS,
  ADS_OFFER_GUESTS,
  ADS_OFFER_CHECKIN,
  ADS_OFFER_CHECKOUT,
  ADS_OFFER_FEATURES,
  ADS_OFFER_DESCRIPTION,
  ADS_OFFER_PHOTOS,
  ADS_LOCATION_X,
  ADS_LOCATION_Y
];

var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

document.querySelector('.map').classList.remove('.map--faded');

var getRandomElement = function (arrayElement) {
  var indexElement = Math.floor(Math.random() * Math.floor(arrayElement.length));
  return arrayElement[indexElement];
};

var getArrayDataRenterElement = function (arrayList) {
  var arrayDataRenter = {
    author: {
      avatar: getRandomElement(arrayList[0])
    },
    offer: {
      title: getRandomElement(arrayList[1]),
      address: getRandomElement(arrayList[2]),
      price: getRandomElement(arrayList[3]),
      type: getRandomElement(arrayList[4]),
      rooms: getRandomElement(arrayList[5]),
      guests: getRandomElement(arrayList[6]),
      checkin: getRandomElement(arrayList[7]),
      checkout: getRandomElement(arrayList[8]),
      features: getRandomElement(arrayList[9]),
      description: getRandomElement(arrayList[10]),
      photos: getRandomElement(arrayList[11])
    },
    location: {
      x: getRandomElement(arrayList[12]),
      y: getRandomElement(arrayList[13])
    }
  }
  return arrayDataRenter;
};

var getArrayDataRenterList = function (arrayRenters) {
  var arrayDataRenters = [];
  var arrayDataRenters = getArrayDataRenterElement(arrayRenters);
  return arrayDataRenters;
}

var createDOMRenterItem = function (arrayRenters) {
  var DOMRenterItem = adsPinTemplate.cloneNode(true);

  DOMRenterItem.style.left = arrayRenters.location.x;
  DOMRenterItem.style.top = arrayRenters.location.y;

  var DOMRenterItemImage = DOMRenterItem.querySelector('img');

  DOMRenterItemImage.src = arrayRenters.author.avatar;
  DOMRenterItemImage.alt = arrayRenters.offer.title;

  return DOMRenterItem;
};

var createDOMRenterList = function (DataRenterList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < COUNT_RENTER; i++) {
    fragment.appendChild(createDOMRenterItem(getArrayDataRenterList(DataRenterList)));
  }
  return fragment;
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(createDOMRenterList(DataRenterList));
