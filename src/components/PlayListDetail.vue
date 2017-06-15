<template>
  <div>
    <Headtop style="display: none;"></Headtop>
    <div>{{listName}}</div>
    <div v-for="item in list" @click="addToPlayListAndPlayIt(item)">
      {{item.name}}
    </div>
    <Player></Player>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Player from './Player'
import Headtop from './Headtop'
export default {
  computed: {
    ...mapGetters([
      'listDetail',
      'listName',
      'list',
      // 'playList'
    ])
  },
  components: {
    Player,
    Headtop
  },
  methods:{
    ...mapActions([
      'getMusicUrl',
      'addItemToPlayList',
      'play',
      'changePlayIndex'
    ]),
    addToPlayListAndPlayIt: async function (item) {
      console.log(item, '----看看有没有封面')
      const music = await this.getMusicUrl(item.id)
      // console.log(music,'-----music received')
      if (music.type != 'mp3') {
        console.log('the music is not a mp3 file')
      } else {
        let artist = item.ar[0].name, i = 1
        while ( i < item.ar.length) {
          artist = artist + '/' + item.ar[i].name
          i++
        }
        const obj = {name:item.name, src: music.url, artist: artist, cover: item.al.picUrl}
        this.addItemToPlayList(obj)
        console.log(obj,'-----obj',this.$store.state.audioPlayer.playList,'----playList')
        this.changePlayIndex('last')
        console.log(this.$store.state.audioPlayer.playingIndex, '-----playingIndex')
        this.play()
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>

</style>
