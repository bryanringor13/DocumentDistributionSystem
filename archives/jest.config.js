module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '\\.(css|scss)$': '<rootDir>/assetsTransformer.js',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/serviceWorker.js',
    '!**/index.js',
    '!**/index.jsx',
    '!**/setupTests.js',
    '!**/assetsTransformer.js',
    '!**/*.config.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
