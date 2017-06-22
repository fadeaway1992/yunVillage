<template>
  <div class="playlist-page">
    <div class="left-side">
      <PlayListInfo :listDetail="listDetail" @play="playTheWholeList"></PlayListInfo>
      <ListItem></ListItem>
      <!--<div v-for="item in list" @click="addToPlayListAndPlayIt(item)">
        {{item.name}}      {{formattedTime(item.dt)}}
      </div>-->
    </div>
    <div class="right-side"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { formatTime } from '@/assets/js/formatTime.js'
import PlayListInfo from './PlayListInfo.vue'
import ListItem from './ListItem.vue'
export default {
  data () {
    return {
      theWholeList: {}
    }
  },

  components: {
    PlayListInfo,
    ListItem
  },

  computed: {
    ...mapGetters([
      'listDetail',
      'listName',
      'list',
      'playList'
    ])
  },

  methods: {
    ...mapActions([
      'getMusicUrl',
      'addItemToPlayList',
      'playOrPause',
      'changePlayIndex',
      'checkToNewList',
      'clickInPageToPlayASong'
    ]),

    // 播放其中一首歌  **如果已经在播放列表中就切歌，如果不在播放列表中则添加到播放列表再播放。
    addToPlayListAndPlayIt (item) {
      const index = this.list.indexOf(item)
      if (index === -1) {
        console.log('没找到')
        return
      }
      const obj = this.theWholeList[index] // 获取这首歌的信息对象
      this.clickInPageToPlayASong(obj)     // 将歌曲对象传给 clickInPageToPlayASong 播放
    },

    // 获取整个歌单
    getTheWholeList () {
      this.theWholeList = this.list.map((item) => {
        let artist = item.ar[0].name
        let i = 1
        while (i < item.ar.length) {
          artist = artist + '/' + item.ar[i].name
          i++
        }
        return { name: item.name, id: item.id, src: '', artist: artist, cover: item.al.picUrl, duration: formatTime(item.dt / 1000) }
      })
    },

    // 播放整个歌单
    playTheWholeList () {
      this.checkToNewList(this.theWholeList)
    }
  },

  created () {

  },

  mounted () {
    this.getTheWholeList()
  }
}
</script>

<style lang="scss" scoped>
.playlist-page {
  background: url(../assets/img/wrap4.png) repeat-y center 0;
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  display: flex;
  .left-side {
    width: 709px;
    padding: 47px 30px 40px 39px;
    box-sizing: border-box;
  }
  .right-side {
    width: 270px;
  }
}
</style>
