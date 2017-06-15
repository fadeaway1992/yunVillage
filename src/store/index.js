import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './modules/login.js'
import playList from './modules/playList.js'
import * as getters from './getters.js'
const store = new Vuex.Store({
  modules: {
    login,
    playList
  },
  getters
})

export default store
