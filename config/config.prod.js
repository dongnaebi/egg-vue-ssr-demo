/* eslint valid-jsdoc: "off" */

'use strict'
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = {
    /* sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'pwd',
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
    ...config
  }
}
