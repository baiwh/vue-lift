<template>
  <div class="allTag">
    <span class="tag"
          v-bind:class="{'tagColor':index!=isTagColor,'tagChoose':index==isTagChoose}"
          v-for="(item,index) in tags"
          v-on:click="changeTagBox(index)">{{item.labelName}}</span>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'tagWindow',
    props:[
      'tagName'
    ],
    data() {
      return {
        tags:[],
        isTagColor:'no',
        isTagChoose:'no'
      }
    },
    methods:{
        //获取所有tag
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
          //获取到相同的name的索引
          let name1=this.$store.state.tagStore;
          let len=this.tags.length;
          let ind='';
          for (let i=0;i<len;i++){
            let name2=this.tags[i].labelName;
            if(name1==name2){
              ind=i;
            }
          }
          //改颜色
          this.isTagColor=ind;
          this.isTagChoose=ind;
        })
      },
      //点击悬浮穿内的标签时
      changeTagBox:function (index) {
        //先把所有的都改成灰色
          this.isTagColor='no';
          this.isTagChoose='no';
        //修改css
        this.isTagColor=index;
        this.isTagChoose=index;
        //通知爸爸
        let updateTag=this.tags[index].labelName;
        this.$emit('update:tagName',updateTag);
        //回传数据
        let gradeTaskId=this.$store.state.taskIdStore;
        axios.get('/task/updateTask.action',{
          params:{
            userId:1,
            taskId:gradeTaskId,
            labelName:updateTag
          },
          baseURL: '/liftVue',
          withCredentials: false
        })
        //修改右侧的
        this.$store.commit('updateStoreTag',updateTag);
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
