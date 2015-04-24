'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM PLATFORM
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.Cache', ['$q', function($q) {
    var Cache = {__cache__:{}};

    /**
     * GET
     * @param url
     * @returns {*}
     */
    Cache.get = function(url, options) {
      var def = $q.defer();
      var cache = this.__cache__[url];

      if(cache) {
        def.resolve(cache);
      } else {
        def.reject();
      }

      return def.promise;
    };

    /**
     * SET
     * @param url
     * @param data
     * @returns {*}
     */
    Cache.set = function(url, data) {
      var def = $q.defer();

      try {
        this.__cache__[url] = data;
      } catch(e) {
        def.reject('Could net set cache for: ', url, 'with: ', data);
      }

      def.resolve(this.__cache__[url]);

      return def.promise;
    };

    return Cache;
  }]);