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
        <a href="javascript:;" class="prev" title="上一首" @click.prevent="checkToPrev"></a>
        <a href="javascript:;" class="play-or-pause pausing" id="play_btn" title="播放／暂停" @click="playOrPause"></a>
        <a href="javascript:;" class="next" title="下一首" @click.prevent="checkToNext"></a>
      </div>
      <div class="cover">
        <img :src="currentMusic.cover" width="34" height="34">
        <a href="javacript:;" hidefocus="true" class="mask"></a>
      </div>
      <div class="playing-bar">
        <div class="words">
          <a hidefocus="true text-flow" href="javascript:;" class="song-title" :title="currentMusic.name">{{currentMusic.name}}</a>
          <a class="song-by text-flow" href="javascript:;">{{currentMusic.artist}}</a>
        </div>
        <div class="process-bar">
          <div class="bar-bg">
            <div class="ready" :style="{width:bufferedLength}"></div>
            <div class="current" :style="{width:playedLength}">
              <span class="btn" id="drag_control_point"><i id="loading"></i></span>
            </div>
          </div>
          <span class="time"><em>{{secCounter}}</em> / {{currentMusic.duration}}</span>
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
        <a href="javascript:;" hidefocus="true" data-action="mode" class="icon" :class="mode" title="循环" @click.prevent="changeLoopStyle('toggle')"></a>
        <span class="toggle-play-panel">
          <a href="javascript:;" title="播放列表" hidefocus="true" data-action="panel" class="icon icn-list"  @click.prevent="toggleLyricPanel">{{playList.length}}</a>
        </span>
      </div>
    </div>
    <div class="play-panel" id="play_list_panel" v-show="showLyricPanel">
      <div class="panel-head">
        <div class="head-content">
          <h4>播放列表 (<span class="amount"> {{playList.length}} </span>)</h4>
          <p class="song-title">{{currentMusic.name}}</p>
          <span class="panel-close" @click="toggleLyricPanel"></span>
        </div>
      </div>
      <div class="panel-body">
        <img class="img-bg" src="http://music.163.com/api/img/blur/619025046449427" style="top: -360px;">
        <div class="mask"></div>
        <div class="list-content">
          <ul class="play-list"  id="play_list_content" :style="{top:playListContentOffsetTop+'px'}">
            <li :class="{'now':item.id===currentMusic.id}" v-for="item in playList" @click="clickInPageToPlayASong(item)">
              <div class="col col-1"><div class="play-icn"></div></div>
              <div class="col col-2 text-overflow">{{item.name}}</div>
              <div class="col col-3"><div class="delete" title="删除" @click.stop="removeItemFromPlayList(item)"></div></div>
              <div class="col col-4 text-overflow"><span :title="item.artist"><a href="javascript:;" hidefocus="true">{{item.artist}}</a></span></div>
              <div class="col col-5">{{item.duration}}</div>
              <div class="col col-6"><a href="javascritp:;" class="ico-src" title="来自歌单"></a></div>
            </li>
          </ul>
        </div>
        <div class="scroll-bar">
          <span class="scroll" id="play_list_scroll_bar" hidefocus="true" style="display: block; top: 0px;" :style="{height: playListScrollBarHeight+'px', top: playListScrollOffsetTop+'px'}"></span>
        </div>
        <div class="mask2"></div>
        <div class="lyric-panel"></div>
        <div class="lyric-scroll-bar">
          <span class="scroll-1" hidefocus="true" style="height: 32.3523px; display: block; top: 0px;"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        showLyricPanel: false,
        // 存储播放列表窗口的 top 值。
        playListContentOffsetTop: 0,
        // 存储播放列表滚动条的 top 值
        playListScrollOffsetTop: 0
      }
    },
    computed: {
      ...mapGetters([
        'player',
        'currentMusic',
        'playList',
        'secCounter',
        'playedLength',
        'bufferedLength',
        'loopStyle',
        'playListScrollBarHeight'
      ]),
      mode () {
        return {
          'icn-loop': this.loopStyle === 'listLoop',
          'icn-one': this.loopStyle === 'singleLoop',
          'icn-shuffle': this.loopStyle === 'shuffle'
        }
      },
      playListLength () {
        return this.playList.length
      }
    },

    methods: {
      ...mapActions([
        // 点击播放按钮时触发  "播放／暂停"
        'playOrPause',
        // 获取进度条当前长度
        'getPlayedLength',
        // 切换播放列表中当前歌曲的指向
        'changePlayIndex',
        // 添加钩子函数
        'addPlayHooks',
        // 激活进度条拖拽
        'activateDragPoint',
        // 改变循环模式
        'changeLoopStyle',
        // 播放页面中的歌曲
        'clickInPageToPlayASong',
        // 从播放列表中删除歌曲
        'removeItemFromPlayList',
        // 获取播放列表滚动条的高度
        'getPlayListScrollBarHeight'
      ]),

      checkToNext: async function () {
        await this.changePlayIndex('next')
        this.playOrPause()
      },

      checkToPrev: async function () {
        await this.changePlayIndex('prev')
        this.playOrPause()
      },

      // 显示或隐藏歌词面板
      toggleLyricPanel () {
        this.showLyricPanel = !this.showLyricPanel
        if (this.showLyricPanel === true) {
          // 获取播放列表滚动条高度
          const self = this
          setTimeout(function(){
            self.getPlayListScrollBarHeight()
          }, 500)
        }
      }
    },

    watch: {
      secCounter: function (val) {
        if (window.controlPointDown === 1) {
          return
        }
        if (val === this.currentMusic.duration) { return }
        this.getPlayedLength()
      },

      // 每次播放列表曲目有变化时重新获取滚动条高度
      playListLength () {
        console.log('播放列表曲目改变')
        this.getPlayListScrollBarHeight()
      },

      // 当播放列表 top 值改变时更新滚动条高度
      playListContentOffsetTop (value) {
        const playListContent = document.getElementById('play_list_content')
        const minTop = playListContent.parentNode.offsetHeight - playListContent.offsetHeight // minTop存储了窗口 top 值的最小值
        const theScale = value / minTop
        const scrollBarParentHeight = document.getElementById('play_list_scroll_bar').parentNode.offsetHeight
        const maxTop = scrollBarParentHeight - this.playListScrollBarHeight
        this.playListScrollOffsetTop = maxTop * theScale
        if (this.playListScrollOffsetTop > maxTop ) {
          this.playListScrollOffsetTop = maxTop
        } else if (this.playListScrollOffsetTop < 0) {
          this.playListScrollOffsetTop = 0
        }
      }
    },

    created () {
      this.addPlayHooks()
      this.$nextTick(function () {
        // 添加播放拖拽功能
        this.activateDragPoint()

        // 自定义播放列表滚动条
        const playListContent = document.getElementById('play_list_content')
        playListContent.onmousewheel = (e) => {
          e = e || window.event
          e.preventDefault()
          let velocity = 1
          if (e.wheelDelta % 120 === 0) {
            velocity = Math.abs(e.wheelDelta / 12)  // 给鼠标滚动添加力度
          } else {
            velocity = Math.abs(e.wheelDelta / 30)  // 给触摸板滚动添加力度
          }
          if (e.wheelDelta > 0) {
            this.playListContentOffsetTop += 10 * velocity
            if (this.playListContentOffsetTop > 0) {
              this.playListContentOffsetTop = 0
            }
          } else {
            this.playListContentOffsetTop -= 10 * velocity
            const minTop = playListContent.parentNode.offsetHeight - playListContent.offsetHeight 
            if (this.playListContentOffsetTop < minTop) {
              this.playListContentOffsetTop = minTop
            }
          }
        }
      })
    },

    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  @mixin scroll {
    position: absolute;
    left: 0;
    top: 0px;
    width: 4px;
    border-radius: 5px;
    height: 100px;
    cursor: pointer;
    background: #868686;
    border: 1px solid #a6a6a6;
    opacity: .8;
  }
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
                cursor:pointer;
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
                .loading{
                  visibility: visible;
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
        .icn-shuffle {
          background-position: -66px -248px;
          &:hover{
            background-position: -93px -248px;
          }
        }
        .icn-one {
          background-position: -66px -344px;
          &:hover{
            background-position: -93px -344px;
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
  #play_list_panel{
    position: absolute;
    left: 50%;
    bottom: 47px;
    transform: translateX(-50%);
    width: 986px;
    height: 301px;
    .panel-head{
      height: 41px;
      padding: 0 5px;
      background: url(../assets/img/playlist_bg.png) no-repeat;
      background-position: 0 0;
      .head-content{
        position: relative;
        height: 40px;
        h4{
          position: absolute;
          left: 25px;
          top: 0;
          height: 39px;
          line-height: 39px;
          font-size: 14px;
          color: #e2e2e2;
        }
        .song-title{
          position: absolute;
          left: 595px;
          top: 0;
          width: 346px;
          text-align: center;
          height: 39px;
          line-height: 39px;
          color: #fff;
          font-size: 14px;
        }
        .panel-close{
          position: absolute;
          top: 6px;
          right: 8px;
          width: 30px;
          height: 30px;
          overflow: hidden;
          text-indent: -999px;
          cursor: pointer;
          background: url(../assets/img/playlist.png) no-repeat;
          background-position: -195px 9px;
        }
      }
    }
    .panel-body{
      position: absolute;
      padding: 0 5px;
      left: 0;
      top: 41px;
      width: 976px;
      height: 260px;
      overflow: hidden;
      background: url(../assets/img/playlist_bg.png) repeat-y;
      background-position: -1014px 0;
      .img-bg{
        position: absolute;
        left: 2px;
        z-index: 1;
        width: 980px;
        height: auto;
      }
      .mask{
        position: absolute;
        left: 2px;
        top: 0;
        z-index: 2;
        width: 558px;
        height: 260px;
        background: #121212;
        opacity: .5;
      }
      .list-content{
        position: absolute;
        left: 2px;
        top: 0;
        z-index: 4;
        height: 260px;
        width: 553px;
        overflow: hidden;
        .play-list{
          color: #ccc;
          overflow: hidden;
          position: relative;
          li{
            float: left;
            width: 100%;
            &:hover {
              background-color: rgba(0,0,0,0.4);
              color: #fff;
              .col-3 .delete{
                display: block;
              }
            }
            .col{
              float: left;
              padding-left: 10px;
              height: 28px;
              line-height: 28px;
              overflow: hidden;
              cursor: pointer;
            }
            .col-1{
              width: 10px;
              .play-icn{
                visibility: hidden;
                margin-top: 8px;
                width: 10px;
                height: 13px;
                background: url(../assets/img/playlist.png) no-repeat;
                background-position: -182px 0;
              }
            }
            .col-2{
              width: 256px;
            }
            .col-3{
              width: 58px;
              .delete{
                display:none;
                width: 13px;
                height: 16px;
                margin-top: 6px;
                background: url(../assets/img/playlist.png) no-repeat;
                background-position: -51px 0;
                &:hover{
                  background-position: -51px -20px;
                }
              }
            }
            .col-4{
              width: 90px;
            }
            .col-5{
              width: 35px;
            }
            .col-6{
              width: 37px;
              padding-left: 6px;
              .ico-src{
                float: right;
                width: 14px;
                margin-left: 0;
                background: url(../assets/img/playlist.png) no-repeat;
                background-position: -80px 0px;
                margin: 7px 0 0 10px;
                height: 16px;
                &:hover {
                  background-position: -80px -20px;
                }
              }
            }
          }
          .now{
            background-color: rgba(0,0,0,0.3);
            color: #fff;
            .col-1 .play-icn{
              visibility: visible;
            }
          }
        }
      }
      .scroll-bar{
        position: absolute;
        left: 555px;
        top: -1px;
        z-index: 10;
        width: 6px;
        height: 260px;
        background: #000;
        opacity: .5;
        .scroll{
          @include scroll;
        }
      }
      .mask2{
        position: absolute;
        left: 560px;
        top: 0;
        z-index: 3;
        width: 420px;
        height: 250px;
        background: #121212;
        opacity: .5;
      }
      .lyric-panel{
        position: absolute;
        right: 40px;
        top: 0;
        z-index: 4;
        margin: 21px 0 20px 0;
        height: 219px;
        width: 354px;
        overflow: hidden;
      }
      .lyric-scroll-bar{
        position: absolute;
        right: 2px;
        top: -1px;
        z-index: 10;
        width: 6px;
        height: 260px;
        background: #000;
        opacity: .5;
        .scroll-1{
          @include scroll;
        }
      }
    }
  }
</style>
