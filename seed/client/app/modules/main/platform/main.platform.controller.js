'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN PLATFORM CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .controller('APP_NAME.Modules.Main.Platform.Controller', function($scope) {
    $scope.tab = 'philosophy';
    $scope.tabs = ['philosophy', 'structure', 'API'];
  });