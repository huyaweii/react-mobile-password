// react-cat/webpack.config.js
const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'production',
  entry:  './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "lib"),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
            // options: ['@babel/preset-env']
          }
        ]
      },
      { 
        test: /\.(css|scss)$/, 
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?modules=true'
            // modules: true
          }, 
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }

  // plugins: [
  //   new CleanWebpackPlugin(['lib'])
  // ]
}
