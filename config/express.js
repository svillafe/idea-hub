'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	path = require('path'),
	apiRoutes = require('../src/server/routes');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Showing stack errors
	app.set('showStackError', true);

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
  
	// Add headers
	app.use(function (req, res, next) {
	  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('Content-Security-Policy', 'Content-Security-Policy-Report-Only');
      res.setHeader('X-Permitted-Cross-Domain-Policies', 'master-only');
      // Website you wish to allow to connect
	  res.setHeader('Access-Control-Allow-Origin', '*');
	  // Request methods you wish to allow
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	  // Request headers you wish to allow
	  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	  // Set to true if you need the website to include cookies in the requests sent
	  // to the API (e.g. in case you use sessions)
	  res.setHeader('Access-Control-Allow-Credentials', true);
	  // Pass to next layer of middleware
	  next();
	});

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));
	apiRoutes(app);

	return app;
};
