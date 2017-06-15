<template>
  <div>
    {{listName}}
    <div v-for="item in list">
      {{item.name}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'listDetail',
      'listName',
      'list'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
