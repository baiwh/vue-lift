<template>
  <div class="item">
    <div class="header">
      <div>
        <!--紧急程度-->
        <div class="gradeItem" v-bind:style="{border:'5px solid '+itemGrade}"></div>
        <!--标签-->
        <span class="tag tagChoose">{{this.itemTag}}</span>
      </div>
    </div>
    <h2>{{this.itemTitel}}</h2>
    <div id="toDoList">
        <item></item>
    </div>
  </div>
</template>

<script>
  import item from './item.vue'
  export default {
    name: 'itemBox',
    data() {
      return {}
    },
    components: {
      item: item,
    },
    computed: {
      //修改grade
      itemGrade(){
        let gradeIdStore = this.$store.state.gradeIdStore;
        if (gradeIdStore == 1) {
          return 'red';
        } else if (gradeIdStore == 2) {
          return 'orange';
        } else if (gradeIdStore == 3) {
          return 'green';
        }
      },
      //修改标签
      itemTag(){
        return this.$store.state.tagStore;
      },
      //修改标题
      itemTitel(){
        return this.$store.state.titleStore;
      }
    },
    methods: {}
  }
</script>
<style>
  /*里边还要套一个小一号的盒纸*/
  .item {
    background: #FFFFFF;
    width: 700px;
    border: 1px solid #D3D3D3;
    box-shadow: 0px 0px 15px #C2C2C2;
    padding: 0 0 50px 0;
  }
  /*不知道这个可不可以算是页眉*/
  .header {
    height: 80px;
    border-bottom: 1px solid #D3D3D3;
    padding: 20px;
  }
  .header div {
    opacity: 1;
  }
  /*标题要大一点吧*/
  h2 {
    margin: 40px;
  }
  .gradeItem {
    height: 20px;
    width: 20px;
    left: 15px;
    border-radius: 10px;
    float: left;
    margin: 5px;
    position: relative;
    top: 5px;
    cursor: auto;
    overflow: hidden;
  }
</style>
