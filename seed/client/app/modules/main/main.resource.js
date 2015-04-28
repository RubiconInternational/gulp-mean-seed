'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .service('APP_NAME.Modules.Main.Resource', ['$http', 'APP_NAME.System', function($http, System) {
    //
    // MAIN RESOURCE NAMESPACE
    //------------------------------------------------------------------------------------------//
    // @description
    var Resource = {};

    /**
     * Users
     * @type {{url: string, type: Array}}
     */
    Resource.users = new System.Valence.Resource('users', {url: System.Config.platform + '/users', type: Array});

    // Expose resource
    return Resource;
  }]);