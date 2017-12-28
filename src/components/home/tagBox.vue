<template>
  <div id="tag-box">
    <img v-on:click="changeTagOkBtn" v-show="tagOk" src="../../assets/icon/changeOk2.png" alt="">
    <img v-on:click="changeTagBtn" v-show="tagChange" src="../../assets/icon/change.png" alt="">
    <div v-for="(item,index) in tags">
      <span class="tag" v-bind:class="isChooseTag">{{item.tagName}}</span>
      <span class="tagDel">-</span>
    </div>
    <span class="addTag" v-on:click="addTag">添加新标签</span>
  </div>
</template>

<script>
  export default {
    name: 'tagBox',
    data() {
      return {
        tags:[
        {
          tagId:0,
          tagName:'家',
          dataCSS:'tagColor'
        },
        {
          tagId:1,
          tagName:'公司',
          dataCSS:'tagColor'
        },
        {
          tagId:2,
          tagName:'做梦的时候',
          dataCSS:'tagChoose'
        }
        ],
        tagOk:false,
        tagChange:true,
        isChooseTag:'tagColor'
      }
    },
    methods:{
        //获取全部tag
      //修改完成按钮
      changeTagOkBtn:function () {
        //切换按钮
        this.tagOk=false;
        this.tagChange=true;
        //隐藏减号和新增
      },
      //修改按钮
      changeTagBtn:function () {
        //切换按钮
        this.tagOk=true;
        this.tagChange=false;
        //显示减号和新增
      },
      //点击新增标签
      addTag:function () {
        //显示输入框
      }
      //鼠标离开新标签输入框。隐藏输入框显示新增按钮。回传。push数组。显示新的tag
      //点击减号。改变状态？移除？回传数据
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
  .inputTag{
    top: 3px;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
    float: right;
  }

</style>
