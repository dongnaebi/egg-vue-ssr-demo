import Vue from 'vue'
import 'es6-promise/auto'
import uuidv4 from 'uuid/v4'
import cookie from 'js-cookie'
import { createApp } from './app'
import ProgressBar from './components/progress-bar.vue'
import './polyfill'
import { message, Modal } from 'ant-design-vue'
import cssVars from 'css-vars-ponyfill'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      bar.start()
      asyncData({
        store: this.$store,
        route: to
      }).then(() => {
        bar.finish()
        next()
      }).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
const config = window.config
const theme = window.theme
// 注入组件
Vue.prototype.$config = config
Vue.prototype.$theme = theme
Vue.prototype.$cookie = cookie
Vue.prototype.$message = message
Vue.prototype.$Modal = Modal

const domain = window.location.host.indexOf(config.domain) > -1 ? config.domain : ''
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

// css变量兼容
cssVars({
  onlyLegacy: true,
  watch: true
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

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
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
