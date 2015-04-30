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
    }).when('/install', {
      controller: 'APP_NAME.Modules.Main.Install.Controller',
      templateUrl: 'modules/main/install/main.install.html'
    }).when('/client', {
      controller: 'APP_NAME.Modules.Main.Client.Controller',
      templateUrl: 'modules/main/client/main.client.html'
    }).when('/platform', {
      controller: 'APP_NAME.Modules.Main.Platform.Controller',
      templateUrl: 'modules/main/platform/main.platform.html'
    }).when('/cli', {
      controller: 'APP_NAME.Modules.Main.CLI.Controller',
      templateUrl: 'modules/main/cli/main.cli.html'
    });
  }).service('APP_NAME.Modules.Main', [
    'APP_NAME.Modules.Main.Model',
    'APP_NAME.Modules.Main.Resource', function(Model, Resource) {
    return {
      Model: Model,
      Resource: Resource
    };
  }]);