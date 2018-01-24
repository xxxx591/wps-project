<template>
  <div>
    <div class="cost-box">
      <h3>该服务由PaperTime提供</h3>
      <div class="cost-content">
        <p class="balance">
          <span class="left-content">余额 {{balance}}字</span>
          <span class="right-content">全文字数 {{allNumberWords}}字</span>
        </p>
        <div class="cost-list">
          <ul>
            <li><i class="icon icon-disable-input"></i>全文查重<span class="right-content red-content">{{allNumberWords}}<span style="color:#888;">字</span></span></li>
            <li><i class="icon icon-disable-input"></i>在线改重+实时查重<span class="right-content red-content">0<span style="color:#888;">字</span></span></li>
            <li><i class="icon" @click="change" :class="select"></i>机器人降重<span class="right-content red-content">{{robotWords}}<span style="color:#888;">字</span></span></li>
          </ul>
        </div>
        <p class="remind-content" v-if="showBalance"><i class="icon icon-remind"></i> 此次提交扣费<span class="red-content">{{allNumberWords+robotWords}}</span>字，您的余额<span class="red-content">{{balance}}</span>字。</p>
          <p class="remind-content" v-else><i class="icon icon-remind"></i> 您的余额不足，请充值</p>
      </div>
      <div class="boder-solid"></div>
      <p class="green-content">(温馨提示:在线改重+实时查重是根据使用时修改的句子扣费）</p>
      <div class="btn-box">
        <a href="javascript:;" class="btn btn-cancel" @click="hidePanel">取消</a>
        <a href="javascript:;" class="btn btn-success" @click="submit" v-if="showBalance">确定</a>
        <a href="javascript:;" class="btn btn-success" v-else>充值</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstCost",
  data() {
    return {
      msg: "第一次全文查重",
      balance: null,
      allNumberWords: null,
      robotWords: null,
      select: "icon-select-input",
      show: true,
      auto: 1,
      showBalance: true,
      wpstoken: null,
      userId: null
    };
  },
  beforeMount: function() {
    this.userId = this.$route.query.userId;
    this.wpstoken = this.$route.query.wpstoken;
    console.log(this.wpstoken);
  },
  mounted: function() {
    this.$http
      .get("http://wpsapi2357.papertime.cn/v1/check/full/init.html", {
        params: {
          userId: this.userId,
          title: "让网络成为一种内在的道德享用",
          editorTxt: "网 "
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.status == "fail") {
          this.msg = "论文内容为空, 不能全文查重";
          this.show = false;
        } else if (res.data.status == "success") {
          this.balance = res.data.balance;
          this.allNumberWords = res.data.wordCount;
          this.robotWords = res.data.wordCount;
        }
      });
  },
  methods: {
    change() {
      if (this.select == "icon-select-input") {
        this.select = "icon-input";
        this.robotWords = 0;
        this.auto = 0;
      } else {
        this.select = "icon-select-input";
        this.robotWords = this.allNumberWords;
        this.auto = 1;
      }
    },
    hidePanel() {
      window.ksoJsAsynCall("closeNavigate", function(res) {
        console.log(res);
      });
    },
    submit() {
      if (this.balance > this.allNumberWords + this.robotWords) {
        this.$http
          .get("http://wpsapi2357.papertime.cn/v1/check/full/submit.html", {
            params: {
              userId: this.userId,
              auto: this.auto
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.status == "success") {
              window.ksoJsAsynCall(
                "notifyToWidget",
                {
                  docId: res.data.docCheckId
                },
                function(res) {
                  console.log(res);
                }
              ); // 触发回调函数
              window.ksoJsAsynCall("closeNavigate", function(res) {
                console.log(res);
              });
            }
          });
      } else {
        this.showBalance = !this.showBalance;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
