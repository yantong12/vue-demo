<template>
  <div class="home">
    <img alt="tongbaba logo" class="user-logo" src="../assets/image/tongbaba.jpeg">
    <HelloWorld msg="hello word"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
  .user-logo {
    height: 200px;
    width: 200px;
  }
</style>

