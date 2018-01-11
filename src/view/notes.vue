<template>
  <div>
    <!--侧导航-->
    <nav-left></nav-left>
    <!--上导航-->
    <nav-top></nav-top>
    <!--主体-->
    <div class="contentNotes">
      <!--时间-->
      <time-line></time-line>
      <!--内容-->
      <contents-notes></contents-notes>
    </div>
    <!--测悬浮-->
    <add v-on:click.native="addTaskBtn"></add>
  </div>
</template>

<script>
  import navTop from './../components/navTop.vue'
  import navLeft from './../components/navLeft.vue'
  import add from './../components/add.vue'
  import axios from 'axios'
  import timeLine from './../components/notes/timeLine.vue'
  import contentsNotes from './../components/notes/contentsNotes.vue'
  export default {
    name: 'notes',
    data() {
      return {}
    },
    components: {
      navTop: navTop,
      navLeft: navLeft,
      add: add,
      timeLine: timeLine,
      contentsNotes:contentsNotes
    }
  }
</script>
<style>
  /*主体部分*/
  .contentNotes {
    top: 100px;
    margin: 0px 0px 50px 0px;
    left: 10%;
  }
  body {
    background: #efefef;
  }
</style>
