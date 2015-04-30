'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System', [
    'APP_NAME.System.Config',
    'Valence'
  ])
  .service('APP_NAME.System', ['Valence', 'APP_NAME.System.Config', function(Valence, Config) {
    return {
      Valence: Valence,
      Config: Config
    };
  }]);