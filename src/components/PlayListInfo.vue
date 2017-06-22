<template>
  <div class="list-info">
    <div class="cover">
      <img :src="this.listDetail.coverImgUrl" alt="" class="cover-img">
      <span class="msk"></span>
    </div>
    <div class="content">
      <div class="head">
        <i class="icn-title"></i>
        <div class="title"><h2 class="text-brk">{{listDetail.name}}</h2></div>
      </div>
      <div class="user">
        <a class="face" href="javascript:;">
          <img :src="listDetail.creator.avatarUrl">
        </a>
        <span class="name"><a href="javascript:;">{{listDetail.creator.nickname}}</a></span>
        <sup class="icon-star"></sup>
        <span class="create-time">{{formatDate(listDetail.createTime)}}&nbsp;创建</span>
      </div>
      <div class="operations"></div>
      <div class="tags"></div>
      <div class="description"></div>
      <div class="show-all">
        <span class="des-spread">展开<i class="icn-arrow"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { stampsToDate } from '@/assets/js/formatTime.js'
export default {

  props: {
    listDetail: {}
  },

  methods: {
    formatDate (stamp) {
      return stampsToDate(stamp)
    }
  },

  mounted () {
    console.log(this.listDetail, 'listDetail')
  }

}
</script>

<style lang="scss" scoped>
  .list-info{
    display: flex;
    justify-content: space-between;
  }
  .cover {
    width: 200px;
    height: 200px;
    position: relative;
    .cover-img{
      width: 100%;
      height: 100%;
    }
    .msk{
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
        h2{
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
      margin-bottom: 25px;
    }
    .tags {
      margin: 25px 0 5px;
      line-height: 22px;
    }
    .description {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
    }
    .show-all{

    }
  }
</style>
