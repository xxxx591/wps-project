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
      userid: "",
      docid: "",
      uuid: "test"
    };
  },
  mounted: function() {
    this.$http
      .get("api/v1/check/init.html", {
        params: {
          uuid: this.uuid
        }
      })
      .then(res => {
        this.userid = res.data.userId;
        if (res.data.fullCheck == "0") {
          this.$router.push({
            path: "/allCheck",
            query: { userid: this.userid }
          });
        }
      });
  }
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
li {
  list-style: none;
}
a {
  text-decoration: none;
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
  vertical-align: middle;
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
.icon-refresh {
  width: 12px;
  height: 12px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -263px -280px;
}
.icon-disable-input {
  width: 16px;
  height: 16px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -253px -128px;
}
.icon-select-input {
  width: 16px;
  height: 16px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -205px -128px;
  cursor: pointer;
}
.icon-input {
  width: 16px;
  height: 16px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -149px -128px;
  cursor: pointer;
}
.icon-loading {
  width: 132px;
  height: 142px;
  background: url(./assets/loading.png)no-repeat;
  position: relative;
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
