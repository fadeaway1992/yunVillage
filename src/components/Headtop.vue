<template lang="html">
  <div class="g-bar">
    <div class="bar-top">
      <div class="wrap flex-width">
        <h1 class="logo">
          <a href="/#">网易云音乐</a>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Headtop'
}
</script>

<style lang="scss">
.g-bar{
  width:100%;
  position:fixed;
  left:0;top:0;
  .bar-top{
    width:100%;
    background:url(../assets/img/topbar.png) repeat-x 0 -80px;
    height:70px;
    .wrap{
      margin:0 auto;
      .logo{
        float:left;
        width:176px;
        a{
          float:left;
          width:157px;
          height:33px;
          padding:22px 20px 0 0;
          text-indent:-9999px;
          background:url(../assets/img/topbar.png) no-repeat 0 15px;
        }
      }
    }
  }
}
</style>
