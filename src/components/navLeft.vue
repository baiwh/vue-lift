<template>
  <div id="nav-left">
    <a href="" title="任务" class="navLeftA navChoose">
      <img src="./../assets/icon/renwu.png"/>
    </a>
    <a href="" title="便笺/备忘" class="navLeftA">
      <img src="./../assets/icon/bianqian.png"/>
    </a>
    <a href="" title="打卡/习惯养成" class="navLeftA">
      <img src="./../assets/icon/daka.png"/>
    </a>
    <a href="" title="成就/种树" class="navLeftA">
      <img src="./../assets/icon/chengjiu.png"/>
    </a>
    <a href="" title="统计" class="navLeftA">
      <img src="./../assets/icon/tongji.png"/>
    </a>
    <a href="" title="回收站" class="navLeftA">
      <img src="./../assets/icon/delete.png"/>
    </a>
  </div>
</template>

<script>
  export default {
    name: '$',
    data() {
      return {
        msg: $
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
