import paths from './paths';
import rules from './rules.dev';

const { HotModuleReplacementPlugin } = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  module: {
    rules,
  },
  output: {
    filename: '[name].[hash].js',
    path: paths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
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
  },
  devServer: {
    contentBase: paths.outputPath,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),

    new WebpackPwaManifest({
      name: 'Intellicare Document Distribution System',
      description: 'Intellicare Document Distribution System powered by Veridata.',
      background_color: '#F2F4F7',
      theme_color: '#41B67F',
      inject: true,
      ios: true,
    }),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: 'bundle-analyzer-report.html',
    //   openAnalyzer: false,
    // }),
  ],
};
