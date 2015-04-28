'use strict';

// Window namespace
window.Valence = {Models: {}, Resources: {}, Cache: {}};

/***********************************************************************************************************************************************
 * VALENCE
 ***********************************************************************************************************************************************
 * @description Create the module and Valence namespace.
 */
angular.module('Valence', [])
  .service('Valence', ['Valence.Model', 'Valence.Resource', function(Model, Resource) {

    return {
      Model: Model,
      Resource: Resource
    };
  }]);