const path = require('path')
const PugPlugin = require('pug-plugin')
const WebpackUtil = require('./webpack.utils')

const mode = process.env.NODE_ENV ?? 'production'
const isProduction = mode === 'production'

module.exports = {
  mode,
  watch: !isProduction,
  entry: WebpackUtil.filesToCompileSync('pug/modules', /\.pug$/),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new PugPlugin({
      pretty: !isProduction,
      filename: '[name].phtml',
      css: {
        filename: (pathData) => {
          const fileDirectory = pathData.filename
            .replace(/\/index\.styl$/, '')
            .replace(`${__dirname}/stylus`, '')
            .replace('modules/', '')
          return `css/${fileDirectory}/index.styl`
        }
      },
      js: {
        filename: (pathData) => {
          const fileDirectory = pathData.filename
            .replace(/\/index\.ts$/, '')
            .replace(`${__dirname}/typescript`, '')
            .replace('modules/', '')
          return `js/${fileDirectory}/index.js`
        }
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
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}
