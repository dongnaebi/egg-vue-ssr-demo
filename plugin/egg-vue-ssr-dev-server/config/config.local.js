/* eslint valid-jsdoc: "off" */

'use strict'

module.exports = appInfo => {
  const config = exports = {}
  config.vueSsrDevServer = {
    serverConfig: 'app/build/webpack.server.config.js',
    clientConfig: 'app/build/webpack.client.config.js',
    publicPath: '/public/dist/'
  }
  return {
    ...config
  }
}
