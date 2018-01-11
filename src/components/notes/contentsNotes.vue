<template>
  <div class="contentsNotes">
    <!--便签-->
    <div class="note">
      <!--时间-->
      <div class="hour">
        <span>23:50</span>
      </div>
      <input type="hidden">
      <!--便签内容-->
      <div class="notes">
        <!--输入-->
        <div class="noteInput" contenteditable="true"><br/></div>
      </div>
      <!--删除-->
      <img class="delNote" src="../../../static/icon/del.png">
    </div>
  </div>
</template>

<script>
    export default {
        name: 'contentsNotes',
        data() {
            return {
            }
        }
    }
</script>
<style>

  /*内容（时间轴的轴）*/
  .contentsNotes {
    width: 700px;
    border-left: 4px solid #c2c2c2;
    float: left;
  }

  /*便签外框*/
  .note {
    min-height: 100px;
    width: 700px;
    margin: 20px 0px;
    float: left;
  }

  /*时间*/
  .hour {
    left: -70px;
    top: 8px;
    float: left;
    height: 30px;
    width: 50px;
    color: #c2c2c2;
  }

  /*便签内框*/
  .notes {
    min-height: 100px;
    width: 600px;
    background: #FFFFFF;
    float: left;
    left: -11px;
    border-radius: 10px;
    box-shadow: 0px 0px 35px #c2c2c2;
  }

  /*点*/
  .notes:after {
    content: "";
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 20px;
    border: 4px solid #c2c2c2;
    float: left;
    left: -52px;
    top: 7px;
    background: #efefef;
  }

  /*箭头*/
  .notes:before {
    content: "";
    position: absolute;
    border-width: 10px 10px 10px 0px;
    border-color: transparent #FFFFFF transparent transparent;
    border-style: dashed solid dashed dashed;
    float: left;
    left: -10px;
    top: 10px;
    z-index: 5;
  }

  /*选中便签效果*/
  .chooseNotes:after {
    border: 4px solid #009cff;
  }

  /*输入便签*/
  .noteInput {
    width: 600px;
    min-height: 150px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    outline: 0;
    font-size: 15px;
    line-height: 28px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 10px;
  }

  /*删除便签*/
  .delNote {
    display: none;
    height: 20px;
    width: 20px;
    opacity: 0.3;
    left: 10px;
    top: 40px;
  }

  .delNote:hover {
    opacity: 0.6;
    cursor: pointer;
  }
</style>
