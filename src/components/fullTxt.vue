<template>
  <div>
      <logo-tab :balance.sync="balance" v-on:returnChange="returnChange"></logo-tab>
      <div class="full-content">
          <p class="full-p">
              <span>总相似度</span>
              <span class="content-right">机器人降重</span>
          </p>
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
      balance: null
    };
  },
  components: {
    logoTab
  },
  mounted: function() {
    this.userId = this.$route.query.userid;
    this.docCheckId = this.$route.query.docCheckId;
    var that = this;
    this.$http
      .get("api/v1/paper/index.html", {
        params: {
          userId: this.$route.query.userid,
          docCheckId: this.$route.query.docCheckId
        }
      })
      .then(function(res) {
        that.balance = res.data.balance;
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
  padding: 0 .5rem;
}
.full-p span {
  display: inline-block;
  height: 1.4rem;
  margin: 1.1rem 0 1.4rem 0;
}
.content-right {
  float: right;
  background: #f1f1f2;
}
.full-div {
  font-size: 1.2rem;
  line-height: 1.8rem;
  text-indent: 2.4rem;
}
.red {
  color: red;
  cursor: pointer;
}
.yellow {
  color: #fcb903;
  cursor: pointer;
}
</style>
