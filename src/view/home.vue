<template>
  <div id="homeDiv">
    <!--侧导航-->
    <nav-left></nav-left>
    <!--上导航-->
    <nav-top></nav-top>
    <!--主体部分-->
    <div id="contentHome">
      <!--标签-->
      <div id="contentTag">
        <!--<transition name="taskLeave">-->
          <tag-box></tag-box>
        <!--</transition>-->
      </div>
      <img src="./../../static/icon/emptyBG.png" v-show="backgroundImg=='showImg'">
      <!--列表-->
      <div id="list-box" v-show="backgroundImg!='showImg'">

        <task ref="task"></task>
      </div>
      <!--内容-->
      <div id="item-box" v-show="backgroundImg!='showImg'">
        <item-box></item-box>
      </div>
    </div>
    <!--测悬浮-->
    <add v-on:click.native="addTaskBtn"></add>
  </div>
</template>

<script>
  import navTop from './../components/navTop.vue'
  import navLeft from './../components/navLeft.vue'
  import tagBox from '../components/home/tagBox.vue'
  import task from '../components/home/task.vue'
  import itemBox from '../components/home/itemBox.vue'
  import add from './../components/add.vue'
  import axios from 'axios'
  export default {
    name: 'home',
    data() {
      return {}
    },
    mounted: function () {
      this.$store.commit('updateNavLinkTo', '/home');
    },
    computed: {
      //背景图
      backgroundImg(){
        let taskId = this.$store.state.taskIdStore;
        let show = this.$store.state.backgroundImg;
        if (taskId == '' && show == 'yes') {
          return 'showImg';
        } else {
          return 'hideImg';
        }
      }
    },
    components: {
      navTop: navTop,
      navLeft: navLeft,
      tagBox: tagBox,
      task: task,
      itemBox: itemBox,
      add: add
    },
    methods: {
      //新增task
      addTaskBtn: function () {
        //调用组件的插入task
        let father = this;
        father.$refs.task.addTask();
      },
      //搜索功能？

    }
  }
</script>
<style>
  .taskLeave-enter-active, .taskLeave-leave-active {
    transition: all 5s ease;
  }

  .taskLeave-enter, .taskLeave-leave-to {
    top: 0;
  }

  #homeDiv {
    height: 100vh;
    width: 100vw;
    background: #efefef;
  }

  a {
    text-decoration: none;
  }

  /*主体部分*/
  #contentHome {
    top: 100px;
    margin: 0px 0 50px 0;
    left: 10%;
    width: 1200px;
  }

  /*标签*/
  #contentTag {
    width: 1100px;
    overflow: visible;
  }

  /*列表大盒子*/
  #list-box {
    width: 400px;
    float: left;
    padding: 10px 10px;
    margin: 0 0 70px 0;
  }

  /*右边详细内容的大盒子*/
  #item-box {
    float: left;
    padding: 10px 10px;
    margin: 0 0 70px 0;
  }

  /*标签*/
  .tag {
    float: right;
    height: 25px;
    width: auto;
    min-width: 45px;
    padding: 0px 5px;
    border-radius: 5px;
    margin: 5px 5px 5px 15px;
    cursor: pointer;
    font-size: 15px;
    text-align: center;
    color: #FFFFFF;
  }

  /*标签的白色圆点*/
  .tag:after {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 3px;
    background: #FFFFFF;
    position: absolute;
    left: -5px;
    top: 8px;
  }

  /*标签的小三角*/
  .tag:before {
    content: "";
    width: 0;
    height: 4px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -9px;
    top: -2px;
  }

  /*标签颜色*/
  .tagColor {
    border: 2px solid #C2C2C2;
    background: #C2C2C2;
  }

  .tagColor:before {
    border-right: 10px solid #C2C2C2;
  }

  /*选中。蓝色*/
  .tagChoose {
    background: #46B6FD;
    border: 2px solid #46B6FD;
  }

  .tagChoose:before {
    border-right: 10px solid #46B6FD;
  }
</style>
