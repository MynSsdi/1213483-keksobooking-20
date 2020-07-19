'use strict';

(function () {
<<<<<<< HEAD
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

=======
>>>>>>> 8d13507265ba2c7039f36189dd9ab75e9fb3e0fe
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var features = featuresFieldset.querySelectorAll('.map__checkbox');

<<<<<<< HEAD
  var getCheckedFeatures = function() {
=======
  function getCheckedFeatures() {
>>>>>>> 8d13507265ba2c7039f36189dd9ab75e9fb3e0fe
    var checkedValues = [];
    Array.from(features).forEach(function (element) {
      if (element.checked) {
        checkedValues.push(element.value);
      }
    });
    return checkedValues;
<<<<<<< HEAD
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
=======
  }

  function checkType(element) {
    return type.value === 'any' ? true : element.offer.type === type.value;
  }

  function checkPriceRange(range, priceValue) {
    switch (range) {
      case ('middle'): {
        return (priceValue >= 10000 && priceValue <= 50000);
      }
      case ('low'): {
        return (priceValue < 10000);
      }
      case ('high'): {
        return (priceValue > 50000);
      }
    }
    return false;
  }

  function checkPrice(element) {
    return price.value === 'any' ? true : checkPriceRange(price.value, element.offer.price);
  }

  function checkRooms(element) {
    return rooms.value === 'any' ? true : parseInt(element.offer.rooms, 10) === parseInt(rooms.value, 10);
  }

  function checkGuests(element) {
    return guests.value === 'any' ? true : parseInt(element.offer.guests, 10) === parseInt(guests.value, 10);
  }

  function isNested(inners, outers) {
>>>>>>> 8d13507265ba2c7039f36189dd9ab75e9fb3e0fe
    var markedValues = inners.filter(function (element) {
      return outers.indexOf(element) !== -1;
    });
    return markedValues.length === inners.length;
  }

<<<<<<< HEAD
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
=======
  function checkFeatures(element) {
    return getCheckedFeatures().length === 0 ? true : isNested(getCheckedFeatures(), element.offer.features);
  }

  function getFilterState(dataValues) {
    var filteredData = dataValues.filter(function (element) {
      return checkType(element) && checkPrice(element) && checkRooms(element) && checkGuests(element) && checkFeatures(element);
    });
    return filteredData.length > 5 ? filteredData.slice(0, 5) : filteredData;
  }

  function setFilters(dataValues, callback) {
>>>>>>> 8d13507265ba2c7039f36189dd9ab75e9fb3e0fe
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
