<template>
  <div id="tag-box">
    <img v-on:click="changeTagOkBtn" v-show="tagOk" src="../../../static/icon/changeOk2.png" alt="">
    <img v-on:click="changeTagBtn" v-show="tagChange" src="../../../static/icon/change.png" alt="">
    <div v-for="(item,index) in tagList" v-if="item.dataState==1">
      <span class="tag" v-on:click="tagFilter(index)"
            v-bind:class="{'tagColor':col.indexOf(item.labelId)==-1,'tagChoose':col.indexOf(item.labelId)!=-1}">{{item.labelName}}</span>
      <span class="tagDel" v-show="isTagDel" v-on:click="tagDelBtn(index)">-</span>
    </div>
    <span class="addTag" v-on:click="addTag" v-show="isAddTag">添加新标签</span>
    <input class="inputTag" v-model="inputNewTag" v-show="isInputTag" v-on:blur="addTagOk" v-on:keyup.enter="addTagOk"
           type="text" placeholder="新标签">
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tagBox',
    data() {
      return {
        tagOk: false,
        tagChange: true,
        isTagDel: false,
        isAddTag: false,
        isInputTag: false,
        inputNewTag: '',
        isTagColor: 'no',
        isTagChoose: 'no',
        col:[]
      }
    },
    computed: {
      tagList(){
        this.$store.dispatch('getTag');
        return this.$store.state.tagList;
      }
    },
    filters: {
      changeColor: function (value) {
        if (value == 'blue') {
          return 'tagChoose';
        } else {
          return 'tagColor';
        }
      }
    },
    methods: {
      //修改按钮
      changeTagBtn: function () {
        //切换按钮
        this.tagOk = true;
        this.tagChange = false;
        //显示减号和新增
        this.isTagDel = true;
        this.isAddTag = true;
      },
      //修改完成按钮
      changeTagOkBtn: function () {
        //切换按钮
        this.tagOk = false;
        this.tagChange = true;
        //隐藏减号和新增
        this.isTagDel = false;
        this.isAddTag = false;
      },
      //点击新增标签
      addTag: function () {
        //显示输入框
        this.isInputTag = true;
        this.isAddTag = false;
      },
      //鼠标离开新标签输入框
      addTagOk: function () {
        // push数组
        this.tagList.unshift({
          labelName: '',
          dataState: 1,
          labelId: ''
        })
        //同步输入框内容
        this.tagList[0].labelName = this.inputNewTag;
        // 回传数据、赋值
        let newTag = this.tagList[0].labelName;
        axios.get('/label/insertLabel.action', {
          params: {
            labelName: newTag
          },
          baseURL: '/liftVue',
          withCredentials: false
        }).then((newTags) => {
          let res = newTags.data;
          this.tagList[0].labelId = res.data;
        })
        //隐藏输入框显示新增按钮
        this.isInputTag = false;
        this.isAddTag = true;
        commit('changeToGetTag', 'ok');
        this.$store.dispatch('getTag');
      },
      //点击减号
      tagDelBtn: function (index) {
        // 改变状态
        this.tagList[index].dataState = 2;
        // 回传数据
        let delTagId = this.tagList[index].labelId;
        axios.get('/label/updateLabel.action', {
          params: {
            labelId: delTagId,
            dataState: 2
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
        this.$store.commit('changeToGetTag', 'ok');
        this.$store.dispatch('getTag');
      },
      //点击tag筛选。修改颜色？
      tagFilter: function (index) {
        let labels = this.tagList[index].labelId;
        let color=this.col;
        if (color.indexOf(labels)!=-1) {
          //移除
          let newLabel=color.filter(item=>item!=labels);
          this.col=newLabel;
          this.$store.commit('removeLabels', labels);
        } else {
          //增加
          this.col.push(labels);
          this.$store.commit('addLabels', labels);
        }
        //重新加载task
        this.$store.commit('changeToGetTask', 'ok');
        this.$store.dispatch('getTask');
        this.$store.commit('changeToGetTask', 'stop');
      }
    }
  }
</script>
<style>
  #tag-box {
    height: 50px;
    padding: 10px;
  }

  /*上方标签部分的img*/
  #tag-box img {
    float: right;
    height: 20px;
    width: 20px;
    margin: 5px;
    cursor: pointer;
  }

  /*删除标签（减号）*/
  .tagDel {
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
  .addTag {
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

  .inputTag {
    top: 4px;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    border: 1px solid #C2C2C2;
    float: right;
  }

</style>
