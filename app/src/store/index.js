import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '../api'

Vue.use(Vuex)

export function createStore () {
  let store = new Vuex.Store({
    state: {
      token: '',
      UUID: '',
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
      setGlobalData (state, data) {
        state.globalData = data
      }
    },
    actions: {
      /* 处理错误函数，如有错误或接口返回的code不为0，则返回null，否则返回接口的data */
      handleError ({ state, commit }, [err, res, url]) {
        if (state.error) { // 防止多个请求时，第一个错误，第二个正确，把错误处理隐藏
          return null
        }
        if (err) {
          commit('setError', err)
          if (err.type === 2) {
            setTimeout(() => {
              commit('setError', null)
            }, 2500)
          }
          return null
        }
        if (res.code !== 0) {
          let type = process.env.VUE_ENV === 'server' ? 1 : 2
          commit('setError', { type, errData: res.userMsg, url, title: '请求异常', description: res.userMsg })
          if (type === 2) {
            setTimeout(() => {
              commit('setError', null)
            }, 2500)
          }
          return null
        }
        commit('setError', null)
        return res.data
      },
      async getGlobalData ({ state, commit, dispatch }) {
        let globalData = {}
        commit('setGlobalData', globalData)
      }
    }
  })
  store.fetch = async function () {
    let res = await fetch(this.state, ...arguments)
    return this.handleError(res)
  }
  store.handleError = function ([err, res, url]) {
    if (this.state.error) { // 防止多个请求时，第一个错误，第二个正确，把错误处理隐藏
      return {}
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
