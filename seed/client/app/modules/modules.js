'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules', [
  'APP_NAME.Modules.Main'
])
  .service('APP_NAME.Modules', ['APP_NAME.Modules.Main', function(Main) {
    return {
      Main: Main
    };
  }]);