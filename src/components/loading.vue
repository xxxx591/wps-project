<template>
  <div class="hello">
   <logo></logo>
   <div class="loading-box">
     <loading></loading>
   </div>
  </div>
</template>

<script>
import logo from "@/components/logo/logo";
import loading from "@/components/loading/loading";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "未查看结果"
    };
  },
  components:{
    logo,loading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
