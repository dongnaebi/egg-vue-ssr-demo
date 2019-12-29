import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '../api'

Vue.use(Vuex)

export function createStore () {
  let store = new Vuex.Store({
    state: {
      token: '',
      UUID: '',
      progressBar: false,
      error: null,
      userInfo: null,
      globalData: {}
    },
    getters: {},
    mutations: {
      setToken (state, token) {
        state.token = token
      },
      setUUID (state, uuid) {
        state.UUID = uuid
      },
      setProgressBar (state, show = false) {
        state.progressBar = show
      },
      setError (state, err) {
        err && err.errData && console && console.error(err.url + '===' + err.errData)
        state.error = err
      },
      setGlobalData (state, data) {
        state.globalData = data
      }
    },
    actions: {
      // 公共接口才放这里，其他的放到模块下面
      async getGlobalData ({ state, commit, dispatch }) {
        let globalData = {}
        commit('setGlobalData', globalData)
      },
      async indeData (c, params = { id: 1, something: 0 }) {
        return this.fetch('/api/index', params)
      }
    }
  })
  store.fetch = async function () {
    let res = await fetch(this.state, ...arguments)
    return this.handleError(res)
  }
  store.handleError = function ([err, res]) {
    if (this.state.error) { // 防止多个请求时，第一个错误，第二个正确，把错误处理隐藏
      return err ? {} : res
    }
    if (err) {
      this.commit('setError', err)
      if (err.type === 2) {
        setTimeout(() => {
          this.commit('setError', null)
        }, 2500)
      }
      return {}
    }
    return res || {}
  }
  return store
}
