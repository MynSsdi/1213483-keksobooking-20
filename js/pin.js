'use strict';

(function () {
  var isCreateRenderCard = false;
  var arrayDataRenterList = [];
  var mapPins = document.querySelector('.map__pins');

  var openPopupCard = function (evt) {
    if (evt.button === 0 || evt.keyCode === 13 || evt.keyCode === 27) {
      var cardMapPin = document.querySelector('.map__card');
      if (isCreateRenderCard && cardMapPin !== null) {

        cardMapPin.remove();
      }
      var indexMapPin = evt.currentTarget.getAttribute('data-pin-number');
      isCreateRenderCard = window.card.createRenderCard(arrayDataRenterList[indexMapPin]);
      if (isCreateRenderCard || cardMapPin !== null) {
        window.form.setAdFormAddress();
      }
    }
  };

  var createMapPins = function () {
    mapPins.appendChild(createDOMRenterList(window.data.DATA_RENTER_LIST));


    var childMapPins = mapPins.querySelectorAll('.map__pin--child');

    childMapPins.forEach(function (childMapPin) {
      childMapPin.addEventListener('mousedown', openPopupCard);
      childMapPin.addEventListener('keydown', openPopupCard);
    });

  };

  var createDOMRenterList = function (pDataRenterList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.COUNT_RENTERS; i++) {
      arrayDataRenterList[i] = window.data.getArrayDataRenterList(pDataRenterList);
      fragment.appendChild(createDOMRenterItem(arrayDataRenterList[i], i));
    }
    return fragment;
  };

  var createDOMRenterItem = function (arrayRenters, i) {
    var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var createDOMRenterItemClone = adsPinTemplate.cloneNode(true);

    createDOMRenterItemClone.style.left = arrayRenters.location.x;
    createDOMRenterItemClone.style.top = arrayRenters.location.y;

    createDOMRenterItemClone.setAttribute('data-pin-number', i);

    var createDOMRenterItemCloneImage = createDOMRenterItemClone.querySelector('img');

    createDOMRenterItemCloneImage.src = arrayRenters.author.avatar;
    createDOMRenterItemCloneImage.alt = arrayRenters.offer.title;

    return createDOMRenterItemClone;
  };

  /*  var setAddressMapPin = function () {
    var left = parseInt(arrayDataRenterList[0].location.x, 10);
    var top = parseInt(arrayDataRenterList[0].location.y, 10);
    adFormAddress.value = Math.round(left + left / 2) + ', ' + Math.round(top + 70);
  }; */

  window.pin = {
    createDOMRenterItem: createDOMRenterItem,
    createMapPins: createMapPins
  };

})();
