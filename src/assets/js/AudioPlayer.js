let src = require('../img/weifengtangtang.mp3')
let AudioPlayer={
  src:src,
  player:''
}

AudioPlayer.init = function(){
  console.log(this)
  this.player = document.createElement('audio')
  this.player.src = this.src
  this.player.autoplay = false
}

export {AudioPlayer}
