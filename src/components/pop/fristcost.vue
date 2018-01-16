<template v-show="panelShow">
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
        <p class="remind-content" v-if="show"><i class="icon icon-remind"></i> 此次提交扣费<span class="red-content">{{allNumberWords+robotWords}}</span>字，您的余额<span class="red-content">{{balance}}</span>字。</p>
        <p class="remind-content" v-else><i class="icon icon-remind"></i> <span class="red-content">{{msg}}</span></p>
      </div>
      <div class="boder-solid"></div>
      <p class="green-content">(温馨提示:在线改重+实时查重是根据使用时修改的句子扣费）</p>
      <div class="btn-box">
        <a href="javascript:;" class="btn btn-cancel" @click="hidePanel">取消</a>
        <a href="javascript:;" class="btn btn-success" @click="submit">确定</a>
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
      auto: 1
    };
  },
  props: {
    panelShow: {
      type: Boolean
    },
    userId: {
      type: Number
    },
    wpstoken: {
      type: String
    }
  },
  mounted: function() {
    this.$http
      .get("api/v1/check/full/init.html", {
        params: {
          userId: this.userId,
          title: "xin",
          editorTxt:
            "涵盖所有中英文类别，包括哲学、经济学、管理学、法学、社会科学、教育学、文学、艺术学、历史学、理学、工学、农学、医学、政治学、军事学等。"
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        console.log(res);
        console.log(this.wpstoken);
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
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 panelShow 变量
      this.$emit("update:panelShow", false);
    },
    submit() {
      var that = this;
      this.$http
        .get("api/v1/check/full/submit.html", {
          params: {
            userId: this.userId,
            auto: this.auto
          },
          headers: {
            wpstoken: this.wpstoken,
            userId: this.userId
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.status == "success") {
            that.$emit("submitChange", res.data.docCheckId);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cost-box {
  width: 78.33rem;
  height: 48.33rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -39.165rem;
  margin-top: -24.165rem;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  color: #888888;
  letter-spacing: 0.42px;
  font-family: MicrosoftYaHei;
}
.cost-box h3 {
  text-align: center;
  font-size: 1.67rem;
  padding: 1.58rem 0;
  border-bottom: 1px solid #888;
  margin: 0 1.67rem;
  font-weight: 500;
}
.cost-content {
  width: 25.6rem;
  height: 25rem;
  margin: 0 auto;
}
.balance {
  margin: 4.17rem 0 3.33rem;
  font-size: 1.16rem;
}
.right-content {
  float: right;
}
.red-content {
  color: red;
}
.balance::after {
  clear: both;
}
.cost-list ul li {
  font-size: 1.16rem;
  margin-bottom: 3.33rem;
  letter-spacing: 0.28px;
}
.remind-content {
  font-size: 1.16rem;
  margin-bottom: 5.42rem;
}
.boder-solid {
  margin: 0 1.67rem;
  border-bottom: 1px solid #888;
}
.green-content {
  color: #03802c;
  margin: 0 1.67rem;
}
.btn-box {
  text-align: right;
  margin: 0 1.67rem;
}
.btn-box .btn {
  text-align: center;
  display: inline-block;
  width: 12.33rem;
  height: 3rem;
  border-radius: 0.3rem;
  line-height: 3rem;
  font-size: 1.67rem;
}
.btn-box .btn-cancel {
  border: 1px solid #888;
  background: #fff;
  color: #888;
}
.btn-box .btn-success {
  background: #03802c;
  border: 1px solid #03802c;
  color: #fff;
  margin-left: 0.83rem;
}
</style>
