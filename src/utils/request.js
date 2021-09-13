import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 处理数据大404的bug,下载包json-bigint
import JSONBig from 'json-bigint'

const request = axios.create({
  // 后台返回原始数据还未被处理阶段处理大数据转换

  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    // 判断是JSON字符串还是普通字符串，JOSN只能处理Json字符串
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }],
  // 统一配置请求头
  baseURL: 'http://toutiao-app.itheima.net'
  // baseURL: 'http://ttapi.research.itcast.cn/app'
})

/**
 * js文件访问不到this.$store里面的this，无法使用
 * store.state.user.token 引入store文件，store相当于this.$store
 */
request.interceptors.request.use(config => {
  // 统一配置请求头，发送请求时多处需要用到token
  if (store.state.user) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // 发送成功请求的操作关闭loading
  const notLoading = ['/v1_1/articles', '/v1_0/search', '/v1_0/comments']
  // 正则验证地址后面携带的参数是否为数字
  const isDetail = /\/v1_0\/articles\/\d+/.test(config.url)
  if (notLoading.indexOf(config.url) === -1 && !isDetail) {
    Toast.loading({
      message: '加载中...',
      duration: 0, // 持续展示 toast
      forbidClick: true
    })
  }
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
