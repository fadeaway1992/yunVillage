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
      'list'
    ])
  },

  methods: {
    // 获取歌曲时长
    formattedTime (dt) {
      return formatTime(dt / 1000)
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
  }
</style>
