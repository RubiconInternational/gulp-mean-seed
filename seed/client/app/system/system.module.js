'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System', [
    'APP_NAME.System.Structs',
    'APP_NAME.System.Platform'
  ])
  .service('APP_NAME.System', ['APP_NAME.System.Structs', 'APP_NAME.System.Platform', function(Structs, Platform) {
    return {
      Structs: Structs,
      Platform: Platform
    };
  }]);