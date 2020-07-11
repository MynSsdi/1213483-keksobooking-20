'use strict';

(function () {

  var urlServer = 'https://javascript.pages.academy/keksobooking/data';

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var getDataServer = function (onGetDataSucess, onGetDataError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onGetDataSucess(xhr.response);
      } else {
        onGetDataError('Статус ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onGetDataError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onGetDataError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', urlServer);

    xhr.send();

  };

  window.backend = {
    load: getDataServer
  };

})();