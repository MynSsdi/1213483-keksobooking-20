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

var ads = [
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  },
  {
    author: {
      avatar: ADS_AUTHOR_AVATAR,
    },
    offer: {
      title: ADS_OFFER_TITLE,
      address: ADS_OFFER_ADDRESS,
      price: ADS_OFFER_PRICE,
      type: ADS_OFFER_TYPE,
      rooms: ADS_OFFER_ROOMS,
      guests: ADS_OFFER_GUESTS,
      checkin: ADS_OFFER_CHECKIN,
      checkout: ADS_OFFER_CHECKOUT,
      features: ADS_OFFER_FEATURES,
      description: ADS_OFFER_DESCRIPTION,
      photos: ADS_OFFER_PHOTOS,
    },
    location: {
      x: ADS_LOCATION_X,
      y: ADS_LOCATION_Y
    }
  }
];

var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

document.querySelector('.map').classList.remove('.map--faded');

var getElement = function (adsАttribute) {
  var indexElement = Math.floor(Math.random() * Math.floor(adsАttribute.length));
  return adsАttribute[indexElement];
};

var createCardData = function (cardData) {
  cardData.author.avatar = getElement(ADS_AUTHOR_AVATAR);

  cardData.offer.title = getElement(ADS_OFFER_TITLE);
  cardData.offer.address = getElement(ADS_OFFER_ADDRESS);
  cardData.offer.price = getElement(ADS_OFFER_PRICE);
  cardData.offer.type = getElement(ADS_OFFER_TYPE);
  cardData.offer.rooms = getElement(ADS_OFFER_ROOMS);
  cardData.offer.guests = getElement(ADS_OFFER_GUESTS);
  cardData.offer.checkin = getElement(ADS_OFFER_CHECKIN);
  cardData.offer.checkout = getElement(ADS_OFFER_CHECKOUT);
  cardData.offer.features = getElement(ADS_OFFER_FEATURES);
  cardData.offer.description = getElement(ADS_OFFER_DESCRIPTION);
  cardData.offer.protos = getElement(ADS_OFFER_PHOTOS);

  cardData.location.x = getElement(ADS_LOCATION_X);
  cardData.location.y = getElement(ADS_LOCATION_Y);
};

var createAdsPin = function (adsData) {
  createCardData(adsData);

  var adsPin = adsPinTemplate.cloneNode(true);

  adsPin.style.left = adsData.location.x;
  adsPin.style.top = adsData.location.y;
  var imagePin = adsPin.querySelector('img');

  imagePin.src = adsData.author.avatar;
  imagePin.alt = adsData.offer.title;
  return adsPin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(createAdsPin(ads[i]));
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
