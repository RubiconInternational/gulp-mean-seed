'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN CLIENT CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .controller('APP_NAME.Modules.Main.Client.Controller', function($scope) {
    $scope.tab = 'philosophy';
    $scope.tabs = ['philosophy', 'structure', 'API', 'data', 'DI namespacing'];
  });