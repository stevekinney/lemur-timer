const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    application: ['babel-polyfill', './src/index.js'],
    worker: ['babel-polyfill', './src/worker.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'es2017']
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\''
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  },
  devtool: '#eval'
};
