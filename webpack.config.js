const path = require('path');

module.exports = {
  entry: './src/gazepass.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gazepass.js',
    library: 'Gazepass',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default'
  },
};
