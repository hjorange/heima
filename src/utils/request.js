import axios from 'axios'
import { Toast } from 'vant'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

request.interceptors.request.use(config => {
  // 发送成功请求的操作
  Toast.loading({
    message: '加载中...',
    duration: 0, // 持续展示 toast
    forbidClick: true
  })
  return config
})

export default request
