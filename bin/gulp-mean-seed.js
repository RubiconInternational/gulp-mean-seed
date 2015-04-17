#!/usr/bin/env node

/***********************************************************************************************************************************************
 *  GULP NG SEED CLI
 ***********************************************************************************************************************************************
 * @description
 */
var gulp = require('gulp');
var replace = require('gulp-replace');
var sequence = require('run-sequence').use(gulp);
var argv = require('minimist')(process.argv.slice(2));
var OS = require('os');
var run = require('gulp-run');
var cwd = argv.cwd || process.cwd();
var chalk = require('chalk');

//
// SET UP
//------------------------------------------------------------------------------------------//
// @description
process.chdir(cwd);

//
// SEED CONFIG
//------------------------------------------------------------------------------------------//
// @description
var Seed = {
  name: 'gulpNgSeed', // Default name,
  paths: {origin: __dirname, dest: cwd}
};

// Name
Seed.name = argv._[0] || Seed.name;
Seed.paths.separator = OS.platform().match('win')? '\\' : '/';
Seed.paths.origin = Seed.paths.origin + Seed.paths.separator + '..' + Seed.paths.separator;
Seed.paths.src = Seed.paths.origin + 'seed'+ Seed.paths.separator +'**' + Seed.paths.separator + '*';
Seed.paths.dest = Seed.paths.dest + Seed.paths.separator  +Seed.name;

//
// SEED TASKS
//------------------------------------------------------------------------------------------//
// @description
gulp.task('seed', function() {
  console.log(chalk.cyan.bold('Copying Seed assets...'));
  return gulp.src(Seed.paths.src)
    .pipe(replace(/APP_NAME/g, Seed.name))
    .pipe(gulp.dest(Seed.paths.dest));
});


//
// SEED SEQUENCE
//------------------------------------------------------------------------------------------//
// @description
sequence('seed', function() {
  console.log(chalk.cyan.bold('Done.'));
  process.chdir(cwd+Seed.paths.separator+Seed.name);
  console.log(chalk.cyan.bold('Copying bowerrc...'));
  run('cp -a '+ Seed.paths.origin + 'seed'+Seed.paths.separator + '.bowerrc '+ cwd+Seed.paths.separator+Seed.name+Seed.paths.separator+'.bowerrc').exec();
  console.log(chalk.cyan.bold('Copying Seed assets...'));
  console.log(chalk.cyan.bold('Running NPM and Bower install...'));
  run('npm install && bower install').exec();
  console.log(chalk.cyan.bold('Done! run gulp serve from your new application!'));
});

