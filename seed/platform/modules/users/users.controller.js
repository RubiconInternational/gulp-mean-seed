'use strict';

/***********************************************************************************************************************************************
 * APP_NAME USERS CONTROLLER
 ***********************************************************************************************************************************************
 * @description
 */
module.exports = function(APP_NAME, Users) {
  var Model = Users.Model;
  var Messages = Users.Messages;
  var Controller = {};

  /**
   * Find
   * @param query
   */
  Controller.find = function(req, res) {
    Model.find(req.params).then(function(results) {
      res.status(200).send(results);
    }, function(err) {
      var message = Messages.ERROR_RETRIEVING_RECORDS(err);

      res.status(message.code).send(message.body);
    });
  };

  return Controller;
};