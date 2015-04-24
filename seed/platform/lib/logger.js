'use strict';

/***********************************************************************************************************************************************
 * APP_NAME LOGGER
 ***********************************************************************************************************************************************
 * @description
 */
var chalk = require('chalk');
var q = require('q');

module.exports = function() {

  //
  // TYPES
  //------------------------------------------------------------------------------------------//
  // @description
  var types = {};

  types.error = {label: chalk.bold.underline.red('ERROR: ')};
  types.warn = {label: chalk.bold.underline.yellow('WARN: ')};
  types.info = {label: chalk.bold.underline.cyan('NOTICE: ')};
  types.router = {label: chalk.bold.underline.yellow('HTTP: ')};
  types.default = {label: chalk.bold.underline.white('LOG: ')};
  types.success = {label: chalk.bold.underline.green('SUCCESS: ')};

  // These system specific ones should br broken out into an ingestable map.
  types['archives.success'] = {label: chalk.bold.underline.green('ARCHIVES: ')};
  types['archives.error'] = {label: chalk.bold.underline.red('ARCHIVES: ')};

  //
  // MODE
  //------------------------------------------------------------------------------------------//
  // @description
  var config = {mode: 'debug'};

  //
  // MODES
  //------------------------------------------------------------------------------------------//
  // @description
  var modes = {};

  modes.debug = {types: types, console: true};
  modes.testing = {types: types, console: false};

  //
  // LOG
  //------------------------------------------------------------------------------------------//
  // @description Responsible for printing type and formating message
  function log(opts) {
    var def = q.defer(),
      message = (modes[config.mode].types[(opts.type || 'default')].label + chalk.gray(log.format(opts.message)));

    if(modes[config.mode].console) { console.log(message); }

    def.resolve(message);

    return def.promise;
  }

  /**
   * Format message based on type
   * @param message
   * @returns {*}
   */
  log.format = function(message) {
    return (log.format[message.constructor] || log.format[String])(message);
  };

  /**
   * String formatter
   * @param message
   * @returns {*}
   */
  log.format[String] = function(message) {
    return message;
  };

  /**
   * Number formatter
   * @param message
   * @returns {*}
   */
  log.format[Number] = function(message) {
    return message;
  };

  /**
   * Boolean formatter
   * @param message
   */
  log.format[Boolean] = function(message) {
    return message;
  };

  /**
   * Array formatter
   * @param message
   */
  log.format[Array] = function(message) {
    var str = '[';

    message.forEach(function(itm) {
      str += (log.format(itm) + '\n');
    });

    str +=']';

    return str;
  };

  /**
   * Object formatter
   * @param message
   * @returns {string}
   */
  log.format[Object] = function(message) {
    var str = '\n {';

    for(var prop in message) {
      str += ('\n \t' +prop + ' : ' + log.format(message[prop]) + '\n');
    }

    str += '}';

    return str;
  };

  return {
    config: config,
    log: log
  };
};

