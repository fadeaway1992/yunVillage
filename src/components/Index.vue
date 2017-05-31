<template>
  <div class="index">
    <Headtop></Headtop>
    <div style="padding-top:120px;">
      {{userInfo}}
    </div>
    <Player></Player>
    <Login v-show="showLoginPad"></Login>
  </div>
</template>

<script>

import Headtop from './Headtop'
import Login from './Login'
import Player from './Player'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'index',
  components:{
    Headtop,
    Login,
    Player
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
  width:100%;
}
</style>
