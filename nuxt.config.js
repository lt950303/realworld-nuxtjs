/**
 * nuxt.js 配置文件
 */

module.exports = {
  router: {
    // 全局配置 <nuxt-link> 组件默认的激活类名。
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // nuxt.js 默认路由规则清空， 利用数组splice方法
      routes.splice(0)
      // 设置自定义路由规则
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由(首页)， 匹配路由： /
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: 'profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
    ])
    }
  },
  plugins: ['~/plugins/request', '~/plugins/dayjs']
}