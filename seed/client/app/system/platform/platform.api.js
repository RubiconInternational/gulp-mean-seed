'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEMS PLATFORM API
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.API', ['APP_NAME.System.Platform.Cache', '$http', '$q', function(Cache, $http, $q) {
    var API = {};

    API.get = function(spec) {
      var def = $q.defer();

      Cache.get(spec.url, spec.cache).then(function(data) {
        def.resolve(data);
      }, function() {
        $http(spec).success(function(data) {
          Cache.set(spec.url, data).then(function(data) {
            def.resolve(data);
          }, function(err) {
            def.reject(err);
          });
        });
      });

      return def.promise;
    };
  }]);