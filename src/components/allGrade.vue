<template>
  <div class="gradeBox">
    <div class="grade"
         v-bind:style="item"
         v-for="(item,index) in gradeColor"
         v-on:click="changeGradeBox(index)"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'allGrade',
    props:[
      'gradeNum',
      'taskNum'
    ],
    data() {
      return {
        gradeColor:[
          {
            border:'5px solid red',
            opacity:'0.1'
          },
          {
            border:'5px solid orange',
            opacity:'0.1'
          },
          {
            border: '5px solid green',
            opacity: '0.1'
          }
        ]
      }
    },
    mounted:function () {
      let newGradeNum=this.gradeNum-1;
      this.gradeColor[newGradeNum].opacity='1';
    },
    methods:{
        //更改重要程度
      changeGradeBox:function (index) {
          //先把所有的透明度都改成0.1
          for(let i=0;i<this.gradeColor.length;i++){
            this.gradeColor[i].opacity='0.1';
          };
          //然后把点击的改成1
        this.gradeColor[index].opacity='1';
        //通知爸爸一下
        let updateGrade=index+1;
        this.$emit('update:gradeNum',updateGrade);
        //回传数据
        let gradeTaskId=this.taskNum;
        axios.get('/task/updateTask.action',{
          params:{
            userId:1,
            taskId:gradeTaskId,
            gradeId:updateGrade
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      }
    }
  }
</script>
<style>
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
</style>
