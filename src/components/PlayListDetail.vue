<template>
  <div>
    <div @click="playTheWholeList">{{listName}}</div>
    <div v-for="item in list" @click="addToPlayListAndPlayIt(item)">
      {{item.name}}      {{formattedTime(item.dt)}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Player from './Player'
import Headtop from './Headtop'
import { formatTime } from '@/assets/js/AudioPlayer.js'
export default {
  computed: {
    ...mapGetters([
      'listDetail',
      'listName',
      'list'
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
      'playOrPause',
      'changePlayIndex'
    ]),

    // 获取歌曲时长
    formattedTime (dt) {
      return formatTime(dt/1000)
    },
    addToPlayListAndPlayIt: async function (item) {
      const music = await this.getMusicUrl(item.id)
      if (music.type != 'mp3') {
        console.log('the music is not a mp3 file')
      } else {
        let artist = item.ar[0].name, i = 1
        while ( i < item.ar.length) {
          artist = artist + '/' + item.ar[i].name
          i++
        }
        const obj = {name:item.name, id: item.id, src: music.url, artist: artist, cover: item.al.picUrl, duration: formatTime(item.dt/1000)}
        this.addItemToPlayList(obj)
        this.changePlayIndex('last')
        this.playOrPause()
      }
    },

    // 播放整个歌单
    playTheWholeList () {
      const theList = this.list.map((item) => {
        let artist = item.ar[0].name, i = 1
        while ( i < item.ar.length) {
          artist = artist + '/' + item.ar[i].name
          i++
        }
        return {name:item.name, id: item.id, src:'', artist: artist, cover: item.al.picUrl, duration: formatTime(item.dt/1000)}
      })
      console.log(theList,'这是整理好的整个歌单')
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>

</style>
