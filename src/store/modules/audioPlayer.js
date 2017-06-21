import * as types from '../mutation-types'
import api from '@/api'
import { formatTime } from '@/assets/js/formatTime.js'
import playBarControl from '@/assets/js/play_bar_control.js'
import { parseLyric } from '@/assets/js/parseLyric.js'
const processBarLength = 493
// 初始化播放器
const player = document.createElement('audio')
player.autoplay = false
player.src = "init"
const state = {
  // 保存<audio></audio>标签
  player: player,
  // 保存播放器当前缓冲长度
  bufferedLength: '0px',
  // 保存当前播放列表
  playList: [{ name: '威风堂堂', id:33579015, src: "http://m10.music.126.net/20170617220129/72c13e639c9c5f419fdb1ce1c99a8dde/ymusic/3e1a/3c78/794d/c12d39cfcff847f740aaf21b642004f1.mp3", artist: '洛天依', cover: 'http://p3.music.126.net/vkoQqphGwk6TyRFai3ZBdw==/3238061743857732.jpg?param=34y34', duration: '03:20' }],
  // 保存当前播放歌曲在播放列表中的位置
  playingIndex: 0,
  // 计秒器，保存当前播放的时间
  secCounter: '00:00',
  // 保存播放条长度
  playedLength: '0px',
  // 保存歌曲循环方式
  loopStyle: 'listLoop',  // singleLoop, listLoop
  // 保存播放列表滚动条高度
  playListScrollBarHeight: '',
  // 保存当前音乐的歌词数组
  lyricArr: [],
  // 保存当前歌词的序列
  currentLyricIndex: 0
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
    console.log(getters.currentMusic.src, '----看看 currentMusic 是否获得了src')
    const playBtn = document.getElementById('play_btn')
    if (state.player.paused) {
      if (state.player.src === getters.currentMusic.src) {
        console.log('我继续播放')
        state.player.play()
      } else {
        dispatch('checkout', 'new')
        console.log('我重新播放')
        console.log(state.player.src, '-----播放前检查是否有播放地址')
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
        dispatch('checkout', 'new')
        console.log('我重新播放')
        console.log(state.player.src, '-----播放前检查是否有播放地址')
        state.player.play()
        console.log('开始播放')
      }
    }
  },

  // 切歌 => over： 自然播放结束。  new: 在页面中点击一首新单曲播放。 next: 点击下一首。  prev: 点击上一首。
  checkout: async ({ state, getters, dispatch }, type) => {
    switch (type) {
    case 'over':
      if (state.loopStyle === 'singleLoop') {
        clearInterval(window.counter)
        clearInterval(window.bufferCount)
        console.log('已经取消计数')
        break
      } else if (state.loopStyle === 'listLoop') {
        clearInterval(window.counter)
        clearInterval(window.bufferCount)
        console.log('已经取消计数')
        state.playedLength = '0px'
        await dispatch('changePlayIndex', 'next')
        state.player.src = getters.currentMusic.src
        dispatch('playOrPause')
        break
      }
    case 'new':
      clearInterval(window.counter)
      clearInterval(window.bufferCount)
      state.playedLength = '0px'
      state.player.src = getters.currentMusic.src
      console.log('切换音源成功')
      break
    default:
      break
    }
    state.currentLyricIndex = 0   // 重置歌词序列
    window.counter = undefined
    window.bufferCount = undefined
  },

  // 获取歌曲 url
  getMusicUrl ({ commit }, id) {
    return api.getMusicUrl(id)
  },

  // 获取歌曲的歌词
  getMusicLyrics ({commit}, id) {
    return api.getMusicLyrics(id)
  },

  // 将歌曲添加至播放列表
  addItemToPlayList ({ state }, item) {
    state.playList.push(item)
  },

  // 将歌曲从播放列表中删除
  removeItemFromPlayList: async ({ state, dispatch}, item) => {
    const index = state.playList.indexOf(item)
    if (!index) { console.log('你要删除掉歌曲不在播放列表中')}
    if (index === state.playingIndex) {
      state.playList.splice(index, 1)
      await dispatch('checkCurrentMusicUrl')
      dispatch('playOrPause')
      return
    } else {
      state.playList.splice(index, 1)
      return
    }
  },

  // 添加新歌单
  checkToNewList: async function ({ state, dispatch }, newList) {
    state.playList = newList
    dispatch('changeLoopStyle', 'list')
    state.loopStyle = 'listLoop'
    await dispatch('changePlayIndex', 'first')
    dispatch('playOrPause')
  },

  // 切换播放列表中当前音乐的指向，可以指向下一首，上一首，第一首，最后一首，或者直接指定数字 0 --- length-1。
  changePlayIndex ({ state, dispatch }, index) {
    return new Promise (async resolve => {
      switch (index) {
    case 'next':
      state.playingIndex + 1 < state.playList.length ? state.playingIndex++ : state.playingIndex = 0
      console.log(state.playingIndex, '-------已经切换到了下一首')
      break
    case 'prev':
      state.playingIndex - 1 < 0 ? state.playingIndex = state.playList.length - 1 : state.playingIndex--
      console.log(state.playingIndex, '-------已经切换到了上一首')
      break
    case 'last':
      state.playingIndex = state.playList.length - 1
      break
    case 'first':
      state.playingIndex = 0
      console.log(state.playingIndex, '-------已经切换到了第一首')
      break
    default:
      if (index < 0 || index > state.playList.length - 1) {
        break
      } else {
        state.playingIndex = index
        break
      }
      
    }
    await dispatch('checkCurrentMusicUrl')
    resolve()
    })
  },

  // 检查当前音乐的 url 和 lyric
  checkCurrentMusicUrl ({state, getters, dispatch}) {
    return new Promise (async resolve => {
      console.log(getters.currentMusic.src, '----准备检查src')
      if (!getters.currentMusic.src){
        const music = await dispatch('getMusicUrl',getters.currentMusic.id)
        if (music.type != 'mp3') {
          console.log('it is not a mp3 file!')
          resolve()
        } else {
          state.playList[state.playingIndex].src = music.url
          console.log(state.playList[state.playingIndex].src, 'check 完毕，看看是否获得了')
        }
      }
      console.log('准备检查歌词')
      const lyric = await dispatch('getMusicLyrics', getters.currentMusic.id)
      if (lyric === '没有歌词') {
        console.log('没有歌词')
        resolve()
      } else {
        const lyricParsedObject = parseLyric(lyric)
        let lyricArr = []
        for (let i in lyricParsedObject) {
          lyricArr.push({time:i, text:lyricParsedObject[i]})
        }
        state.lyricArr = lyricArr
        resolve()
      }
    })
  },

  // 在页面中点击播放一首歌
  clickInPageToPlayASong: async ({ state, dispatch }, obj) => {
    const listID = state.playList.map((item) => {          // 将当前播放列表转为一个 id 组成的 数组
      return item.id
    })
    const indexInPlayList = listID.indexOf(obj.id)
    if ( indexInPlayList != -1) {
      console.log('这首歌曲已经在播放列表里了')
      await dispatch('changePlayIndex', indexInPlayList)   // 改变当前播放音乐的指向
      dispatch('playOrPause')                              // 播放
    } else {
      dispatch('addItemToPlayList',obj)                    // 添加到播放列表的末尾
      console.log('向播放列表添加这首歌曲')
      await dispatch('changePlayIndex','last')             // 改变当前播放音乐的指向
      dispatch('playOrPause')                              // 播放
    }
  },

  // 每隔一秒获取当前播放时间。
  getCurrentTimePerSec ({ state, dispatch }) {
    window.counter = setInterval(() => {
      state.secCounter = formatTime(state.player.currentTime)
      if (state.player.currentTime === state.player.duration) {
        dispatch('checkout', 'over')
      }
    }, 1000)
  },

  // 每隔一秒获取缓冲长度
  getBufferedPerSec ({ state }) {
    window.bufferCount = setInterval(() => {
      let lastRange = state.player.buffered.length - 1
      while (state.player.currentTime < state.player.buffered.start(lastRange)) {
        lastRange--
      }
      state.bufferedLength = processBarLength / state.player.duration * state.player.buffered.end(lastRange) + 'px'
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
      if (!window.bufferCount) { dispatch('getBufferedPerSec') }
      if (!window.counter) { dispatch('getCurrentTimePerSec') }
      document.getElementById('loading').classList.remove('loading')
    }
    state.player.oncanplaythrough = () => {
      console.log('oncanplaythrough, 可以无缓冲播放')
    }
    state.player.onwaiting = () => {
      console.log('onwaiting, 正在缓冲')
      document.getElementById('loading').classList.add('loading')
    }
    state.player.onplaying = () => {
      console.log('onplaying, 缓冲结束，开始播放')
      document.getElementById('loading').classList.remove('loading')
    }
    state.player.ontimeupdate = () => {
      // 更新歌词
      if (state.player.currentTime > state.lyricArr[state.currentLyricIndex + 1].time) {
        state.currentLyricIndex++ 
      }
    },
    state.player.onseeked = () => {
      for (let i = 0; i < state.lyricArr.length; i++) {
        if (state.player.currentTime >= state.lyricArr[i].time) {
          if (state.player.currentTime < state.lyricArr[i+1].time) {
            state.currentLyricIndex = i
          }
        }
      }
    }
  },

  // 改变循环模式
  changeLoopStyle ({ state }, mode) {
    switch (mode) {
      case 'toggle':
        if (state.loopStyle === 'listLoop') {
          state.loopStyle = 'singleLoop'
          state.player.loop = true
          console.log(state.loopStyle, '已经切换到单曲循环模式')
          break
        }
        if (state.loopStyle === 'singleLoop') {
          state.loopStyle = 'listLoop'
          state.player.loop = false
          console.log(state.loopStyle, '已经切换到列表循环模式')
          break
        }
      case 'single':
        state.loopStyle = 'singleLoop'
        state.player.loop = true
        break
      case 'list':
      state.loopStyle = 'listLoop'
      state.player.loop = false
        break
      case 'shuffle':
        break
    }
  },

  // 获取播放列表面板滚动条的高度
  getPlayListScrollBarHeight ({ state }) {
    console.log('准备获取播放列表滚动条高度')
    const playListContentHeight = document.getElementById('play_list_content').offsetHeight
    console.log(state.playList, '看看列表改变了没', playListContentHeight, 'playListContentHeight')
    const contentParentHeight = document.getElementById('play_list_content').parentNode.offsetHeight
    const scrollParentHeight = document.getElementById('play_list_scroll_bar').parentNode.offsetHeight
    const theScale = contentParentHeight / playListContentHeight
    if (theScale >= 1) {
      state.playListScrollBarHeight = 0
    } else {
      state.playListScrollBarHeight = scrollParentHeight * theScale
    }
    console.log(state.playListScrollBarHeight, '--已经获取到播放列表滚动条高度')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
