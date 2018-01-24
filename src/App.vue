<template>
  <div id="app">
      <div class="content">
        <router-view/>
      </div>
      <!-- <div class="foot">

      </div> -->
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userId: this.GLOBAL.userId,
      wpstoken: this.GLOBAL.wpstoken,
      docid: "",
      userName: "test",
      fullCheck: this.GLOBAL.fullCheck
    };
  },
  mounted: function() {
    console.log(this.GLOBAL.wpstoken);
    // if (this.fullCheck == "0") {
    //   this.$router.push({
    //     path: "/allCheck"
    //   });
    // } else if (this.fullCheck == "1") {
    //   this.$router.push({
    //     path: "/viewReport"
    //   });
    // }
  }
};
</script>
<style>

</style>
