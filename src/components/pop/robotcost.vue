<template v-show="panelShow02">
  <div>
    <div class="cost-box">
      <h3>该服务由PaperTime提供</h3>
      <div class="cost-content">
        <div class="content-list-box" v-if="show">
          <p class="balance">
            <span class="left-content">机器人降重</span>
          </p>
          <div class="cost-list">
            <ul>
              <li>您当前标红字数<span class="right-content red-content">{{markRed}}<span style="color:#888;">字</span></span></li>
              <li>需扣除字数<span class="right-content red-content">{{markRed*4}}<span style="color:#888;">字</span></span></li>
              <li>剩余字数<span class="right-content red-content">{{balance - (markRed*4)}}<span style="color:#888;">字</span></span></li>
            </ul>
          </div>
          <p class="remind-content" v-if="showBalance"><i class="icon icon-remind"></i> 此次提交扣费<span class="red-content">{{markRed*4}}</span>字，您的余额<span class="red-content">{{balance}}</span>字。</p>
          <p class="remind-content" v-else><i class="icon icon-remind"></i> 您的余额不足，请充值</p>
        </div>
        <p class="img-box" v-else>
            <img src="../../assets/loading.gif" alt="" srcset="">
        </p>
      </div>
      <div class="boder-solid"></div>
      <p class="green-content"> 机器人降重<span class="red-content">计费标准</span>：1. 全文查重前付费按照全文字数*1计费 2. 全文查重后付费按照标红字数*4计费</p>
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
  name: "RobotCost",
  data() {
    return {
      msg: "机器人降重",
      balance: 10000,
      markRed: 3600,
      takeOut: 3600,
      status:'',
      show:true,
      showBalance:true
    };
  },
  props: {
    panelShow02: {
      type: Boolean
    },
    userId: {
      type: String
    },
    wpstoken: {
      type: String
    },
    docCheckId: {
      type: String
    }
  },
  methods: {
    hidePanel() {
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 panelShow 变量
      this.$emit("update:panelShow02", false);
    },
    submit() {
      if (
          this.balance - this.markRed * 4 >= 0 &&
          this.status == "success"
        ) {
          this.show = false;
          this.$http
            .get("http://wpsapi2357.papertime.cn/v1/check/auto/submit.html", {
              params: {
                userId: this.userId,
                docCheckId: this.docCheckId
              },
              headers: {
                wpstoken: this.wpstoken,
                userId: this.userId
              },
              timeout: 60000
            })
            .then(res => {
              this.$emit("submitChange", res.data.status);
            });
        } else{
          this.showBalance = !this.showBalance;
        }
    }
  },
  mounted: function() {
    console.log(this.docCheckId);
    this.$http
      .get("http://wpsapi2357.papertime.cn/v1/check/auto/init.html", {
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
        this.balance = res.data.balance;
        this.markRed = res.data.jqjcWordCount;
        this.status = res.data.status;
      });
  }
};
</script>
<style scoped>
.img-box{
  text-align: center;
}
</style>
