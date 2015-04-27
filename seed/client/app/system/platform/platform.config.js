'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM PLATFORM CONFIG
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.Config', ['$http', function($http) {
    var Config = config.environments[env];

    //
    // CONFIG MEMBERS
    //------------------------------------------------------------------------------------------//
    // @description
    Config.url = 'http://' + Config.host + ':'+ Config.port;


    return Config;
  }]);