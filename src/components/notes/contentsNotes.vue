<template>
  <div>
    <div class="contentsNotes" v-for="(item,index) in notes">
      <!--便签-->
      <div class="note"
           v-on:mouseover="delNoteOver(index)"
           v-on:mouseout="delNoteOut()"
           v-on:click="noteClick(index)" >
        <!--时间-->
        <div class="hour" v-bind:class="{'blueHour':isBlueHour==index,'greyHour':isGreyHour==index}">
          <span>23:50</span>
        </div>
        <!--便签内容-->
        <div class="notes" v-bind:class="{'chooseNotes':isChooseNotes==index}">
          <!--输入-->
          <div class="noteInput" contenteditable="true" v-on:blur="noteInputBlur(index)">{{item}}<br/></div>
        </div>
        <!--删除-->
        <img class="delNote" src="../../../static/icon/del.png"
             v-show="delNoteImg==index"
             v-on:click="delNote(index)">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'contentsNotes',
    data() {
      return {
        notes: ['',''],
        delNoteImg: 'no',
        isChooseNotes:'no',
        isBlueHour:'no',
        isGreyHour:'no'
      }
    },
    computed: {},
    mounted(){
    },
    methods: {
        //获取note
      getNowTime: function () {
        axios.get('', {
          params: {
            userId: 1
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then()
      },
      //鼠标点击某个便签
      noteClick:function (index) {
        //添加选中效果
        this.isChooseNotes=index;
        this.isBlueHour=index;
      },
      //鼠标移入显示垃圾桶
      delNoteOver: function (index) {
        this.delNoteImg = index;
      },
      //鼠标移出隐藏垃圾桶
      delNoteOut: function () {
        this.delNoteImg = 'no';
      },
      //鼠标离开输入框保存
      noteInputBlur:function (index) {
        this.isChooseNotes='no';
        this.isBlueHour='no';
        let noteId = this.notes[index].noteId;
        let note=this.notes[index].note;
//        let time=
//        let content=
        axios.get('',{
          params: {
            userId: 1,
            noteId: noteId
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      },
      //删除note
      delNote: function (index) {
        let noteId = this.notes[index].noteId;
        axios('/note/updateNote.action', {
          params: {
            userId: 1,
            noteId: noteId
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then()
      },
      //新增note(父组件调用）
      addNote: function () {
        this.notes.unshift({})
        axios.get('', {
          params: {
            userId: 1
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then()
      },

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
  .blueHour{
    color: #009cff;
  }
  .greyHour{
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
