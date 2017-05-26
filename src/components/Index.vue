<template>
  <div class="index">
    <Headtop></Headtop>
    <Login></Login>
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
      msg: 'Welcome to Music Cloud'
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">

</style>
