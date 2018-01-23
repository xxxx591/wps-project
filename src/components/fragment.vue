<template>
  <div>
      <logo-tab :balance.sync="balance" v-on:returnChange="returnChange"></logo-tab>
      <div class="full-content">
        <div class="btn-box">
          <button class="check-box" @click="DupCheck">实时查重</button>
          <button class="robot-box" v-if="cut">机器人降重</button>
          <button class="robot-box" v-else  @click="robotRouter">降重结果预览</button>
        </div>
          <p class="full-p">
              <span class="content-left" @click="allPaper">全文标红</span>
              <span class="content-right">相似片段</span>
          </p>
          <div class="title-box">
            <span class="xsd-title">总相似度 <span class="xsd">&nbsp;{{this.$route.query.xsd}}%</span></span>
            <p class="title-box-content">使用机器人降重降低相似度~~~~~~</p>
          </div>
          <div class="fragment-div">
              <ul>
                <li class="fragment-box" v-for="(list,index) in listItem" :key="list.index">
                  <div class="fragment-01">
                    <span class="num">{{index+1}}</span>
                    <span class="fragment-title">相似度：<span class="colors">{{list.simDegree}}%</span></span>
                    <button class="fragment-btn" @click="routeSource(list.senId)">相似来源</button>
                    </div>
                    <p class="fragment-02">相似内容片段：</p>
                    <div class="fragment-03">
                      ...<span class="colors">{{list.segment}}</span>...
                    </div>
                </li>
              </ul>
              <p class="paging">
                <span class="prev" @click="prev">上一页</span>
                <span class="page-box">

                </span>
                <span class="next" @click="next">下一页</span>
              </p>
          </div>
      </div>
      <current-cost :panelShow.sync="panelShow" v-if="panelShow" :userId="userId" :wpstoken="wpstoken" v-on:DupChange="DupChange" :docCheckId="docCheckId"></current-cost>
  </div>
