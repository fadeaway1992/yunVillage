import * as types from '../mutation-types'
import api from '@/api'
const state = {
  response:{}
}

const mutations = {
[types.GET_RESPONSE](state,res){
  state.response = res
}
}

const actions = {
  loginByPhone:({commit}, options)=>{
    api.loginByPhone(options,
      (res)=>{commit(types.GET_RESPONSE,res)},
      (res)=>{commit(types.GET_RESPONSE,res)}
    )
  }
}

export default {
  state,
  mutations,
  actions
}
