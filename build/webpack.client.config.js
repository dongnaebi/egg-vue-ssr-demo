const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const isProd = process.env.NODE_ENV === 'production'
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let webpackConfig = {
  devtool: isProd
    ? false
    : 'cheap-module-eval-source-map',
  entry: {
    app: ['./src/entry-client.js']
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
    new ProgressBarPlugin({
      width: 100,
      format: `webpack client build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false
    })
  ],
  optimization: {
    runtimeChunk: !isProd, // 这个不能删，详见：https://github.com/webpack/webpack/issues/6693#issuecomment-408764786
    splitChunks: {
      chunks: 'all',
      minSize: 5000,
      minChunks: 1,
      maxInitialRequests: 4,
      cacheGroups: {
        vue: {
          name: 'vue',
          chunks: 'all',
          test: /node_modules\/vue((?!awesome).)*$/,
          priority: 3
        },
        antd: {
          name: 'antd',
          chunks: 'all',
          test: /ant-design/,
          priority: 2
        },
        moment: {
          name: 'moment',
          chunks: 'all',
          test: /moment/,
          priority: 1
        }
      }
    }
  }
}
if (isProd) {
  webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({}))
}
const config = merge(base, webpackConfig)

/* if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'demo',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        }
      ]
    })
  )
} */

module.exports = config
