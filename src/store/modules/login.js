import * as types from '../mutation-types'
import api from '@/api'
const state = {
  userInfo: '',
  loginInfo: '',
  showLoginPad: false,
  musicList: []
}

const mutations = {
  [types.GET_USER] (state, res) {
    if (res.status !== 200) {
      state.loginInfo = '网络出现问题'
    } else if (res.data.code !== 200) {
      state.loginInfo = '账户信息有误'
    } else {
      state.showLoginPad = false
      state.userInfo = res
      // 请求到 userInfo 之后存到 localStorage 里面，下次直接从 storage 里面取。
      localStorage.userInfo = JSON.stringify(res)
      console.log(localStorage.userInfo, '已经将用户信息存到本地')
    }
  },
  [types.GET_USER_PLAYLIST] (state, musicList) {
    state.musicList = musicList
  }
}

const actions = {
  loginByPhone: ({ commit, state }, options) => {
    if (localStorage.userInfo) {
      state.userInfo = JSON.parse(localStorage.userInfo)
      console.log(state.userInfo, '已从本地取到用户信息')
      return
    }
    api.loginByPhone(options).then((res) => {
      console.log(res, '-----打印登录请求返回的结果')
      commit(types.GET_USER, res)
    })
  },
  getUserPlayList: ({ commit }, id) => {
    api.getPlayList(id).then(musicList => {
      commit(types.GET_USER_PLAYLIST, musicList)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
