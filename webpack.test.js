const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

let testConfig = {
  mode: 'development',
  entry: './tests/all-tests',
  output: {
    filename: 'testBundle.js'
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.ts', '.json', '.js'],
  },
  target: 'node',
  devtool: 'source-map',
  externals: [NodeExternals()],
  /*node: {
    fs: 'empty',
  },*/
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'tests'),
        ]
      }
    ]
  }
};

module.exports = testConfig;