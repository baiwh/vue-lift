<template>
  <div>
    <div v-for="(item,index) in getDetail" v-if="item.dataState!=3">
      <div class="items" v-show="isItems" v-on:click="checkBoxChoose(index)">
        <input type="checkbox" v-bind:value="item.taskDetailName"
               v-bind:checked="item.dataState==2"/>
        <div class="checkBox" v-bind:class="{'c':item.dataState==2}"></div>
        <span v-bind:class="{'spanChecked':item.dataState==2}">{{item.taskDetailName}}</span>
      </div>
      <div class="itemInput" v-show="isItemInput">
        <div class="checkBox"></div>
        <input type="text" v-model="item.taskDetailName" v-on:blur="itemInputBlur(index)"
               v-on:keyup.enter="itemInputBlur(index)">
        <img src="../../../static/icon/del.png" alt="" v-on:click="delItem(index)">
        <!--<img class="changeAdd" src="icon/changeAdd.png" alt="">-->
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'item',
    data() {
      return {
        isItemInput: false,
        isItems: true
      }
    },
    computed: {
      getDetail(){
        this.$store.dispatch('updateStoreDetail');
        return this.$store.state.detailStore;
      },
      getCompletedDetail: function () {
        return this.getDetail.filter(item =>
          item.dataState == 2
        ).map(item => item.taskDetailName);
      },
      getTotalDetail: function () {
        return this.getDetail.filter(item =>
          item.dataState == 1 || item.dataState == 2
        ).map(item => item.taskDetailName);
      }
    },
    methods: {
      //选中checkbox。加对勾、传数据
      checkBoxChoose: function (index) {
        //如果当前是选中。就改为未选中。否则相反
        if (this.getDetail[index].dataState == 2) {
          this.getDetail[index].dataState = 1;
        } else {
          this.getDetail[index].dataState = 2;
        }
        //进度条
        this.changeRate();
        //传数据回去
        let detailId = this.getDetail[index].taskDetailId;
        let dataState = this.getDetail[index].dataState;
        let id = this.$store.state.taskIdStore;
        axios.get('/taskDetail/updateDetail.action?', {
          params: {
            taskId: id,
            taskDetailId: detailId,
            dataState: dataState
          },
          baseURL: '/liftVue',
          withCredentials: false,
        })
      },
      //右上角的修改按钮（在它爸爸里调用的）
      changeItem: function () {
        //切换input
        this.isItems = !this.isItems;
        this.isItemInput = !this.isItemInput;
      },
      //鼠标离开输入框。或者enter
      itemInputBlur: function (index) {
        let inputItem = this.getDetail[index].taskDetailName;
        let detailId = this.getDetail[index].taskDetailId;
        let id = this.$store.state.taskIdStore;
        //判空。
        if (inputItem != '') {
          //保存、传数据
          axios.get('/taskDetail/updateDetail.action?', {
            params: {
              taskId: id,
              taskDetailId: detailId,
              taskDetailName: inputItem
            },
            baseURL: '/liftVue',
            withCredentials: false,
          })
        } else {
          //空就删掉
          this.getDetail[index].dataState = 3;
          axios.get('/taskDetail/updateDetail.action?', {
            params: {
              taskId: id,
              taskDetailId: detailId,
              dataState: 3
            },
            baseURL: '/liftVue',
            withCredentials: false,
          });
          this.changeRate();
        }
      },
      //删除item、传数据
      delItem: function (index) {
        this.getDetail[index].dataState = 3;
        let delId = this.getDetail[index].taskDetailId;
        let id = this.$store.state.taskIdStore;
        this.changeRate();
        axios.get('/taskDetail/updateDetail.action?', {
          params: {
            taskId: id,
            taskDetailId: delId,
            dataState: 3
          },
          baseURL: '/liftVue',
          withCredentials: false,
        })
      },
      //新增item（在父组件调用）?
      addItem: function () {
        //插入新数组
        let id = this.$store.state.taskIdStore;
        this.getDetail.push({
          taskDetailName: '',
          taskId: id,
          taskDetailId: '',
          dataState: 1
        });
        //切换input
        this.isItems = false;
        this.isItemInput = true;
        this.changeRate();
        //回传数据并赋值新的item
        axios.get('/taskDetail/insertTaskDetail.action', {
          params: {
            taskId: id,
            taskDetailName: '',
          },
          baseURL: '/liftVue',
          withCredentials: false,
        }).then((newItem) => {
          let res = newItem.data;
          let len = this.getDetail.length - 1;
          this.getDetail[len].taskDetailId = res.data;
        })
      },
      //进度条
      changeRate: function () {
        let completedDetail = this.getCompletedDetail.length;
        let totalDetail = this.getTotalDetail.length;
        let id = this.$store.state.taskIdStore;
        let index = this.$store.state.taskIndex;
        //回传进度条
        axios.get('/task/updateTask.action?', {
          params: {
            taskId: id,
            completedDetail: completedDetail,
            totalDetail: totalDetail
          },
          baseURL: '/liftVue',
          withCredentials: false,
        });
        //修改页面进度条
        this.$store.commit('updateTaskRate', {
          'index': index,
          'completedDetail': completedDetail,
          'totalDetail': totalDetail
        })
      }
    }
  }
