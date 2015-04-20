'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main', [])
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'APP_NAME.Modules.Main.Controller',
      templateUrl: 'modules/main/main.html'
    });
  }).service('APP_NAME.Modules.Main', [
    'APP_NAME.Modules.Main.Proxy',
    'APP_NAME.Modules.Main.Model',
    'APP_NAME.Modules.Main.Resource', function(Proxy, Model, Resource) {
    return {
      Proxy: Proxy,
      Model: Model,
      Resource: Resource
    };
  }]);