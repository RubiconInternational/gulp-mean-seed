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
var replace = require('gulp-replace');
var rename = require('gulp-rename');

//
// ENVIRONMENT
//------------------------------------------------------------------------------------------//
// @description
var Environment = {setting: 'development'};

Environment.set = function(module, file) {
  var base = './'+module;

  return gulp.src(file, {base:base})
    .pipe(replace(/([a-zA-Z0-9])\w+/g, Environment.setting))
    .pipe(gulp.dest(base));
};

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
    all: function(task, cb) {
      for(var module in modules) {
        var fn = modules[module][task];

        if(fn) { fn(cb); }
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
    },
    /**
     * Process systerm requirements and transfer the specified files.
     * @param name
     * @param required
     */
    required: function(name, required) {
      console.log(name, required);
      name = name.split('.');

      name = {
        basename: name[0],
        extname: name[1]
      };

      return gulp.src(required.src)
        .pipe(rename(function(path) {
          for(var prop in name) {
            if(name[prop]) {
              path[prop] = name[prop];
            }
          }

          path.extname = '.'+path.extname;
        }))
        .pipe(gulp.dest(required.dest));
    }
  };

  // Set execution environment
  Environment.setting = argv.env || Environment.setting;

  // Require - TODO: convert strings into config for reusability
  for(var module in manifest) {
    // Write environment vars
    Environment.set(module, manifest[module].env);
    // Create reference to module API.
    modules[module] = require(manifest[module].module)();
    // Register gulp tasks by system
    gulp.register('systems.'+module, function() { console.log('Available tasks for this system are: ', API.tasks(module)); })
    // Supply subsystems with any required config items.
    for(var required in manifest[module].requires) {
      API.required(required, manifest[module].requires[required]);
    }
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

/**
 * Serve
 */
gulp.task('systems.build', function(cb) {
  Systems.all('build', function(system) {
    gulp.src(__dirname+'/'+system+'/dist/**/*')
      .pipe(gulp.dest('./build/'+system));
  });
});

//
// INIT
//------------------------------------------------------------------------------------------//
// @description
// Create the partial while preserving namespace
Systems = Systems();