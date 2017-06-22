<template>
  <div class="list-info">
    <div class="cover">
      <img :src="this.listDetail.coverImgUrl" alt="" class="cover-img">
      <span class="msk"></span>
    </div>
    <div class="content">
      <div class="head">
        <i class="icn-title"></i>
        <div class="title">
          <h2 class="text-brk">{{listDetail.name}}</h2>
        </div>
      </div>
      <div class="user">
        <a class="face" href="javascript:;">
          <img :src="listDetail.creator.avatarUrl">
        </a>
        <span class="name"><a href="javascript:;">{{listDetail.creator.nickname}}</a></span>
        <sup class="icon-star"></sup>
        <span class="create-time">{{formatDate(listDetail.createTime)}}&nbsp;创建</span>
      </div>
      <div class="operations">
        <a href="javascript:;" class="play-list" hidefocus="true" @click="$emit('play')"><i><em class="play"></em>播放</i></a>
        <a href="javascript:;" class="add" hidefocus="true"></a>
        <a href="javascript:;" class="subscribe"><i class="icon-opteration">({{computedSubscribeCount()}})</i></a>
        <a href="javascript:;" class="share"><i>({{listDetail.shareCount}})</i></a>
        <a href="javascript:;" class="download"><i>下载</i></a>
        <a href="javascript:;" class="comment"><i>({{listDetail.commentCount}})</i></a>
      </div>
      <div class="tags">
        <b>标签：</b>
        <a href="javascript:;" class="tag-item" v-for="item in listDetail.tags"><i>{{item}}</i></a>
      </div>
      <p class="description" :class="{'spread':showDescription}"><b>介绍：</b>{{listDetail.description}}</p>
      <div class="show-all">
        <span class="des-spread" @click="toggleDescription" v-if="showDescription===false">展开<i class="icn-arrow"></i></span>
        <span class="des-spread" @click="toggleDescription" v-else>收起<i class="icn-arrow-up"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    stampsToDate
  } from '@/assets/js/formatTime.js'
  export default {
    data () {
      return {
        subscribedCount: this.listDetail.subscribedCount,
        showDescription: false
      }
    },
    props: {
      listDetail: {}
    },
    methods: {
      formatDate (stamp) {
        return stampsToDate(stamp)
      },
      computedSubscribeCount () {
        if (this.subscribedCount > 100000) {
          return Math.floor(this.subscribedCount / 10000) + '万'
        } else {
          return this.subscribedCount
        }
      },
      toggleDescription () {
        console.log('toggle')
        this.showDescription = !this.showDescription
      }
    },
    mounted () {
      console.log(this.listDetail, 'listDetail')
    }
  }
</script>

<style lang="scss" scoped>
  .list-info {
    display: flex;
    justify-content: space-between;
  }
  .cover {
    width: 200px;
    height: 200px;
    position: relative;
    .cover-img {
      width: 100%;
      height: 100%;
    }
    .msk {
      position: absolute;
      width: 208px;
      height: 208px;
      background: url(../assets/img/coverall.png) no-repeat;
      background-position: 0 -1285px;
      top: -4px;
      left: -4px;
    }
  }
  .content {
    width: 410px;
    .head {
      position: relative;
      margin: 0 0 12px;
      line-height: 24px;
      .icn-title {
        float: left;
        width: 54px;
        height: 24px;
        background: url(../assets/img/icon.png) no-repeat;
        background-position: 0 -243px;
      }
      .title {
        margin-left: 64px;
        position: relative;
        line-height: 24px;
        h2 {
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
    .user {
      margin: 0 0 20px;
      line-height: 35px;
      .face {
        margin-right: 10px;
        float: left;
        width: 35px;
        height: 35px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        float: left;
        line-height: 35px;
        a {
          color: #0c73c2;
        }
      }
      .icon-star {
        float: left;
        margin: 9px 0 0 3px;
        width: 12px;
        height: 13px;
        background: url(../assets/img/icon.png) no-repeat;
        background-position: -65px -840px;
      }
      .create-time {
        margin-left: 15px;
        color: #999;
      }
    }
    .operations {
      overflow: hidden;
      margin-bottom: 25px;
      .play-list {
        &:hover {
          background-position: right -510px;
          i {
            background-position: 0 -469px;
            em {
              background-position: -28px -1622px;
            }
          }
        }
        &:active {
          background-position: right -592px;
          i {
            background-position: 0 -551px;
            em {
              background-position: -56px -1622px;
            }
          }
        }
        float: left;
        color: #fff;
        background: url(../assets/img/button2.png) no-repeat;
        background-position: right -428px;
        padding: 0 5px 0 0;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        text-align: center;
        i {
          display: block;
          padding: 0 7px 0 8px;
          background: url(../assets/img/button2.png) no-repeat;
          background-position: 0 -387px;
          height: 31px;
          line-height: 31px;
          overflow: hidden;
          em {
            float: left;
            width: 20px;
            height: 18px;
            margin: 6px 2px 2px 0;
            background: url(../assets/img/button2.png) no-repeat;
            background-position: 0 -1622px;
          }
        }
      }
      .add {
        float: left;
        width: 31px;
        height: 31px;
        margin-right: 5px;
        margin-left: -3px;
        background: url(../assets/img/button2.png) no-repeat;
        background-position: 0 -1588px;
        &:hover {
          background-position: -40px -1588px;
        }
        &:active {
          background-position: -80px -1588px;
        }
      }
      .subscribe {
        cursor: default;
        float: left;
        height: 31px;
        line-height: 30px;
        padding: 0 5px 0 0;
        margin-right: 6px;
        background: url(../assets/img/button2.png) no-repeat;
        background-position: right -1020px;
        .icon-opteration {
          float: left;
          height: 31px;
          padding-right: 2px;
          padding-left: 28px;
          background: url(../assets/img/button2.png) no-repeat;
          background-position: 0 -977px;
        }
      }
      .share {
        @extend .subscribe;
        i {
          @extend .icon-opteration;
          background-position: 0 -1225px;
        }
      }
      .download {
        @extend .subscribe;
        i {
          @extend .icon-opteration;
          background-position: 0 -2761px;
        }
      }
      .comment {
        @extend .subscribe;
        i {
          @extend .icon-opteration;
          background-position: 0 -1465px;
        }
      }
    }
    .tags {
      overflow: hidden;
      margin: 25px 0 5px;
      line-height: 22px;
      b {
        float: left;
        font-weight: normal;
        color: #666;
      }
      .tag-item {
        float: left;
        cursor: default;
        margin: 0px 10px 3px 0;
        padding: 0 10px 0 0;
        text-shadow: 0 1px #fdfdfd;
        background: url(../assets/img/button2.png) no-repeat;
        background-position: right -27px;
        color: #777;
        height: 22px;
        i {
          float: left;
          margin-right: -2px;
          height: 22px;
          padding: 0 3px 0 13px;
          background: url(../assets/img/button2.png) no-repeat;
          background-position: 0 0;
        }
      }
    }
    .description {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
      white-space: pre-wrap;
      height: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      b {
        font-weight: normal;
        color: #666;
      }
    }
    .spread{
      height: auto;
    }
    .show-all {
      .des-spread {
        cursor: pointer;
        float: right;
        color: #0c73c2;
        .icn-arrow {
          display: inline-block;
          vertical-align: middle;
          width: 11px;
          height: 8px;
          background: url(../assets/img/icon.png) no-repeat;
          background-position: -65px -520px;
        }
        .icn-arrow-up {
          @extend .icn-arrow;
          background-position: -45px -520px;
        }
      }
    }
  }
</style>
