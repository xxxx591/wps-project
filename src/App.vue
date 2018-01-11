<template>
  <div id="app">
      <div class="content">
        <router-view/>
      </div>
      <div class="foot">

      </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userid: "",
      docid: ""
    };
  }
  // beforeCreate: function() {
  //   this.$http
  //     .get(
  //       "https://www.easy-mock.com/mock/59ffd36ca3412760ce85ee97/example/wpstest02"
  //     )
  //     .then(res => {
  //       this.userid = res.data.data["0"].userid;
  //       this.docid = res.data.data["0"].docid;
  //       if (res.data.data["0"].state === "等待全文查重结果") {
  //         this.$router.push({
  //           path: "/test02",
  //           query: { userid: this.userid, docid: this.docid }
  //         });
  //       }
  //     });
  // },
  // watch: {
  //   $route(to, from) {
  //     console.log(to);
  //     console.log(from);
  //   }
  // }
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
html {
  overflow: hidden;
}

body {
  overflow: auto;
  width: calc(100vw + 20px);
}
#app {
  font-family: "微软雅黑";
  width: 348px;
  max-height: 895px;
  font-size: 12px;
  margin: 0 auto;
}

.icon {
  display: inline-block;
  background: red;
  vertical-align: bottom;
}
.icon-check {
  width: 34px;
  height: 40px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -148px -39px;
}
.icon-robot {
  width: 36px;
  height: 36px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -226px -41px;
}
.icon-current-time {
  width: 36px;
  height: 34px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -305px -42px;
}
.icon-return {
  width: 8px;
  height: 16px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -43px -128px;
}
.icon-remind {
  width: 13px;
  height: 14px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -95px -129px;
}
.content {
  margin: 0 20px;
  height: 100%;
  overflow-y: auto;
  margin-bottom: 55px;
}
.foot {
  position: fixed;
  bottom: 0;
  width: 348px;
  height: 55px;
  background: orangered;
}

</style>