</template>
<script>
import logoTab from "@/components/logo/logoTab";
import currentCost from "@/components/pop/currentcost";
export default {
  name: "fullTxt",
  data() {
    return {
      msg: "全文标红区",
      userId: this.GLOBAL.userId,
      wpstoken: this.GLOBAL.wpstoken,
      balance: null,
      sendId: null,
      listItem: [],
      pageSize: 10,
      pageNow: 1,
      pageAll: null,
      docCheckId: null,
      n: 0,
      s: 0,
      cut: true,
      panelShow: false
    };
  },
  components: {
    logoTab,
    currentCost
  },
  mounted: function() {
    this.docCheckId = this.$route.query.docCheckId;
    this.balance = this.$route.query.balance;
    this.sendId = this.$route.query.senId;
    if (this.$route.query.status == "1") {
      this.cut = !this.cut;
    }
    this.$http
      .get("http://wpsapi2357.papertime.cn/v1/paper/loadSegment.html", {
        params: {
          docCheckId: this.docCheckId,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        var sen = res.data.segment;
        console.log(res);
        for (let i = 0; i < sen.length; i++) {
          this.listItem.push({
            segment: sen[i].segment,
            simDegree: parseFloat(sen[i].simDegree * 100).toFixed(2),
            simAuto: parseFloat(sen[i].simAuto * 100).toFixed(2),
            senId: sen[i].senId
          });
        }
        this.pageAll = parseInt(res.data.page.totalRow / 10 + 1);
        if (this.pageNow > 3) {
          if (this.pageNow + 2 >= this.pageAll) {
            this.n = this.pageNow - 2;
          } else {
            this.n = this.pageAll - 4;
            this.n = this.n > 0 ? this.n : 1;
          }
        }
        for (let n = 0; n < this.pageAll; n++) {
          $(".page-box").append('<i class="page-num">' + (n + 1) + "</i>");
        }
        $(".page-num")
          .eq(this.n)
          .addClass("page-select")
          .siblings(".page-num")
          .removeClass("page-select");
      });
  },
  updated: function() {},
  methods: {
    returnChange(data) {
      console.log("返回到检测列表");
      this.$router.push({ path: "/viewReport" });
    },
    allPaper() {
      this.$router.push({
        path: "/fullTxt",
        query: { docCheckId: this.docCheckId }
      });
    },
    next() {
      if (this.pageNow < this.pageAll) {
        this.pageNow += 1;
        this.$http
          .get("http://wpsapi2357.papertime.cn/v1/paper/loadSegment.html", {
            params: {
              docCheckId: this.docCheckId,
              pageNow: this.pageNow,
              pageSize: this.pageSize
            },
            headers: {
              wpstoken: this.wpstoken,
              userId: this.userId
            }
          })
          .then(res => {
            this.listItem = [];
            $(".page-box")
              .children()
              .remove();
            var sen = res.data.segment;
            for (let i = 0; i < sen.length; i++) {
              this.listItem.push({
                segment: sen[i].segment,
                simDegree: parseFloat(sen[i].simDegree * 100).toFixed(2),
                simAuto: parseFloat(sen[i].simAuto * 100).toFixed(2),
                senId: sen[i].senId
              });
            }
            this.pageAll = parseInt(res.data.page.totalRow / 10 + 1);
            this.n += 1;
            for (let j = this.n; j < this.pageAll; j++) {
              $(".page-box").append('<i class="page-num">' + (j + 1) + "</i>");
            }
            // c ：当前页码 ，t：总页数 s：第一页码
            if (this.pageNow > 3) {
              if (this.pageNow + 2 <= this.pageAll) {
                this.s = this.pageNow - 2;
              } else {
                this.s = this.pageAll - 4;
                this.s = this.s > 0 ? this.s : 1;
              }
            }
            $(".page-num")
              .eq(this.s)
              .addClass("page-select");
          });
      }
    },
    prev() {
      if (this.pageNow == 1) {
        return;
      } else {
        this.pageNow -= 1;
        this.$http
          .get("http://wpsapi2357.papertime.cn/v1/paper/loadSegment.html", {
            params: {
              docCheckId: this.docCheckId,
              pageNow: this.pageNow,
              pageSize: this.pageSize
            },
            headers: {
              wpstoken: this.wpstoken,
              userId: this.userId
            }
          })
          .then(res => {
            this.listItem = [];
            $(".page-box")
              .children()
              .remove();
            var sen = res.data.segment;
            for (let i = 0; i < sen.length; i++) {
              this.listItem.push({
                segment: sen[i].segment,
                simDegree: parseFloat(sen[i].simDegree * 100).toFixed(2),
                simAuto: parseFloat(sen[i].simAuto * 100).toFixed(2),
                senId: sen[i].senId
              });
            }
            this.pageAll = parseInt(res.data.page.totalRow / 10 + 1);
            this.n -= 1;
            for (let j = this.n; j < this.pageAll; j++) {
              $(".page-box").append('<i class="page-num">' + (j + 1) + "</i>");
            }
            // c ：当前页码 ，t：总页数 s：第一页码
            if (this.pageNow > 3) {
              if (this.pageNow + 2 <= this.pageAll) {
                this.s = this.pageNow - 2;
              } else {
                this.s = this.pageAll - 4;
                this.s = this.s > 0 ? this.s : 1;
              }
            }
            $(".page-num")
              .eq(this.s)
              .addClass("page-select");
          });
      }
    },
    routeSource(data) {
      this.$router.push({
        path: "/source",
        query: {
          senId: data,
          docId: this.$route.query.docCheckId,
          status: this.$route.query.status
        }
      });
    },
    robotRouter() {
      this.$router.push({
        path: "/robotTxt",
        query: { docId: this.docCheckId }
      });
    },
    DupCheck() {
      this.panelShow = !this.panelShow;
      console.log(this.panelShow);
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
.btn-box button:disabled {
  background: rgba(59, 122, 202, 0.4);
  color: #ffffff;
}
.fragment-btn:active {
  background: #2e69b3;
}
.fragment-btn:hover {
  background: #548ed7;
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
.fragment-div {
  max-height: 45.32rem;
  overflow-y: auto;
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
  width: 18.65rem;
}
.fragment-box {
  min-width: 25.67rem;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin: 1.25rem 1.67rem 0;
}
.fragment-box:last-of-type {
  margin-bottom: 2.58rem;
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
.paging {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #696969;
  letter-spacing: 0.28px;
  text-align: center;
  line-height: 1.33rem;
}
.paging span {
  height: 1.33rem;
  line-height: 1.33rem;
  display: inline-block;
  cursor: pointer;
}
.page-box {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 6rem;
}
</style>
