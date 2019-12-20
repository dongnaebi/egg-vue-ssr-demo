module.exports = {
  success (data = null, userMsg = '请求成功') {
    this.body = {
      code: 0,
      userMsg,
      data
    }
  },
  fail (userMsg = '请求失败') {
    this.body = {
      code: 400,
      userMsg,
      data: null
    }
  },
  end ([err, data]) {
    if (err) {
      console.error(err)
      if (err.name === 'SequelizeValidationError') {
        this.body = {
          code: 400,
          userMsg: err.errors[0].message,
          data: null
        }
      } else {
        this.body = {
          code: 400,
          userMsg: '出错了，' + err,
          data: null
        }
      }
    } else {
      this.body = {
        code: 0,
        userMsg: '请求成功',
        data
      }
    }
  },
  error (userMsg = '') {
    this.body = {
      code: 500,
      userMsg: `服务器出错了 ${userMsg}`,
      data: null
    }
  },
  needLogin () {
    this.body = {
      code: 401,
      userMsg: '请登录',
      data: null
    }
  },
  unauthorized () {
    this.body = {
      code: 402,
      userMsg: '你没有权限进行此操作',
      data: null
    }
  }
}
