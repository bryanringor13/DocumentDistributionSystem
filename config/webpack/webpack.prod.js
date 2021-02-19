import paths from './paths';
import rules from './rules.prod';

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
    minimize: true,
    usedExports: true,
    sideEffects: true,
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
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

      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-analyzer-report.html',
        openAnalyzer: false,
      }),
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      name: 'Intellicare Document Distribution System',
      description: 'Intellicare Document Distribution System powered by Veridata.',
      background_color: '#F2F4F7',
      theme_color: '#41B67F',
      inject: true,
      ios: true,
      filename: 'manifest.json',
      icons: [
        {
          src: paths.logoPath,
          sizes: [72, 96, 128, 144, 192, 384, 512],
          destination: paths.manifestPath,
        },
        {
          src: paths.logoPath,
          sizes: [120, 152, 167, 180],
          destination: paths.manifestPath,
          ios: true,
        },
      ],
    }),
  ],
  devtool: 'cheap-module-source-map',
  performance: {
    assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};
