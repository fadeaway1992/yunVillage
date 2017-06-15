import * as types from '../mutation-types'
import api from '@/api'
const srcDefault = require('../../../static/weifengtangtang.mp3')
// 初始化播放器
const player = document.createElement('audio')
player.autoplay = false

const state = {
  // 保存<audio></audio>标签
  player: player,
  // 保存播放器当前缓冲时间
  buffered: '',
  // 保存当前播放列表
  playList: [{ name: '威风堂堂', src: srcDefault, artist: '洛天依' }],
  // 保存当前播放歌曲在播放列表中的位置
  playingIndex: 0
}

const getters = {
  src (state) {
    return state.playList[state.playingIndex].src
  }
}

const mutations = {
  play (state, src) {
    state.player.src = src
    state.player.play()
  },
  pause (state) {
    state.player.pause()
  }
}

const actions = {
  play ({ commit, state, getters }) {
    commit('play', getters.src)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
