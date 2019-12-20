/* eslint valid-jsdoc: "off" */

'use strict'
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567785327174_6944'

  // add your middleware config here
  config.middleware = ['auth']
  config.development = {
  	ignoreDirs: ['app/src']
  }

  // add your user config here
  const userConfig = {
    nunjucks: {
      autoescape: false,
      cache: false
    },
    view: {
      cache: false,
      root: [
        path.join(appInfo.baseDir, 'app/view')
      ].join(','),
      mapping: {
        '.html': 'nunjucks'
      }
    },
    security: {
      csrf: {
        enable: false
      },
      xframe: {
        enable: false
      }
    },
    jwt: {
      secret: '123456789'
    },
    auth: {
      match: '/ad'
    } /* ,
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'pdw',
      port: 3306,
      database: 'egg',
      timezone: '+08:00',
      dialectOptions: {
        charset: 'utf8mb4',
        supportBigNumbers: true,
        bigNumberStrings: true
      },
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
      }
    } */
  }

  return {
    ...config,
    ...userConfig
  }
}
