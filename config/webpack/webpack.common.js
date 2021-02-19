import paths from './paths';

const { ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: paths.entryPath,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.scss', '.less', '.css'],
  },
  plugins: [
    new Dotenv(),
    new ProgressPlugin(),

    new HtmlWebpackPlugin({
      title: 'Intellicare Document Distribution System',
      template: paths.templatePath,
      favicon: paths.faviconPath,
      meta: {
        viewport:
          'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,shrink-to-fit=no',
        HandheldFriendly: 'True',
        MobileOptimized: '480',
        'format-detection': 'telephone=no',
      },
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

    new MiniCssExtractPlugin({
      filename: `${paths.cssFolder}/[name].[contenthash].css`,
      chunkFilename: `${paths.cssFolder}/[id].[contenthash].css`,
    }),

    // new CopyWebpackPlugin([]),
  ],
};
