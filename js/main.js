'use strict';

(function () {

  var arrayDataRenterList = [];

  var activationPage = function () {

    var mapPins = document.querySelector('.map__pins');

    mapPins.appendChild(createDOMRenterList(window.data.DATA_RENTER_LIST));

    window.card.createRenderCard(arrayDataRenterList);

    window.card.arrayDataRenterList = arrayDataRenterList;

    return arrayDataRenterList;
  };

  var createDOMRenterList = function (pDataRenterList) {
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < window.data.COUNT_RENTERS; i++) {
      arrayDataRenterList[i] = window.data.getArrayDataRenterList(pDataRenterList);
      fragment.appendChild(window.pin.createDOMRenterItem(arrayDataRenterList[i]));
    }
    return fragment;
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var addressAdForm = adForm.querySelector('.ad-form__address');

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


    addressAdForm.value = centerX + ', ' + centerY;

    var setAddressMapPin = function () {
      var localPinMap = activationPage();

      var left = parseInt(localPinMap[0].location.x, 10);
      var top = parseInt(localPinMap[0].location.y, 10);
      addressAdForm.value = Math.round(left + left / 2) + ', ' + Math.round(top + 70);
    };

    var enabledElementForm = function (evt) {
      if (evt.button === 0 || evt.keyCode === 13) {

        document.querySelector('.map').classList.remove('.map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('ad-form--disabled');

        fieldsetsAdForm.forEach(function (fieldset) {
          fieldset.removeAttribute('disabled');
        });

        selectMapFiltersForm.forEach(function (select) {
          select.removeAttribute('disabled');
        });
        setAddressMapPin();
      }
    };

    mapPinMain.addEventListener('mousedown', enabledElementForm);

    mapPinMain.addEventListener('keydown', enabledElementForm);
  };

  preActivationForm();

  window.main = {
    arrayDataRenterList: arrayDataRenterList
  };

})();
