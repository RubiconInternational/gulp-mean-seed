'use strict';

/***********************************************************************************************************************************************
 * VALENCE RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('Valence')
  .service('Valence.Resource', ['Valence.Cache', 'Valence.Structs', '$http', '$q', function(Cache, Structs, $http, $q) {
    //
    // CLOSURE NAMESPACE
    //------------------------------------------------------------------------------------------//
    // @description
    var Valence = {};

    //
    // NAMESPACE MEMBERS
    //------------------------------------------------------------------------------------------//
    // @description

    // Struct maps
    Valence.structs = {};
    Valence.structs[Object] = 'Object';
    Valence.structs[Array] = 'Array';

    //
    // VALENCE RESOURCE
    //------------------------------------------------------------------------------------------//
    // @description
    Valence.Resource = function(name, config) {
      this.name = name;
      this.config = _.merge(this.defaults, config);
      this.data = new Structs[Valence.structs[this.config.type]]();

      // Set up cache
      Cache.add(this.config.url, this.config.cache);

      // Expose to debugger
      window.Valence.Resources[this.name] = this;

      return this;
    };

    /**
     * Defaults
     * @type {{type: Object, cache: {expires: number}}}
     */
    Valence.Resource.prototype.defaults = {
      type: Object,
      cache: {expires: 60000}
    };

    /**
     * GET
     */
    Valence.Resource.prototype.get = function() {
      return this.read({url: this.config.url});
    };

    /**
     * PUT
     * @param data
     */
    Valence.Resource.prototype.put = function(data) {
      return this.write({url: this.config.url, method: 'PUT', data:data});
    };

    /**
     * POST
     * @param data
     */
    Valence.Resource.prototype.post = function(data) {
      return this.write({url: this.config.url, method: 'POST', data:data});
    };

    /**
     * DELETE
     */
    Valence.Resource.prototype.delete = function() {
      return this.write({url: this.config.url, method: 'DELETE'});
    };

    /**
     * READ
     * @param spec
     * @returns {*}
     */
    Valence.Resource.prototype.read = function(spec) {
      var self = this;
      var def = $q.defer();

      Cache.get(spec.url).then(function(data) {
        _.merge(self.data, data);
      }, function(err) {
        $http({method: 'GET', url: spec.url}).success(function(data) {
          Cache.set(spec.url, data).then(function(data) {
            _.merge(self.data, data);
          });
        });
      });

      return def.promise;
    };

    /**
     * WRITE
     * @param spec
     * @returns {*}
     */
    Valence.Resource.prototype.write = function(spec) {
      var self = this;
      var def = $q.defer();

      $http(spec).success(function(data) {
        Cache.set(spec.url, data).then(function(data) {
          _.merge(self.data, data);
        });
      }, function(err) {
        def.reject(err);
      });

      return def.promise;
    };

    return Valence.Resource;
  }]);