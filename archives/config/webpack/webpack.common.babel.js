/* eslint-disable import/no-extraneous-dependencies */
// import paths from './paths';
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: paths.entryPath,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.scss', '.less', '.css'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: `${paths.cssFolder}/[name].[contenthash].css`,
      chunkFilename: `${paths.cssFolder}/[id].[contenthash].css`,
    }),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      favicon: paths.faviconPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img',
        to: 'assets/img',
      },
    ]),
  ],
};
