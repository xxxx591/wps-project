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
      isfalse: false,
      docCheckId: null,
      userId: null
    };
  },
  components: {
    logo,
    loading,
    checkLoading
  },
  beforeMount: function() {
    this.docCheckId = this.$route.query.docCheckId;
    this.userId = this.$route.query.userid;
    console.log(this.userId + "====" + this.docCheckId);
  },
  mounted: function() {
    var that = this;
     let i = setInterval(function() {
      console.log(that);
      that.$http("api/v1/check/status.html", {
        params: {
          docCheckId: that.docCheckId
        }
      }).then(function(res) {
        console.log(res.data.checkStatus);
        if (res.data.checkStatus == 2) {
          clearInterval(i)
          that.$router.push({
            path: "/fullTxt",
            query: { userid: that.userId, docCheckId: that.docCheckId }
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
