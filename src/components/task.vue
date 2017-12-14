<template>
  <div class="task c" >
    <input type="hidden" class="taskId" value="${item.taskId}">
    <!--附加信息-->
    <div class="stateBar">
      <!--紧急程度-->

      <div class="grade grade3" >
        <input type="hidden" value="3">
      </div>

      <div class="gradeBox" hidden>
        <div class="grade grade1" >
          <input type="hidden" name="grade1" value="1">
        </div>
        <div class="grade grade2">
          <input type="hidden" name="grade2" value="2">
        </div>
        <div class="grade grade3">
          <input type="hidden" name="grade3" value="3">
        </div>
      </div>
      <!--标签-->
      <input type="hidden" class="labelId" value="${item.labelId}">
      <span class="tag theTag1 labelChoose">家</span>
      <!--<span class="tag theTag2">+</span>-->
    </div>
    <!--标签悬浮-->
    <div class="allTag">
      <input type="hidden" value="1">
      <span class="tag">家</span>
      <input type="hidden" value="2">
      <span class="tag">公司</span>
    </div>

    <!--标题-->
    <div class="title">
      <input type="text" class="listInput" placeholder="标题">
      <span class="listSpan">标题</span>
    </div>
    <!--日期-->
    <div class="day">
      <input type="date" class="listInput">
      <span class="listSpan">2017</span>
    </div>
    <!--进度条-->
    <div class="rate">
      <div class="ratio">
      </div>
    </div>
    <span class="rateVal">0/0</span>
    <!--删除-->
    <img src="icon/del.png" alt="" class="del">
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
  .task{
    height: 200px;
    width: 380px;
    margin: 0px 0px 20px 0px;
    background: #FFFFFF;
    border: 1px solid #D3D3D3;
    box-shadow: 0px 0px 15px #C2C2C2;
    overflow: visible;
    display: block;
  }
  .task:hover{
    border: 2px solid #46B6FD;
    border-radius: 5px;
  }
  /*左边小列表被选中*/
  .choose {
    border: 2px solid #46B6FD;
    border-radius: 5px;
  }
  .stateBar{
    height: 50px;
    margin: 5px 10px;
  }
  .gradeBox{
    overflow: visible;
    float: left;
  }
  /*紧急程度*/
  .grade{
    height: 20px;
    width: 20px;
    left: 15px;
    top: 20px;
    border-radius: 10px;
    float: left;
    margin: 5px;
    cursor: pointer;
  }

  .grade1{
    border: 5px solid red;
    opacity: 0.1;
  }
  .grade2{
    border: 5px solid orange;
    opacity: 0.1;
  }
  .grade3{
    border: 5px solid green;
    opacity: 0.1;
  }

  /*标题*/
  .title{
    margin: 5px 25px;
  }
  .title input{
    z-index: 2;
    height: 25px;
    width: 200px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
  }
  .day{
    color: #808080;
    margin: 5px 25px;
    overflow: visible;
  }
  .day input{

  }
  /*进度条*/
  .rate{
    height: 10px;
    width: 325px;
    background: #D3D3D3;
    border-radius: 10px;
    margin: 20px 25px;
  }
  .ratio{
    height: 10px;
    width: 325px;
    background: #46B6FD;
    border-radius: 10px;
    text-align: right;
  }
  .rateVal{
    color: #808080;
    margin: 0px 25px;
  }

  .task .ratio{
    left: -325px;
  }
  /*删除小列表的垃圾桶图*/
  .del{
    opacity: 0.3;
    height: 20px;
    width: 20px;
    float: right;
    right: 10px;
    cursor: pointer;
  }
  .del:hover{
    opacity: 0.6;
  }
  /*小列表的标题*/
  .listInput{
    display: none;
  }
  .title,.day{
    height: 25px;
  }
</style>
