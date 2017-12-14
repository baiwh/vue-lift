<template>
  <div id="tag-box">
    <img class="tagOk" src="./../assets/icon/changeOk2.png" alt="">
    <img class="tagChange" src="./../assets/icon/change.png" alt="">

    <span class="tag select">家</span>
    <span class="tagDel">-</span>
    <input type="hidden" value="">

    <span class="tag select">公司</span>
    <span class="tagDel">-</span>
    <input type="hidden" value="">

    <span class="addTag">添加新标签</span>
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
  /*标签*/
  .tag{
    float: right;
    height: 25px;
    width: auto;
    min-width: 45px;
    padding: 0px 5px;
    border-radius: 5px;
    margin: 5px 5px 5px 15px;
    cursor: pointer;
    font-size: 15px;
    color: #FFFFFF;
    border: 2px solid #C2C2C2;
    background: #C2C2C2;
    text-align: center;
  }
  /*标签的白色圆点*/
  .tag:after{
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 3px;
    background: #FFFFFF;
    position: absolute;
    left: -5px;
    top: 8px;
  }
  /*标签的小三角*/
  .tag:before{
    content: "";
    width: 0;
    height: 4px;
    border-top: 10px solid transparent;
    border-right: 10px solid #C2C2C2;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -9px;
    top: -2px;
  }
  /*浮动窗里的标签*/
  .allTag span{
    float: left;
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
  /*标签悬浮*/
  .allTag{
    background: #FFFFFF;
    box-shadow: 0px 0px 10px #808080;
    border: 1px solid #C2C2C2;
    position: absolute;
    padding: 5px;
    z-index: 5;
    top: 60px;
    right: 10px;
    overflow: visible;
    border-radius: 5px;
    display: none;
  }
  .allTag:after{
    content: "";
    position: absolute;
    top: -10px;
    right: 7px;
    background: url("./../assets/icon/arrow.png") no-repeat;
    background-size: 100% 100%;
    height: 10px;
    width: 20px;
  }
</style>
