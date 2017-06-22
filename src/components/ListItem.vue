<template>
  <div class="music-table">
    <div class="table-title">
      <h3>歌曲列表</h3>
      <span class="music-count">{{list.length}}首歌</span>
      <div class="play-time">
        <span>播放：<strong class="count">{{listDetail.playCount}}</strong> 次</span>
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
  }
</style>
