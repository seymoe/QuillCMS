import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    loginState: {
      hasLogin: false,
      userInfo: {}
    },
    topMenu: []
  },
  mutations: {
    SET_LOGIN_STATE(state, val) {
      state.loginState = val
    },
    SET_TOP_MENU(state, val) {
      state.topMenu = val
    }
  },
  actions: {
    nuxtServerInit({ commit }, { req }) {
      if (req.session && req.session.userLogined) {
        let _loginState = {
          hasLogin: req.session.userLogined,
          userInfo: req.session.userInfo
        }
        commit('SET_LOGIN_STATE', _loginState)
      }
    }
  }
})

export default store
