const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

let webpackConfig = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, '../app/public/dist'),
    publicPath: '/public/dist/',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.json', '.scss', 'less'],
    alias: {
      '~': path.resolve(__dirname, '../src')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'vue-style-loader'
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'less-loader',
          options: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name].[ext]?[hash]',
          esModule: false
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: { hmr: !isProd }
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css'
    }),
    new VueLoaderPlugin()
  ]
}
if (!isProd) {
  webpackConfig.plugins.push(new FriendlyErrorsPlugin())
}
module.exports = webpackConfig
