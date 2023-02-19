import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录用户状态
  },
  getters: {
  },
  mutations: {
    // 修改容器数据
    setUser(state, payload) {
      state.user = JSON.parse(payload)
      // 为了防止页面刷新数据帝时，需要把 user 做数据持久化
      // 注意：本地存储只能存字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
