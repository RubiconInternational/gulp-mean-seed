'use strict';

/***********************************************************************************************************************************************
 * APP_NAME GLOBAL GULP FILE
 ***********************************************************************************************************************************************
 * @description
 */

//
// DEPENDENCIES
//------------------------------------------------------------------------------------------//
// @description
var gulp = require('gulp');
var argv = require('minimist')(process.argv.slice(2));

//
// ENVIRONMENT
//------------------------------------------------------------------------------------------//
// @description
var Environment = {setting: 'development'};

//
// SYSTEMS MANAGEMENT
//------------------------------------------------------------------------------------------//
// @description

var Systems = function() {
  var manifest = require('./systems.json');
  var modules = {};

  var API = {
    /**
     * Runs tasks
     * @param task
     */
    all: function(task) {
      for(var module in modules) {
        modules[module][task]();
      }
    },
    /**
     * Lists the available sub systems
     * @returns {Array}
     */
    list: function() {
      return Object.keys(modules);
    },
    /**
     * Lists the avaialable tasks for a system
     * @param system
     * @returns {Array}
     */
    tasks: function(system) {
      return Object.keys(modules[system]);
    }
  };

  // Set execution environment
  Environment.setting = argv.env || Environment.setting;

  // Require - TODO: convert strings into config for reusability
  for(var module in manifest) {
    var config = require(manifest[module].config);

    // Create reference to module API.
    modules[module] = require(manifest[module].module)({environment: config.environments[Environment.setting]});
    // Register gulp tasks by system
    gulp.register('systems.'+module, function() { console.log('Available tasks for this system are: ', API.tasks(module)); })
    // Register gulp tasks by system tasks
    for(var task in modules[module]) {
      gulp.register(('systems.'+module+'.'+task), modules[module][task]);
    }
  }

  return API;
};

//
// GULP ENTRIES
//------------------------------------------------------------------------------------------//
// @description

/**
 * Registers a gulp task dynamically.
 * @param name
 * @param fn
 * @returns {*}
 */
gulp.register = function(name, fn) {
  return gulp.task(name, fn);
};

/**
 * APP_NAME
 * @description serves as the APP_NAME manifest
 */
gulp.task('APP_NAME', function() {
  console.log('Available tasks for APP_NAME: ', gulp.tasks);
});

/**
 * Systems
 */
gulp.task('systems', function(cb) {
  console.log('Available systems are: ' + Systems.list().join(', '));
  return cb(); // preserve stream
});

/**
 * Serve
 */
gulp.task('systems.up', function(cb) {
  Systems.all('up');
  return cb(); // preserve stream
});

//
// INIT
//------------------------------------------------------------------------------------------//
// @description
// Create the partial while preserving namespace
Systems = Systems();