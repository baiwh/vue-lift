<template>
  <div id="nav-left">
    <router-link
      v-for="(item,index) in navInfo"
      v-bind:to="item.linkTo"
      v-bind:title="item.tit"
      class="navLeftA"
      v-bind:class="{navChoose:isNavChoose==index}"
      v-on:click="navChooseClick(index)">
      <img v-bind:src="'/static/icon/'+item.imgSrc"/>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'navLeft',
    data() {
      return {
          navInfo:[
            {
              linkTo:'/home',
              tit:'任务',
              imgSrc:'renwu.png'
            },
            {
              linkTo:'/notes',
              tit:'便笺/备忘',
              imgSrc:'bianqian.png'
            },
            {
              linkTo:'',
              tit:'打卡/习惯养成',
              imgSrc:'daka.png'
            },
            {
              linkTo:'',
              tit:'成就/种树',
              imgSrc:'chengjiu.png'
            },
            {
              linkTo:'',
              tit:'统计',
              imgSrc:'tongji.png'
            },
            {
              linkTo:'/taskdel',
              tit:'回收站',
              imgSrc:'delete.png'
            }
          ],
        isNavChoose:0
      }
    },
    methods:{
        //导航的选中效果？
      navChooseClick:function (index) {
//        this.isNavChoose=index;
      }
    }
  }
</script>
<style>
  /*侧导航*/
  #nav-left{
    position: fixed;
    height: 100vh;
    width: 50px;
    background: #009CFF;
    left: 0;
    z-index: 1000;
    box-shadow: 0px 0px 20px #0064FF;
    padding: 80px 0px;
    float: left;
    top: 0px;
    overflow: hidden;
  }
  /*侧导航链接*/
  .navLeftA{
    padding: 20px 15px;
    opacity: 0.6;
    float: left;
  }
  #nav-left a:hover{
    opacity: 1.0;
    transform: scale(1.3, 1.3);
    -webkit-transform: scale(1.3, 1.3);
    -ms-transform: scale(1.3, 1.3);
  }
  .navChoose{
    opacity: 1.0;
    background: #46B6FD;
    transform: scale(1.3, 1.3);
    -webkit-transform: scale(1.3, 1.3);
    -ms-transform: scale(1.3, 1.3);
  }
  /*侧导航链接里的图标*/
  #nav-left img{
    width: 20px;
    float: left;
  }
</style>
