/**
 * 路由中间件  https://zh.nuxtjs.org/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6
 * 
 * 中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。
 * ！！！！ 页面渲染之前运行， 并且同时适用 服务端+客户端渲染
 * 此套路为 nuxt.js 独有的
 * @param {*} param0 
 */

export default function ({ store, redirect }) {
  // store 中没有 user 就跳转到登录页
  // 判断未登录
  if (!store.state.user) {
    return redirect('/login')
  }
}
