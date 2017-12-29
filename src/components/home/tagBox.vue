<template>
  <div id="tag-box">
    <img v-on:click="changeTagOkBtn" v-show="tagOk" src="../../assets/icon/changeOk2.png" alt="">
    <img v-on:click="changeTagBtn" v-show="tagChange" src="../../assets/icon/change.png" alt="">
    <div v-for="(item,index) in tags" v-if="item.dataState==1">
      <span class="tag" v-bind:class="isChooseTag">{{item.labelName}}</span>
      <span class="tagDel" v-show="isTagDel" v-on:click="tagDelBtn(index)">-</span>
    </div>
    <span class="addTag" v-on:click="addTag" v-show="isAddTag">添加新标签</span>
    <input class="inputTag" v-model="inputNewTag" v-show="isInputTag" v-on:blur="addTagOk" v-on:keyup.enter="addTagOk" type="text" placeholder="新标签">
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tagBox',
    data() {
      return {
        tags:[],
        tagOk:false,
        tagChange:true,
        isChooseTag:'tagColor',
        isTagDel:false,
        isAddTag:false,
        isInputTag:false,
        inputNewTag:''
      }
    },
    mounted:function () {
        this.getAllTag();
    },
    methods:{
        //获取全部tag
      getAllTag:function () {
        axios.get('/label/getLabelList.action?',{
          params:{
            userId:1,
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((tags)=>{
          let res=tags.data;
          this.tags=res.data;
        })
      },
      //修改按钮
      changeTagBtn:function () {
        //切换按钮
        this.tagOk=true;
        this.tagChange=false;
        //显示减号和新增
        this.isTagDel=true;
          this.isAddTag=true;
      },
      //修改完成按钮
      changeTagOkBtn:function () {
        //切换按钮
        this.tagOk=false;
        this.tagChange=true;
        //隐藏减号和新增
        this.isTagDel=false;
          this.isAddTag=false;
      },
      //点击新增标签
      addTag:function () {
        //显示输入框
        this.isInputTag=true;
        this.isAddTag=false;
      },
      //鼠标离开新标签输入框
      addTagOk:function () {
        // push数组
        this.tags.unshift({
          userId:1,
          labelName:'',
          dataState:1,
          labelId:''
        })
        //同步输入框内容
        this.tags[0].labelName=this.inputNewTag;
        // 回传数据、赋值
        let newTag=this.tags[0].labelName;
        axios.get('/label/insertLabel.action',{
          params:{
            userId:1,
            labelName:newTag
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((newTags)=>{
          let res=newTags.data;
          this.tags[0].labelId=res.data;
        })
        //隐藏输入框显示新增按钮
        this.isInputTag=false;
        this.isAddTag=true;
      },
      //点击减号
      tagDelBtn:function (index) {
        // 改变状态
        this.tags[index].dataState=2;
        // 回传数据
        let delTagId=this.tags[index].labelId;
        axios.get('/label/updateLabel.action',{
          params:{
            userId:1,
            labelId:delTagId,
            dataState:2
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
      },
      //点击tag筛选。修改颜色
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
  /*删除标签（减号）*/
  .tagDel{
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
  .inputTag{
    top: 4px;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
    float: right;
  }

</style>
