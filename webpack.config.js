const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './app/js/index.js',
  output: {
    path: path.join(__dirname, './app/js'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env'] }
          }
        ]
      }
    ]
  },
  watch: true
};
