<template>
  <div>
    <div v-for="(item,index) in delTask" v-on:click="chooseTask(index)" v-if="item.dataState==2"
         class="task" v-bind:class="{'choose':isChoose==index}">
      <!--附加信息-->
      <div class="stateBar">
        <!--紧急程度-->
        <div class="grade" v-bind:style="{border:'5px solid '+theGradeColor[item.gradeId]}"></div>
        <!--标签-->
        <span class="tag tagChoose">{{item.labelName}}</span>
      </div>
      <!--标题-->
      <div class="title">
        <span>{{item.taskName}}</span>
      </div>
      <!--日期-->
      <div class="day">
        <span>{{item.beginDate | time}}</span>
      </div>
      <!--进度条-->
      <div class="rate">
        <div class="ratio"></div>
      </div>
      <span class="rateVal">{{item.completedDetail}}/{{item.totalDetail}}</span>
      <!--恢复删除-->
      <img src="../../../static/icon/restore.png" class="del" v-on:click="revertTask(index)">
      <img src="../../../static/icon/del.png" class="del" v-on:click="taskDelete(index)">
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'task',
    data() {
      return {
        delTask: [],
        isChoose: '0',
        theGradeColor: ['', 'red', 'orange', 'green']
      }
    },
    filters: {
      //时间格式过滤器。后台非要我把时分秒去掉
      time: function (value) {
        function newTime(str) {
          let arr = str.split(' ');
          let showTime = '' + arr[0];
          return showTime;
        }
        return newTime(value);
      }
    },
    mounted: function () {
      this.getTask();
    },
    methods:{
      //初始加载
      getTask: function () {
        //获取数据
        axios.get('/task/getDelTask.action?', {
          params: {
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((task) => {
          let res = task.data;
          let delTask = res.data;
          this.delTask = delTask;
          //获取第一个task的id
          let taskIdStore = delTask[0].taskId;
          this.$store.commit('updateStoreTaskId', taskIdStore);
          this.$store.commit('changeToGet', 'ok');
          //获取第一个task的grade状态
          let gradeIdStore = delTask[0].gradeId;
          this.$store.commit('updateStoreGrade', gradeIdStore);
          //获取第一个task的tag
          let tagStore = delTask[0].labelName;
          this.$store.commit('updateStoreTag', tagStore);
          //获取第一个task的title
          let titleStore = delTask[0].taskName;
          this.$store.commit('updateStoreTitle', titleStore);

        })
      },
      //点击task
      chooseTask: function (index) {
        //添加选中效果
        this.isChoose = index;
        //获取点击的task的ID
        let taskIdStore = this.delTask[index].taskId;
        this.$store.commit('updateStoreTaskId', taskIdStore);
        this.$store.commit('changeToGet', 'ok');
        //获取点击的task的grade状态
        let gradeIdStore = this.delTask[index].gradeId;
        this.$store.commit('updateStoreGrade', gradeIdStore);
        //获取点击的task的tag
        let tagStore = this.delTask[index].labelName;
        this.$store.commit('updateStoreTag', tagStore);
        //获取点击的task的title
        let titleStore = this.delTask[index].taskName;
        this.$store.commit('updateStoreTitle', titleStore);
      },
      //删除task
      taskDelete: function (index) {
        //改变状态
        this.delTask[index].dataState = 3;
        //传数据
        let taskId = this.delTask[index].taskId;
        axios.get('/task/deleteTask.action', {
          params: {
            taskId: taskId
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      },
      //恢复task
      revertTask:function (index) {
        this.delTask[index].dataState = 1;
        let taskId = this.delTask[index].taskId;
        axios.get('/task/revertTask.action', {
          params: {
            taskId: taskId
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      }
    }
  }
</script>
<style>
  .task {
    height: 200px;
    width: 380px;
    margin: 0px 0px 20px 0px;
    background: #FFFFFF;
    border: 1px solid #D3D3D3;
    box-shadow: 0px 0px 15px #C2C2C2;
    overflow: visible;
    display: block;
  }
  .task:hover {
    border: 2px solid #46B6FD;
    border-radius: 5px;
  }
  /*左边小列表被选中*/
  .choose {
    border: 2px solid #46B6FD;
    border-radius: 5px;
  }
  .stateBar {
    height: 50px;
    margin: 5px 10px;
  }
  .stateBar .tag {
    top: 15px;
  }
  .gradeBox{
    float: left;
  }
  /*紧急程度*/
  .grade{
    height: 20px;
    width: 20px;
    left: 15px;
    top: 20px;
    border-radius: 10px;
    float: left;
    margin: 5px;
    cursor: pointer;
  }
  /*标题*/
  .title {
    margin: 5px 25px;
  }
  .day {
    color: #808080;
    margin: 5px 25px;
    overflow: visible;
  }
  /*进度条*/
  .rate {
    height: 10px;
    width: 325px;
    background: #D3D3D3;
    border-radius: 10px;
    margin: 20px 25px;
    overflow: hidden;
  }
  .ratio {
    height: 10px;
    width: 325px;
    background: #46B6FD;
    border-radius: 10px;
    text-align: right;
  }
  .rateVal {
    color: #808080;
    margin: 0px 25px;
  }
  .task .ratio {
    left: -325px;
  }
  /*删除小列表的垃圾桶图*/
  .del {
    opacity: 0.3;
    height: 20px;
    width: 20px;
    float: right;
    right: 10px;
    cursor: pointer;
  }
  .del:hover {
    opacity: 0.6;
  }
  .title, .day {
    height: 25px;
  }
</style>
