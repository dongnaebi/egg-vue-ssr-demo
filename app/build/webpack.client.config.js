const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
// const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const isProd = process.env.NODE_ENV === 'production'
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

function recursiveIssuer (m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer)
  } else if (m.name) {
    return m.name
  } else {
    return false
  }
}

let webpackConfig = {
  devtool: isProd
    ? false
    : 'cheap-module-eval-source-map',
  entry: {
    app: ['./app/src/entry-client.js']
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
    splitChunks: {
      cacheGroups: {
        antdStyles: {
          name: 'antd',
          test: (m, c, entry = 'antd') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        commonStyles: {
          name: 'common',
          test: (m, c, entry = 'common') => {
            return (m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry)
          },
          chunks: 'all',
          enforce: true
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
