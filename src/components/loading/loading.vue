<template>
  <div class="hello">
   <div class="icon icon-loading">
       <div class="pointer"></div>
   </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "等待全文查重结果"
    };
  },
  mounted: function() {
    let num = 1;
    setInterval(function() {
      $(".pointer").css("transform", "rotate(" + num + "deg)");
      num += 4;
    }, 500);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
  position: absolute;
  height: 45px;
  border: 4px solid #999;
  top: 50%;
  margin-top: -45px;
  left: 50%;
  margin-left: -4px;
  transform: rotate(0deg);
  transform-origin: 4px 50px;
  transition: all .5s linear;
}
</style>
