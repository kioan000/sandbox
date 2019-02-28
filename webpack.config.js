const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './app/index.js',
    second: './app/second.js'
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_module[\\/]/,
          chunks: "all",
          priority: 1
        }
      }
    }
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './app/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './app/second.html',
      filename: './second.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
