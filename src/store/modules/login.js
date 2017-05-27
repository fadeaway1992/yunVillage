import * as types from '../mutation-types'
import api from '@/api'
const state = {

}

const mutations = {

}

const actions = {
  loginByPhone:({commit}, options)=>{
    api.loginByPhone(options,
      (response)=>{console.log(response)},
      (response)=>{console.log(response)}
    )
  }
}

export default {
  state,
  mutations,
  actions
}
