<template>
  <div class="music-table">
    <div class="table-title">
      <h3>歌曲列表</h3>
      <span class="music-count">{{list.length}}首歌</span>
      <div class="play-time">
        <span>播放：<strong class="count">{{listDetail.playCount}}</strong> 次</span>
      </div>
    </div>
    <div class="table">
      <div class="table-head">
        <div class="head-coner"></div>
        <div class="head-title"><div class="content">歌曲标题</div></div>
        <div class="head-duration"><div class="content">时长</div></div>
        <div class="head-artist"><div class="content">歌手</div></div>
        <div class="head-album"><div class="content">专辑</div></div>
      </div>
      <ul class="table-body">
        <li class="music-item" v-for="(item, index) in list" :class="{'odd': index%2===0}">
          <div class="index">
            <div class="wrap">
              <span class="play-btn" :class="{'now':item.id === currentMusic.id}" @click="$emit('addAndPlay', item)"></span>
              <span class="num">{{index + 1}}</span>
            </div>
          </div>
          <div class="name">
            <a class="name-text text-overflow">{{item.name}}</a>
          </div>
          <div class="duration">
            <span>{{formattedTime(item.dt)}}</span>
          </div>
          <div class="artist"><a class="text-overflow">{{getArtist(item)}}</a></div>
          <div class="album"><a class="text-overflow">{{item.al.name}}</a></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from '@/assets/js/formatTime.js'
export default {

  computed: {
    ...mapGetters([
      'listDetail',
      'currentMusic',
      'list'
    ])
  },

  methods: {
    // 获取歌曲时长
    formattedTime (dt) {
      return formatTime(dt / 1000)
    },
    getArtist (item) {
      let artist = item.ar[0].name
      let i = 1
      while (i < item.ar.length) {
        artist = artist + '/' + item.ar[i].name
        i++
      }
      return artist
    }
  },

  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .music-table {
    margin-top: 27px;
    .table-title {
      display: flex;
      align-items: flex-end;
      height: 35px;
      padding-bottom: 5px;
      box-sizing: border-box;
      border-bottom: 2px solid #c20c0c;
      h3 {
        font-size: 20px;
        line-height: 28px;
        font-weight: normal;
      }
      .music-count {
        margin-left: 20px;
        color: #666;
      }
      .play-time {
        flex-grow: 1;
        overflow: hidden;
        span {
          float: right;
          color: #666;
          strong {
            color: #c20c0c;
          }
        }
      }
    }
    .table {
      border: 1px solid #d9d9d9;
    }
    .table-head {
      height: 39px;
      display: flex;
      div {
        text-align: left;
        font-weight: normal;
        color: #666;
        height: 39px;
        background-color: #f7f7f7;
        background: url(../assets/img/table.png) repeat-x 0 0;
        .content {
          height: 18px;
          line-height: 18px;
          padding: 8px 10px;
          background: url(../assets/img/table.png) no-repeat;
          background-position: 0 -56px;
        }
      }
      .head-coner {
        width: 75px;
      }
      .head-title {
        width: 237px;
      }
      .head-duration {
        width: 111px;
      }
      .head-artist {
        width: 89px;
      }
      .head-album {
        width: 128px;
      }
    }
    .table-body {
      .music-item > div {
        padding: 6px 10px;
        line-height: 18px;
      }
      .odd {
          background-color: #f7f7f7;
        }
      .music-item {
        display: flex;
        .index {
          width: auto;
          .wrap {
           width:54px;
            .play-btn {
              float: right;
              width: 17px;
              height: 17px;
              cursor: pointer;
              background: url(../assets/img/table.png) no-repeat;
              background-position: 0 -103px;
              &:hover {
                background-position: 0 -128px;
              }
            }
            .now {
              background-position: -20px -128px;
            }
            .num {
              margin-left: 5px;
              color: #999;
            }
          }
        }
        .name {
          width: 217px;
          .name-text {
            max-width: 195px;
            display: block;
          }
        }
        .duration {
          width: 91px;
          span {
            color: #666;
          }
        }
        .artist {
          width: 69px;
          a {
            max-width: 69px;
            display: block;
          }
        }
        .album {
          width: 107px;
          a {
            max-width: 107px;
            display: block;
          }
        }
      }
    }
  }
</style>
