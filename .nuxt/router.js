import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _78ba8440 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _3b55ed15 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _2f9ffdf3 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _be81c49a = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _0864a959 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _905837ba = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _f0ed3e00 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _78ba8440,
    children: [{
      path: "",
      component: _3b55ed15,
      name: "home"
    }, {
      path: "/login",
      component: _2f9ffdf3,
      name: "login"
    }, {
      path: "/register",
      component: _2f9ffdf3,
      name: "register"
    }, {
      path: "profile/:username",
      component: _be81c49a,
      name: "profile"
    }, {
      path: "/settings",
      component: _0864a959,
      name: "settings"
    }, {
      path: "/editor",
      component: _905837ba,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _f0ed3e00,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
