<template>
  <div class="home">
    <img alt="tongbaba logo" class="user-logo" src="../assets/image/tongbaba.jpeg">
    <h2 @click="mockDemo">欢迎来到童爸爸的世界！</h2>
  </div>
</template>

<script>
  import http from '../axios/api.js'
  export default {
    data () {
      return {

      }
    },
    methods: {
      mockDemo () {
        http.post('/news/index').then(res => {
            console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-logo {
    height: 200px;
    width: 200px;
  }
</style>

