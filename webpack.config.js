var debug   = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  //Input file
  entry: "./client/js/client.js",
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        /* 
         * Anything that is a JS file, excluding node modules
         * components, get runs through the babel-loader.
         */
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  //Output file
  output: {
    path: __dirname + "/src/client/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};