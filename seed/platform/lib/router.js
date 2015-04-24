'use strict';

/***********************************************************************************************************************************************
 * APP_NAME ROUTER
 ***********************************************************************************************************************************************
 * @description
 */
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

//
// Module
//------------------------------------------------------------------------------------------//
// @description
module.exports = function(APP_NAME) {
  return {
    /**
     * express instance
     */
    instance: null,
    /**
     * Create Server
     * @returns {exports}
     */
    create: function() {

      // Create express instance
      this.instance = express();

      // Add body-parser
      this.instance.use(bodyParser.json());
      this.instance.use(bodyParser.urlencoded({extended: true}));
      this.instance.use(bodyParser());

      // Simple CORS handling.
      this.instance.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        res.header('Access-Control-Expose-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        if ('OPTIONS' == req.method) {
          res.send(200);
        } else {
          next();
        }
      });

      // Logging
      this.instance.get('*', function(req, res, next) {
        APP_NAME.Logger.log({type: 'router', message: 'GET on: '+ req.path + ' Params: ' + APP_NAME.Logger.log.format(req.params)});
      });

      return this;
    },
    /**
     * Start server
     * @returns {*|promise}
     */
    start: function() {
      var def = APP_NAME.Utils.q.defer(),
        self = this;

      http.createServer(this.instance).listen(APP_NAME.Config.Server.port, function() {

        APP_NAME.Logger.log({type: 'success', message: 'Sever started on port: ' + APP_NAME.Config.Server.port});

        def.resolve(self.instance);
      });

      return def.promise;
    }
  };
};