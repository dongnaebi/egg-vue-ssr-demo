import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export function createRouter () {
  const route = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.hash) {
          position.selector = to.hash
        } else if (!to.meta.unScrollTop) {
          position = { y: 0 }
        }
        return position
      }
    },
    routes
  })
  route.beforeResolve((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth) && process.env.VUE_ENV === 'client') {
      if (route.app.$store.state.token) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
          replace: true
        })
      }
    } else {
      next()
    }
  })
  return route
}
