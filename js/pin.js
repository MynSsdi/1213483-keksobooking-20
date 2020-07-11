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
    }
  };

  var createMapPins = function () {
    mapPins.appendChild(createDOMRenterList(window.data.DATA_RENTER_LIST));


    var childMapPins = mapPins.querySelectorAll('.map__pin--child');

    childMapPins.forEach(function (childMapPin) {
      childMapPin.addEventListener('mousedown', openPopupCard);
      childMapPin.addEventListener('keydown', openPopupCard);
    });

    window.form.setAdFormAddress();
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

  var dragged = false;

  var mousedown = function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {

      var coordsMainPinStyle = {
        x: mapMainPin.style.left,
        y: mapMainPin.style.top
      };

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {

        dragged = true;

        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        coordsMainPinStyle.x = mapMainPin.style.left;
        coordsMainPinStyle.y = mapMainPin.style.top;

        mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
        mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';

        window.form.setAdFormAddress();

        var mapPinsRect = mapPins.getBoundingClientRect();

        var horizontalLimitLeft = mapPinsRect.left;
        var horizontalLimitRight = mapPinsRect.right + window.scrollX;

        var verticalLimitTop = window.data.TOP_VERTICAL_LIMIT;
        var verticalLimitBottom = window.data.BOTTOM_VERTICAL_LIMIT;

        if ((window.form.coordY <= verticalLimitTop || window.form.coordY >= verticalLimitBottom)
         || (window.form.coordX <= horizontalLimitLeft || window.form.coordX >= horizontalLimitRight)) {
          mapMainPin.style.left = coordsMainPinStyle.x;
          mapMainPin.style.top = coordsMainPinStyle.y;
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapMainPin.removeEventListener('click', onClickPreventDefault);
          };
          mapMainPin.removeEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }
  };

  var mapMainPin = mapPins.querySelector('.map__pin--main');
  mapMainPin.addEventListener('mousedown', mousedown);

  document.removeEventListener('click', function (evt) {
    evt.preventDefault();
  });

  window.pin = {
    createDOMRenterItem: createDOMRenterItem,
    createMapPins: createMapPins
  };

})();
