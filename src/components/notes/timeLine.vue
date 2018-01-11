<template>
  <div class="time">
    <!--年-->
    <div class="theTime">
      <div class="yearNotes">
        <span class="theYear" v-for="(item,index) in theYear">{{item}}</span>
      </div>
    </div>
    <!--月-->
    <div class="theTime">
      <div class="monthNotes">
        <span class="theMonth" v-for="(item,index) in theMonth">{{item}}</span>
      </div>
    </div>
    <!--日-->
    <div class="theTime">
      <div class="dayNotes">
        <span class="theDay" v-for="(item,index) in theDay">{{item}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'timeLine',
    data() {
      return {
        theYear: ['2017', '2018', '2019'],
        theMonth: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        theDay: ['01','02','03','04','05','06','07','08','09','10','11','12',
          '13','14','15','16','17','18','19','20','21','22','23','24','25',
          '26','27','28','29','30','31'],

      }
    }
  }
</script>
<style>
  /*时间的整个div*/
  .time {
    width: 390px;
    height: 500px;
    float: left;
  }

  /*时间里的所有span*/
  /*.time span*/
  .theYear, .theMonth, .theDay {
    display: block;
    float: left;
    clear: both;
    height: 30px;
    line-height: 20px;
    min-width: 80px;
    padding: 5px;
    margin: 5px;
    background: #009cff;
    color: #FFFFFF;
    text-align: center;
    opacity: 0.3;
    cursor: pointer;
    border-radius: 10px;
  }

  .theYear:hover, .theMonth:hover, .theDay:hover {
    opacity: 0.7;
  }

  /*年月日的最外层的共同class。用来盖住滚动条*/
  .theTime {
    width: 85px;
    float: left;
    overflow: hidden;
    height: 200px;
    margin: 5px;
  }

  /*年月日外层的整体*/
  .dayNotes, .yearNotes, .monthNotes {
    width: 105px;
    overflow: scroll;
    height: 215px;
    padding: 80px 0px 100px 0px;
  }

</style>
