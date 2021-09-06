import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地方法
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)

const hmtttoken = 'HMTT-TOUKEN'

export default new Vuex.Store({
  state: {
    user: getItem(hmtttoken)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem(hmtttoken, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
