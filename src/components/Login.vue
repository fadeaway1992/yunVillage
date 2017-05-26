<template lang="html">
<div class="login-box">
  <div id="drag-bar">

  </div>
</div>
</template>

<script>
import  Drag  from '@/assets/js/dragable.js'
export default {
  mounted(){
    this.$nextTick(function(){
      var dragthing = document.getElementsByClassName('login-box')[0]
      Drag(dragthing)
    })


  }
}
</script>

<style lang="scss" scoped>
.login-box{
  position:absolute;


  width: 530px;
  height: 314px;
  border-radius: 4px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.8);
  border: none;
  background:black;
  overflow:hidden;
  #drag-bar{
    height:39px;
    background:red;
  }
}

</style>
