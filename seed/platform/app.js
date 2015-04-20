'use strict';

/***********************************************************************************************************************************************
 *  APP_NAME PLATFORM ENTRY
 ***********************************************************************************************************************************************
 * @description
 */

//
// DEPENDENCIES
//------------------------------------------------------------------------------------------//
// @description
var gulp = require('gulp');
var exec = require('gulp-run');
var OS = require('os');

//
// ENVIRONMENT
//------------------------------------------------------------------------------------------//
// @description
var Environment = {host: 'localhost', port: 3000};
// Platform awareness
Environment.platform = {label: OS.platform(), map: {}};

// Feels pointless but let's me use maps for the rest of the implementation
Environment.platform.label.match('darwin') ?
  Environment.platform.map[Environment.platform.label] = 'nix' :
  Environment.platform.map[Environment.platform.label] = 'win';

/**
 * Apply
 * @description Ingests env config.
 * @param spec
 */
Environment.apply = function(spec) {
  for(var prop in spec) {
    Environment[prop] = spec[prop];
  }
};

/**
 * Binaries
 * @description map of binary path dervied via system type.
 * @type {{nix: string, win: string}}
 */
var binaries = {
  nix: 'sh ./bin/nix/app.sh',
  win: __dirname+'\\bin\\win\\app.bat'
};

//
// APP_NAME Platform entry.
//------------------------------------------------------------------------------------------//
// @description
module.exports = function(spec) {
  // Ingest environment config.
  Environment.apply((spec.environment || {}));

  return {
    up: function() {
      return exec(binaries[Environment.platform.map[Environment.platform.label]]).exec();
    }
  }
};