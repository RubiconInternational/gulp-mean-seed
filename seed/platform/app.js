'use strict';

/***********************************************************************************************************************************************
 * APP_NAME APPLICATION BINARY
 ***********************************************************************************************************************************************
 * @description
 */

//
// DEPENDENCIES
//------------------------------------------------------------------------------------------//
// @description
var argv = require('minimist')(process.argv.slice(2));
var system = require('./system.json');

//
// APP_NAME NAMESPACE
//------------------------------------------------------------------------------------------//
// @description
var APP_NAME = {};

//
// APP_NAME CONFIG
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Config = {};
APP_NAME.Config.Environment = system.environments[argv.env]; // Ingested environment specs
APP_NAME.Config.DB = {name: 'APP_NAME'}; // DB Config.
APP_NAME.Config.Modules = {path: __dirname+'/modules'}; // Module Config
APP_NAME.Config.Router = {port: APP_NAME.Config.Environment.port}; // Router Config.

//
// APP_NAME UTILS
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Utils = require('./lib/utils');

//
// APP_NAME LOGGING
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Logger = require('./lib/logger')(APP_NAME);

//
// APP_NAME ROUTER
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Router = require('./lib/router')(APP_NAME).create();

//
// APP_NAME DAL
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.DAL = require('archives')(APP_NAME.Config);

//
// APP_NAME MODULES
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Modules = require('./lib/modules')(APP_NAME);

//
// INIT
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.DAL.start().then(function() {
  APP_NAME.Modules.load().then(function() {
    APP_NAME.Router.start().then(function() {});
  });
});