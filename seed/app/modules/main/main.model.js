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