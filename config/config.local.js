'use strict'
const path = require('path')
module.exports = appInfo => {
  const config = exports = {}
  config.vueSsrDevServer = {
    serverConfig: path.join(appInfo.baseDir, 'build/webpack.server.config.js'),
    clientConfig: path.join(appInfo.baseDir, 'build/webpack.client.config.js'),
    publicPath: '/public/dist/',
    proxy: {
      /* '/api': {
        target: 'https://eggjs.org/',
        changeOrigin: true
      }, */
      '/api2': {
        target: 'https://github.com/',
        changeOrigin: true
      }
    }
  }

  return {
    ...config
  }
}
