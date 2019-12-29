'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/api/index', controller.home.index)
  router.get('/api/getList', controller.home.list)
  router.get('*', controller.ssr.index)
}
