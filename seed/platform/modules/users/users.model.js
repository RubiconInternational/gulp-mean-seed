'use strict';

/***********************************************************************************************************************************************
 * APP_NAME USERS MODEL
 ***********************************************************************************************************************************************
 * @description
 */

module.exports = function(APP_NAME) {
  var Users = APP_NAME.DAL('users');
  var Model = {};

  /**
   * Create
   * @param user
   * @returns {*}
   */
  Model.create = function(user) {
    return Users.create({record: user});
  };

  /**
   * Find
   * @param query
   * @returns {*}
   */
  Model.find = function(query) {
    console.log(query)
    return Users.find({query: (query || {})});
  };

  /**
   * Update
   * @param user
   * @returns {*}
   */
  Model.update = function(user) {
    return Users.update({record: user});
  };

  /**
   * Delete
   * @param record
   * @returns {*}
   */
  Model.delete = function(record) {
    return Users.delete({record: record});
  };

  return Model;
};
