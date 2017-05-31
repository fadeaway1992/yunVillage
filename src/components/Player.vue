<template lang="html">
  <div class="player-bar">
    <div class="updn">
      <div class="lock-switch">
        <span class="lock-btn"></span>
      </div>
      <div class="right"></div>
    </div>
    <div class="bg">
      <div class="play-btn" @click="play"></div>
    </div>
    <div class="wrap">

    </div>
  </div>
</template>

<script>
  import {AudioPlayer} from '@/assets/js/AudioPlayer.js'
  AudioPlayer.init()
  export default {
    methods:{
      play(){
        AudioPlayer.player.paused?AudioPlayer.player.play():AudioPlayer.player.pause()
      }
    }
  }
</script>

<style lang="scss">
  .play-btn{
    width:50px;
    height:50px;
    background:red;
  }
  .player-bar{
    width:100%;
    position:fixed;
    bottom:0px;
    left:0px;
    height:53px;
    .updn{
      position:relative;
      .lock-switch{
        position: absolute;
        top: -14px;
        right: 15px;
        width: 52px;
        height: 67px;
        background: url(../assets/img/playbar.png);
        background-position: 0 -380px;
        .lock-btn{
          display: block;
          width: 18px;
          height: 18px;
          margin: 6px 0 0 17px;
          background: url(../assets/img/playbar.png);
          background-position: -100px -380px;
          cursor:pointer;
          &:hover{
            background-position: -100px -400px;
          }
        }
      }
      .right{
        position: absolute;
        top: -1px;
        right: 0;
        width: 15px;
        height: 54px;
        background: url(../assets/img/playbar.png) no-repeat;
        background-position: -52px -393px;
      }
    }
    .bg{
      height: 53px;
      margin-right: 67px;
      background-image:url(../assets/img/playbar.png);
      background-position: 0 0;
      background-repeat: repeat-x;
    }
  }
</style>
