'use strict';

(function () {
  var MAX_COUNT_MAP_PIN = 5;
  var TOP_VERTICAL_LIMIT = 130;
  var BOTTOM_VERTICAL_LIMIT = 630;

  var BUTTON_MOUSE_LEFT = 0;
  var BUTTON_KEY_ESC = 27;
  var BUTTON_KEY_ENTER = 13;

  var pins = [];
  var dragged = false;
  var isCreateRenderCard = false;
  var arrayDataRenterList = [];
  var cardMapPin;
  var childMapPins;
  var mapPinsChild;
  var mapPins = document.querySelector('.map__pins');
  var mapMainPin = mapPins.querySelector('.map__pin--main');

  var updateCreateMapPins = function (sames) {
    deleteMapPins();
    renderMapPins(sames);
  };

  var onPopupCardOpen = function (evt) {
    if (evt.button === BUTTON_MOUSE_LEFT || evt.keyCode === BUTTON_KEY_ENTER || evt.keyCode === BUTTON_KEY_ESC) {
      cardMapPin = document.querySelector('.map__card');
      if (isCreateRenderCard && cardMapPin !== null) {
        cardMapPin.remove();
      }
      var indexMapPin = evt.currentTarget.getAttribute('data-pin-number');
      isCreateRenderCard = window.card.createRenderCard(arrayDataRenterList[indexMapPin]);
    }
  };

  var renderMapPins = function (arrayPinsServer) {
    mapPins.appendChild(createDOMRenterList(arrayPinsServer));

    childMapPins = mapPins.querySelectorAll('.map__pin--child');

    childMapPins.forEach(function (childMapPin) {
      childMapPin.addEventListener('mousedown', onPopupCardOpen);
      childMapPin.addEventListener('keydown', onPopupCardOpen);
    });

    window.form.setAdFormAddress();
  };

  var createMapPins = function (arrayPinsServer) {
    pins = arrayPinsServer.slice();

    pins.splice(MAX_COUNT_MAP_PIN, pins.length - 1);

    cardMapPin = document.querySelector('.map__card');

    if (cardMapPin !== null) {
      cardMapPin.remove();
    }

    window.filter.set(pins, window.debounce(updateCreateMapPins));
    var filteredData = window.filter.get(pins);
    updateCreateMapPins(filteredData);
  };

  var deleteMapPins = function () {
    cardMapPin = document.querySelector('.map__card');
    mapPinsChild = document.querySelectorAll('.map__pin--child');

    mapPinsChild.forEach(function (mapPinChildren) {
      mapPinChildren.remove();
    });

    if (cardMapPin !== null) {
      cardMapPin.remove();
    }
  };

  var createDOMRenterList = function (pDataRenterList) {
    var fragment = document.createDocumentFragment();
    var arrayLength = pDataRenterList.length > 5 ? 5 : pDataRenterList.length;
    for (var i = 0; i < arrayLength; i++) {
      arrayDataRenterList[i] = pDataRenterList[i];
      fragment.appendChild(createDOMRenterItem(pDataRenterList[i], i));
    }
    return fragment;
  };

  var createDOMRenterItem = function (arrayRenters, i) {

    var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var createDOMRenterItemClone = adsPinTemplate.cloneNode(true);

    createDOMRenterItemClone.style.left = arrayRenters.location.x + 'px';
    createDOMRenterItemClone.style.top = arrayRenters.location.y + 'px';

    createDOMRenterItemClone.setAttribute('data-pin-number', i);

    var createDOMRenterItemCloneImage = createDOMRenterItemClone.querySelector('img');

    createDOMRenterItemCloneImage.src = arrayRenters.author.avatar;
    createDOMRenterItemCloneImage.alt = arrayRenters.offer.title;

    return createDOMRenterItemClone;
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    if (evt.button === BUTTON_MOUSE_LEFT) {

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

        var verticalLimitTop = TOP_VERTICAL_LIMIT;
        var verticalLimitBottom = BOTTOM_VERTICAL_LIMIT;

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
          dragged = false;
          window.pin.deleteMapPins();
          window.backend.load(createMapPins);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }
  };

  document.removeEventListener('click', function (evt) {
    evt.preventDefault();
  });

  mapMainPin.addEventListener('mousedown', onMouseDown);

  window.pin = {
    createDOMRenterItem: createDOMRenterItem,
    createMapPins: createMapPins,
    deleteMapPins: deleteMapPins
  };

})();
