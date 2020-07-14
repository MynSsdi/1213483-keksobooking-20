'use strict';

(function () {
  var COORD_LEFT_PIN_MAIN;
  var COORD_TOP_PIN_MAIN;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var TOP_VERTICAL_LIMIT = 130;
  var BOTTOM_VERTICAL_LIMIT = 630;

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

  var mapPinMain = document.querySelector('.map__pin--main');

  COORD_LEFT_PIN_MAIN = mapPinMain.style.left;
  COORD_TOP_PIN_MAIN = mapPinMain.style.top;


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
        photos: [getRandomElement(ADS_OFFER_PHOTOS)]
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

  window.data = {
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    MAX_PRICE: MAX_PRICE,
    MIN_PRICE: MIN_PRICE,
    MIN_PRICE_FLAT: MIN_PRICE_FLAT,
    MIN_PRICE_HOUSE: MIN_PRICE_HOUSE,
    MIN_PRICE_PALACE: MIN_PRICE_PALACE,
    COUNT_RENTERS: COUNT_RENTERS,
    ADS_AUTHOR_AVATARS: ADS_AUTHOR_AVATARS,
    ADS_OFFER_TITLES: ADS_OFFER_TITLES,
    ADS_OFFER_ADDRESSES: ADS_OFFER_ADDRESSES,
    ADS_OFFER_PRICES: ADS_OFFER_PRICES,
    ADS_OFFER_TYPES: ADS_OFFER_TYPES,
    ADS_OFFER_ROOMS: ADS_OFFER_ROOMS,
    ADS_OFFER_GUESTS: ADS_OFFER_GUESTS,
    ADS_OFFER_CHECKIN: ADS_OFFER_CHECKIN,
    ADS_OFFER_CHECKOUT: ADS_OFFER_CHECKOUT,
    ADS_OFFER_FEATURES: ADS_OFFER_FEATURES,
    ADS_OFFER_DESCRIPTIONS: ADS_OFFER_DESCRIPTIONS,
    ADS_OFFER_PHOTOS: ADS_OFFER_PHOTOS,
    ADS_LOCATION_X: ADS_LOCATION_X,
    ADS_LOCATION_Y: ADS_LOCATION_Y,
    DATA_RENTER_LIST: DATA_RENTER_LIST,
    TOP_VERTICAL_LIMIT: TOP_VERTICAL_LIMIT,
    BOTTOM_VERTICAL_LIMIT: BOTTOM_VERTICAL_LIMIT,
    COORD_LEFT_PIN_MAIN: COORD_LEFT_PIN_MAIN,
    COORD_TOP_PIN_MAIN: COORD_TOP_PIN_MAIN,
    getArrayDataRenterList: getArrayDataRenterList
  };

})();
