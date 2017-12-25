<template>
  <div>
    <div v-for="(item,index) in tasks" v-on:click="chooseTask(index)">
      <div class="task" v-bind:class="{'choose':isChoose==index}">
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
          <tag></tag>
        </div>
        <!--标签悬浮-->
        <tag-window></tag-window>

        <!--标题-->
        <div class="title">
          <input type="text" v-model="item.taskName" v-on:blur="inputBlur(index)" v-on:keyup.enter="inputBlur(index)" v-show="titInput">
          <span v-on:click="titInputChange(index)" v-show="titSpan">{{item.taskName}}</span>
        </div>
        <!--日期-->
        <div class="day">
          <input type="date" v-model="item.beginDate" v-on:blur="inputBlur(index)" v-on:keyup.enter="inputBlur(index)" v-show="dayInput">
          <span v-on:click="dayInputChange(index)" v-show="daySpan">{{item.beginDate}}</span>
        </div>
        <!--进度条-->
        <div class="rate">
          <div class="ratio">
          </div>
        </div>
        <span class="rateVal">{{item.completedDetail}}/{{item.totalDetail}}</span>
        <!--删除-->
        <img src="./../assets/icon/del.png" class="del" v-on:click="taskDelete(index)">
      </div>
    </div>
  </div>
</template>

<script>
  import grade from './../components/grade.vue'
  import tagWindow from './../components/tagWindow.vue'
  import tag from './../components/tag.vue'
  import axios from 'axios'

  export default {
    name: 'task',
    data() {
      return {
        titInput:false,
        titSpan:true,
        dayInput:false,
        daySpan:true,
        tasks:[],
        isChoose:'nothing'
      }
    },
    components:{
      grade:grade,
      tagWindow:tagWindow,
      tag:tag
    },
    mounted:function(){
        this.getTask();
    },
    methods:{
        //初始加载
      getTask:function(){
          //获取数据
        axios.get('/task/getTaskList.action?', {
          params: {
            userId:1
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((tasks)=>{
          let res = tasks.data;
          this.tasks=res.data;
        })
        //给第一个加上选中状态
      },
      //点击task
      chooseTask:function (index) {
          //添加选中效果
          this.isChoose=index;
          //传数据

        //在右边显示
      },
      //点击task的标题
      titInputChange:function (index) {
          //切换成input
        this.titInput=true;
        this.titSpan=false;
      },
      //点击task的日期切换成input
      dayInputChange:function (index) {
        this.dayInput=true;
        this.daySpan=false;
      },
      //鼠标离开input或者按回车
      inputBlur:function (index) {
          //恢复原样
        this.titInput=false;
        this.titSpan=true;
        this.dayInput=false;
        this.daySpan=true;
        //保存传数据
//        let inputName=this.tasks[index].taskName;
//        let inputDate=this.tasks[index].beginDate;
//        axios.get('/task/updateTask.action',{
//            params:{
//              userId:1,
//              taskId:7,
//              beginDate:inputDate,
//              taskDetailName:inputName
//            },
//          baseURL:'/liftVue',
//          withCredentials:false
//        })
//        .then((tasks)=>{
//          let res = tasks.data;
//          let success=res.status;
//          let alertMsg=res.msg;
//          if(success==true){
//            alert(alertMsg);
//          }
//        })
      },
      //删除task
      taskDelete:function (index) {
//        this.tasks[index].dataState=2;
//        let delId=this.tasks[index].taskName;
//        axios.get('/task/updateTask.action',{
//            params:{
//              userId:1,
//              taskId:7,
//              dataState:2,
//              taskDetailName:delId
//            },
//          baseURL:'/liftVue',
//          withCredentials:false
//        })
//        .then((tasks)=>{
//          let res = tasks.data;
//          let success=res.status;
//          let alertMsg=res.msg;
//          if(success==true){
//            alert(alertMsg);
//          }
//        })
      },
      //新增task
      addTask:function () {
//        let data=new Date();
        this.tasks.unshift({
          labelName:'家',
          taskName:'新任务加进来了',
//          beginDate:data.getFullYear()+'-'+data.getMonth()+'-'+data.getDate(),
          beginDate:'2017-01-01 00:00:00',
        completedDetail:0,
          totalDetail:0
        })
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
    overflow: hidden;
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
  .title,.day{
    height: 25px;
  }
</style>
