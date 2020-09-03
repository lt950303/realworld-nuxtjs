import Vue from 'vue'
import dayjs from 'dayjs'

// 全局注册 Vue 过滤器
Vue.filter('data', (value,  format='YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})