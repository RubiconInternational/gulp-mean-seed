'use strict';

/***********************************************************************************************************************************************
 * APP_NAME GULP FILE
 ***********************************************************************************************************************************************
 * @description
 */
var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var run = require('run-sequence');
var angularFileSort = require('gulp-angular-filesort');

//
// STYLE TASKS
//------------------------------------------------------------------------------------------//
// @description CSS precompilation, etc

//
// SCRIPT TASKS
//------------------------------------------------------------------------------------------//
// @description Linting, concatenation, etc.
gulp.task('scripts.concat', function() {
  return gulp.src(['app/system/**/*.js', 'app/modules/**/*.js', 'app/app.js'])
    .pipe(angularFileSort())
    .pipe(concat('APP_NAME.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('inject.scripts', function() {
  var target = gulp.src('app/index.html');
  var sources = gulp.src('.tmp/APP_NAME.js');

  return target.pipe(inject(sources, {relative: true,
      transform: function(filepath) {
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
    port: 9000,
    livereload: true
  });
});

//
// SERVING
//------------------------------------------------------------------------------------------//
// @description Launches app.
gulp.task('serve', function() {
  run('scripts.concat', ['inject.scripts', 'connect', 'watch']);
});