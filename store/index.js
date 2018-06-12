import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    loginState: {}
  },
  mutations: {
    SET_LOGIN_STATE(state, val) {
      state.loginState = val
    }
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      let _loginState = {
        hasLogin: req.session.userLogined,
        userInfo: req.session.userInfo
      }
      commit('SET_LOGIN_STATE', _loginState)
    }
  }
})

export default store
