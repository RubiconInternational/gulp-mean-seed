'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCTS
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs', [])
  .service('APP_NAME.System.Structs', [
    'APP_NAME.System.Structs.Array',
    'APP_NAME.System.Structs.Object',
    'APP_NAME.System.Structs.String',
    'APP_NAME.System.Structs.Number', function(Array, Object, String, Number) {
      return {
        Array: Array,
        Object: Object,
        String: String,
        Number: Number
      };
  }]);