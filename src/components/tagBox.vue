<template>
  <div id="tag-box">
    <img class="tagOk" src="./../assets/icon/changeOk2.png" alt="">
    <img class="tagChange" src="./../assets/icon/change.png" alt="">

    <span class="tag">家</span>
    <span class="tagDel">-</span>

    <span class="tag">家</span>
    <span class="tagDel">-</span>

    <span class="addTag">添加新标签</span>
  </div>
</template>

<script>
  export default {
    name: 'tagBox',
    data() {
      return {
      }
    }
  }
</script>
<style>
  #tag-box{
    height: 50px;
    padding: 10px;
  }
  /*上方标签部分的img*/
  #tag-box img{
    float: right;
    height: 20px;
    width: 20px;
    margin: 5px;
    cursor: pointer;
  }
  /*对勾*/
  .tagOk{
    display: none;
  }
  /*删除标签（减号）*/
  .tagDel{
    display: none;
    float: right;
    height: 20px;
    width: 20px;
    margin: 5px;
    cursor: pointer;
    font-size: 30px;
    background: #FFFFFF;
    border: 1px dashed #C2C2C2;
    color: #C2C2C2;
    border-radius: 10px;
    line-height: 15px;
    text-align: center;
    left: 7px;
    top: 2px;
  }
  /*添加新标签*/
  .addTag{
    display: none;
    float: right;
    height: 25px;
    width: 90px;
    margin: 5px;
    cursor: pointer;
    background: #46B6FD;
    border: 1px dashed #46B6FD;
    color: #FFFFFF;
    border-radius: 5px;
    line-height: 23px;
    text-align: center;
  }
  /*新的标签*/
  .newTag{
    display: none;
  }
  .inputTag{
    top: 3px;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
    float: right;
  }

  /*选中。蓝色*/
  .labelChoose{
    background: #46B6FD;
    border: 2px solid #46B6FD;
  }
  .labelChoose:before{
    border-right: 10px solid #46B6FD;
  }
  .labelChoose{
    background: #46B6FD;
    border: 2px solid #46B6FD;
  }
  .labelChoose:before{
    border-right: 10px solid #46B6FD;
  }

</style>
