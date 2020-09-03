/**
 * 基于 axios 请求模块封装
 */

import axios from "axios"

export const request = axios.create({
	// baseURL: 'http://realworld.api.fed.lagounews.com'
	baseURL: "https://conduit.productionready.io",
});


// 作为插件 必须默认导出一个函数
export default ({ store }, inject) => {
	// Set the function directly on the context.app object

  // 请求拦截器
  // 因为这里要使用vuex 中的数据，所以就得以插件的形式，得到 store
  // 其实个人认为仅仅是获取 token， 不做成插件也行， 直接获取cookie应该也可以 
	request.interceptors.request.use(
		function(config) {
      const { user } = store.state
      if(user && user.token){
        config.headers.Authorization = `Token ${user.token}`
      }
			return config
		},
		function(error) {
      // 请求出错（此时 请求还没有发出）
			// Do something with request error
			return Promise.reject(error)
		}
	);
};
