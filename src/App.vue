<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
  }
  #app{
    height: 100vh;
    width: 100vw;
  }
</style>
