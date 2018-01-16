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
        console.log(res);
        this.userid = res.data.userId;
        if (res.data.fullCheck == "0") {
          this.$router.push({
            path: "/allCheck",
            query: { userid: this.userid }
          });
        } else if (res.data.fullCheck == "1") {
          console.log(this.$router);
          this.$router.push({
            path: "/viewReport",
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
  font-size: 12px;
}
body {
  overflow: auto;
  width: calc(100vw + 2rem);
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: "微软雅黑";
  width: 29rem;
  max-height: 72.17rem;
}

.icon {
  display: inline-block;
  background: red;
  vertical-align: middle;
}
.icon-check {
  width: 49px;
  height: 49px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -46px -122px;
}
.icon-robot {
  width: 46px;
  height: 46px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -143px -126px;
}
.icon-current-time {
  width: 49px;
  height: 49px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -236px -124px;
}
.icon-return {
  width: 0.8rem;
  height: 1.6rem;
  background: url(./assets/icon.png)no-repeat;
  background-position: -43px -128px;
}
.icon-download {
  width: 1.2rem;
  height: 1.2rem;
  background: url(./assets/icon.png)no-repeat;
  background-position: -315px -28px;
}
.icon-qq {
  width: 1.4rem;
  height: 1.4rem;
  background: url(./assets/icon.png)no-repeat;
  background-position: -367px -279px;
}
.icon-remind {
  width: 2.03rem;
  height: 12px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -328px -122px;
}
.icon-refresh {
  width: 1.2rem;
  height: 1.2rem;
  background: url(./assets/icon.png)no-repeat;
  background-position: -263px 28px;
}
.icon-disable-input {
  width: 16px;
  height: 16px;
  background: url(./assets/icon1.png)no-repeat;
  background-position: -253px -128px;
}
.icon-select-input {
  width: 16px;
  height: 16px;
  background: url(./assets/icon1.png)no-repeat;
  background-position: -205px -128px;
  cursor: pointer;
}
.icon-input {
  width: 16px;
  height: 16px;
  background: url(./assets/icon1.png)no-repeat;
  background-position: -149px -128px;
  cursor: pointer;
}
.icon-loading {
  width: 93px;
  height: 71px;
  background: url(./assets/icon.png)no-repeat;
  background-position: -382px -120px;
}
.content {
  height: 100%;
  overflow-y: auto;
  margin-bottom: 5.5rem;
}
.foot {
  position: fixed;
  bottom: 0;
  width: 34.8rem;
  height: 5.5rem;
  background: orangered;
}
</style>
