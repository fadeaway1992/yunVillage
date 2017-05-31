let AudioPlayer={
  // 默认，「威风堂堂」--洛天依
  src:'@/assets/img/weifengtangtang.mp3',
  player:''
}

AudioPlayer.init = function(){
  console.log(this)
  this.player = document.createElement('audio')
  this.player.src = this.src
  this.player.autoplay = false
}

export {AudioPlayer}
