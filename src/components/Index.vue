<template>
  <div class="index">
    <Headtop @showByPhone="openLoginByPhone" @showByMail="openLoginByMail"></Headtop>
    <Login v-show="showLogin" :barTxt="infoToLoginBar" @close="closeLoginPad"></Login>
  </div>
</template>

<script>

import Headtop from './Headtop'
import Login from './Login'

export default {
  name: 'index',
  components:{
    Headtop,
    Login
  },
  data () {
    return {
      showLogin: false,
      infoToLoginBar:''
    }
  },
  methods:{
    openLoginByPhone(){
      this.showLogin = true
      this.infoToLoginBar = {txt:'手机号登录',placeHolder:'请输入手机号'}
    },
    openLoginByMail(){
      this.showLogin = true
      this.infoToLoginBar = {txt:'网易邮箱账户登录',placeHolder:'请输入账号'}
    },
    closeLoginPad(){
      this.showLogin = false
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">

</style>
