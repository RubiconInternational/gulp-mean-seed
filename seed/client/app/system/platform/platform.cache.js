'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM PLATFORM
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.Cache', ['$q', 'APP_NAME.System.Structs', function($q, Structs) {
    var Cache = {__cache__:{}};

    Cache.structs = {};
    Cache.structs[Array] = 'Array';
    Cache.structs[Object] = 'Object';

    Cache.verify = function(url) {
      this.__cache__[url] = this.__cache__[url] || {};

      for(var option in this.verify.defaults) {
        this.__cache__[url][option] = this.__cache__[url][option] || this.verify.defaults[option]();
      }

      return this.__cache__[url];
    };

    /**
     * Cache defaults
     * @type {{}}
     */
    Cache.verify.defaults = {
      __meta__: function() { return {created: Date.now()}; },
      options: function() {return {expires: 0}; }
    };

    /**
     * Config - establishes options for a cace entry
     * @param url
     * @param options
     */
    Cache.options = function(url, options) {
      this.create(url);

      this.__cache__[url].options = options;
    };

    Cache.validate = function(cache) {
      var validated = [];

      cache.options = cache.options || {expires: 0};

      for(var option in cache.options) {
        if(this.validators[option]) {
          var validator = this.validators[options](cache);

          if(validator) {
            validated.push(validator);
          }
        }
      }

      return validated.length;
    };

    //
    // VALIDATORS
    //------------------------------------------------------------------------------------------//
    // @description
    Cache.validators = {};


    /**
     * Expires
     * @param cache
     * @returns {boolean}
     */
    Cache.validators.expires = function(cache) {
      return Date.now() - (cache.__meta__.updated || cache.__meta__.created) >= cache.options.expires;
    };

    //
    // CACHE IO
    //------------------------------------------------------------------------------------------//
    // @description

    /**
     * GET
     * @param url
     * @returns {*}
     */
    Cache.get = function(url) {
      var def = $q.defer();
      var cache = this.verify(url);

      if(cache && cache.data && Cache.validate(cache)) {
        def.resolve(cache.data);
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
      var cache = this.verify(url);

      cache.data = new Structs[Cache.structs[data.constructor]]();

      cache.data.clean().fill(data);

      def.resolve(cache.data);

      return def.promise;
    };

    return Cache;
  }]);