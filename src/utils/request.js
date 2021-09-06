import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

/**
 * js文件访问不到this.$store里面的this，无法使用
 * store.state.user.token 引入store文件，store相当于this.$store
 */
request.interceptors.request.use(config => {
  // 统一配置请求头，发送请求时多处需要用到token
  if (config.url.indexOf('/user') !== -1) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // 发送成功请求的操作

  Toast.loading({
    message: '加载中...',
    duration: 0, // 持续展示 toast
    forbidClick: true
  })
  return config
})

// 响应拦截器
request.interceptors.response.use(res => {
  // 统一清除loading
  Toast.clear()
  // 将res统一解构
  return res.data.data
})
export default request
