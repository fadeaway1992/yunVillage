<template lang="html">
  <div class="g-bar">
    <div class="bar-top">
      <div class="wrap flex-width">
        <h1 class="logo">
          <a href="/#">网易云音乐</a>
        </h1>
        <ul class="nav">
          <li class="first current"><a href="#"><span>发现音乐</span></a></li>
          <li><a href="#"><span>我的音乐</span></a></li>
          <li><a href="#"><span>朋友</span></a></li>
          <li><a href="#"><span>商城</span></a></li>
          <li><a href="#"><span>音乐人</span></a></li>
          <li class="last"><a href="#"><span>下载客户端</span></a><sub class="hot"></sub></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Headtop'
}
</script>

<style lang="scss" scoped>
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
      .nav{
        float:left;
        li{
          float:left;
          position:relative;
          color:#ccc;
          font-size:14px;
          background:url(../assets/img/topbar.png),url(../assets/img/topbar.png);
          background-repeat: no-repeat,no-repeat;
          background-position: right -300px, left -300px;
          &:hover a{
            background-position:left -470px;
            background-repeat:no-repeat;
            margin:0 -1px;
          }
          &:hover a span{
            padding: 0 21px 0 19px;
            background-position: right -470px;
          }
          a{
            position:relative;
            display:block;
            padding-left:2px;
            background: url(../assets/img/topbar.png) no-repeat 0 9999px;
            span{
              display:block;
              padding: 0 20px 0 18px;
              overflow:hidden;
              height:70px;
              line-height:76px;
              background: url(../assets/img/topbar.png) no-repeat 0 9999px;
            }
          }
        }
        .first{
          background:url(../assets/img/topbar.png) no-repeat right -300px;
        }
        .current{
          &:hover a{
            background-position: left -155px;
            background-repeat:no-repeat;
            margin:0;
          }
          &:hover a span{
            padding: 0 20px 0 18px;
            background-position: 0 9999px;
          }
        }
        .current a{
          background-position: left -155px;
        }
        .last{
          background:url(../assets/img/topbar.png) no-repeat left -300px;
          &:hover a span{
            padding: 0 40px 0 18px;
          }
          & a span{
            padding: 0 40px 0 18px;
          }
        }
      }
    }
  }
}
.hot{
  display: block;
  position: absolute;
  top: 23px;
  left: 90px;
  width: 28px;
  height: 19px;
  background: url(../assets/img/topbar.png) no-repeat;
  background-position: -190px 0;
}
</style>
