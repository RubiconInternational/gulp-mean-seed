'use strict';

/***********************************************************************************************************************************************
 * APP_NAME GULP FILE
 ***********************************************************************************************************************************************
 * @description
 */

//
// DEPENDENCIES
//------------------------------------------------------------------------------------------//
// @description
var gulp = require('gulp');
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var run = require('run-sequence');
var angularFileSort = require('gulp-angular-filesort');
var exec = require('gulp-run');
var OS = require('os');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var system = require('./system.json');

//
// BINARIES
//------------------------------------------------------------------------------------------//
// @description
var Binaries = {
  nix: {tpl: __dirname+'/bin/nix/_app.sh', exec: __dirname+'/bin/nix/app.sh', command: 'sh'},
  win: {tpl: __dirname+'\\bin\\win\\_app.bat', exec: __dirname+'\\bin\\win\\app.bat', command: ''}
};

//
// ENVIRONMENT
//------------------------------------------------------------------------------------------//
// @description
var Environment = {host: 'localhost', port: 3000, placeholder: 'APP_ENV', setting: fs.readFileSync(__dirname+'/.env', {encoding: 'UTF-8'})};
    Environment.platform = {label: OS.platform(), map: {}};

// Feels pointless but let's me use maps for the rest of the implementation
Environment.platform.label.match('darwin') ?
  Environment.platform.map[Environment.platform.label] = 'nix' :
    Environment.platform.map[Environment.platform.label] = 'win';

Environment.apply = function(env) {
  for(var prop in system.environments[env]) {
    Environment[prop] = system.environments[env][prop];
  }
};

/**
 * Apply
 * @description re-writes the placeholder into the actual development name
 */
gulp.task('environment.binary', function() {
  var binary = Binaries[Environment.platform.map[Environment.platform.label]];
  var base = __dirname+'/bin/'+Environment.platform.map[Environment.platform.label];
  console.log(Environment, binary.tpl)
  return gulp.src(binary.tpl)
    .pipe(replace(/APP_ENV/g, Environment.setting))
    .pipe(rename(function(path) {
      console.log(path)
      path.basename = path.basename.split('_')[1];
      //console.log(path)
    }))
    .pipe(gulp.dest(base));
});

/**
 * Write the appropriate app name into the environment variable.
 */
gulp.task('environment.app', function() {
  var base = __dirname;

  gulp.src(base+'/.env', {base:base})
    .pipe(replace(/([a-zA-Z0-9])\w+/g, 'var env = "'+Environment.setting+'";'))
    .pipe(rename(function(path) {
      path.basename = path.basename.split('.')[1];
      path.extname = '.js';
    }))
    .pipe(gulp.dest(base+'/app'));
});
//
// STYLE TASKS
//------------------------------------------------------------------------------------------//
// @description CSS precompilation, etc

//
// SCRIPT TASKS
//------------------------------------------------------------------------------------------//
// @description Linting, concatenation, etc.
gulp.task('scripts.concat', function() {
  return gulp.src(['app/system/**/*.js', 'app/modules/**/*.js', 'app/env.js', 'app/app.js'])
    .pipe(angularFileSort())
    .pipe(concat('APP_NAME.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('scripts.inject', function() {
  var target = gulp.src('app/index.html');
  var sources = gulp.src('.tmp/APP_NAME.js');

  return target.pipe(inject(sources, {relative: true,
    transform: function() {
      return '<script src="APP_NAME.js"></script>';
    }
  }))
  .pipe(gulp.dest('app'));
});

//
// CONNECT TASKS
//------------------------------------------------------------------------------------------//
// @description

gulp.task('watch', function() {
  return gulp.watch(['app/app.js', 'app/index.html', 'app/modules/**/*'], function(event) {
    return gulp.src(event.path)
      .pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  return connect.server({
    root: ['app', '.tmp'],
    port: Environment.port,
    livereload: true
  });
});

//
// SERVING
//------------------------------------------------------------------------------------------//
// @description Launches app.
gulp.task('serve', function() {
  Environment.setting = argv.env || 'development';
  Environment.apply(Environment.setting);

  run(['environment.app'], 'scripts.concat', ['scripts.inject', 'connect', 'watch']);
});

module.exports = function() {

  return {
    up: function() {
      var bin = Binaries[Environment.platform.map[Environment.platform.label]];
      run('environment.binary', function() {
        exec(bin.command +' '+ bin.exec).exec();
      });
    }
  }
};