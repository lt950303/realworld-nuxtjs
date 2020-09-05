import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6730d19f = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _1af836d8 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _5e30f654 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _6ef381d4 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _00bcc958 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _5b61f7e2 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _55bdc521 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _6730d19f,
    children: [{
      path: "",
      component: _1af836d8,
      name: "home"
    }, {
      path: "/login",
      component: _5e30f654,
      name: "login"
    }, {
      path: "/register",
      component: _5e30f654,
      name: "register"
    }, {
      path: "profile/:username",
      component: _6ef381d4,
      name: "profile"
    }, {
      path: "/settings",
      component: _00bcc958,
      name: "settings"
    }, {
      path: "/editor",
      component: _5b61f7e2,
      name: "editor"
    }, {
      path: "/editor/:slug",
      component: _5b61f7e2,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _55bdc521,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
