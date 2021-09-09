import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
import './style/index.less'
import 'amfe-flexible'
// 引入时间插件
import dayjs from 'dayjs'
// 引入语言安装包插件
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.config.productionTip = false

// 时间过滤器
Vue.filter('fromDeta', (data) => {
  return dayjs().to(data)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
