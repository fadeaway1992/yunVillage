<template>
  <div class="list-info">
    <div class="cover">
      <img :src="this.listDetail.coverImgUrl" alt="" class="cover-img">
      <span class="msk"></span>
    </div>
    <div class="content">
      <div class="head"></div>
      <div class="user"></div>
      <div class="operations"></div>
      <div class="tags"></div>
      <div class="description"></div>
      <div class="show-all"></div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    listDetail: {}
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
  }
</style>
