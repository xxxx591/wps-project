<template>
  <div>
      <logo-tab :balance.sync="balance" v-on:returnChange="returnChange"></logo-tab>
      <div class="full-content">
        <div class="btn-box">
          <button class="check-box">实时查重</button>
          <button class="robot-box">机器人降重</button>
        </div>
          <p class="full-p">
              <span class="content-left">全文标红</span>
              <span class="content-right">相似片段</span>
          </p>
          <div class="title-box">
            <span class="xsd-title">相似度 <span class="xsd">&nbsp;95%</span></span>
            <p class="title-box-content">绿色文字表示机器人修改</p>
          </div>
          <div class="fragment-div">
              <ul>
                <li class="fragment-box">
                  <div class="fragment-01">
                    <span class="num">1</span>
                    <span class="fragment-title">相似度：<span class="red">22%</span></span>
                    <button class="fragment-btn">降重</button>
                    </div>
                    <p class="fragment-02">相似内容片断：</p>
                    <div class="fragment-03">
...在选择《九型人格管理学》作为通选课之前，<span class="red">我对这门课也有耳闻，限于对此课程的一些的表面内容，比如它把人分为九</span>个类型、与管理有关等。仅是这些也引起我的兴趣去选择《九型人格管理学》…
                    </div>
                </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
import logoTab from "@/components/logo/logoTab";
export default {
  name: "fullTxt",
  data() {
    return {
      msg: "全文标红区",
      userId: null,
      docCheckId: null,
      balance: null,
      wpstoken: null,
      sendId: null
    };
  },
  components: {
    logoTab
  },
  mounted: function() {
    var store = window.sessionStorage;
    this.userId = store.userId;
    this.wpstoken = store.wpstoken;
    this.docCheckId = this.$route.query.docId;
    this.sendId = this.$route.query.senId;
    var that = this;
    this.$http
      .get("api/v1/paper/index.html", {
        params: {
          userId: this.userId,
          docCheckId: this.$route.query.docCheckId
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        console.log(res);
        this.balance = res.data.balance;
      });
  },
  updated: function() {},
  methods: {
    returnChange(data) {
      console.log(data);
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.full-p {
  margin: 0 0.83rem 0.83rem;
}
.full-p span {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 2.5rem;
  cursor: pointer;
  line-height: 2.5rem;
}
.btn-box {
  margin: 0 0.83rem 0.83rem;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  letter-spacing: 0.28px;
}
.btn-box button {
  background: #3b7aca;
  border-radius: 4px;
  width: 13.33rem;
  height: 2.5rem;
  color: #fff;
  cursor: pointer;
}
.btn-box button:hover {
  background: #548ed7;
}
.btn-box button:active {
  background: #2e69b3;
}
.check-box {
  margin-right: 0.67rem;
}
.robot-box {
  float: right;
}
.red {
  color: #f64a4e;
  cursor: pointer;
}
.content-right {
  float: right;
  color: #3b7aca;
  border-bottom: 2px solid #3b7aca;
  letter-spacing: 0.28px;
}
.content-left {
  color: #696969;
  border-bottom: 2px solid #fff;
  letter-spacing: 0.28px;
}
.full-div {
  color: #888888;
  letter-spacing: 0.28px;
}
.title-box {
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0 0.83rem 0.83rem;
}
.xsd {
  letter-spacing: 0.28px;
  color: #f64a4e;
}
.xsd-title {
  color: #222226;
  letter-spacing: 0.28px;
}
.title-box-content {
  color: #fc750c;
  letter-spacing: 0.28px;
  background: #fff5e3;
  border-radius: 2px;
  text-indent: 1.23rem;
  display: inline-block;
  width: 21.15rem;
}
.fragment-box {
  min-width: 25.67rem;
  height: 11.33rem;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin: 1.25rem 1.67rem 0;
}
.fragment-01 {
  height: 1.83rem;
  margin: 0.83rem 0.67rem 0.33rem 0.83rem;
  line-height: 1.83rem;
}
.num {
  display: inline-block;
  background: #dbdbdb;
  border-radius: 2px;
  height: 1.33rem;
  width: 1.33rem;
  text-align: center;
  line-height: 1.33rem;
}
.fragment-title {
  display: inline-block;
  height: 1.33rem;
  line-height: 1.33rem;
}
.fragment-btn {
  background: #3b7aca;
  border-radius: 2px;
  width: 5.83rem;
  height: 1.83rem;
  line-height: 1.83rem;
  color: #fff;
  letter-spacing: 0.28px;
  float: right;
  cursor: pointer;
}
.fragment-02 {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #222226;
  letter-spacing: 0.28px;
  height: 1.33rem;
  line-height: 1.33rem;
  margin: 0 0 0.42rem 0.67rem;
}
.fragment-03 {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #888888;
  letter-spacing: 0.28px;
  margin: 0 0.67rem 1.25rem;
}
</style>
