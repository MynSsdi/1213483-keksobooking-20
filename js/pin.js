'use strict';

(function () {

  var createDOMRenterItem = function (arrayRenters) {
    var adsPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var createDOMRenterItemClone = adsPinTemplate.cloneNode(true);

    createDOMRenterItemClone.style.left = arrayRenters.location.x;
    createDOMRenterItemClone.style.top = arrayRenters.location.y;

    var createDOMRenterItemCloneImage = createDOMRenterItemClone.querySelector('img');

    createDOMRenterItemCloneImage.src = arrayRenters.author.avatar;
    createDOMRenterItemCloneImage.alt = arrayRenters.offer.title;

    return createDOMRenterItemClone;
  };

  window.pin = {
    createDOMRenterItem: createDOMRenterItem
  };

})();
