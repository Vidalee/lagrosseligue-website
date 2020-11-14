import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1505e1db = () => interopDefault(import('..\\pages\\summoner\\_summonerName.vue' /* webpackChunkName: "pages_summoner__summonerName" */))
const _f26b470a = () => interopDefault(import('..\\pages\\team\\_teamName.vue' /* webpackChunkName: "pages_team__teamName" */))
const _2d33a2a3 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/summoner/:summonerName?",
    component: _1505e1db,
    name: "summoner-summonerName"
  }, {
    path: "/team/:teamName?",
    component: _f26b470a,
    name: "team-teamName"
  }, {
    path: "/",
    component: _2d33a2a3,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
