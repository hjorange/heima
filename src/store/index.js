import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const hmtttoken = 'HMTT-TOUKEN'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(hmtttoken))
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      localStorage.setItem(hmtttoken, JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
