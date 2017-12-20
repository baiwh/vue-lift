<template>
  <div>
    <div class="grade grade1" >
      <input type="hidden" name="grade1" value="1">
    </div>
    <div class="grade grade2">
      <input type="hidden" name="grade2" value="2">
    </div>
    <div class="grade grade3">
      <input type="hidden" name="grade3" value="3">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'grade',
    data() {
      return {
      }
    }
  }
</script>
<style>
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

  .grade1{
    border: 5px solid red;
    opacity: 0.1;
  }
  .grade2{
    border: 5px solid orange;
    opacity: 0.1;
  }
  .grade3{
    border: 5px solid green;
    opacity: 0.1;
  }
</style>
