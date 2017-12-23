<template>
  <div id="homeDiv">
    <!--侧导航-->
    <nav-left></nav-left>
    <!--上导航-->
    <nav-top></nav-top>
    <!--主体部分-->
    <div id="content">
      <!--标签-->
      <!--<form action="" id="labelForm">-->
        <div id="contentTag">
          <tag-box></tag-box>
        </div>
      <!--</form>-->

      <!--列表-->
      <!--<form action="" id="taskForm">-->
        <div id="list-box">
          <task></task>
        </div>
      <!--</form>-->

      <!--内容-->
      <!--<form action="" id="detailForm">-->
        <div id="item-box">
          <item-box></item-box>
        </div>
      <!--</form>-->
    </div>
  </div>
</template>

<script>
  import navTop from './../components/navTop.vue'
  import navLeft from './../components/navLeft.vue'
  import tagBox from './../components/tagBox.vue'
  import task from './../components/task.vue'
  import itemBox from './../components/itemBox.vue'

  export default {
    name: 'home',
    data() {
      return{

      }
    },
    components:{
      navTop:navTop,
      navLeft:navLeft,
      tagBox:tagBox,
      task:task,
      itemBox:itemBox
    },
    created () {
      this.$api.get('/taskDetail/getDetailJson.action?userId=1&taskId=1', null, r => {
        console.log(r)
      })
    }
  }
</script>
<style>
#homeDiv{
  height: 100vh;
  width: 100vw;
}
div{
  overflow: hidden;
}
a{
  text-decoration: none;
}
body{
  background: #efefef;
}
/*主体部分*/
#content{
  top: 100px;
  margin: 0px 0 50px 0;
  left: 10%;
  width: 1200px;
}
/*标签*/
#contentTag{
  width: 1100px;
  overflow: visible;
}

/*列表大盒子*/
#list-box{
  width: 400px;
  float: left;
  padding: 10px 10px;
}

.stateBar .tag{
  top: 15px;
}

/*右边详细内容的大盒子*/
#item-box{
  float: left;
  padding: 10px 10px;

}

</style>
