<template>
  <div>
    hahahahahahah
  </div>
</template>

<script>
import { formatTime } from '@/assets/js/formatTime.js'
export default {
  methods: {
    // 获取歌曲时长
    formattedTime (dt) {
      return formatTime(dt / 1000)
    }
  }
}
</script>

<style>

</style>
