const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './app/js/index.js',
  watch: true,
  watchOptions: {
    aggregateTimeout: 50
  },
  output: {
    path: path.join(__dirname, './app/js'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env'] }
          }
        ]
      }
    ]
  }
};
