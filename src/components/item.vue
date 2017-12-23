<template>
  <div>
    <div v-for="(item,index) in detail">
      <input type="hidden"  class="detailId" value="" >
      <div class="items" v-show="isItems" v-on:click="checkBoxChoose(index)">
        <input type="checkbox"/>
        <div class="checkBox" v-bind:class="{'c':item.choose==1}"></div>
        <span v-bind:class="{'spanChecked':item.choose==1}">{{item.taskDetailName}}</span>
      </div>
      <div class="itemInput" v-show="isItemInput">
        <input type="hidden" id="" class="detailId">
        <div class="checkBox"></div>
        <input class="changeInput" type="text" :value="item.detailItem" v-on:blur="changeBlur">
        <img class="changeDel" src="./../assets/icon/del.png" alt="" v-on:click="delItem">
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
        detail:[],
        isItemInput:false,
        isItems:true,
      }
    },
    mounted:function(){
      this.getItem();
    },
    methods:{
      getItem:function(){
        axios.get("http://www.codinghou.com/liftVue/taskDetail/getDetailJson.action?userId=1&taskId=1")
          .then((data)=>{
          var res = data.data;
          this.detail=res.data;
        })
      },
      //选中checkbox。加对勾、传数据控制checkbox
      checkBoxChoose:function (index) {
        if (this.detail[index].choose==1) {
          this.detail[index].choose=0;
        }else {
          this.detail[index].choose=1;
        }

      },
      //右上角的修改按钮
      changeItem:function () {
        this.isItems=!this.isItems;
        this.isItemInput=!this.isItemInput;
      },
      //鼠标离开输入框保存并赋给span、传数据
      changeBlur:function () {

      },
      //删除item、传数据
      delItem:function () {

      }
      //进度条
    }
  }
</script>
<style>
  /*增加和删除小项目*/
  .itemInput{
    border: 1px solid #D3D3D3;
    width: 600px;
    height: 50px;
    line-height: 54px;
    padding: 0px 10px 0px 20px;
    margin: 0px 50px;
    border-radius: 2px;
  }
  .itemInput:hover{
    border: 1px solid #46B6FD;
  }
  /*输入框*/
  .itemInput input{
    padding: 0px 10px ;
    font-size: 15px;
    height: 45px;
    width: 450px;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    top: -4px;
  }

  .itemInput img{
    float: right;
    height: 20px;
    width: 20px;
    opacity: 0.3;
    cursor: pointer;
    margin: 15px 10px 15px 15px;
  }
  .itemInput img:hover{
    opacity: 0.6;
  }
  /*每一个小小的项目*/
  .items{
    border: 1px solid #D3D3D3;
    width: 600px;
    height: 50px;
    line-height: 50px;
    padding: 0px 10px 0px 20px;
    margin: 0px 50px;
    border-radius: 2px;
    display: block;
  }
  .items:hover{
    border: 1px solid #46B6FD;
  }

  .items input{
    background: #FFFFFF;
    height: 15px;
    width: 15px;
  }
  /*下划线和改变颜色*/
  .spanChecked{
    text-decoration: line-through;
    color: #C2C2C2;
  }
  /*对勾*/
  input[type=checkbox]{
    display: none;
  }

  @-moz-keyframes dothabottomcheck {
    0% {
      height: 0;
    }

    100% {
      height: 17px;
    }
  }
  @-webkit-keyframes dothabottomcheck {
    0% {
      height: 0;
    }

    100% {
      height: 17px;
    }
  }
  @keyframes dothabottomcheck {
    0% {
      height: 0;
    }

    100% {
      height: 17px;
    }
  }
  @keyframes dothatopcheck {
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
  @-webkit-keyframes dothatopcheck {
    0% {
      height: 0;
    }

    50% {
      height: 0;
    }

    100% {
      height:27px;
    }
  }
  @-moz-keyframes dothatopcheck {
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
  .checkBox:after{
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
  .checkBox:before{
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
  .c:after{
    height: 20px;
    -moz-animation: dothabottomcheck 0.2s ease 0s forwards;
    -o-animation: dothabottomcheck 0.2s ease 0s forwards;
    -webkit-animation: dothabottomcheck 0.2s ease 0s forwards;
    animation: dothabottomcheck 0.2s ease 0s forwards;
  }
  .c:before {
    height: 30px;
    -moz-animation: dothatopcheck 0.4s ease 0s forwards;
    -o-animation: dothatopcheck 0.4s ease 0s forwards;
    -webkit-animation: dothatopcheck 0.4s ease 0s forwards;
    animation: dothatopcheck 0.4s ease 0s forwards;
  }
</style>
