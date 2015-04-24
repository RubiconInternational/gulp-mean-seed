'use strict';

/***********************************************************************************************************************************************
 * APP_NAME MODULES
 ***********************************************************************************************************************************************
 * @description Modules loader.
 */
var fs = require('fs');

module.exports = function(APP_NAME) {
  var Modules = {};

  Modules.load = function() {
    var def = APP_NAME.Utils.q.defer();

    // Base path o look in.
    var basepath = APP_NAME.Config.Modules.path;
    // Load modules
    fs.readdirSync(basepath).forEach(function(module) {
      var path = basepath+'/'+module;
      var isDir = fs.lstatSync(path).isDirectory();
      var label = module.charAt(0).toUpperCase() + module.substr(1, Number.MAX_VALUE);

      if(isDir) {
        Modules[label] = require(path)(APP_NAME);
      }
    });

    def.resolve();
    return def.promise;
  };

  return Modules;
};