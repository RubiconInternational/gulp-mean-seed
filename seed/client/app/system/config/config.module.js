'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM CONFIG
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Config', [])
  .service('APP_NAME.System.Config', function() {
    var Config = config.environments[env];

    //
    // CONFIG MEMBERS
    //------------------------------------------------------------------------------------------//
    // @description\

    /**
     * PLATFORM
     *
     * @type {string}
     */
    Config.platform = 'http://' + Config.host + ':'+ Config.port;

    return Config;
  });