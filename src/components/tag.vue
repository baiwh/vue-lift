<template>
  <div>
    <span class="tag">家</span>
  </div>
</template>

<script>
  export default {
    name: 'tag',
    data() {
      return {
          theColor:false
      }
    }
  }
</script>
<style>
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
</style>
