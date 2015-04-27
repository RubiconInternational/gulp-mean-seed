'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .service('APP_NAME.Modules.Main.Resource', ['$http', 'APP_NAME.System.Platform', function($http, Platform) {
    console.log(Platform.Config)
    //
    // MAIN RESOURCE NAMESPACE
    //------------------------------------------------------------------------------------------//
    // @description
    var Resource = {url: Platform.Config.url + '/users'};

    //
    // MAIN RESOURCE API
    //------------------------------------------------------------------------------------------//
    // @description

    /**
     * GET
     * @returns {*}
     */
    Resource.get = function() {
      return Platform.API.get({url: Resource.url});
    };

    /**
     * PUT
     * @param data
     * @returns {*}
     */
    Resource.put = function(data) {
      return Platform.API.put({url: Resource.url, data: data});
    };

    /**
     * POST
     * @param data
     * @returns {*}
     */
    Resource.post = function(data) {
      return Platform.API.post({url: Resource.url, data: data});
    };

    /**
     * DELETE
     * @returns {*}
     */
    Resource.delete = function() {
      return Platform.API.delete({url: Resource.url});
    };

    // Expose resource
    return Resource;
  }]);