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
        Model.__actions__ = {};

    // Add/bind resources
    for(var resource in Resource) {
      Model.__actions__[resource] = Model.Resource(Resource[resource]).attach().bind();
    }

    // Load resources
    for(var resource in Resource) {
      Resource[resource].get();
    }


    // Expose Model
    return Model;
  }]);