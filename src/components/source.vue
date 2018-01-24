<template>
  <div>
      <logo-tab :balance.sync="balance" v-on:returnChange="returnChange" :docCheckId="docCheckId"></logo-tab>
      <div class="full-content">
          <div class="btn-box">
            <button class="check-box" @click="DupCheck">实时查重</button>
            <button class="robot-box" v-if="cut">机器人降重</button>
            <button class="robot-box" v-else  @click="robotRouter">降重结果预览</button>
          </div>
          <div class="title-box">
            <span class="xsd-title">您的语句（相似度：<span class="xsd">{{xsd}}%</span>） </span>
            
          </div>
          <div class="original-text">
            {{content}}
          </div>
          <div v-if="showSuggest">
            <div class="title-box">
              <span class="xsd-title">修改建议（相似度：<span class="xsd">{{simAuto}}%</span>） </span>
              
            </div>
            <div class="original-text ysblue">
              {{suggest}}
            </div>
          </div>
          <p class="content-num">
            找到相似内容：{{contentSimilarity}}个
          </p>
          <div class="source-div">

          </div>
      </div>
      <current-cost :panelShow.sync="panelShow" v-if="panelShow" :userId="userId" :wpstoken="wpstoken" v-on:DupChange="DupChange" :docCheckId="docCheckId"></current-cost>
  </div>
</template>
<script>
import logoTab from "@/components/logo/logoTab";
import { StringBuffer, replaceBlank } from "../state/index";
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
      sendId: null,
      contentSimilarity: null,
      content: "",
      xsd: null,
      cut: true,
      suggest: null,
      simAuto: "",
      showSuggest: true,
      panelShow: false
    };
  },
  components: {
    logoTab,
    currentCost
  },
  mounted: function() {
    var pull = (res, sendId, paraHtml) => {
      for (var i = 0; i < res.data.docResult.paraResultList.length; i++) {
        var lastIndex = 0;
        var para = res.data.docResult.paraResultList[i];
        if (para.senResultList.length > 0) {
          for (var j = 0; j < para.senResultList.length; j++) {
            var sen = para.senResultList[j];
            lastIndex = sen.endOffset;
            // console.log(sen.senId+'----'+this.sendId);
            // 添加一个判断 senId  和 router 带过来的是不是一样
            if (sen.senId == sendId) {
              if (sen.simResultList.length > 0) {
                this.content = para.content.substring(
                  sen.startOffset,
                  sen.endOffset
                );
                paraHtml.append('<div class="source-div">');
                paraHtml.append("<ul>");
                for (let si = 0; si < sen.simResultList.length; si++) {
                  this.contentSimilarity = sen.simResultList.length;
                  this.xsd = parseFloat(sen.simDegree * 100).toFixed(2);
                  var sim = sen.simResultList[si];
                  this.suggest = sen.suggest;
                  this.simAuto = parseFloat(sen.simAuto * 100).toFixed(2);
                  paraHtml.append("<li  class='source-box'>");
                  paraHtml.append('<div class="source-01">');
                  paraHtml.append("<span class='num'>" + (si + 1) + "</span>");
                  paraHtml.append("<span class='source-title'>相似度</span>");
                  paraHtml.append(
                    "<span class='colors'>" +
                      (parseFloat(sim.simDegree) * 100).toFixed(2) +
                      "%</span>"
                  );
                  paraHtml.append("</div>");
                  paraHtml.append('<p class="source-02">相似内容片段：</p>');
                  paraHtml.append(
                    '<p class="source-03">' + sim.simSegment + "</p>"
                  );
                  var pageInfo = res.data.docResult.pageWrapMap[sim.pageId];
                  if (pageInfo) {
                    if (pageInfo.source > 0 && pageInfo.source != 3) {
                      paraHtml.append(
                        '<p class="source-04">来源(本地数据库)</p>'
                      );
                      var titles = pageInfo.title.split("|#|");
                      paraHtml.append(
                        '<p class="source-04">篇名：《' + titles[0] + "》</p>"
                      );
                      paraHtml.append(
                        '<p class="source-04">期刊：《' + titles[2] + "》</p>"
                      );
                      paraHtml.append(
                        '<p class="source-04">年份： ' + titles[3] + "</p>"
                      );
                      paraHtml.append(
                        '<p class="source-04">作者： ' + titles[1] + "</p>"
                      );
                    } else {
                      if (pageInfo.source == 3) {
                        paraHtml.append(
                          '<p class="source-04">来源(PaperTime云论文库)</p>'
                        );
                      } else {
                        paraHtml.append(
                          '<p class="source-04">来源(互联网资源)</p>'
                        );
                      }
                      paraHtml.append(
                        '<p class="source-04">标题：' + pageInfo.title + "</p>"
                      );
                      paraHtml.append(
                        '<p class="source-04 source-04-02">链接：'
                      );
                      paraHtml.append(
                        '<a class="source-04-01" href="' +
                          pageInfo.url +
                          '" target="_blank">'
                      );
                      if (pageInfo.url.length > 50) {
                        paraHtml.append(pageInfo.url.substring(0, 50));
                      } else {
                        paraHtml.append(pageInfo.url);
                      }
                      paraHtml.append("</a>");
                      paraHtml.append("</p>");
                    }
                  }
                  paraHtml.append("</li>");
                }
                paraHtml.append("</ul>");
                paraHtml.append("</div>");
                return;
              }
            }
          }
        }
      }
    };
    this.docCheckId = this.$route.query.docId;
    this.sendId = this.$route.query.senId;
    if ((this.$route.query.status = "1")) {
      this.cut = !this.cut;
    }
    this.$http
      .get("http://wpsapi2357.papertime.cn/v1/paper/index.html", {
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
        this.balance = res.data.balance;
        if (
          res.data.reviseStatus == "success" &&
          res.data.status == "success"
        ) {
          this.$http
            .get("http://wpsapi2357.papertime.cn/v1/paper/loadData.html", {
              params: {
                userId: this.userId,
                docCheckId: this.$route.query.docId
              },
              headers: {
                wpstoken: this.wpstoken,
                userId: this.userId
              }
            })
            .then(res => {
              console.log(res);
              var paraHtml = new StringBuffer();
              pull(res, this.sendId, paraHtml);
              $(".source-div").html(paraHtml.toString());
              if (this.suggest == null) {
                this.showSuggest = false;
              } else {
                this.showSuggest = true;
              }
            });
        }
      });
  },
  updated: function() {},
  methods: {
    returnChange(data) {
      console.log(data);
      this.$router.go(-1);
    },
    robotRouter() {
      this.$router.push({
        path: "/robotTxt",
        query: { docId: this.docCheckId }
      });
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
.source-div ul {
  max-height: 47.59rem;
  overflow-y: auto;
}
.source-box {
  min-width: 25.67rem;
  min-height: 11.33rem;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin: 1.25rem 1.67rem 0;
}
.source-01 {
  height: 1.83rem;
  margin: 1rem 0.83rem 0.67rem;
  line-height: 1.83rem;
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
  width: 13rem;
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
.original-text {
  background: #f5f5f5;
  border-radius: 2px;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #f64a4e;
  letter-spacing: 0.28px;
  padding: 0.67rem 0.83rem;
  margin: 1.25rem 0.83rem 0;
}
.content-num {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #696969;
  letter-spacing: 0.28px;
  margin: 1.25rem 0.83rem 0;
}
</style>
