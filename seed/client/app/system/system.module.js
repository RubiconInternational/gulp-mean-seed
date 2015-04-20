'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System', [
    'APP_NAME.System.Structs'
  ])
  .service('APP_NAME.System', ['APP_NAME.System.Structs', function(Structs) {
    return {
      Structs: Structs
    };
  }]);