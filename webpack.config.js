const os = require('os');
const path = require('path');
const happyPack = require('happypack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: "./src/Flow.ts",
  mode: "production",
  output: {
    filename: 'flow.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'Flow',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new happyPack({
      loaders: ['babel-loader'],
      threads: os.cpus().length
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};