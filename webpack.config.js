// import babel from '@rollup/plugin-babel'
const path = require('path')
const targetPath = '/d/Projects/rongzer-uni-app/rongzer-template/components/rz-ui/components/rz-flow/lib'

module.exports = {
    entry: "./src/Flow.ts",
    mode: "production",
    output: {
      filename: 'flow.js',
      // path: path.resolve(__dirname, 'lib'),
      path: targetPath,
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
    resolve: {
      extensions: ['.ts', '.js']
    }
  };