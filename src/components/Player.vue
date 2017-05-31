<template lang="html">
  <div class="player-bar">
    <div class="updn">
      <div class="lock-switch">
        <span class="lock-btn"></span>
      </div>
      <div class="right"></div>
    </div>
    <div class="bg"></div>
    <div class="wrap">
      <div class="ctrl-btns">
        <a href="javascript:;" class="prev" title="上一首"></a>
        <a href="javascript:;" class="play-or-pause pausing" title="播放／暂停" @click="play"></a>
        <a href="javascript:;" class="next" title="下一首"></a>
      </div>
      <div class="cover">
        <img src="http://p3.music.126.net/vkoQqphGwk6TyRFai3ZBdw==/3238061743857732.jpg?param=34y34" width="34" height="34">
        <a href="javacript:;" hidefocus="true" class="mask"></a>
      </div>
      <div class="playing-bar">
        <div class="words">
          <a hidefocus="true text-flow" href="javascript:;" class="song-title" title="威风堂堂">威风堂堂</a>
          <a class="song-by text-flow" href="javascript:;">洛天依</a>
        </div>
        <div class="process-bar">
          <div class="bar-bg">
            <div class="ready" style="width:80%"></div>
            <div class="current" style="width:53%">
              <span class="btn"><i></i></span>
            </div>
          </div>
          <span class="time"><em>{{currentTime}}</em> / {{duration}}</span>
        </div>
      </div>
      <div class="operations">
        <a href="javascript:;" hidefocus="true" class="icn icn-add" title="收藏"></a>
        <a href="javascript:;" hidefocus="true" class="icn icn-share" title="分享"></a>
      </div>
      <div class="ctrls">
        <div class="volume" style="visibility:hidden">
          <div class="bar-bg"></div>
          <div class="volume-bg">
            <div class="curr" style="height:74.4px"></div>
            <span class="btn" style="top:16.2px"></span>
          </div>
        </div>
        <a href="javascript:;" hidefocus="true" data-action="volume" class="icon icn-vol"></a>
        <a href="javascript:;" hidefocus="true" data-action="mode" class="icon icn-loop" title="循环"></a>
        <span class="toggle-play-panel">
          <a href="javascript:;" title="播放列表" hidefocus="true" data-action="panel" class="icon icn-list">50</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {AudioPlayer} from '@/assets/js/AudioPlayer.js'
  export default {
    data(){
      return {
        currentTime:'00:00',
        duration:'',
        playedLength:'',
      }
    },
    computed:{

    },
    methods:{
      play(){
        AudioPlayer.player.paused?AudioPlayer.player.play():AudioPlayer.player.pause()
        this.getCurrentTime()
      },
      getPlayedLength(){

      },
      getCurrentTime(){
        let self = this
        let count = setInterval(function(){
          self.currentTime = AudioPlayer.getTime(AudioPlayer.player.currentTime)
        },1000)
      },
      getDuration(){
        this.duration = AudioPlayer.getTime(AudioPlayer.player.duration)
      }
    },
    watch:{
      currentTime:function(val){
        return
      }
    },
    created(){
      let self = this
      AudioPlayer.init()
      AudioPlayer.player.addEventListener('canplay',function(){
        self.getDuration()
      })
    },
    mounted(){

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
    .wrap{
      margin-left: -490px;
      position: absolute;
      left: 50%;
      top: 6px;
      z-index: 15;
      width: 980px;
      height: 47px;
      .ctrl-btns{
        float: left;
        width: 137px;
        padding: 6px 0 0 0;
        a{
          display: block;
          float: left;
        }
        .prev{
          width: 28px;
          height: 28px;
          margin-right: 8px;
          margin-top: 5px;
          background:url(../assets/img/playbar.png) no-repeat;
          background-position: 0 -130px;
          &:hover{
            background-position: -30px -130px;
          }
        }
        .play-or-pause{
          width: 36px;
          height: 36px;
          margin-top: 0;
          margin-right: 8px;
          background:url(../assets/img/playbar.png) no-repeat;
        }
        .pausing{
          background-position: 0 -204px;
          &:hover{
            background-position: -40px -204px;
          }
        }
        .playing{
          background-position: 0 -165px;
          &:hover{
            background-position: -40px -165px;
          }
        }
        .next{
          width: 28px;
          height: 28px;
          margin-right: 8px;
          margin-top: 5px;
          background:url(../assets/img/playbar.png) no-repeat;
          background-position: -80px -130px;
          &:hover{
            background-position: -110px -130px;
          }
        }
      }
      .cover{
        position: relative;
        margin: 6px 15px 0 0;
        width: 34px;
        height: 34px;
        float: left;
        .mask{
          position: absolute;
          top: 0px;
          left: 0px;
          display: block;
          width: 34px;
          height: 35px;
          background: url(../assets/img/playbar.png) no-repeat;
          background-position: 0 -80px;
        }
      }
      .playing-bar{
        float: left;
        position: relative;
        width: 608px;
        .words{
          height: 28px;
          overflow: hidden;
          color: #e8e8e8;
          text-shadow: 0 1px 0 #171717;
          line-height: 28px;
          .song-title{
            max-width: 300px;
            color: #e8e8e8;
            float: left;
            &:hover{
              text-decoration: underline;
            }
          }
          .text-flow{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .song-by{
            display: block;
            float: left;
            max-width: 220px;
            margin-left: 15px;
            color: #9b9b9b;
          }
        }
        .process-bar{
          width: 493px;
          position: relative;
          .bar-bg{
            height: 9px;
            width: 493px;
            background:url(../assets/img/statbar.png) no-repeat;
            background-position: right 0;
            .ready{
              height:9px;
              background:url(../assets/img/statbar.png) no-repeat;
              background-position: right -30px;
            }
            .current{
              position: absolute;
              top: 0;
              left: 0;
              height: 9px;
              background:url(../assets/img/statbar.png) no-repeat;
              background-position: left -66px;
              .btn{
                position: absolute;
                top: -7px;
                right: -13px;
                width: 22px;
                height: 24px;
                margin-left: -11px;
                background:url(../assets/img/iconall.png) no-repeat;
                background-position: 0 -250px;
                &:hover{
                  background-position: 0 -280px;
                }
                i{
                  visibility: hidden;
                  position: absolute;
                  left: 5px;
                  top: 5px;
                  width: 12px;
                  height: 12px;
                  background:url(../assets/img/loading.gif) no-repeat;
                }
              }
            }
          }
          .time{
            position: absolute;
            top: -3px;
            right: -84px;
            color: #797979;
            text-shadow: 0 1px 0 #121212;
            line-height:14px;
            em{
              color: #a1a1a1;
              font-style:normal;
            }
          }
        }
      }
      .operations{
        float: left;
        width: 60px;
        .icn{
          float: left;
          width: 25px;
          height: 25px;
          margin: 11px 2px 0 0;
          background:url(../assets/img/playbar.png) no-repeat;
        }
        .icn-add{
          background-position: -88px -163px;
          &:hover{
            background-position: -88px -189px;
          }
        }
        .icn-share{
          background-position: -114px -163px;
          &:hover{
            background-position: -114px -189px;
          }
        }
      }
      .ctrls{
        position: relative;
        z-index: 10;
        float: left;
        width: 113px;
        padding-left: 13px;
        background:url(../assets/img/playbar.png) no-repeat;
        background-position: -147px -238px;
        .volume{
          position: absolute;
          top: -113px;
          left: 9px;
          clear: both;
          width: 32px;
          height: 113px;
          .bar-bg{
            position: absolute;
            top: 0;
            left: 0;
            width: 32px;
            height: 113px;
            background: url(../assets/img/playbar.png);
            background-position: 0 -503px;
          }
          .volume-bg{
            padding: 4px 0;
            top: 7px;
            position: absolute;
            top: 11px;
            left: 14px;
            width: 4px;
            height: 93px;
            .curr{
              position: absolute;
              top: auto;
              bottom: 4px;
              left: 0;
              width: 4px;
              height: 93px;
              background:url(../assets/img/playbar.png) no-repeat;
              background-position: -40px bottom;
              overflow: hidden;
            }
            .btn{
              position: absolute;
              top: 0;
              left: -7px;
              display: block;
              width: 18px;
              height: 20px;
              cursor: pointer;
              background:url(../assets/img/iconall.png) no-repeat;
              background-position: -40px -250px;
              &:hover{
                background-position: -40px -280px;
              }
            }
          }
        }
        .icon{
          float: left;
          width: 25px;
          height: 25px;
          margin: 11px 2px 0 0;
          background:url(../assets/img/playbar.png) no-repeat;
        }
        .icn-vol{
          background-position: -2px -248px;
          &:hover{
            background-position: -31px -248px;
          }
        }
        .icn-loop{
          background-position: -3px -344px;
          &:hover{
            background-position: -33px -344px;
          }
        }
        .toggle-play-panel{
          float: left;
          width: 59px;
          height: 36px;
          position:relative;
          .icn-list{
            display: block;
            float: none;
            width: 38px;
            padding-left: 21px;
            background-position: -42px -68px;
            line-height: 27px;
            text-align: center;
            color: #666;
            text-shadow: 0 1px 0 #080707;
            text-indent: 0;
            text-decoration: none;
            &:hover{
              background-position: -42px -98px;
            }
          }
        }
      }
    }
  }
</style>
