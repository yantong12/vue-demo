<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from '@/components/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}
body /deep/ .out-container {
    height: 100% !important;
    // margin-bottom: 40px;
  }

</style>