</script>
<style>
  /*增加和删除小项目*/
  .itemInput {
    border: 1px solid #D3D3D3;
    width: 600px;
    height: 50px;
    line-height: 54px;
    padding: 0px 10px 0px 20px;
    margin: 0px 50px;
    border-radius: 2px;
  }

  .itemInput:hover {
    border: 1px solid #46B6FD;
  }

  /*输入框*/
  .itemInput input {
    padding: 0px 10px;
    font-size: 15px;
    height: 45px;
    width: 450px;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    top: -4px;
  }

  .itemInput img {
    float: right;
    height: 20px;
    width: 20px;
    opacity: 0.3;
    cursor: pointer;
    margin: 15px 10px 15px 15px;
  }

  .itemInput img:hover {
    opacity: 0.6;
  }

  /*每一个小小的项目*/
  .items {
    border: 1px solid #D3D3D3;
    width: 600px;
    height: 50px;
    line-height: 50px;
    padding: 0px 10px 0px 20px;
    margin: 0px 50px;
    border-radius: 2px;
    display: block;
  }

  .items:hover {
    border: 1px solid #46B6FD;
  }

  .items input {
    background: #FFFFFF;
    height: 15px;
    width: 15px;
  }

  /*下划线和改变颜色*/
  .spanChecked {
    text-decoration: line-through;
    color: #C2C2C2;
  }

  /*对勾*/
  .items input[type=checkbox] {
    display: none;
  }

  @-moz-keyframes two {
    0% {
      height: 0;
    }
    100% {
      height: 17px;
    }
  }

  @-webkit-keyframes two {
    0% {
      height: 0;
    }
    100% {
      height: 17px;
    }
  }

  @keyframes two {
    0% {
      height: 0;
    }
    100% {
      height: 17px;
    }
  }

  @keyframes one {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: 27px;
    }
  }

  @-webkit-keyframes one {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: 27px;
    }
  }

  @-moz-keyframes one {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: 27px;
    }
  }

  .checkBox:before, .checkBox:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    height: 0;
    width: 5px;
    background-color: #34b93d;
    display: inline-block;
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -o-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    border-radius: 5px;
    content: ' ';
    -webkit-transition: opacity ease 0.5s;
    -moz-transition: opacity ease 0.5s;
    transition: opacity ease 0.5s;
  }

  .checkBox:after {
    top: 5px;
    left: 0px;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .checkBox {
    height: 25px;
    width: 25px;
    border: 3px solid #d3d3d3;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-transition: border-color ease 0.2s;
    -o-transition: border-color ease 0.2s;
    -webkit-transition: border-color ease 0.2s;
    transition: border-color ease 0.2s;
    margin: 12px 15px 12px 0px;
    overflow: visible;
    float: left;
  }

  .checkBox:before {
    top: 16px;
    left: 13px;
    box-shadow: 0 0 0 2px #ffffff;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  /*点击对勾追加效果*/
  .c:after {
    height: 20px;
    -moz-animation: two 0.2s ease 0s forwards;
    -o-animation: two 0.2s ease 0s forwards;
    -webkit-animation: two 0.2s ease 0s forwards;
    animation: two 0.2s ease 0s forwards;
  }

  .c:before {
    height: 30px;
    -moz-animation: one 0.4s ease 0s forwards;
    -o-animation: one 0.4s ease 0s forwards;
    -webkit-animation: one 0.4s ease 0s forwards;
    animation: one 0.4s ease 0s forwards;
  }
</style>
