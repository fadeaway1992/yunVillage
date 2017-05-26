<template lang="html">
  <div class="g-bar">
    <div class="bar-top">
      <div class="wrap flex-width">
        <h1 class="logo">
          <a href="/#">网易云音乐</a>
        </h1>
        <ul class="nav">
          <li class="first"><router-link to="/0"><span>发现音乐</span><sub class="caret"></sub></router-link></li>
          <li><router-link to="/1"><span>我的音乐</span><sub class="caret"></sub></router-link></li>
          <li><router-link to="/2"><span>朋友</span><sub class="caret"></sub></router-link></li>
          <li><router-link to="/3"><span>商城</span><sub class="caret"></sub></router-link></li>
          <li><router-link to="/4"><span>音乐人</span><sub class="caret"></sub></router-link></li>
          <li class="last"><router-link to="/5"><span>下载客户端</span><sub class="caret"></sub></router-link><sub class="hot"></sub></li>
        </ul>
        <div class="head-dropdown">
          <a class="login-link" href="#">登录</a>
          <div class="drop-down">
            <div class="inner">
              <ul class="inner-ul">
                <li><a href="#"><i class="icon icon-mobile"></i><span>手机号登录</span></a></li>
                <li><a href="#"><i class="icon icon-mail"></i><span>网易邮箱账号登录</span></a></li>
              </ul>
            </div>
            <i class="arr"></i>
          </div>
        </div>
        <div class="search-box">
          <div class="parent">
            <input type="text" class="search-txt" placeholder="单曲/歌手/专辑/歌单/MV/用户">
          </div>
        </div>
      </div>
    </div>
    <div class="bar-sub">
      <div class="wrap">
        <ul class="nav">
          <li><a href="#"><span>推荐</span></a></li>
          <li><a href="#"><span>排行榜</span></a></li>
          <li><a href="#"><span>歌单</span></a></li>
          <li><a href="#"><span>主播电台</span></a></li>
          <li><a href="#"><span>歌手</span></a></li>
          <li><a href="#"><span>新碟上架</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name:'Headtop',

}
</script>

<style lang="scss" scoped>
.g-bar{
  width:100%;
  position:absolute;
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
            .caret{
              display: none;
              position: absolute;
              left: 50%;
              top: 63px;
              width: 14px;
              height: 9px;
              margin-left: -7px;
              overflow: hidden;
              background: url(../assets/img/topbar.png) no-repeat 0 9999px;
              background-position: -226px 0;
            }
          }
        }
        .first{
          background:url(../assets/img/topbar.png) no-repeat right -300px;
        }

        .router-link-active:hover{
          background-position: left -155px;
          background-repeat:no-repeat;
          margin:0;
        }
        li:hover .router-link-active span{
          padding: 0 20px 0 18px;
          background-position: 0 9999px;
        }

        .router-link-active{
          background-position: left -155px;
          .caret{
            display:block;
          }
        }
        .last{
          background:url(../assets/img/topbar.png) no-repeat left -300px;
          &:hover a span{
            padding: 0 40px 0 19px;
          }
          & a span{
            padding: 0 40px 0 18px;
          }
        }
      }
      .head-dropdown{
        float: right;
        position: relative;
        height: 45px;
        margin: 21px 0 0 19px;
        padding: 0 22px 0 0;
        background:url(../assets/img/topbar.png) no-repeat;
        background-position: right -366px;
        &:hover{
          background-position: right -405px;
          & .drop-down{
            display: block;
          }
        }
        .login-link{
          display: block;
          width: 28px;
          font-size: 12px;
          margin-top: 10px;
          color: #999;
          &:hover {
            text-decoration: underline;
            color: #787878;
          }
        }
        .drop-down{
          display:none;
          position: absolute;
          top: 38px;
          right: -43px;
          width: 158px;
          border: 1px solid #000;
          border-radius: 4px;
          .inner{
            border-radius: 3px;
            border: 1px solid #404040;
            background: #2a2a2a;
            .inner-ul{
              li{
                a{
                  display:block;
                  width: 132px;
                  height: 38px;
                  overflow: hidden;
                  padding-left: 24px;
                  color: #ccc;
                  line-height: 39px;
                  &:hover {
                    background: #353535;
                    color: #fff;
                  }
                  i{
                    float: left;
                    width: 18px;
                    height: 18px;
                    margin: 10px 10px 0 -7px;
                    background: url(../assets/img/toplist.png) no-repeat;
                  }
                  .icon-mobile{
                    background-position: 0 0;
                  }
                  .icon-mail{
                    background-position: 0 -40px;
                  }
                }
              }
            }
          }
          .arr{
            position: absolute;
            top: -8px;
            left: 50%;
            width: 16px;
            height: 9px;
            margin-left: -8px;
            background: url(../assets/img/toplist.png) no-repeat;
            background-position: -20px 0;
          }
        }
      }
      .search-box{
        width: 210px;
        height: 31px;
        margin-top: 21px;
        background:url(../assets/img/topbar.png) no-repeat;
        background-position: 0 -550px;
        float: right;
        .parent{
          position: relative;
          margin: 8px 0 0 33px;
          .search-txt{
            width: 90%;
            margin: 0;
            padding: 0;
            background: transparent;
            border:none;
            &:focus{
              outline:none;
            }
          }
        }
      }
    }
  }
  .bar-sub{
    height: 35px;
    background:url(../assets/img/topbar.png) no-repeat;
    background-position: 0 -230px;
    background-repeat: repeat-x;
    .wrap{
      width: 911px;
      padding-left: 168px;
      margin: 0 auto;
      .nav{
        li{
          float:left;
          margin: 0 17px;
          height:35px;
          a{
            display:block;
            height:35px;
            background:url(../assets/img/topbar.png) no-repeat 0 9999px;
            padding-left: 14px;
            &:hover{
              background-position: left -268px;
              & span{
                background-position: right -268px;
              }
            }
            span{
              display:block;
              background:url(../assets/img/topbar.png) no-repeat 0 9999px;
              padding-right: 14px;
              height:35px;
              line-height: 37px;
              color: #fff;
              text-shadow: 0 1px 0 #650303;
              font-size:12px;
            }
          }
          .router-link-active{
            background-position: left -268px;
            span{
              background-position: right -268px;
            }
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
