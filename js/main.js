'use strict';

(function () {

  var arrayDataRenterList = [];

  var isActivation = false;

  var mapPins = document.querySelector('.map__pins');

  var activationPage = function () {
    if (isActivation) {
      var childMapPins = mapPins.querySelector('.map__pin--child');
      while (childMapPins !== null) {
        mapPins.removeChild(childMapPins);
        childMapPins = mapPins.querySelector('.map__pin--child');
      }
    }

    isActivation = true;

    window.pin.createMapPins();

  };

  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('.ad-form__address');

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

    adFormAddress.value = centerX + ', ' + centerY;

    var enabledElementForm = function (evt) {
      if (evt.button === 0 || evt.keyCode === 13) {

        document.querySelector('.map').classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('ad-form--disabled');

        fieldsetsAdForm.forEach(function (fieldset) {
          fieldset.removeAttribute('disabled');
        });

        selectMapFiltersForm.forEach(function (select) {
          select.removeAttribute('disabled');
        });
        activationPage();
      }
    };

    mapPinMain.addEventListener('mousedown', enabledElementForm);

    mapPinMain.addEventListener('keydown', enabledElementForm);
  };

  preActivationForm();

  var setArrayDataRenterList = function () {
    return arrayDataRenterList;
  };

  window.main = {
    arrayDataRenterList: arrayDataRenterList,
    setArrayDataRenterList: setArrayDataRenterList
  };

})();
