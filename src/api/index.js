import axios from 'axios'

const LRU = require('lru-cache')
const cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 10
})

const isServer = process.env.VUE_ENV === 'server'
let errType = isServer ? 1 : 2

function fetch ({ token = '', UUID = '' }, url = '', params = {}, method = 'get', contentType = 'form') {
  contentType === 'form' && (contentType = 'application/x-www-form-urlencoded')
  contentType === 'json' && (contentType = 'application/json')
  contentType === 'file' && (contentType = 'multipart/form-data')
  let query = []
  for (let k in params) {
    query.push(k + '=' + params[k])
  }
  let qs = query.join('&')
  // method指定cache的，才去缓存。
  if ((method.toLowerCase() === 'get' || method.toLowerCase() === 'cache') && query.length > 0) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + qs
  }
  if (contentType !== 'application/x-www-form-urlencoded' && method !== 'get') {
    qs = params
  }
  return new Promise((resolve, reject) => {
    if (cache.get(url) && method.toLowerCase() === 'cache') {
      resolve([null, cache.get(url)])
      return
    }
    axios({
      baseURL: isServer ? 'http://localhost:7001' : '',
      timeout: 15000,
      method: method.toLowerCase() === 'cache' ? 'get' : method,
      url: url,
      data: qs,
      headers: {
        Authorization: token,
        UUID,
        'Content-Type': contentType
      }
    }).then(response => {
      // console.log(`${url}接口耗时${Date.now() - s}ms`)
      if (response.status >= 200 && response.status < 400) {
        if (response.data.code === 401 && !isServer) { // 未登录
          top.location.href = '/login'
          return
        }
        if (method.toLowerCase() === 'cache' && response.data.code === 0) {
          cache.set(url, response.data)
        }
        resolve([null, response.data])
      } else {
        resolve([{
          type: errType,
          url,
          errData: response,
          title: response.status,
          description: '服务器遇到了一点问题，请稍后重试'
        }, null])
      }
    }, err => {
      let title = '请求失败'
      let description = errType === 1 ? '服务器遇到了一点问题，请稍后重试' : '请检查网络设置，或稍后重试'
      if ((err + '').indexOf('timeout') > -1) {
        title = '请求超时'
        description = '可能是当前网络较慢，或者服务器响应慢，请稍后重试'
      }
      resolve([{ type: errType, url, errData: err.message, title, description }, null])
    })
  })
}

export default fetch
