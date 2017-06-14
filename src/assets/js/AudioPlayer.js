const src = require('../../../static/weifengtangtang.mp3')
const AudioPlayer = {
  src: src,
  player: '',
  buffered: ''
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

export { AudioPlayer }
