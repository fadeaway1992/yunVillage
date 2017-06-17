import * as types from '../mutation-types'
import api from '@/api'
const state = {
  listDetail: {},
  listName: '',
  list: []
}

const mutations = {
  [types.GET_LIST_DETAIL] (state, listDetail) {
    state.listDetail = listDetail.data.playlist
    state.listName = listDetail.data.playlist.name
    state.list = listDetail.data.playlist.tracks
  }
}

const actions = {
  getListDetail ({ commit }, id) {
    return api.getListDetail(id).then(res => {
      commit(types.GET_LIST_DETAIL, res)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
