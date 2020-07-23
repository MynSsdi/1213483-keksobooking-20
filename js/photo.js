'use strict';

(function () {
  var FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormHeader = document.querySelector('.ad-form-header');
  var fileAvatarChooser = adFormHeader.querySelector('.ad-form-header__avatar');
  var adFormHeaderPreview = adFormHeader.querySelector('.ad-form-header__preview');
  var previewAvatar = adFormHeader.querySelector('.ad-form-header__preview-image');

  var fileHouseChooser = document.querySelector('.ad-form__images');
  var previewHouse = document.querySelector('.ad-form__photo');

  var showPhoto = function (inputFile, callback) {
    var file = inputFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILES_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var createNewImage = function (link) {
    var img = document.createElement('img');
    img.classList.add('ad-form__photo-image');
    img.src = link;
    img.alt = 'Фотография жилья';
    img.style.width = '70px';
    img.style.height = '70px';
    return img;
  };

  var createNewPhoto = function (link) {
    var img = createNewImage(link);
    previewHouse.appendChild(img);
  };

  var setAvatarParameter = function (link) {
    adFormHeaderPreview.style.padding = '0';
    previewAvatar.style.width = '70px';
    previewAvatar.style.height = '70px';
    previewAvatar.src = link;
  };

  fileAvatarChooser.addEventListener('change', function () {
    showPhoto(fileAvatarChooser, setAvatarParameter);
  });

  fileHouseChooser.addEventListener('change', function () {
    showPhoto(fileHouseChooser, createNewPhoto);
  });
})();
