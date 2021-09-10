import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vant'
import './style/index.less'
import 'amfe-flexible'
// 引入过滤器封装
import './fitles'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
