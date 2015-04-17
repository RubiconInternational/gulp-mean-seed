'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN MODULE HTTP BACKEND
 ***********************************************************************************************************************************************
 * @description Remember to remove this file when starting actual development as it will short circuit ALL $http requests.
 */
angular.module('APP_NAME.Modules.Main')
  .service('APP_NAME.Modules.Main.Proxy', ['$q', '$timeout', function($q, $timeout) {
    var users = [{name: 'Ben', age: 12}, {name: 'mark', age: 23}, {name: 'Jenny', age: 29}];

    return {
      get: function() {
        var def = $q.defer();

        $timeout(function() {
          def.resolve(users);
        }, 1500);

        return def.promise;
      }
    };
  }]);