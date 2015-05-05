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
var run = require('run-sequence');
var OS = require('os');
var fs = require('fs');
var system = require('./system.json');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var argv = require('minimist')(process.argv.slice(2));
var archives = require('archives')({DB: {name: 'APP_NAME'}});
var chalk = require('chalk');
var rimraf = require('rimraf');

//
// ENVIRONMENT
//------------------------------------------------------------------------------------------//
// @description
var CLI = {};
    CLI.prompt = chalk.magenta.bold.underline('GULP-MEAN-SEED: ');
    CLI.message = chalk.bold.cyan;

//
// BINARIES
//------------------------------------------------------------------------------------------//
// @description
var Binaries = {
  darwin: {tpl: __dirname+'/bin/nix/_darwin.sh', exec: __dirname+'/bin/nix/darwin.sh '+__dirname+'/app.js', command: 'sh', base: __dirname+'/bin/nix/'},
  linux: {tpl: __dirname+'/bin/nix/_linux.sh', exec: __dirname+'/bin/nix/linux.sh '+__dirname+'/app.js', command: 'sh', base: __dirname+'/bin/nix/'},
  win: {tpl: __dirname+'\\bin\\win\\_app.bat', exec: __dirname+'\\bin\\win\\app.bat '+__dirname+'/app.js', command: '', base: __dirname+'/bin/win/'},
  dump: {
    darwin: {exec: __dirname+'/bin/nix/dump.sh', command: 'sh'},
    linux: {exec: __dirname+'/bin/nix/dump.sh', command: 'sh'},
    win: {exec: __dirname+'\\bin\\win\\dump.bat', command: ''}
  }

};

//
// ENVIRONMENT
//------------------------------------------------------------------------------------------//
// @description

var Environment = {host: 'localhost', port: 3000, placeholder: 'development', setting: fs.readFileSync(__dirname+'/.env', {encoding: 'UTF-8'})};
Environment.platform = {label: OS.platform(), map: {}};

// Feels pointless but let's me use maps for the rest of the implementation
(Environment.platform.label.match('darwin') || Environment.platform.label.match('linux')) ?
  Environment.platform.map[Environment.platform.label] = OS.platform() :
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
  var base = binary.base;

  return gulp.src(binary.tpl)
    .pipe(replace(/APP_ENV/g, Environment.setting))
    .pipe(rename(function(path) {
      path.basename = path.basename.split('_')[1];
    }))
    .pipe(gulp.dest(base));
});

//
// MONGO SEED TASKS !! CAUTION !!
//------------------------------------------------------------------------------------------//
// @description
var Mongo = {};
    Mongo.DB = 'APP_NAME';
    Mongo.dump = {
      win: __dirname+'\\db\\',
      darwin: __dirname+'/db/'
    };

/**
 * Seed
 */
gulp.task('mongo.seed', function(cb) {
  console.log(CLI.prompt, CLI.message('Seeding APP_NAME DB...'));
  var users = require('./mocks/users.json');
  var collection;

  archives.start().then(function() {
    collection = archives('users');

    collection.create({record: users}).then(function() {
      console.log(CLI.prompt, CLI.message('Done.'));
      console.log(CLI.prompt, CLI.message('APP_NAME DB now has: ' + users.length +' users.'));
      cb();
      process.exit(0);
    });
  });
});

/**
 * DUMP
 */
gulp.task('mongo.dump', function(cb) {
  var dest = Mongo.dump[Environment.platform.map[Environment.platform.label]] + Date.now();
  var bin = Binaries.dump[Environment.platform.map[Environment.platform.label]];

console.log(bin, dest)
  exec(bin.command + ' ' + bin.exec +' '+dest, function(err) {
    cb();
  }).exec();
});
//
// GULP BUILD
//------------------------------------------------------------------------------------------//
// @description
var Build = {};
    Build.src = ['./**/*', './.env', '!./node_modules', '!./node_modules/**/*', '!./mocks', '!./mocks/**/*'];
    Build.dest = './dist';

gulp.task('build', function(cb) {
  rimraf(Build.dest, function() {
    gulp.src(Build.src)
      .pipe(gulp.dest(Build.dest));
    cb();
  });
});

//
// APP_NAME Platform entry.
//------------------------------------------------------------------------------------------//
// @description
module.exports = function() {
  // Ingest environment config.
  return {
    up: function() {
      var bin = Binaries[Environment.platform.map[Environment.platform.label]];

      run('environment.binary', function() {
        exec(bin.command +' '+ bin.exec).exec();
      });
    },
    build: function(cb) {
      exec('cd '+__dirname+' && gulp build --env '+ Environment.setting).exec(function() {
        if(cb) { cb('platform'); }
      });
    }
  }
};