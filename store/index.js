const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突， 务必要把 state 定义成一个函数， 返回数据对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, playload) {
    state.user = playload
  }
}

export const actions = {
  // 是 next.js 提供的一个特殊的API
  // 仅会在服务端渲染期间自动被调用
  // 主要作用初始化容器数据， 传递数据给客户端使用
  // https://zh.nuxtjs.org/guide/vuex-store#nuxtserverinit-%E6%96%B9%E6%B3%95
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', auth)
  }
}