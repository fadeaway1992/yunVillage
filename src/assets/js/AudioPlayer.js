let src = require('../img/weifengtangtang.mp3')
let AudioPlayer={
  src:src,
  player:'',
  buffered:''
}

AudioPlayer.init = function(){
  this.player = document.createElement('audio')
  this.player.src = this.src
  this.player.autoplay = false
}

AudioPlayer.getTime = function(second){
  let curSec = Math.floor(second)  //秒数取整
  let curMin = Math.floor(curSec/60)  // 分钟取整
  //取分钟
  let Min
  if (curMin<10){
    Min = '0'+curMin
  }else{
    Min = curMin
  }
  // 取秒
  let Sec = curSec%60
  if (Sec<10){
    Sec = '0' + Sec
  }else{
    Sec = Sec
  }

  return Min+':'+Sec
}

AudioPlayer.getBuffered = function(){
  let self = this
  let buffer = setInterval(function(){
    self.buffered =  self.player.buffered.end(0)
  },5000)
}

export {AudioPlayer}
