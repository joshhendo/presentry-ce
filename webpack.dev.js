const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

let mainConfig = {
  mode: 'development',
  entry: './src/main/main.ts',
  target: 'electron-main',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: __dirname + '/dist',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'source-map-loader',
        },
        enforce: 'pre',
      },
      {
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};

let rendererConfig = {
  mode: 'development',
  entry: './src/views/renderer.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  output: {
    filename: 'renderer.bundle.js',
    path: __dirname + '/dist',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx', '.json', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules|tests/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/views/index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

let presenterConfig = {
  mode: 'development',
  entry: './src/views/presentation/presenter.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  output: {
    filename: 'presenter.bundle.js',
    path: __dirname + '/dist',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.ts', '.json', '.js'],
  },
  module: {
    rules: [
      {
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules|tests/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/views/presentation/canvas.html'),
      filename: 'canvas.html',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

module.exports = [mainConfig, rendererConfig, presenterConfig];
