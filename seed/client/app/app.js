'use strict';

/***********************************************************************************************************************************************
 * APP_NAME ENTRY
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME', [
  'ngRoute',
  'APP_NAME.System',
  'APP_NAME.Modules'
]).service('APP_NAME', ['APP_NAME.Modules', 'APP_NAME.System', function(Modules, System) {
  window.APP_NAME = {
    Modules: Modules,
    System: System
  };

  return APP_NAME;
}]).run(['APP_NAME', function(APP_NAME) {

}]);