'use strict';


(function () {
  var ANY_VALUE = 'any';
  var PINS_NUMBER = 5;

  var Price = {
    LOW_MAX: 1000,
    MIDDLE_MAX: 5000
  };

  var PriceValue = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var features = featuresFieldset.querySelectorAll('.map__checkbox');

  var getCheckedFeatures = function() {
    var checkedValues = [];
    Array.from(features).forEach(function (element) {
      if (element.checked) {
        checkedValues.push(element.value);
      }
    });
    return checkedValues;
  };

  var checkType = function(element) {
    return type.value === ANY_VALUE ? true : element.offer.type === type.value;
  }

  var checkPriceRange = function (range, priceValue) {
    switch (range) {
      case (PriceValue.MIDDLE): {
        return (priceValue >= Price.LOW_MAX && priceValue <= Price.MIDDLE_MAX);
      }
      case (PriceValue.LOW): {
        return (priceValue < Price.LOW_MAX);
      }
      case (PriceValue.HIGH): {
        return (priceValue > Price.MIDDLE_MAX);
      }
    }
    return false;
  };

  var checkPrice = function (element) {
    return price.value === ANY_VALUE ? true : checkPriceRange(price.value, element.offer.price);
  };

  var checkRooms = function (element) {
    return rooms.value === ANY_VALUE ? true : parseInt(element.offer.rooms, 10) === parseInt(rooms.value, 10);
  }

  var checkGuests = function (element) {
    return guests.value === ANY_VALUE ? true : parseInt(element.offer.guests, 10) === parseInt(guests.value, 10);
  }

  var isNested = function (inners, outers) {
    var markedValues = inners.filter(function (element) {
      return outers.indexOf(element) !== -1;
    });
    return markedValues.length === inners.length;
  }

  var checkFeatures = function(element) {
     return getCheckedFeatures().length === 0 ? true : isNested(getCheckedFeatures(), element.offer.features);
   }

   var getFilterState = function (dataValues) {
     var filteredData = dataValues.filter(function (element) {
       return checkType(element) && checkPrice(element) && checkRooms(element) && checkGuests(element) && checkFeatures(element);
     });
     return filteredData.length > PINS_NUMBER ? filteredData.slice(0, PINS_NUMBER) : filteredData;
   }

  var setFilters = function (dataValues, callback) {
    filterForm.addEventListener('change', function () {
      var filteredData = getFilterState(dataValues);
      callback(filteredData);
    });
  }

  window.filter = {
    set: setFilters,
    get: getFilterState
  };

})();
