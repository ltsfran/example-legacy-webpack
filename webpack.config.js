const path = require('path')
const PugPlugin = require('pug-plugin')
const WebpackUtil = require('./webpack.utils')

module.exports = {
  mode: 'production',
  entry: WebpackUtil.filesToCompileSync('pug/modules', /\.pug$/),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/js/[name].[contenthash:8].js'
  },
  plugins: [
    new PugPlugin({
      pretty: true,
      filename: '[name].phtml',
      extractCss: {
        filename: 'css/[name].css'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader
      },
      {
        test: /\.(css|styl)$/,
        use: ['css-loader', 'stylus-loader']
      }
    ]
  }
}
