<template>
  <div>
    <div class="contentsNotes" v-for="(item,index) in notes" v-if="item.dataState==1">
      <!--便签-->
      <div class="note"
           v-on:mouseover="delNoteOver(index)"
           v-on:mouseout="delNoteOut()"
           v-on:click="noteClick(index)" >
        <!--时间-->
        <div class="hour" v-bind:class="{'blueHour':isBlueHour==index,'greyHour':isGreyHour==index}">
          <span>{{item.createTime | noteTime}}</span>
        </div>
        <!--便签内容-->
        <div class="notes" v-bind:class="{'chooseNotes':isChooseNotes==index}">
          <!--输入-->
          <div class="noteInput" contenteditable="true" v-on:blur="noteInputBlur(index)" v-model="item.content">{{item.content}}<br/></div>
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
        notes: [],
        delNoteImg: 'no',
        isChooseNotes:'no',
        isBlueHour:'no',
        isGreyHour:'no'
      }
    },
    computed: {},
    filters:{
        noteTime:function (value) {
            function newTime(str) {
              let arr=str.split(' ');
              let data=arr[0].split('-');
              let time=arr[1].split(':');
              let newtime=data[1]+'-'+data[2]+' '+time[0]+':'+time[1];
              return newtime;
            }
            return newTime(value);
        }
    },
    mounted(){
        this.getNoteList();
    },
    methods: {
        //获取note
      getNoteList: function () {
        axios.get('/note/noteList.action', {
          params: {
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((res)=>{
            let note=res.data;
            let notes=note.data;
            this.notes=notes;
        })
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
      //鼠标离开输入框保存?
      noteInputBlur:function (index) {
        this.isChooseNotes='no';
        this.isBlueHour='no';
        let noteId = this.notes[index].noteId;
        let content=this.notes[index].content;
        axios.get('/note/updateNote.action',{
          params: {
            noteId: noteId,
            content:content,
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      },
      //删除note
      delNote: function (index) {
        let noteId = this.notes[index].noteId;
        this.notes[index].dataState=2;
        axios('/note/updateNote.action', {
          params: {
            noteId: noteId,
            del:'yes'
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      },
      //新增note(父组件调用）
      addNote: function () {
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        if(month<10){
            month='0'+month;
        }
        let day=date.getDate();
        if(day<10){
          day='0'+day;
        }
        let hour=date.getHours();
        if(hour<10){
          hour='0'+hour;
        }
        let minute=date.getMinutes();
        if(minute<10){
          minute='0'+minute;
        }
        let second=date.getSeconds();
        let createTime=''+year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
        this.notes.unshift({
          content:' ',
          dataState:1,
          createTime:createTime,
          noteId:''
        })
        axios.get('/note/insertNote.action', {
          params: {
              content:' '
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((res)=>{
            let insert=res.data;
            let id=insert.data;
            this.notes[0].noteId=id;
        })
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
