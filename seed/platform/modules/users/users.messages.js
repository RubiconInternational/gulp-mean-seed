'use strict';

/***********************************************************************************************************************************************
 * APP_NAME USERS MESSAGES
 ***********************************************************************************************************************************************
 * @description
 */
module.exports = {
  errors: {
    ERROR_RETRIEVING_RECORDS: function(err) { return {code: 500, body: 'There was an error requesting users from the archives: '+ err}; },
    COULD_NOT_LOCATE_RECORD: {code:404, body: 'The requested user record could not be found.' }
  }
};