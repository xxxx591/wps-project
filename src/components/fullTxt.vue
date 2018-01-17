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
              <span class="content-right" @click="routerTo">相似片段</span>
          </p>
          <div class="title-box">
            <span class="xsd-title">相似度 <span class="xsd">&nbsp;{{xsd}}%</span></span>
            <p class="title-box-content">使用实时查重降低相似度~~~~~~</p>
          </div>
          <div class="paper-content-box">
          </div>
      </div>
  </div>
</template>
<script>
function StringBuffer() {
  this.__strings__ = new Array();
}
StringBuffer.prototype.append = function(str) {
  this.__strings__.push(str);
  return this; //方便链式操作
};
StringBuffer.prototype.toString = function() {
  return this.__strings__.join("");
};
function replaceBlank(content) {
  var result = new StringBuffer();
  for (var i = 0; i < content.length; i++) {
    var d = content.charAt(i);
    var patt1 = new RegExp(/\s+/g);
    if (patt1.test(d)) {
      result.append("&nbsp;");
    } else {
      result.append(d);
    }
  }
  return result.toString();
}
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
      xsd: null
    };
  },
  components: {
    logoTab
  },
  mounted: function() {
    var store = window.sessionStorage;
    this.userId = store.userId;
    this.wpstoken = store.wpstoken;
    this.docCheckId = this.$route.query.docCheckId;
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
        this.balance = res.data.balance;
        if (
          res.data.reviseStatus == "success" &&
          res.data.status == "success"
        ) {
          this.$http
            .get("api/v1/paper/loadData.html", {
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
              this.xsd = Number(
                (res.data.docResult.copyChar /
                  res.data.docResult.checkChar *
                  100
                )
                  .toString()
                  .match(/^\d+(?:\.\d{0,2})?/)
              );
              var paraHtml = new StringBuffer();
              for (
                var i = 0;
                i < res.data.docResult.paraResultList.length;
                i++
              ) {
                paraHtml.append("<div class='full-div'>");
                var lastIndex = 0;
                var para = res.data.docResult.paraResultList[i];
                if (para.senResultList.length > 0) {
                  for (var j = 0; j < para.senResultList.length; j++) {
                    var sen = para.senResultList[j];
                    paraHtml.append(
                      replaceBlank(
                        para.content.substring(lastIndex, sen.startOffset)
                      )
                    );
                    var ahClass = "";
                    if (parseFloat(sen.simDegree) >= 0.5) {
                      if (parseFloat(sen.simDegree) >= 0.8) {
                        ahClass = "red";
                      } else {
                        ahClass = "yellow";
                      }
                    }
                    paraHtml.append(
                      '<a href="/#/fragment?senId=' +
                        sen.senId +
                        "&docId=" +
                        res.data.docResult.docCheckId +
                        '" class="' +
                        ahClass +
                        '">'
                    );
                    paraHtml.append(
                      replaceBlank(
                        para.content.substring(sen.startOffset, sen.endOffset)
                      )
                    );
                    paraHtml.append("</a>");
                    lastIndex = sen.endOffset;
                  }
                  paraHtml.append(
                    replaceBlank(
                      para.content.substring(lastIndex, para.content.length)
                    )
                  );
                } else {
                  paraHtml.append(replaceBlank(para.content));
                }
                paraHtml.append("</div>");
              }
              $(".paper-content-box").html(paraHtml.toString());
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
    routerTo() {
      this.$router.push({ path: "/source", query: { docId: this.docCheckId } });
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
  width: 19.7rem;
}
</style>
