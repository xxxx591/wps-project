<template>
  <div>
      <logo-tab :balance.sync="balance" v-on:returnChange="returnChange"></logo-tab>
      <div class="full-content">
        <div class="btn-box">
          <button class="check-box" @click="DupCheck">实时查重</button>
          <button class="robot-box">降重结果预览</button>
        </div>
          <div class="title-box">
            <span class="xsd-title">降重后相似度 <span class="xsd">&nbsp;{{xsd}}%</span></span>
            <p class="title-box-content">绿色文字表示机器人修改</p>
          </div>
          <div class="full-div">
              
          </div>
          <current-cost :panelShow.sync="panelShow" v-if="panelShow" :userId="userId" :wpstoken="wpstoken" v-on:DupChange="DupChange" :docCheckId="docCheckId"></current-cost>
      </div>
  </div>
</template>
<script>
import logoTab from "@/components/logo/logoTab";
import robotCost from "@/components/pop/robotcost";
import currentCost from "@/components/pop/currentcost";
export default {
  name: "fullTxt",
  data() {
    return {
      msg: "全文标红区",
      userId: this.GLOBAL.userId,
      wpstoken: this.GLOBAL.wpstoken,
      balance: null,
      docCheckId: null,
      panelShow: false,
      xsd: null
    };
  },
  components: {
    logoTab,
    robotCost,
    currentCost
  },
  mounted: function() {
    this.docCheckId = this.$route.query.docId;
    this.balance = this.$route.query.balance;
    var that = this;
    this.$http
      .get("http://wpsapi2357.papertime.cn/v1/paper/autoPreview.html", {
        params: {
          userId: this.userId,
          docCheckId: this.docCheckId
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        console.log(res);
        this.xsd = (
          parseFloat(res.data.copyChar / res.data.checkChar) * 100
        ).toFixed(2);
        $(".full-div").html(res.data.preview);
      });
  },
  updated: function() {},
  methods: {
    returnChange(data) {
      console.log(data);
      this.$router.go(-1);
    },
    DupCheck() {
      this.panelShow = !this.panelShow;
    },
    DupChange(data) {
      this.panelShow = !this.panelShow;
      this.$router.push({
        path: "/fullTxt",
        query: { docCheckId: this.docCheckId }
      });
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
  width: 16.65rem;
}
</style>
