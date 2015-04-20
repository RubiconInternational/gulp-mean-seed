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
  return {
    Modules: Modules,
    System: System
  };
}]);
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
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN RESOURCE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .service('APP_NAME.Modules.Main.Resource', ['$http', 'APP_NAME.Modules.Main.Proxy', function($http, Proxy) {
    //
    // MAIN RESOURCE NAMESPACE
    //------------------------------------------------------------------------------------------//
    // @description
    var Resource = {url: '/users'};

    //
    // MAIN RESOURCE API
    //------------------------------------------------------------------------------------------//
    // @description

    /**
     * GET
     * @returns {*}
     */
    Resource.get = function() {
      return Proxy.get({method: 'GET', url: Resource.url});
    };

    /**
     * PUT
     * @param data
     * @returns {*}
     */
    Resource.put = function(data) {
      return $http({method: 'PUT', url: Resource.url, data: data});
    };

    /**
     * POST
     * @param data
     * @returns {*}
     */
    Resource.post = function(data) {
      return $http({method: 'POST', url: Resource.url, data: data});
    };

    /**
     * DELETE
     * @returns {*}
     */
    Resource.delete = function() {
      return $http({method: 'DELETE', url: Resource.url});
    };

    // Expose resource
    return Resource;
  }]);
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
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MAIN MODEL
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules.Main')
  .service('APP_NAME.Modules.Main.Model', ['APP_NAME.System', 'APP_NAME.Modules.Main.Resource', function(System, Resource) {
    //
    // MAIN MODEL NAMESPACE
    //------------------------------------------------------------------------------------------//
    // @description
    var Model = {users: new System.Structs.Array()};

    Resource.get().then(function(users) {
      Model.users.clean().fill(users);
    });

    // Expose Model
    return Model;
  }]);
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
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.Modules', [
  'APP_NAME.Modules.Main'
])
  .service('APP_NAME.Modules', ['APP_NAME.Modules.Main', function(Main) {
    return {
      Main: Main
    };
  }]);
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCTS
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs', [])
  .service('APP_NAME.System.Structs', [
    'APP_NAME.System.Structs.Array',
    'APP_NAME.System.Structs.Object',
    'APP_NAME.System.Structs.String',
    'APP_NAME.System.Structs.Number', function(Array, Object, String, Number) {
      return {
        Array: Array,
        Object: Object,
        String: String,
        Number: Number
      };
  }]);
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCT STRING
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs')
  .service('APP_NAME.System.Structs.String', function() {
    var data = {string: 0};

    return data;
  });
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCT OBJECT
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs')
  .service('APP_NAME.System.Structs.Object', function() {
    var data = {};

    return data;
  });
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCT NUMBER
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs')
  .service('APP_NAME.System.Structs.Number', function() {
    var data = {number: 0};

    return data;
  });
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM STRUCT ARRAY
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Structs')
  .service('APP_NAME.System.Structs.Array', function() {
    var Struct = {};

    //
    // ARRAY INSTANCE
    //------------------------------------------------------------------------------------------//
    // @description
    Struct.Array = function(spec) {
      this.data = [];

      for(var method in Struct.methods) {
        this.data[method] = Struct.methods[method].bind(this.data);
      }

      return this.data;
    };

    //
    // ARRAY METHODS
    //------------------------------------------------------------------------------------------//
    // @description
    Struct.methods = {};

    /**
     * Clean
     */
    Struct.methods.clean = function() {
      this.length = 0;
      return this;
    };

    /**
     * Fill
     * @param data
     */
    Struct.methods.fill = function(data) {
      var self = this;

      data.forEach(function(itm) {
        self.push(itm);
      });

      return this;
    };

    return Struct.Array;
  });
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System', [
    'APP_NAME.System.Structs'
  ])
  .service('APP_NAME.System', ['APP_NAME.System.Structs', function(Structs) {
    return {
      Structs: Structs
    };
  }]);