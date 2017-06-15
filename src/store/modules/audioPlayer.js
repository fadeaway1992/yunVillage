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
  playList: [{ name: '威风堂堂', src: srcDefault, artist: '洛天依', cover: 'http://p3.music.126.net/vkoQqphGwk6TyRFai3ZBdw==/3238061743857732.jpg?param=34y34' }],
  // 保存当前播放歌曲在播放列表中的位置
  playingIndex: 0
}

const getters = {
  currentMusic (state) {
    return state.playList[state.playingIndex]
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
    commit('play', getters.currentMusic.src)
  },
  getMusicUrl ({ commit }, id) {
    return api.getMusicUrl(id)
  },
  addItemToPlayList ({ state }, item) {
    state.playList.push(item)
  },
  // 切换播放列表中当前音乐的指向，可以指向下一首，上一首，第一首，最后一首，或者直接指定数字 0 --- length-1。
  changePlayIndex ({ state }, index) {
    console.log(index, '-------index')
    switch (index) {
    case 'next':
      state.playingIndex + 1 < state.playList.length ? state.playingIndex++ : state.playingIndex = 0
      break
    case 'prev':
      state.playingIndex - 1 < 0 ? state.playingIndex = state.playList.length - 1 : state.playingIndex--
      break
    case 'last':
      console.log('its last')
      state.playingIndex = state.playList.length - 1
      break
    case 'first':
      state.playingIndex = 0
      break
    default:
      if (index < 0 || index > state.playList.length - 1) { 
        return
      } else {
        state.playingIndex = index
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
