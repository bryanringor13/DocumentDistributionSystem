import path from 'path';

module.exports = {
  root: path.resolve(__dirname, '../', '../'),
  outputPath: path.resolve(__dirname, '../', '../', 'build'),
  entryPath: path.resolve(__dirname, '../', '../', 'src/index.jsx'),
  templatePath: path.resolve(__dirname, '../', '../', 'public/index.html'),
  logoPath: path.resolve(__dirname, '../', '../', 'public/logo.png'),
  faviconPath: path.resolve(__dirname, '../', '../', 'public/favicon.ico'),
  manifestPath: 'static/manifest',
  imagesFolder: 'static/img',
  cssFolder: 'static/css',
  jsFolder: 'static/js',
};
