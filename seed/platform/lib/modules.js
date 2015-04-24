'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MODULES
 ***********************************************************************************************************************************************
 * @description Modules loader.
 */
var fs = require('fs');

module.exports = function(APP_NAME) {
  var Modules = {};

  // Base path o look in.
  var basepath = APP_NAME.Config.Modules.path;
  console.log(basepath)
  // Load modules
  fs.readdirSync(basepath).forEach(function(module) {
    var isDir = fs.lstatSync(module).isDirectory();

    if(isDir) {
      Modules[module] = require(module);
    }
  });

  console.log(Modules);

  return Modules;
};