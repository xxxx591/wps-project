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
      showBalance:true,
    };
  },
  props: {
    panelShow: {
      type: Boolean
    },
    userId: {
      type: String
    },
    wpstoken: {
      type: String
    }
  },
  mounted: function() {
    var store = window.sessionStorage;
    this.userId = store.userId;
    this.wpstoken = store.wpstoken;
    this.$http
      .get("api/v1/check/full/init.html", {
        params: {
          userId: this.userId,
          title: "让网络成为一种内在的道德享用",
          editorTxt:
            "摘要:随着网络的迅速发展,互联网在人们的生活中成为了必需品。所以,如何学校应该从各方面培育大学生网络道德。 新媒体丰富了人们的信息资源,扩秩序出现失衡,而网络道德尚未完全形成,各种网络道德失范现象引起了社会的高度关注,网络道德建设的重要性日益凸显。网络在给大学生带来便利的同时,。 "
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
      if (this.balance > this.allNumberWords + this.robotWords) {
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
          .then(res => {
            console.log(res);
            if (res.data.status == "success") {
              this.$emit("submitChange", res.data.docCheckId);
            }
          });
      }else{
        this.showBalance = !this.showBalance;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
