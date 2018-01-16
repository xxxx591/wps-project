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
            <p class="title-box-content">使用实时查重降低相似度~~~~~~</p>
          </div>
          <div class="full-div">
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
              涵盖所有中英文类别，<span class="red">包括哲学、经济学、管理学、</span>法学、社会科学、教育学、文学<span class="yellow">、艺术学、历史学、理学、工学、农学、医学、政治学</span>、军事学等。
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
      wpstoken: null
    };
  },
  components: {
    logoTab
  },
  mounted: function() {
    this.userId = this.$route.query.userid;
    this.docCheckId = this.$route.query.docCheckId;
    this.wpstoken = this.$route.query.wpstoken;
    var that = this;
    this.$http
      .get("api/v1/paper/index.html", {
        params: {
          userId: this.$route.query.userid,
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
.full-p span {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 2.5rem;
  cursor: pointer;
  line-height: 2.5rem;
}
.content-right {
  float: right;
  color: #696969;
  border-bottom: 2px solid #fff;
  letter-spacing: 0.28px;
}
.content-left {
  color: #3b7aca;
  border-bottom: 2px solid #3b7aca;
  letter-spacing: 0.28px;
}
.full-div {
  color: #888888;
  letter-spacing: 0.28px;
}
.red {
  color: #f64a4e;
  cursor: pointer;
}
.yellow {
  color: #f5a623;
  cursor: pointer;
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
</style>
