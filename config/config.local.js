'use strict'
const path = require('path')
module.exports = appInfo => {
  const config = exports = {}
  config.vueSsrDevServer = {
    serverConfig: path.join(appInfo.baseDir, 'app/build/webpack.server.config.js'),
    clientConfig: path.join(appInfo.baseDir, 'app/build/webpack.client.config.js'),
    publicPath: '/public/dist/'
  }

  return {
    ...config
  }
}
