<template>
  <div class="play-list">
    <div v-for="item in musicList" class="play-list-item" @click="selectList(item.id)">
      <div class="cover"><img :src="item.coverImgUrl" :alt="item.name"></div>
      <div class="list-name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'musicList'
    ])
  },
  methods: {
    selectList (id) {
      console.log(id, '--------listId')
      this.$router.push({ name: 'playListDetail', params: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.play-list{
  padding-top: 120px;
  padding-bottom: 53px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  .play-list-item{
    display: block;
    margin: 5px;
    width: 140px;
    cursor: pointer;
    .list-name{
      height: 3em;
      text-align: center;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
.cover{
  width: 140px;
  height: 140px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
