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
var env = "development";
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
    'APP_NAME.Modules.Main.Model',
    'APP_NAME.Modules.Main.Resource', function(Model, Resource) {
    return {
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
  .service('APP_NAME.Modules.Main.Resource', ['$http', 'APP_NAME.System.Platform', function($http, Platform) {
    console.log(Platform.Config)
    //
    // MAIN RESOURCE NAMESPACE
    //------------------------------------------------------------------------------------------//
    // @description
    var Resource = {url: Platform.Config.url + '/users'};

    //
    // MAIN RESOURCE API
    //------------------------------------------------------------------------------------------//
    // @description

    /**
     * GET
     * @returns {*}
     */
    Resource.get = function() {
      return Platform.API.get({url: Resource.url});
    };

    /**
     * PUT
     * @param data
     * @returns {*}
     */
    Resource.put = function(data) {
      return Platform.API.put({url: Resource.url, data: data});
    };

    /**
     * POST
     * @param data
     * @returns {*}
     */
    Resource.post = function(data) {
      return Platform.API.post({url: Resource.url, data: data});
    };

    /**
     * DELETE
     * @returns {*}
     */
    Resource.delete = function() {
      return Platform.API.delete({url: Resource.url});
    };

    // Expose resource
    return Resource;
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
 * APP_NAME SYSTEM PLATFORM
 ***********************************************************************************************************************************************
 * @description Handles communication between client and platform
 */
angular.module('APP_NAME.System.Platform', [])
  .service('APP_NAME.System.Platform', [
    'APP_NAME.System.Platform.API',
    'APP_NAME.System.Platform.Cache',
    'APP_NAME.System.Platform.Config', function(API, Cache, Config) {

    return {
      API: API,
      Cache: Cache,
      Config: Config
    };
  }]);
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM PLATFORM CONFIG
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.Config', ['$http', function($http) {
    var Config = config.environments[env];

    //
    // CONFIG MEMBERS
    //------------------------------------------------------------------------------------------//
    // @description
    Config.url = 'http://' + Config.host + ':'+ Config.port;


    return Config;
  }]);
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM PLATFORM
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.Cache', ['$q', function($q) {
    var Cache = {__cache__:{}};

    /**
     * GET
     * @param url
     * @returns {*}
     */
    Cache.get = function(url, options) {
      var def = $q.defer();
      var cache = this.__cache__[url];

      if(cache) {
        def.resolve(cache);
      } else {
        def.reject();
      }

      return def.promise;
    };

    /**
     * SET
     * @param url
     * @param data
     * @returns {*}
     */
    Cache.set = function(url, data) {
      var def = $q.defer();

      try {
        this.__cache__[url] = data;
      } catch(e) {
        def.reject('Could net set cache for: ', url, 'with: ', data);
      }

      def.resolve(this.__cache__[url]);

      return def.promise;
    };

    return Cache;
  }]);
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEMS PLATFORM API
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System.Platform')
  .service('APP_NAME.System.Platform.API', ['APP_NAME.System.Platform.Cache', '$http', '$q', function(Cache, $http, $q) {
    var API = {};

    API.get = function(spec) {
      var def = $q.defer();

      Cache.get(spec.url, spec.cache).then(function(data) {
        def.resolve(data);
      }, function() {
        $http(spec).success(function(data) {
          Cache.set(spec.url, data).then(function(data) {
            def.resolve(data);
          }, function(err) {
            def.reject(err);
          });
        });
      });

      return def.promise;
    };

    return API;
  }]);
'use strict';

/***********************************************************************************************************************************************
 * APP_NAME SYSTEM MODULE
 ***********************************************************************************************************************************************
 * @description
 */
angular.module('APP_NAME.System', [
    'APP_NAME.System.Structs',
    'APP_NAME.System.Platform'
  ])
  .service('APP_NAME.System', ['APP_NAME.System.Structs', 'APP_NAME.System.Platform', function(Structs, Platform) {
    return {
      Structs: Structs,
      Platform: Platform
    };
  }]);
var config = {"environments":{"development":{"host":"localhost","port":7000}}};