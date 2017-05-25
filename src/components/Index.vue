<template>
  <div class="index">
    <Headtop></Headtop>
  </div>
</template>

<script>

import Headtop from './Headtop'

export default {
  name: 'index',
  components:{ Headtop },
  data () {
    return {
      msg: 'Welcome to Music Cloud'
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">

</style>
