<template>
  <div class="hello">
   <div class="loading-box">
      <loading v-if="istrue"></loading>
      <check-loading v-if="isfalse"></check-loading>
   </div>
  </div>
</template>

<script>
import loading from "@/components/loading/loading";
import checkLoading from "@/components/loading/checkLoading";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "未查看结果",
      istrue: true,
      isfalse: false,
      docCheckId: null,
      userId: this.GLOBAL.userId,
      wpstoken: this.GLOBAL.wpstoken
    };
  },
  components: {
    loading,
    checkLoading
  },
  beforeMount: function() {},
  mounted: function() {
    this.docCheckId = this.$route.query.docCheckId;
    var that = this;
    let i = setInterval(data => {
      that
        .$http("http://wpsapi2357.papertime.cn/v1/check/status.html", {
          params: {
            docCheckId: that.docCheckId
          },
          headers: {
            wpstoken: this.wpstoken,
            userId: this.userId
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.checkStatus == 2) {
            clearInterval(i);
            that.$router.push({
              path: "/fullTxt",
              query: { docCheckId: that.docCheckId }
            });
          }
        });
    }, 5000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
