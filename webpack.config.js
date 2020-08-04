const os = require('os');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const happyPack = require('happypack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const outputPath = path.resolve(__dirname, '../rz-uni/rz-ui/components/rz-flow/lib')

module.exports = {
  entry: "./src/Flow.ts",
  mode: "production",
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  output: {
    filename: 'flow.js',
    // path: path.resolve(__dirname, 'lib'),
    path: outputPath,
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
    }),
    // new HTMLPlugin({
    //   template: path.resolve(__dirname, './src/index.html')
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};