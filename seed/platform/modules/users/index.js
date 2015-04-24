'use strict';

/***********************************************************************************************************************************************
 * APP_NAME USERS MODULE
 ***********************************************************************************************************************************************
 * @description
 */

module.exports = function(APP_NAME) {
  // Module namespace.
  var Users = {};

  // Controller
  Users.controller = require('./users.controller')(APP_NAME.Router);

  // Model
  Users.model = require('./users.model')(APP_NAME.DAL);

  // API
  return Users;
};