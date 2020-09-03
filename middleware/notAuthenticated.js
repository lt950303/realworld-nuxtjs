export default function ({ store, redirect }) {
  // 判断用户已经登录
  // 有些页面， 已经登录就不允许再次访问， 比如 /login
  if (store.state.user) {
    return redirect('/')
  }
}
