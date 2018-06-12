import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    loginState: {
      hasLogin: false,
      userInfo: {}
    }
  },
  mutations: {
    SET_LOGIN_STATE(state, val) {
      state.loginState = val
    }
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      if (req.session && req.session.userLogined) {
        let _loginState = {
          hasLogin: req.session.userLogined,
          userInfo: req.session.userInfo
        }
        console.log('11-> ', _loginState)
        commit('SET_LOGIN_STATE', _loginState)
      }
    }
  }
})

export default store
