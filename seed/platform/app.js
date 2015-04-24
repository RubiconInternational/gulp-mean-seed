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
var APP_NAME = {Config: {}};

//
// APP_NAME CONFIG - Environment
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Config.Environment = system.environments[argv.env];

//
// APP_NAME CONFIG - DB
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Config.DB = {name: 'APP_NAME'};

//
// APP_NAME CONFIG - Modules
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Config.Modules = {path: __dirname+'/modules'};

//
// APP_NAME LOGGING
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Logger = require('./lib/logger')(APP_NAME);

//
// APP_NAME ROUTER
//------------------------------------------------------------------------------------------//
// @description
APP_NAME.Router = require('./lib/router')(APP_NAME);

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