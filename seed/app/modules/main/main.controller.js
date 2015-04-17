'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN MODULE CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .controller('APP_NAME.Modules.Main.Controller', ['$scope', 'APP_NAME.Modules.Main.Model', function($scope, Model) {
    $scope.Model = Model;
  }]);