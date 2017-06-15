const src = require('../../../static/weifengtangtang.mp3')
const AudioPlayer = {
  src: src,
  player: '',
  buffered: '',
  playList: [{ name: '灌篮高手', src: 'guanlangaoshou.mp3', artist: '某某' }, { name: '海阔天空', src: 'haikuotiankong.mp3', artist: 'Beyond' }]
}
// 创建音频元素并添加音频地址
AudioPlayer.init = function () {
  this.player = document.createElement('audio')
  this.player.src = this.src
  this.player.autoplay = false
}
// 将获取到的当前播放的时间取整并格式化为 ’02:03‘
AudioPlayer.getTime = function (second) {
  const curSec = Math.floor(second)  // 秒数取整
  const curMin = Math.floor(curSec / 60)  // 分钟取整
  // 取分钟
  let Min
  if (curMin < 10) {
    Min = '0' + curMin
  } else {
    Min = curMin
  }
  // 取秒
  let Sec = curSec % 60
  if (Sec < 10) {
    Sec = '0' + Sec
  }

  return Min + ':' + Sec
}

// 播放整个列表
AudioPlayer.playInList = function () {
  return
}

export { AudioPlayer }
