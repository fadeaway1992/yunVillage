<template>
  <div class="index">
    <h1 class="title">{{ msg }}</h1>
  </div>
</template>

<script>

import requests from '@/api'

export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Music Cloud'
    }
  },
  mounted() {
    // 测试登录请求。
    //requests.loginByPhone({params:{'phone':'18866925263','password':'1992117'}},function(param){console.log(param)},function(param){console.log(param)})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
