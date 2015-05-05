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
var rimraf = require('rimraf');
var system = require('./system.json');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var server;

//
// BINARIES
//------------------------------------------------------------------------------------------//
// @description
var Binaries = {
  darwin: {tpl: __dirname+'/bin/nix/_darwin.sh', exec: __dirname+'/bin/nix/darwin.sh', command: 'sh', base: __dirname+'/bin/nix/'},
  linux: {tpl: __dirname+'/bin/nix/_linux.sh', exec: __dirname+'/bin/nix/linux.sh', command: 'sh', base: __dirname+'/bin/nix/'},
  win: {tpl: __dirname+'\\bin\\win\\_app.bat', exec: __dirname+'\\bin\\win\\app.bat', command: '', base: __dirname+'/bin/win/'}
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

/**
 * Write the appropriate app name into the environment variable.
 */
gulp.task('environment.app', function() {
  var base = __dirname;

  return gulp.src(base+'/.env', {base:base})
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
var Styles = {};
    Styles.name = 'APP_NAME.css';
    Styles.src = ['sass/main.scss'];
    Styles.dest = '.tmp';

/**
 * Clean
 */
gulp.task('styles.clean', function(cb) {
  rimraf(Styles.dest + '/' + Styles.name, function() {
    cb();
  });
});

/**
 * Compile
 */
gulp.task('styles.compile', function() {
  return gulp.src(Styles.src)
    .pipe(sass())
    .pipe(gulp.dest(Styles.dest));
});

gulp.task('styles.vendor', function() {

});

//
// FONT TASKS
//------------------------------------------------------------------------------------------//
// @description
var Fonts = {};
    Fonts.src = ['app/bower_components/bootstrap-sass-official/assets/fonts/**/*', 'fonts/**/*'];
    Fonts.dest = '.tmp/fonts/';

gulp.task('fonts.tmp', function() {
  return gulp.src(Fonts.src)
    .pipe(gulp.dest(Fonts.dest))
});


//
// SCRIPT TASKS
//------------------------------------------------------------------------------------------//
// @description Linting, concatenation, etc.
var Scripts = {};
    Scripts.name = 'APP_NAME.js';
    Scripts.config = 'config.js';
    Scripts.src = ['app/config.js', 'app/system/**/*.js', 'app/modules/**/*.js', 'app/env.js', 'app/app.js'];
    Scripts.dest = '.tmp';

/**
 * Clean
 */
gulp.task('scripts.clean', function(cb) {
  rimraf(Scripts.dest + '/' + Scripts.name, function() {
    cb();
  });
});


gulp.task('scripts.config', function() {
  server = require('./server.json');

  return gulp.src(Scripts.config)
    .pipe(replace(/APP_CONFIG/, JSON.stringify(server)))
    .pipe(rename(function(path) {
      path.basename = 'config';
      path.extname = '.js';
    }))
    .pipe(gulp.dest(__dirname+'/app'));
});

/**
 * Concat
 */
gulp.task('scripts.concat', function() {
  return gulp.src(Scripts.src)
    .pipe(angularFileSort())
    .pipe(concat(Scripts.name))
    .pipe(gulp.dest(Scripts.dest));
});

/**
 * Inject
 */
gulp.task('scripts.inject', function() {
  var target = gulp.src('app/index.html');
  var sources = gulp.src(Scripts.dest + '/' + Scripts.name);

  return target.pipe(inject(sources, {relative: true,
    transform: function() {
      return '<script src="'+Scripts.name+'"></script>';
    }
  }))
  .pipe(gulp.dest('app'));
});

gulp.task('scripts.vendor', function() {
  var assets = useref.assets();

  return gulp.src('app/index.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

//
// RELOAD TASKS
//------------------------------------------------------------------------------------------//
// @description @TODO, make this more map driven.

var Reload = function(file, cb) {
  if(file.match('.js')) { Reload.scripts(cb); }
  else if(file.match('.scss')) { Reload.styles(cb); }
  else { cb();}
};

Reload.scripts = function(cb) {
  run('scripts.clean', 'scripts.concat', 'scripts.inject', function() {
    cb();
  });
};

Reload.styles = function(cb) {
  run('styles.clean', 'styles.compile', function() {
    cb();
  });
};

//
// CONNECT TASKS
//------------------------------------------------------------------------------------------//
// @description


gulp.task('watch', function(cb) {
  return gulp.watch(['app/app.js', 'app/index.html', 'app/modules/**/*', 'app/system/**/*', 'sass/**/*'], function(event) {

    // Run type-driven reload tasks.
    Reload(event.path, function() {
      gulp.src(event.path)
        .pipe(connect.reload());
    });
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

  run(['environment.app'], 'scripts.config', 'scripts.concat', 'fonts.tmp', 'styles.clean', 'styles.compile', ['scripts.inject', 'connect', 'watch']);
});

//
// BUILD
//------------------------------------------------------------------------------------------//
// @description
var Build = {};
    Build.dest = 'dist/';
    Build.assets = [
      {dest:'', src:'.tmp/APP_NAME.js'},
      {dest: '',  src:'.tmp/main.css'},
      {dest: 'fonts', src:'.tmp/fonts/**/*'},
      {dest: 'images', src: 'app/images/**/*'},
      {dest: 'system', src:'app/system/**/*.html'},
      {dest: 'modules', src:'app/modules/**/*.html'}
    ];

/**
 * Build
 */
gulp.task('build', function(cb) {
  Environment.setting = argv.env || 'development';
  Environment.apply(Environment.setting);

  rimraf(Build.dest, function() {
    run(['environment.app'], 'scripts.config', 'scripts.concat', 'fonts.tmp', 'styles.clean', 'styles.compile', 'scripts.inject', 'scripts.vendor', function() {
      Build.assets.forEach(function(asset) {
        gulp.src(asset.src)
          .pipe(gulp.dest(Build.dest + asset.dest));
      });

      cb();
    });
  });
});

//
// API
//------------------------------------------------------------------------------------------//
// @description
module.exports = function() {

  return {
    up: function() {
      var bin = Binaries[Environment.platform.map[Environment.platform.label]];

      console.log(__dirname);
      run('environment.binary', function() {
        exec(bin.command +' '+ bin.exec + ' '+ __dirname).exec();
      });
    },
    build: function(cb) {
      exec('cd '+__dirname+' && gulp build --env '+ Environment.setting).exec(function() {
        if(cb) { cb('client'); }
      });
    }
  }
};