'use strict';

(function () {

  var isCreateRenderCard = true;

  var getArrayDataRenterList = function () {
    return window.main.setArrayDataRenterList();
  };

  var mapPins = document.querySelector('.map__pins');
  var createRenderCard = function (arrayDataRenterList) {

    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardTemplateContent = cardTemplate.cloneNode(true);
    cardTemplateContent.querySelector('.popup__title').textContent = arrayDataRenterList.offer.title;
    cardTemplateContent.querySelector('.popup__text--address').textContent = arrayDataRenterList.offer.address;
    cardTemplateContent.querySelector('.popup__text--price').textContent = arrayDataRenterList.offer.price + 'P/ночь';
    cardTemplateContent.querySelector('.popup__type').textContent = arrayDataRenterList.offer.type;
    cardTemplateContent.querySelector('.popup__text--capacity').textContent = arrayDataRenterList.offer.rooms + ' комнаты(а) для ' + arrayDataRenterList.offer.guests + ' гостей(я)';
    cardTemplateContent.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayDataRenterList.offer.checkin + ' ,выезд до ' + arrayDataRenterList.offer.checkout;
    cardTemplateContent.querySelector('.popup__description').textContent = arrayDataRenterList.offer.description;
    cardTemplateContent.querySelector('.popup__avatar').src = arrayDataRenterList.author.avatar;

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

    renderPhotos(arrayDataRenterList);

    mapPins.after(cardTemplateContent);

    var cardMapPin = document.querySelector('.map__card');
    var popupClose = cardMapPin.querySelector('.popup__close');
    cardMapPin.focus();

    var closePopupCard = function (evt) {
      evt.preventDefault();

      if (evt.button === 0 || evt.keyCode === 27) {
        cardMapPin.remove();
        document.removeEventListener('keydown', closePopupCard);
      }
    };

    popupClose.addEventListener('mousedown', closePopupCard);
    document.addEventListener('keydown', closePopupCard);
    return isCreateRenderCard;
  };

  window.card = {
    createRenderCard: createRenderCard,
    getArrayDataRenterList: getArrayDataRenterList
  };

})();
