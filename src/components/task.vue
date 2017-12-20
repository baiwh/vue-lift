<template>
  <div>
    <!--<div class="task c" v-on:click="choose">-->
    <div class="task" v-bind:class="{choose:isChoose}" v-on:click="chooseTask" v-for="item in tasks">
      <input type="hidden" class="taskId" value="">
      <!--附加信息-->
      <div class="stateBar">
        <!--紧急程度-->

        <div class="grade grade3" >
          <input type="hidden" value="3">
        </div>

        <div class="gradeBox" hidden>
          <grade></grade>
        </div>
        <!--标签-->
        <input type="hidden" class="labelId" value="">
        <span class="tag theTag1 labelChoose">家</span>
        <!--<span class="tag theTag2">+</span>-->
      </div>
      <!--标签悬浮-->
      <tag-window></tag-window>

      <!--标题-->
      <div class="title">
        <input type="text" class="listInput" placeholder="标题">
        <span class="listSpan">{{item.tit}}</span>
      </div>
      <!--日期-->
      <div class="day">
        <input type="date" class="listInput">
        <span class="listSpan">{{item.date}}</span>
      </div>
      <!--进度条-->
      <div class="rate">
        <div class="ratio">
        </div>
      </div>
      <span class="rateVal">{{item.rat}}/{{item.allRat}}</span>
      <!--删除-->
      <img src="./../assets/icon/del.png" alt="" class="del">
    </div>
  </div>
</template>

<script>
  import grade from './../components/grade.vue'
  import tagWindow from './../components/tagWindow.vue'
  import tag from './../components/tag.vue'
  export default {
    name: 'task',
    data() {
      return {
        isChoose:false,
        tasks:[
          {
            tit:'第一个',
            date:'2017-11-11',
            rat:'2',
            allRat:'3'
          },
          {
            tit:'第二个',
            date:'2017-12-12',
            rat:'1',
            allRat:'5'
          }
        ]
      }
    },
    components:{
      grade:grade,
      tagWindow:tagWindow,
      tag:tag
    },
    methods:{
      //点击添加选中效果、传数据、在右边显示
      chooseTask:function () {
        this.isChoose=true;
      }
    }
  }
</script>
<style>
  .task{
    height: 200px;
    width: 380px;
    margin: 0px 0px 20px 0px;
    background: #FFFFFF;
    border: 1px solid #D3D3D3;
    box-shadow: 0px 0px 15px #C2C2C2;
    overflow: visible;
    display: block;
  }
  .task:hover{
    border: 2px solid #46B6FD;
    border-radius: 5px;
  }
  /*左边小列表被选中*/
  .choose {
    border: 2px solid #46B6FD;
    border-radius: 5px;
  }
  .stateBar{
    height: 50px;
    margin: 5px 10px;
  }
  .gradeBox{
    overflow: visible;
    float: left;
  }


  /*标题*/
  .title{
    margin: 5px 25px;
  }
  .title input{
    z-index: 2;
    height: 25px;
    width: 200px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
  }
  .day{
    color: #808080;
    margin: 5px 25px;
    overflow: visible;
  }
  .day input{

  }
  /*进度条*/
  .rate{
    height: 10px;
    width: 325px;
    background: #D3D3D3;
    border-radius: 10px;
    margin: 20px 25px;
  }
  .ratio{
    height: 10px;
    width: 325px;
    background: #46B6FD;
    border-radius: 10px;
    text-align: right;
  }
  .rateVal{
    color: #808080;
    margin: 0px 25px;
  }

  .task .ratio{
    left: -325px;
  }
  /*删除小列表的垃圾桶图*/
  .del{
    opacity: 0.3;
    height: 20px;
    width: 20px;
    float: right;
    right: 10px;
    cursor: pointer;
  }
  .del:hover{
    opacity: 0.6;
  }
  /*小列表的标题*/
  .listInput{
    display: none;
  }
  .title,.day{
    height: 25px;
  }
</style>
