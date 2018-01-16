<template>
  <div id="nav-top">
    <!--搜索-->
    <div id="search">
      <input type="text" name="" id="search-text" value="" placeholder="任务名/内容/标签"/>
      <button id="search-button"><img src="../../static/icon/search.png"/></button>
    </div>
    <!--个人中心-->
    <div id="personal">
      <a href="">
        <img src="../../static/icon/personal.png"/>
        <img src="../../static/icon/open.png" id="open"/>
      </a>
    </div>
    <!--提醒-->
    <div id="remind">
      <img src="../../static/icon/remind.png"/>
      <span></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navTop',
    data() {
      return {
      }
    }
  }
</script>
<style>
  /*上导航*/
  #nav-top{
    position: fixed;
    top: 0;
    background: #FFFFFF;
    height: 60px;
    width: 100vw;
    box-shadow: 0px 0px 35px #c2c2c2;
    padding: 0px 60px 0px 100px;
    z-index: 500;
    float: left;
  }
  /*搜索*/
  #search{
    padding: 15px 0px;
    float: left;
  }
  #search-text{
    line-height: 30px;
    border: 1px solid #C2C2C2;
    border-radius: 10px 0px 0px 10px;
    padding: 0px 10px;
    float: left;
    outline: none;
  }
  #search-button{
    height: 32px;
    width: 50px;
    background: #C2C2C2;
    border: 1px solid #C2C2C2;
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
    float: left;
    outline: none;
  }
  #search-button:hover{
    background: #46B6FD;
    border: 1px solid #46B6FD;
  }
  #search img{
    left: 10px;
    height: 20px;
    width: 20px;
    float: left;
  }
  /*提醒*/
  #remind{
    float: right;
    padding: 15px;
  }
  #remind img{
    height: 30px;
    width: 30px;
  }
  #remind span{

  }
  /*个人中心*/
  #personal{
    float: right;
    padding: 5px;
  }
  #open{
    height: 20px;
    width: 20px;
    top: -5px;
    margin: 5px;
  }
</style>
