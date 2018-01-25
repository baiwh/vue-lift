<template>
  <div class="time">
    <!--年-->
    <div class="cover">
      <div class="covered" id="Year">
        <span class="theTime"
              v-bind:class="{'chooseTime':isChooseYear==index}"
              v-for="(item,index) in theYear"
              v-on:click="yearChoose(index)">{{item}}</span>
      </div>
    </div>
    <!--月-->
    <div class="cover">
      <div class="covered" id="Month">
        <span class="theTime"
              v-bind:class="{'chooseTime':isChooseMonth==index}"
              v-for="(item,index) in theMonth"
              v-on:click="monthChoose(index)">{{item}}</span>
      </div>
    </div>
    <!--日-->
    <div class="cover">
      <div class="covered" id="Day">
        <span class="theTime"
              v-bind:class="{'chooseTime':isChooseDay==index}"
              v-for="(item,index) in theDay"
              v-on:click="dayChoose(index)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'timeLine',
    data() {
      return {
        theYear: ['2017', '2018', '2019'],
        theMonth: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        theDay: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
          '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25',
          '26', '27', '28', '29', '30', '31'],
        isChooseDay: 'no',
        isChooseMonth: 'no',
        isChooseYear: 'no'
      }
    },
    computed: {
      allDate(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let today = [year, month, day];
        return today;
      },
      dateIndex(){
        let date = new Date();
        let year = '' + date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        } else {
          month = '' + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = '0' + day;
        } else {
          day = '' + day;
        }
        let yearIndex = this.theYear.indexOf(year);
        let monthIndex = this.theMonth.indexOf(month);
        let dayIndex = this.theDay.indexOf(day);
        let ind=[yearIndex,monthIndex,dayIndex];
        return ind;
      },
      allTime(){
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
      },
    },
    mounted(){
      document.getElementById('Year').scrollTop = (this.allDate[0] - 2017) * 40;
      document.getElementById('Month').scrollTop = (this.allDate[1] - 1) * 40;
      document.getElementById('Day').scrollTop = (this.allDate[2] - 1) * 40;
      this.isChooseYear = this.dateIndex[0];
      this.isChooseMonth = this.dateIndex[1];
      this.isChooseDay = this.dateIndex[2];
    },
    methods: {
      //自动获取当天时间
      //时间筛选：点击年月日。选择/取消选择。调整滚动条位置
      yearChoose: function (index) {
        let num = this.theYear[index] - 2017;
        let id = document.getElementById('Year');
        id.scrollTop = 40 * num;
        this.isChooseYear = index;
      },
      monthChoose: function (index) {
        let id = document.getElementById('Month');
        id.scrollTop = 40 * index;
        this.isChooseMonth = index;
      },
      dayChoose: function (index) {
        let id = document.getElementById('Day');
        id.scrollTop = 40 * index;
        this.isChooseDay = index;
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

  /*年月日的最外层的覆盖物。用来盖住滚动条*/
  .cover {
    width: 85px;
    float: left;
    overflow: hidden;
    height: 200px;
    margin: 5px;
  }

  /*年月日外层被覆盖的滚动条*/
  .covered {
    width: 105px;
    overflow: scroll;
    height: 215px;
    padding: 80px 0px 100px 0px;
  }

  /*时间里的所有span*/
  .theTime {
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

  .theTime:hover {
    opacity: 0.5;
  }

  .chooseTime {
    opacity: 1;
  }
</style>
