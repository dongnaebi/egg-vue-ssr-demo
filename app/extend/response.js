module.exports = {
  success (data = null, msg = '请求成功') {
    this.body = {
      code: 200,
      msg,
      data
    }
  },
  fail (msg = '请求失败') {
    this.body = {
      code: 400,
      msg,
      data: null
    }
  },
  end ([err, data]) {
    if (err) {
      console.error(err)
      if (err.name === 'SequelizeValidationError') {
        this.body = {
          code: 400,
          msg: err.errors[0].message,
          data: null
        }
      } else {
        this.body = {
          code: 400,
          msg: '出错了，' + err,
          data: null
        }
      }
    } else {
      this.body = {
        code: 200,
        msg: '请求成功',
        data
      }
    }
  },
  error (msg = '') {
    this.body = {
      code: 500,
      msg: `服务器出错了 ${msg}`,
      data: null
    }
  },
  needLogin () {
    this.body = {
      code: 401,
      msg: '请登录',
      data: null
    }
  },
  unauthorized () {
    this.body = {
      code: 402,
      msg: '你没有权限进行此操作',
      data: null
    }
  }
}
