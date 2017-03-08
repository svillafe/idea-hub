'use strict';
/**
 * Module dependencies.
 */
var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 8080;

var dbURL = process.env.MONGODB_URI|| process.env.MONGOLAB_URI || 'mongodb://localhost/idea-hub';

// Bootstrap db connection
var db = mongoose.connect(dbURL, function(err) {
    if (err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    }
});

// Init the express application
var app = require('./config/express')(db);

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
}

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/src/client/index.html')
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});