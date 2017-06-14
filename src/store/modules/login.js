import * as types from '../mutation-types'
import api from '@/api'
const state = {
  userInfo:'',
  loginInfo:'',
  showLoginPad:false,
  playlist:[]
}

const mutations = {
  [types.GET_USER](state,res){
    console.log(res.status)
    if(res.status!=200){
      state.loginInfo = '网络出现问题'
    } else if (res.data.code!==200){
      state.loginInfo = '账户信息有误'
    } else{
      state.showLoginPad = false
      state.userInfo = res
    }
  },
  [types.GET_USER_PLAYLIST] (state,playlist){
    state.playlist = playlist
  }
}

const actions = {
  getUserPlayList: ({commit}, id) => {
    api.getPlayList(id)
      .then( playlist => {
      commit(types.GET_USER_PLAYLIST, playlist)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
