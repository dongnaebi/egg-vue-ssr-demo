'use strict'
const path = require('path')

/** @type Egg.EggPlugin */
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}
exports.vueSsrDevServer = {
  enable: true,
  path: path.join(__dirname, '../plugin/egg-vue-ssr-dev-server')
}
/* exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
} */
