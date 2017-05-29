<template>
  <div class="index">
    <Headtop></Headtop>
    <div style="padding-top:100px;">
      {{userInfo}}
    </div>
    <Login v-show="showLoginPad"></Login>
  </div>
</template>

<script>

import Headtop from './Headtop'
import Login from './Login'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'index',
  components:{
    Headtop,
    Login
  },
  data () {
    return {
      
    }
  },
  computed:{
    ...mapGetters([
      'userInfo',
      'showLoginPad'
    ])
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style lang="scss">
.index{
  position:relative;
}
</style>
