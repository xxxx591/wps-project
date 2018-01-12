<template>
  <div class="hello">
   <logo></logo>
   <div class="loading-box">
      <loading v-if="istrue"></loading>
      <check-loading v-if="isfalse"></check-loading>
   </div>
  </div>
</template>

<script>
import logo from "@/components/logo/logo";
import loading from "@/components/loading/loading";
import checkLoading from "@/components/loading/checkLoading";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "未查看结果",
      istrue: true,
      isfalse: false
    };
  },
  components: {
    logo,
    loading,
    checkLoading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
