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
  var Router = express();

  /**
   * Create Server
   * @returns {exports}
   */
  Router.create = function() {
    
    // Add body-parser
    Router.use(bodyParser.json());
    Router.use(bodyParser.urlencoded({extended: true}));
    Router.use(bodyParser());

    // Simple CORS handling.
    Router.all('*', function(req, res, next) {
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
    Router.get('*', function(req, res, next) {
      APP_NAME.Logger.log({type: 'router', message: 'GET on: '+ req.path + ' Params: ' + APP_NAME.Logger.log.format(req.params)});
      next();
    });

    // Bse Route
    Router.get('/', function(req, res) {
      res.send('APP_NAME API');
    });

    return Router;
  };
  
  /**
   * Start server
   * @returns {*|promise}
   */
  Router.start = function() {
    var def = APP_NAME.Utils.q.defer(),
        self = this;
    console.log('start called', APP_NAME.Config.Router)
    http.createServer(Router).listen(APP_NAME.Config.Router.port, function() {
      console.log('wat')
      APP_NAME.Logger.log({type: 'success', message: 'Sever started on port: ' + APP_NAME.Config.Router.port});

      def.resolve(self.instance);
    });

    return def.promise;
  };

  return Router;
};