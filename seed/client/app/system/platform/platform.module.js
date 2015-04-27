'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM PLATFORM
 ***********************************************************************************************************************************************
 * @description Handles communication between client and platform
 */
angular.module('APP_NAME.System.Platform', [])
  .service('APP_NAME.System.Platform', [
    'APP_NAME.System.Platform.API',
    'APP_NAME.System.Platform.Cache',
    'APP_NAME.System.Platform.Config', function(API, Cache, Config) {

    return {
      API: API,
      Cache: Cache,
      Config: Config
    };
  }]);