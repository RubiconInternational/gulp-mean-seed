'use strict';

/***********************************************************************************************************************************************
 * APP_NAME USERS MODULE
 ***********************************************************************************************************************************************
 * @description
 */

module.exports = function(APP_NAME) {
  //
  // MODULE NAMESPACE
  //------------------------------------------------------------------------------------------//
  // @description
  var Users = {};

  //
  // MESSAGES
  //------------------------------------------------------------------------------------------//
  // @description
  Users.Messages = require('./users.messages');

  //
  // MODEL
  //------------------------------------------------------------------------------------------//
  // @description
  Users.Model = require('./users.model')(APP_NAME);

  //
  // CONTROLLER
  //------------------------------------------------------------------------------------------//
  // @description
  Users.Controller = require('./users.controller')(APP_NAME, Users);

  //
  // ROUTES
  //------------------------------------------------------------------------------------------//
  // @description
  Users.Routes = require('./users.routes')(APP_NAME, Users);

  // API
  return Users;
};