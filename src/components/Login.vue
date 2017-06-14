<template lang="html">
  <div class="hidden-pad">
    <div class="login-box">
      <div id="drag-bar">
        <div class="bar-txt">手机号登录</div>
        <span class="close-btn" @click="$store.state.login.showLoginPad = false"></span>
      </div>
      <div class="main">
        <div class="form-pad">
          <input type="text" class="account" placeholder="请输入手机号" @focus="clearLoginInfo" v-model="account">
          <input type="password" class="password" placeholder="请输入密码" @focus="clearLoginInfo" @keyup.enter="loginByPhone(loginParams)" v-model="psw">
          <div class="err-info" v-show="loginInfo=='账户信息有误'||'网络出现问题'">{{loginInfo}}</div>
          <div class="options">
            <label class="login-auto"><input type="checkbox" checked="checked" class="u-auto">自动登录</label>
            <a href="#" class="forget-password" data-action="forget">忘记密码？</a>
          </div>
          <div class="login-btn" @click="loginByPhone(loginParams)">登录</div>
        </div>
      </div>
      <div class="footer">
        <a href="javascript:;" class="other-login-methods">&lt;&nbsp;&nbsp;其他登录方式</a>
        <a href="javascript:;" class="signup">没有帐号？免费注册&nbsp;&nbsp;&gt;</a>
      </div>
    </div>
  </div>
</template>

<script>
import  Drag  from '@/assets/js/dragable.js'
import { mapActions,mapGetters } from 'vuex'
export default {
  data(){
    return {
      account:'',
      psw:'',
      // showLoginInfo:false
    }
  },
  computed:{
    ...mapGetters([
      'loginInfo'
    ]),
    loginParams(){
      return {params:{phone:18866925263,password:1992117}}
    }
  },
  methods:{
    ...mapActions([
      'loginByPhone'
    ]),
    clearLoginInfo(){
      this.$store.state.login.loginInfo=''
    }
  },
  mounted(){
    this.$nextTick(function(){
      let dragBox = document.getElementsByClassName('login-box')[0]
      let dragBar = document.getElementById('drag-bar')
      Drag(dragBox,dragBar)
    })


  }
}
</script>

<style lang="scss" scoped>
.hidden-pad{
  position:absolute;
  left:0;
  top:0;
  width:100vw;
  height:100vh;
  background:transparent;
}
.login-box{
  position:absolute;
  left:300px;
  top:100px;
  width: 530px;
  border-radius: 4px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.8);
  border: none;
  background:#fff;
  overflow:hidden;
  #drag-bar{
    height:39px;
    background: #2d2d2d;
    position:relative;
    cursor:move;
    .bar-txt{
      height:38px;
      line-height:38px;
      padding-left:18px;
      font-weight: bold;
      font-size: 14px;
      color: #fff;
    }
    .close-btn{
      position: absolute;
      top: 16px;
      right: 20px;
      width: 10px;
      height: 10px;
      overflow: hidden;
      text-indent: -9999px;
      cursor: pointer;
      background:url('../assets/img/layer.png');
      background-position: 0 -95px;
    }
  }
  .main{
    height:225px;
    padding: 0;
    border: 1px solid #878787;
    border-width: 0 1px;
    background: #fff;
    .form-pad{
      padding: 30px 0 43px;
      width: 220px;
      margin: 0 auto;
      .account{
        width: 206px;
        height: 19px;
        margin: 0;
        padding: 5px 6px 6px;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
        line-height: 19px;
      }
      .password{
        @extend .account;
        margin-top: 10px;
      }
      .err-info{
        color:red;
      }
      .options{
        margin-top: 10px;
        .login-auto{
          color: #666;
          .u-auto{
            margin: 0 12px 0 0;
          }
        }
        .forget-password{
          color: #666;
          float:right;
        }
      }
      .login-btn{
        margin-top: 20px;
        width: 220px;
        color: #fff;
        border-radius: 5px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        cursor: pointer;
        background:url('../assets/img/button2.png') no-repeat;
        background-position: 0 -387px;
        &:hover{
          background-position: 0 -469px;
        }
      }
    }
  }
  .footer{
    padding: 0 19px;
    height: 48px;
    border: 1px solid #878787;
    border-top-color: #c6c6c6;
    border-radius: 0 0 4px 4px;
    line-height: 48px;
    background-color: #f7f7f7;
    .other-login-methods{
      color: #0c72c3;
      float: left;
    }
    .signup{
      float:right;
      color: #999;
    }
  }
}
</style>

