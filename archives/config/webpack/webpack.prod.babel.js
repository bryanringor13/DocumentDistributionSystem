/* eslint-disable import/no-extraneous-dependencies */
// import paths from './paths';
// import rules from './rules.prod';

const paths = require('./paths');
const rules = requrie('./rules.prod');

const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CompressionPlugin = require('compression-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

module.exports = {
  mode: 'production',
  module: {
    rules,
  },
  output: {
    filename: `${paths.jsFolder}/[name].[hash].js`,
    path: paths.outputPath,
    chunkFilename: `${paths.jsFolder}/[name].[chunkhash].js`,
  },
  optimization: {
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    minimize: true,
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({
        // eslint-disable-next-line global-require
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: false,
      }),

      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),

      new WebpackPwaManifest({
        name: 'Veridata Partner Network Portal',
        short_name: 'Veridata PNP',
        description: 'Veridata PNP',
        background_color: '#f2f4f7',
        theme_color: '#41B67F',
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('public/logo.png'),
            sizes: [72, 96, 128, 144, 192, 384, 512],
          },
          {
            src: path.resolve('public/logo.png'),
            sizes: [120, 152, 167, 180],
            ios: true,
          },
        ],
      }),

      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
    ],
  },
  devtool: 'source-map',
  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};
