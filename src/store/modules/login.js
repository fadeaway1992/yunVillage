import * as types from '../mutation-types'
import api from '@/api'
const state = {
  userInfo:'',
  loginInfo:'',
  showLoginPad:false
}

const mutations = {
  [types.GET_USER](state,res){
    if(res.status!=200){
      state.loginInfo = '网络出现问题'
    } else if (res.body.code!==200){
      state.loginInfo = '账户信息有误'
    } else{
      state.showLoginPad = false
      state.userInfo = res
    }
  }
}

const actions = {
  loginByPhone:({commit}, options)=>{
    api.loginByPhone(options,
      (res)=>{commit(types.GET_USER,res)},
      (res)=>{commit(types.GET_USER,res)}
    )
  }
}

export default {
  state,
  mutations,
  actions
}
