const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../', '../'),
  outputPath: path.resolve(__dirname, '../', '../', 'build'),
  entryPath: path.resolve(__dirname, '../', '../', 'src/index.jsx'),
  templatePath: path.resolve(__dirname, '../', '../', 'public/index.html'),
  faviconPath: path.resolve(__dirname, '../', '../', 'public/favicon.ico'),
  antdIcons: path.resolve(__dirname, '../', '../', 'src/components/common/Icons/antd-icons.js'),
  imagesFolder: 'assets/images',
  cssFolder: 'css',
  jsFolder: 'js',
};
