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
        <form action="api/full/submit.html" method="get" id="form">
          <a href="javascript:;" class="btn btn-cancel" @click="hidePanel">取消</a>
          <a href="javascript:;" class="btn btn-success" @click="submit">确定</a>
        </form>
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
      auto:0
    };
  },
  mounted: function() {
    this.$http
      .get("api/v1/check/full/init.html", {
        params: {
          userId: this.userId,
          title: "xin",
          editorTxt:
            "涵盖所有中英文类别，包括哲学、经济学、管理学、法学、社会科学、教育学、文学、艺术学、历史学、理学、工学、农学、医学、政治学、军事学等。"
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
        }
      });
  },
  props: {
    panelShow: {
      type: Boolean
    },
    userId: {
      type: String
    }
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
      this.$http
        .get("api/v1/check/full/submit.html", {
          data: {
            userId:this.userId,
            auto:this.auto
          }
        })
        .then(function(res) {
          console.log(res);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cost-box {
  width: 785px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -362.5px;
  margin-top: -250px;
  background: #fff;
  color: #888;
}
.cost-box h3 {
  text-align: center;
  font-size: 20px;
  padding: 19px 0;
  border-bottom: 1px solid #888;
  margin: 0 20px;
  font-weight: 500;
}
.cost-content {
  width: 308px;
  height: 300px;
  margin: 0 auto;
}
.balance {
  margin: 50px 0 40px;
  font-size: 14px;
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
  font-size: 14px;
  margin-bottom: 40px;
  letter-spacing: 0.5px;
}
.remind-content {
  font-size: 14px;
  margin-bottom: 65px;
}
.boder-solid {
  margin: 0 20px;
  border-bottom: 1px solid #888;
}
.green-content {
  color: #03802c;
  margin: 0 20px;
}
.btn-box {
  text-align: right;
  margin: 0 20px;
}
.btn-box .btn {
  text-align: center;
  display: inline-block;
  width: 148px;
  height: 36px;
  border-radius: 4px;
  line-height: 36px;
  font-size: 20px;
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
  margin-left: 10px;
}
</style>
