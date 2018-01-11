<template>
  <div>
    <div v-for="(item,index) in tasks" v-on:click="chooseTask(index)" v-if="item.dataState==2"
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
        <span v-show="titSpan!=index">{{item.taskName}}</span>
      </div>
      <!--日期-->
      <div class="day">
        <span v-show="daySpan!=index">{{item.beginDate | time}}</span>
      </div>
      <!--进度条-->
      <div class="rate">
        <div class="ratio"></div>
      </div>
      <span class="rateVal">{{item.completedDetail}}/{{item.totalDetail}}</span>
      <!--恢复删除-->
      <img src="../../../static/icon/restore.png" class="del">
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
        tasks: [],
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
        axios.get('/task/getTaskList.action?', {
          params: {
            userId: 1
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((task) => {
          let res = task.data;
          let tasks = res.data;
          this.tasks = tasks;
          //获取第一个task的id
          let taskIdStore = tasks[0].taskId;
          this.$store.commit('updateStoreTaskId', taskIdStore);
          //获取第一个task的grade状态
          let gradeIdStore = tasks[0].gradeId;
          this.$store.commit('updateStoreGrade', gradeIdStore);
          //获取第一个task的tag
          let tagStore = tasks[0].labelName;
          this.$store.commit('updateStoreTag', tagStore);
          //获取第一个task的title
          let titleStore = tasks[0].taskName;
          this.$store.commit('updateStoreTitle', titleStore);
        })
      },
      //点击task
      chooseTask: function (index) {
        //添加选中效果
        this.isChoose = index;
        //获取点击的task的ID
        let taskIdStore = this.tasks[index].taskId;
        this.$store.commit('updateStoreTaskId', taskIdStore);
        this.$store.commit('changeToGet', 'ok');
        //获取点击的task的grade状态
        let gradeIdStore = this.tasks[index].gradeId;
        this.$store.commit('updateStoreGrade', gradeIdStore);
        //获取点击的task的tag
        let tagStore = this.tasks[index].labelName;
        this.$store.commit('updateStoreTag', tagStore);
        //获取点击的task的title
        let titleStore = this.tasks[index].taskName;
        this.$store.commit('updateStoreTitle', titleStore);
      },
      //删除task
      taskDelete: function (index) {
        //改变状态
        this.tasks[index].dataState = 2;
        //传数据
        let taskId = this.tasks[index].taskId;
        axios.get('/task/updateTask.action', {
          params: {
            userId: 1,
            taskId: taskId,
            dataState: 2
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      },
      //恢复task

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
