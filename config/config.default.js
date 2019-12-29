/* eslint valid-jsdoc: "off" */

'use strict'
const path = require('path')
module.exports = appInfo => {
  const config = exports = {}
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567785327174_6944'
  // add your middleware config here
  config.middleware = ['auth', 'error']
  config.development = {
    ignoreDirs: ['src']
  }
  config.security = {
    csrf: {
      enable: false
    },
    xframe: {
      enable: false
    }
  }
  config.nunjucks = {
    autoescape: false,
    cache: false
  }
  config.view = {
    cache: false,
    root: [
      path.join(appInfo.baseDir, 'app/view')
    ].join(','),
    mapping: {
      '.html': 'nunjucks'
    }
  }
  config.jwt = {
    secret: '123456789'
  }
  config.auth = {
    match: '/ad'
  }
  /* config.sequelize = {
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
  config.site = {
    name: 'demo',
    theme: 'demo',
    title: 'demo',
    logo: {
      favicon: '',
      id: 0,
      shortcut: '',
      main: ''
    },
    slogan: '',
    domain: 'localhost',
    seo: {
      title: 'SEO标题',
      description: 'SEO描述',
      keywords: '关键词'
    },
    thirdParty: {
      statisticsKey: '',
      QQClientId: ''
    }
  }
  config.theme = {
    color: { // 单色
      // 彩色
      primary: '#1890ff', // 主色
      primaryFg: '#fff', // 主色对应的前景色
      selected: '#1890ff', // 选中颜色
      highlight: '#f5222d', // 高亮颜色
      safe: '#52c41a', // 安全颜色
      warn: '#fa8c16', // 警告颜色
      danger: '#f5222d', // 危险颜色
      calm: '#1890ff', // 冷静颜色
      hot: '#f5222d', // 火热颜色
      link: '#262626', // 链接颜色
      border: '#d9d9d9', // 边框
      body: '#262626', // body字体色
      bodyBg: '#f5f5f5', // body背景色
      // 中性色
      white: '#fff', // 白色
      gray1: '#fafafa', // 灰色
      gray2: '#f5f5f5', // 灰色
      gray3: '#e8e8e8', // 灰色
      gray4: '#d9d9d9', // 灰色
      gray5: '#bfbfbf', // 灰色
      gray6: '#9c9c9c', // 灰色
      gray7: '#8c8c8c', // 灰色
      gray8: '#595959', // 灰色
      gray9: '#262626', // 灰色
      black: '#000' // 黑色
    },
    gradient: { // 渐变色
    }
  }

  return config
}
