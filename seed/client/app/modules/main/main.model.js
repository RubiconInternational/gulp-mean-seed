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
    var Model = new System.Valence.Model('Main');

    // Add/bind resources
    for(var resource in Resource) {
       Model.Resource(Resource[resource]).attach().bind();
    }

    console.log(Model);

    // Load resources
    for(var resource in Resource) {
      Resource[resource].get();
    }

    // Expose Model
    return Model;
  }]);