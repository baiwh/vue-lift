<template>
  <div>
    <div v-for="(item,index) in tasks" v-on:click="chooseTask(index)" v-if="item.dataState==1" class="task"
         v-bind:class="{'choose':isChoose==index}">
      <!--附加信息-->
      <div class="stateBar">
        <!--紧急程度-->
        <div class="grade" v-bind:style="{border:'5px solid '+theGradeColor[item.gradeId]}"
             v-on:click="changeGrade(index)" v-show="gradeChoose!=index"></div>
        <allGrade v-bind:gradeNum.sync="item.gradeId" v-bind:taskNum="item.taskId" v-show="allGradeIndex==index"
                  v-on:click.native="changeGradeBox" ref="allGrade"></allGrade>
        <!--标签-->
        <span class="tag tagChoose" v-on:click="changeTag(index)">{{item.labelName}}</span>
      </div>
      <!--标签悬浮-->
      <tag-window v-on:click.native="changeTagWindow" v-bind:tagName.sync="item.labelName"
                  v-show="tagWindowIndex==index" ref="tagWindow"></tag-window>
      <!--标题-->
      <div class="title">
        <span v-show="titSpan!=index" v-on:click="titInputChange(index)">{{item.taskName}}</span>
        <input type="text" v-show="titInput==index" v-model="item.taskName" v-on:blur="inputBlur(index)"
               v-on:keyup.enter="inputBlur(index)" v-on:keyup="titleInputKeyup(index)">
      </div>
      <!--日期-->
      <div class="day">
        <span v-show="daySpan!=index" v-on:click="dayInputChange(index)">{{item.beginDate | time}}</span>
        <input type="date" v-show="dayInput==index" v-model="item.beginDate" v-on:blur="inputBlur(index)">
      </div>
      <!--进度条-->
      <div class="rate">
        <div class="ratio"></div>
      </div>
      <span class="rateVal">{{item.completedDetail}}/{{item.totalDetail}}</span>
      <!--删除-->
      <img src="../../../static/icon/del.png" class="del" v-on:click="taskDelete(index)">
    </div>
  </div>
</template>

<script>
  import allGrade from './allGrade.vue'
  import tagWindow from './tagWindow.vue'
  import axios from 'axios'

  export default {
    name: 'task',
    data() {
      return {
        tasks: [],
        titInput: 'no',
        titSpan: 'no',
        dayInput: 'no',
        daySpan: 'no',
        isChoose: '0',
        tagWindowIndex: 'no',
        allGradeIndex: 'no',
        gradeChoose: 'no',
        theGradeColor: ['', 'red', 'orange', 'green'],
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
    components: {
      allGrade: allGrade,
      tagWindow: tagWindow
    },
    mounted: function () {
      this.getTask();
    },
    methods: {
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
      //点击grade
      changeGrade: function (index) {
        //隐藏单个的grade
        this.gradeChoose = index;
        //显示所有grade
        this.allGradeIndex = index;
        //调用子组件allGrade中的方法
        let father = this;
        father.$refs.allGrade[index].getColor();
      },
      //点击allGrade
      changeGradeBox: function () {
        //恢复原样
        this.gradeChoose = 'no';
        this.allGradeIndex = 'no';
      },
      //点击task里的标签
      changeTag: function (index) {
        //如果索引不相等
        if (this.tagWindowIndex != index) {
          //就让它显示
          this.tagWindowIndex = index;
        } else {
          //相等隐藏
          this.tagWindowIndex = 'no';
        }
        //调用子组件方法改变里边的颜色
        let father = this;
        father.$refs.tagWindow[index].getAllTag();
      },
      //点击tagWindow
      changeTagWindow: function () {
        //恢复原样
        this.tagWindowIndex = 'no';
      },
      //点击task的标题
      titInputChange: function (index) {
        //切换成input
        this.titInput = index;
        this.titSpan = index;
      },
      //标题输入时同步store
      titleInputKeyup: function (index) {
        //获取点击的task的title
        let titleStore = this.tasks[index].taskName;
        this.$store.commit('updateStoreTitle', titleStore);
      },
      //点击task的日期
      dayInputChange: function (index) {
        //切换成input
        this.dayInput = index;
        this.daySpan = index;
      },
      //鼠标离开input或者按回车
      inputBlur: function (index) {
        //恢复原样
        this.titInput = 'no';
        this.titSpan = 'no';
        this.dayInput = 'no';
        this.daySpan = 'no';
        //保存传数据
        let taskId = this.tasks[index].taskId;
        let inputName = this.tasks[index].taskName;
        let falseDate = this.tasks[index].beginDate;
        let newDate = falseDate.split(' ');
        let inputDate = '' + newDate[0];
        axios.get('/task/updateTask.action', {
          params: {
            userId: 1,
            taskId: taskId,
            beginTime: inputDate,
            taskName: inputName
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
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
      //新增task
      addTask: function () {
        let data = new Date();
        let beginDate = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
        //新增内容
        this.tasks.unshift({
          labelName: '家',
          taskName: '新任务',
          beginDate: beginDate,
          completedDetail: 0,
          totalDetail: 0,
          dataState: 1
        })
        //回传数据?
        axios.get('/task/insertTask.action', {
          params: {
            userId: 1,
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((newTask) => {
          //返回数据后还要把返回的东西重新赋给新增的数组
          let res = newTask.data;
          this.tasks[0] = res.data;
        })
      },
      //进度条？

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
  .title input {
    z-index: 2;
    height: 25px;
    width: 200px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
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
