<template>
  <div>
    <div v-for="(item,index) in getDetail" v-if="item.dataState!=3">
      <div>
        <input type="checkbox"/>
        <div class="checkBox" v-bind:class="{'c':item.dataState==2}"></div>
        <span v-bind:class="{'spanChecked':item.dataState==2}">{{item.taskDetailName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'item',
    data() {
      return {}
    },
    computed: {
      getDetail(){
        this.$store.dispatch('updateStoreDetail');
        return this.$store.state.detailStore;
      }
    },
    methods: {

    }
  }
</script>
<style>
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
  /*下划线和改变颜色*/
  .spanChecked {
    text-decoration: line-through;
    color: #C2C2C2;
  }
  /*对勾*/
  input[type=checkbox] {
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
      height: 27px;
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
