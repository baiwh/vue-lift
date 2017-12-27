<template>
  <div class="gradeBox">
    <div class="grade" v-bind:style="item" v-for="(item,index) in gradeColor"></div>
  </div>
</template>

<script>
  export default {
    name: 'allGrade',
    data() {
      return {
        gradeColor:[
          {
            border:'5px solid red',
            opacity:'0.1'
          },
          {
            border:'5px solid orange',
            opacity:'0.1'
          },
          {
            border: '5px solid green',
            opacity: '0.1'
          }
        ],

      }
    },

  }
</script>
<style>
  .gradeBox{
    float: left;
  }
  /*紧急程度*/
  .grade{
    height: 20px;
    width: 20px;
    left: 15px;
    top: 20px;
    border-radius: 10px;
    float: left;
    margin: 5px;
    cursor: pointer;
  }
  .grade1 {
    border: 5px solid red;
  }
</style>
