<template>
  <div class="allTag">
    <span class="tag">家</span>
    <span class="tag">家</span>
  </div>
</template>

<script>
  export default {
    name: 'tagWindow',
    data() {
      return {
      }
    }
  }
</script>
<style>
  /*浮动窗里的标签*/
  .allTag span{
    float: left;
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
  }
  .allTag:after{
    content: "";
    position: absolute;
    top: -10px;
    right: 7px;
    background: url("../../assets/icon/arrow.png") no-repeat;
    background-size: 100% 100%;
    height: 10px;
    width: 20px;
  }
</style>
