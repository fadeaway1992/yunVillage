<template>
  <div class="index">
    <Headtop></Headtop>
    <PlayList></PlayList>
    <!--<div style="padding-top:120px;">
      <div v-for="item in playList">{{item.name}}</div>
    </div>-->
    <Player></Player>
    <Login v-show="showLoginPad"></Login>
  </div>
</template>

<script>

import Headtop from './Headtop'
import Login from './Login'
import Player from './Player'
import PlayList from './PlayList'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    Headtop,
    Login,
    Player,
    PlayList
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'showLoginPad'
    ])
  },
  methods: {
    ...mapActions([
      'getUserPlayList'
    ])
  },
  watch: {
    userInfo: function (value) {
      this.getUserPlayList(value.data.account.id)
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
.index{
  position:relative;
  width:100%;
}
</style>
