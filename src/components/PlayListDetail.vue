<template>
  <div>
    <Headtop style="display: none;"></Headtop>
    <div>{{listName}}</div>
    <div v-for="item in list">
      {{item.name}}
    </div>
    <Player></Player>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Player from './Player'
import Headtop from './Headtop'
export default {
  computed: {
    ...mapGetters([
      'listDetail',
      'listName',
      'list',
      'audio'
    ])
  },
  components: {
    Player,
    Headtop
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>

</style>
