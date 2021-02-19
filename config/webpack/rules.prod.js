import paths from './paths';

// Temporarily copy config from rules.dev.js
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: [/node_modules/, /\.test\.js(x)?$/],
    loader: 'babel-loader',
  },
  {
    test: /\.less$/,
    // use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    use: ['style-loader', 'css-loader', 'less-loader'],
  },
  {
    test: /\.css$/i,
    // use: [MiniCssExtractPlugin.loader, 'css-loader'],
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.s[ac]ss$/i,
    // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[contenthash].[ext]',
          outputPath: paths.imagesFolder,
        },
      },
    ],
  },
  // {
  //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  //   use: [
  //     { loader: 'babel-loader' },
  //     {
  //       loader: '@svgr/webpack',
  //       options: {
  //         babel: false,
  //         icon: true,
  //       },
  //     },
  //   ],
  // },
];
