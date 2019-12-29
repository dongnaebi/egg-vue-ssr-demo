'use strict'

const { Controller } = require('egg')

class HomeController extends Controller {
  async index () {
    const { ctx } = this
    ctx.response.end([null, 'data from controller.home.index'])
  }
  async list () {
    const { ctx } = this
    ctx.response.end([null, [{ something: 'data from controller.home.list' }]])
  }
}

module.exports = HomeController
