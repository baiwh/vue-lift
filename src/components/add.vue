<template>
  <!--测悬浮-->
  <div id="add">
    <img src="../../static/icon/add.png" alt="添加新项目">
  </div>
</template>

<script>
    export default {
        name: 'add',
        data() {
            return {
            }
        }
    }
</script>
<style>
  #add{
    position: fixed;
    right: 5vw;
    bottom: 5vw;
    background: #46B6FD;
    padding: 15px;
    height: 50px;
    width: 50px;
    cursor: pointer;
    border-radius: 25px;
  }
  #add:hover{
    background: #009cff;
  }
  #add img{
    height: 20px;
    width: 20px;
  }
</style>
