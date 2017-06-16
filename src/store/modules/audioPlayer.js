import * as types from '../mutation-types'
import api from '@/api'
import { formatTime } from '@/assets/js/AudioPlayer.js'
import playBarControl from '@/assets/js/play_bar_control.js'
const processBarLength = 493
// 初始化播放器
const player = document.createElement('audio')
player.autoplay = false

const state = {
  // 保存<audio></audio>标签
  player: player,
  // 保存播放器当前缓冲长度
  bufferedLength: '0px',
  // 保存当前播放列表
  playList: [{ name: '威风堂堂', src: 'http://localhost:8080/static/img/weifengtangtang.c12d39c.mp3', artist: '洛天依', cover: 'http://p3.music.126.net/vkoQqphGwk6TyRFai3ZBdw==/3238061743857732.jpg?param=34y34', duration: '03:20' }],
  // 保存当前播放歌曲在播放列表中的位置
  playingIndex: 0,
  // 计秒器，保存当前播放的时间
  secCounter: '00:00',
  // 保存播放条长度
  playedLength: '0px'
}

const getters = {
  currentMusic (state) {
    return state.playList[state.playingIndex]
  }
}

const mutations = {

}

const actions = {

  // 播放／暂停
  playOrPause ({ state, getters, dispatch }) {
    const playBtn = document.getElementById('play_btn')
    if (state.player.paused) {
      if (state.player.src === getters.currentMusic.src) {
        console.log('我继续播放')
        state.player.play()
      } else {
        console.log('我重新播放')
        state.player.src = getters.currentMusic.src
        state.player.play()
        console.log('开始播放')
      }
      playBtn.classList.add('playing')
    } else {
      if (state.player.src === getters.currentMusic.src) {
        state.player.pause()
        playBtn.classList.remove('playing')
        console.log('我暂停了')
      } else {
        console.log('我重新播放')
        state.player.src = getters.currentMusic.src
        state.player.play()
        console.log('开始播放')
      }
    }
  },

  // 定义一首歌播放结束后的动作
  checkout ({ state }) {
    state.player.currentTime = 0
    clearInterval(window.counter)
    clearInterval(window.bufferCount)
  },

  // 获取歌曲 url
  getMusicUrl ({ commit }, id) {
    return api.getMusicUrl(id)
  },

  // 将歌曲添加至播放列表
  addItemToPlayList ({ state }, item) {
    state.playList.push(item)
  },

  // 切换播放列表中当前音乐的指向，可以指向下一首，上一首，第一首，最后一首，或者直接指定数字 0 --- length-1。
  changePlayIndex ({ state }, index) {
    switch (index) {
    case 'next':
      state.playingIndex + 1 < state.playList.length ? state.playingIndex++ : state.playingIndex = 0
      break
    case 'prev':
      state.playingIndex - 1 < 0 ? state.playingIndex = state.playList.length - 1 : state.playingIndex--
      break
    case 'last':
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
  },

  // 每隔一秒获取当前播放时间。
  getCurrentTimePerSec ({ state, dispatch }) {
    window.counter = setInterval(() => {
      state.secCounter = formatTime(state.player.currentTime)
      if (state.player.currentTime === state.player.duration) {
        dispatch('checkout')
      }
    }, 1000)
  },

  // 每隔一秒获取缓冲长度
  getBufferedPerSec ({ state }) {
    window.bufferCount = setInterval(() => {
      state.bufferedLength = processBarLength / state.player.duration * state.player.buffered.end(0) + 'px'
    }, 1000)
  },

  // 获取当前播放条长度
  getPlayedLength ({ state }) {
    state.playedLength = (processBarLength / state.player.duration * state.player.currentTime) + 'px'
  },

  // 激活进度条拖拽效果
  activateDragPoint ({ state }) {
    const controlPoint = document.getElementById('drag_control_point')
    const progressBar = controlPoint.parentNode
    playBarControl(controlPoint, progressBar, state.player)
  },

  // 添加钩子函数
  addPlayHooks ({ state, dispatch }) {
    state.player.onloadstart = () => {
      console.log('loadstart, 音频开始加载')
    }
    state.player.ondurationchange = () => {
      console.log('durationchange, 音频时长获取')
    }
    state.player.onloadedmetadata = () => {
      console.log('loadedmetadata, 已获取元数据')
    }
    state.player.onloadeddata = () => {
      console.log('loadeddata, Browser has loaded the current frame')
    }
    state.player.onprogress = () => {
      console.log('onprogress, 开始获取音频数据')
    }
    state.player.oncanplay = () => {
      console.log('oncanplay, 可以开始播放了')
      dispatch('getBufferedPerSec')
      dispatch('getCurrentTimePerSec')
    }
    state.player.oncanplaythrough = () => {
      console.log('oncanplaythrough, 可以无缓冲播放')
    }
    state.player.onwaiting = () => {
      console.log('onwaiting, 正在缓冲')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
