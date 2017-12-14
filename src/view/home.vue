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
          <task></task>
        </div>
      <!--</form>-->

      <!--内容-->
      <!--<form action="" id="detailForm">-->
        <div id="item-box">
          <div class="item" id="item">

            <input type="hidden" id="taskId" value="">

            <div class="header">
              <div class="stateBar">
                <!--紧急程度-->
                <div class="grade">
                </div>
                <!--修改-->
                <img class="change" src="./../assets/icon/change.png" alt="">
                <!--标签-->
                <span class="tag theTag labelChoose">0</span>
              </div>
            </div>
            <h2>接下来。。</h2>
            <div id="toDoList">
              <item></item>
              <item></item>
            </div>
            <!--添加新项目-->
            <div class="add" id="newItem">
              <img src="./../assets/icon/add.png" alt="">
            </div>
            <div class="changeOk" >
              <img src="./../assets/icon/changeOk.png" alt="">
            </div>
          </div>
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
  import item from './../components/item.vue'
  export default {
    name: 'home',
    data() {

    },
    components:{
      navTop:navTop,
      navLeft:navLeft,
      tagBox:tagBox,
      task:task,
      item:item
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
/*里边还要套一个小一号的盒纸*/
.item{
  background: #FFFFFF;
  width: 700px;
  border: 1px solid #D3D3D3;
  box-shadow: 0px 0px 15px #C2C2C2;
}
/*不知道这个可不可以算是页眉*/
.header{
  height: 80px;
  border-bottom: 1px solid #D3D3D3;
  padding: 15px;
}
.header div{
  opacity: 1;
}
/*大列表里的红绿灯*/
.header .stateBar .grade{
  position: relative;
  top: 5px;
  cursor: auto;
}
/*大列表里的标签*/
.header .stateBar .tag{
  top: 2px;
  cursor: auto;
}
/*修改*/
.change{
  float: right;
  height: 25px;
  width: 25px;
  margin: 5px;
  cursor: pointer;
}


/*标题要大一点吧*/
h2{
  margin: 40px;
}



/*下边还要添加新的小项目呢*/
.add{
  height: 40px;
  width: 600px;
  margin: 30px 50px;
  background: #46B6FD;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.add:hover{
  background: #009cff;
}
.add img{
  width: 20px;
  height: 20px;
  margin: 10px;
}
.changeOk{
  display: none;
  height: 40px;
  width: 600px;
  margin: 30px 50px;
  background: #34b93d;
  opacity: 0.8;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.changeOk:hover{
  opacity: 1;
}
.changeOk img{
  width: 20px;
  height: 20px;
  margin: 10px;
}
.newDiv {
  display: none;
}
</style>
