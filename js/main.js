'use strict';

(function () {

  var BUTTON_MOUSE_LEFT = 0;
  var BUTTON_KEY_ENTER = 13;

  var coordLeftPinMain;
  var coordTopPinMain;

  var mapPinMain = document.querySelector('.map__pin--main');

  var arrayDataRenterList = [];

  var isActivation = false;

  coordLeftPinMain = mapPinMain.style.left;
  coordTopPinMain = mapPinMain.style.top;

  var activationPage = function () {

    if (!isActivation) {
      window.backend.load(window.pin.createMapPins, window.pin.createMapPins);
    }

    isActivation = true;

  };

  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('.ad-form__address');

  var mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('ad-form--disabled');
  var selectMapFiltersForm = mapFiltersForm.querySelectorAll('select');

  var mapPinMapSvg = mapPinMain.querySelector('.map__pin-svg');

  var preActivationForm = function () {
    fieldsetsAdForm.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', '');
    });

    selectMapFiltersForm.forEach(function (select) {
      select.setAttribute('disabled', '');
    });

    var centerX = mapPinMapSvg.getAttribute('width') / 2;
    var centerY = mapPinMapSvg.getAttribute('height') / 2;

    adFormAddress.value = centerX + ', ' + centerY;

    mapPinMain.style.left = coordLeftPinMain;
    mapPinMain.style.top = coordTopPinMain;

  };

  var enabledElementForm = function (evt) {
    if (evt.button === BUTTON_MOUSE_LEFT || evt.keyCode === BUTTON_KEY_ENTER) {

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

  preActivationForm();

  mapPinMain.addEventListener('mousedown', enabledElementForm);

  mapPinMain.addEventListener('keydown', enabledElementForm);

  var setArrayDataRenterList = function () {
    return arrayDataRenterList;
  };

  var disableElementForm = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFiltersForm.classList.add('ad-form--disabled');

    preActivationForm();

    window.pin.deleteMapPins();

    isActivation = false;
  };

  window.main = {
    arrayDataRenterList: arrayDataRenterList,
    setArrayDataRenterList: setArrayDataRenterList,
    preActivationForm: preActivationForm,
    disableElementForm: disableElementForm
  };

})();
