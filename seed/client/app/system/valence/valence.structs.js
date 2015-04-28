'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCTS
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('Valence')
  .service('Valence.Structs', [
    'Valence.Structs.Array',
    'Valence.Structs.Object',
    'Valence.Structs.String',
    'Valence.Structs.Number', function(Array, Object, String, Number) {
      return {
        Array: Array,
        Object: Object,
        String: String,
        Number: Number
      };
  }]);