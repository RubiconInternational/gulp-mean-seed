'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN CLIENT CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .controller('APP_NAME.Modules.Main.Client.Controller', ['$scope', 'APP_NAME.Modules.Main.Model', function($scope, Model) {
    $scope.active = {tab: 'philosophy'};
    $scope.tabs = ['philosophy', 'structure', 'API', 'data', 'DI namespacing'];
    $scope.model = Model;
  }]);