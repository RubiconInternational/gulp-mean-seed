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
var art = require('ascii-art');

//
// SET UP
//------------------------------------------------------------------------------------------//
// @description
process.chdir(cwd);

//
// CLI
//------------------------------------------------------------------------------------------//
// @description
var CLI = {};
    CLI.prompt = chalk.bold.underline.magenta('GULP-MEAN-SEED: ');
    CLI.message = chalk.bold.cyan;
    CLI.special = chalk.bold.underline.magenta;

//
// SEED CONFIG
//------------------------------------------------------------------------------------------//
// @description
var Seed = {
  name: 'gulpNgSeed', // Default name,
  paths: {origin: __dirname, dest: cwd, separators: {
    darwin: '/',
    linux: '/',
    win: '\\',
    win32: '\\',
    win64: '\\',
    default: '/'
  }}
};

// Name
Seed.name = argv._[0] || Seed.name;
Seed.paths.separator = (Seed.paths.separators[OS.platform()] || Seed.paths.separators.default);
Seed.paths.origin = Seed.paths.origin + Seed.paths.separator + '..' + Seed.paths.separator;
Seed.paths.src = Seed.paths.origin + 'seed'+ Seed.paths.separator +'**' + Seed.paths.separator + '*';
Seed.paths.dest = Seed.paths.dest + Seed.paths.separator  +Seed.name;

//
// SEED TASKS
//------------------------------------------------------------------------------------------//
// @description
gulp.task('seed', function() {
  art.font('GULP-MEAN-SEED', 'Doom', 'magenta', function(rendered) {
    console.log(rendered);
    console.log(CLI.prompt, CLI.message('Thank you for using GULP-MEAN-SEED! \n'));
    console.log(CLI.prompt, CLI.message('Creating App: ', CLI.special(Seed.name)), '\n');
    console.log(CLI.prompt, CLI.message('Copying Seed assets...'));
  });

  return gulp.src(Seed.paths.src)
    .pipe(replace(/APP_NAME/g, Seed.name))
    .pipe(gulp.dest(Seed.paths.dest));
});


//
// SEED SEQUENCE
//------------------------------------------------------------------------------------------//
// @description
sequence('seed', function() {
  // TODO: make this not horrible.
  console.log(CLI.message(CLI.prompt, chalk.bold.cyan('Done.')));
  process.chdir(cwd+Seed.paths.separator+Seed.name);
  console.log(CLI.prompt, CLI.message('Copying config files...'));

  run('cp -a '+ Seed.paths.origin + 'seed'+Seed.paths.separator +'client' + Seed.paths.separator + '.bowerrc ' + cwd + Seed.paths.separator + Seed.name + Seed.paths.separator + '.bowerrc')
    .exec(function() {
      run('cp -a '+ Seed.paths.origin + 'seed'+Seed.paths.separator +'client' + Seed.paths.separator + '.env ' + cwd + Seed.paths.separator + Seed.name + Seed.paths.separator + 'client' + Seed.paths.separator + '.env')
        .exec(function() {
          run('cp -a '+ Seed.paths.origin + 'seed'+Seed.paths.separator +'platform' + Seed.paths.separator + '.env ' + cwd + Seed.paths.separator + Seed.name + Seed.paths.separator + 'platform'+ Seed.paths.separator + '.env')
            .exec(function() {
              console.log(CLI.prompt, CLI.message('Done!'));
              console.log(CLI.prompt, CLI.message('Running NPM and Bower install...'));

              run('npm install').exec(function() {
                run('cd platform && npm install').exec(function() {
                  run('cd client && npm install && bower install').exec(function() {
                    console.log('\n');
                    console.log(CLI.prompt, CLI.message('Done!'));
                    console.log(CLI.prompt,  CLI.message('You can now run: '), chalk.underline.bold.green('`gulp systems.up`'),  CLI.message(' from the root of your new application!'));
                    console.log('\n');
                    console.log(CLI.prompt, chalk.red.bold('NOTICE: '));
                    console.log(CLI.prompt, chalk.red.bold('The seed app demonstrates client/server communication with a stubbed out "users" module and API'));
                    console.log(CLI.prompt, chalk.red.bold('GULP-MEAN-SEED does not want to assume interference with a potentially existing users collection.'));
                    console.log(CLI.prompt, chalk.red.bold('Therefore, if you wish to see the mock users implementation, please run the following:'));
                    console.log(CLI.prompt, chalk.green.bold('$~ cd /path/to/APP_NAME/platform && gulp mogo.seed'));
                    console.log(CLI.prompt, CLI.message('Enjoy using GULP-MEAN-SEED'));
                  });
                });
              });
          });
        });
    });
});

