<template>
  <div class="item">
    <div class="header">
      <div>
        <!--紧急程度-->
        <div class="gradeItem" v-bind:style="{border:'5px solid '+itemGrade}"></div>
        <!--修改-->
        <img class="change" src="../../../static/icon/change.png" alt="change" v-on:click="changeItems">
        <!--标签-->
        <span class="tag tagChoose">{{this.itemTag}}</span>
      </div>
    </div>
    <h2>{{this.itemTitel}}</h2>
    <div id="toDoList">
      <item ref="item"></item>
    </div>
    <!--添加新项目-->
    <div class="add" id="newItem" v-show="addItem" v-on:click="addItemButton">
      <img src="../../../static/icon/add.png" alt="">
    </div>
    <div class="changeOk" v-show="changeOk" v-on:click="changeOkButton">
      <img src="../../../static/icon/changeOk.png" alt="">
    </div>
  </div>
</template>

<script>
  import item from './item.vue'
  import grade from './allGrade.vue'

  export default {
    name: 'itemBox',
    data() {
      return {
        addItem: true,
        changeOk: false
      }
    },
    components: {
      item: item,
      grade: grade
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
    methods: {
      //右上角的修改按钮
      changeItems: function () {
        //调用组件的方法
        let fatherItemBox = this;
        fatherItemBox.$refs.item.changeItem();
        //对勾和加号的切换
        this.addItem = !this.addItem;
        this.changeOk = !this.changeOk;
      },
      //点击对勾切换回去
      changeOkButton: function () {
        //调用组件的方法
        let fatherItemBox = this;
        fatherItemBox.$refs.item.changeItem();
        //对勾和加号的切换
        this.addItem = !this.addItem;
        this.changeOk = !this.changeOk;
      },
      //添加新项目
      addItemButton: function () {
        //调用子组件的方法。插入新数组
        let fatherItemBox = this;
        fatherItemBox.$refs.item.addItem();
        //改为编辑状态
        this.addItem = false;
        this.changeOk = true;
      },
    }
  }


</script>
<style>
  /*里边还要套一个小一号的盒纸*/
  .item {
    background: #FFFFFF;
    width: 700px;
    border: 1px solid #D3D3D3;
    box-shadow: 0px 0px 15px #C2C2C2;
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

  /*修改*/
  .change {
    float: right;
    height: 25px;
    width: 25px;
    margin: 5px;
    cursor: pointer;
  }

  /*标题要大一点吧*/
  h2 {
    margin: 40px;
  }

  /*下边还要添加新的小项目呢*/
  .add {
    height: 40px;
    width: 600px;
    margin: 30px 50px;
    background: #46B6FD;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
  }

  .add:hover {
    background: #009cff;
  }

  .add img {
    width: 20px;
    height: 20px;
    margin: 10px;
  }

  .changeOk {
    height: 40px;
    width: 600px;
    margin: 30px 50px;
    background: #34b93d;
    opacity: 0.8;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
  }

  .changeOk:hover {
    opacity: 1;
  }

  .changeOk img {
    width: 20px;
    height: 20px;
    margin: 10px;
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
