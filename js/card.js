'use strict';

(function () {

  var BUTTON_MOUSE_LEFT = 0;
  var BUTTON_KEY_ESC = 27;

  var isCreateRenderCard = true;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardMapPin;
  var popupClose;

  var getArrayDataRenterList = function () {
    return window.main.setArrayDataRenterList();
  };

  var mapPins = document.querySelector('.map__pins');

  var renderDOMPhotos = function (domPhotos, photos) {
    var photo = domPhotos.querySelector('.popup__photo');
    photo.src = photos[0];
    domPhotos.appendChild(photo);
    photos.forEach(function (item) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = item;
      domPhotos.appendChild(newPhoto);
    });
  };

  var clearChildren = function (parent) {
    parent.innerHTML = '';
  };

  var renderDOMFeatures = function (domUl, features) {
    clearChildren(domUl);
    features.forEach(function (item) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      var classString = 'popup__feature--' + item;
      li.classList.add(classString);
      domUl.appendChild(li);
    });
  };

  var closePopupCard = function (evt) {
    evt.preventDefault();

    if (evt.button === BUTTON_MOUSE_LEFT || evt.keyCode === BUTTON_KEY_ESC) {
      cardMapPin.remove();
      document.removeEventListener('keydown', closePopupCard);
    }
  };

  var createRenderCard = function (arrayDataRenterList) {
    var cardTemplateContent = cardTemplate.cloneNode(true);
    cardTemplateContent.querySelector('.popup__title').textContent = arrayDataRenterList.offer.title;
    cardTemplateContent.querySelector('.popup__text--address').textContent = arrayDataRenterList.offer.address;
    cardTemplateContent.querySelector('.popup__text--price').textContent = arrayDataRenterList.offer.price + 'P/ночь';
    cardTemplateContent.querySelector('.popup__type').textContent = arrayDataRenterList.offer.type;
    cardTemplateContent.querySelector('.popup__text--capacity').textContent = arrayDataRenterList.offer.rooms + ' комнаты(а) для ' + arrayDataRenterList.offer.guests + ' гостей(я)';
    cardTemplateContent.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayDataRenterList.offer.checkin + ' ,выезд до ' + arrayDataRenterList.offer.checkout;
    cardTemplateContent.querySelector('.popup__description').textContent = arrayDataRenterList.offer.description;
    cardTemplateContent.querySelector('.popup__avatar').src = arrayDataRenterList.author.avatar;
    renderDOMFeatures(cardTemplateContent.querySelector('.popup__features'), arrayDataRenterList.offer.features);
    renderDOMPhotos(cardTemplateContent.querySelector('.popup__photos'), arrayDataRenterList.offer.photos);
    mapPins.after(cardTemplateContent);

    cardMapPin = document.querySelector('.map__card');
    popupClose = cardMapPin.querySelector('.popup__close');
    cardMapPin.focus();

    popupClose.addEventListener('mousedown', closePopupCard);
    document.addEventListener('keydown', closePopupCard);
    return isCreateRenderCard;
  };

  window.card = {
    createRenderCard: createRenderCard,
    getArrayDataRenterList: getArrayDataRenterList
  };

})();
