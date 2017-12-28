<template>
  <div class="allTag">
    <span class="tag"
          v-bind:class="item.dataCSS"
          v-for="(item,index) in tags"
          v-on:click="changeTagBox(index)">{{item.tagName}}</span>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tagWindow',
    props:[
        'tagName',
      'taskNum'
    ],
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
        ]
      }
    },
    mounted:function () {
      this.getAllTag();
    },
    methods:{
        //获取所有tag
      getAllTag:function () {
//        axios.get('/label/getLabelList.action?',{
//            params:{
//                userId:1,
//
//            },
//          baseURL: '/liftVue',
//          withCredentials: false
//        }).then((tags)=>{
//            let res=tags.data;
//            this.tags=tags.data;
//        })
      },
        //改变选中的颜色
      getTagColor:function (index) {

      },
      changeTagBox:function (index) {
        //修改css
        //通知爸爸
        //回传数据
      }
    }
  }
</script>
<style>
  /*浮动窗里的标签*/
  .allTag span{
    float: left;
  }
  /*标签悬浮*/
  .allTag{
    background: #FFFFFF;
    box-shadow: 0px 0px 10px #808080;
    border: 1px solid #C2C2C2;
    position: absolute;
    padding: 5px;
    z-index: 5;
    top: 60px;
    right: 10px;
    overflow: visible;
    border-radius: 5px;
  }
  .allTag:after{
    content: "";
    position: absolute;
    top: -10px;
    right: 7px;
    background: url("../../assets/icon/arrow.png") no-repeat;
    background-size: 100% 100%;
    height: 10px;
    width: 20px;
  }
</style>
