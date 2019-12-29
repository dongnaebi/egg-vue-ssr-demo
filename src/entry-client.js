import Vue from 'vue'
import 'es6-promise/auto'
import uuidv4 from 'uuid/v4'
import cookie from 'js-cookie'
import { createApp } from './app'
import './polyfill'
import { message } from 'ant-design-vue'
import cssVars from 'css-vars-ponyfill'
// css变量兼容
cssVars({
  onlyLegacy: true,
  watch: true
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
const site = window.site
const theme = window.theme
// 注入组件
Vue.prototype.$site = site
Vue.prototype.$theme = theme
Vue.prototype.$cookie = cookie
Vue.prototype.$message = message

const domain = window.location.host.indexOf(site.domain) > -1 ? site.domain : ''
// 把cookie的token存到store
if (!store.state.token) {
  const authorization = cookie.get('Authorization')
  store.commit('setToken', authorization)
}
// 把cookie的uuid存到store
if (!store.state.UUID) {
  let UUID = cookie.get('uuid')
  if (!UUID) {
    UUID = uuidv4()
    cookie.set('uuid', UUID, { expires: 365, domain })
  }
  store.commit('setUUID', UUID)
}

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      store.commit('setProgressBar', true)
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        store.commit('setProgressBar', false)
        next()
      }).catch(next)
    } else {
      next()
    }
  }
})
// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    store.commit('setProgressBar', true)
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        store.commit('setProgressBar', false)
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
/* if (window.location.protocol === 'https:' && navigator.serviceWorker) { // todo 研究透了再开启
  navigator.serviceWorker.register('/service-worker.js')
} */
