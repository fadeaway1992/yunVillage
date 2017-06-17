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
  data () {
    return {
      theWholeList: {}
    }
  },

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
      'changePlayIndex',
      'checkToNewList'
    ]),

    // 获取歌曲时长
    formattedTime (dt) {
      return formatTime(dt/1000)
    },

    // 播放其中一首歌
    addToPlayListAndPlayIt: async function (item) {
      const index = this.list.indexOf(item)
      if (index === -1) {
        console.log('没找到')
        return
      } 
      const obj = this.theWholeList[index]
      this.addItemToPlayList(obj)
      await this.changePlayIndex('last')
      this.playOrPause()
    },

    // 获取整个歌单
    getTheWholeList () {
      this.theWholeList = this.list.map((item) => {
        let artist = item.ar[0].name, i = 1
        while ( i < item.ar.length) {
          artist = artist + '/' + item.ar[i].name
          i++
        }
        return {name:item.name, id: item.id, src:'', artist: artist, cover: item.al.picUrl, duration: formatTime(item.dt/1000)}
      })
      console.log(this.theWholeList,'这是整理好的整个歌单')
    },

    // 播放整个歌单
    playTheWholeList () {
      this.checkToNewList(this.theWholeList)
    }
  },

  created() {
    
  },

  mounted () {
    console.log(this.list, '------list')
    this.getTheWholeList()
  }
}
</script>

<style lang="scss" scoped>

</style>
