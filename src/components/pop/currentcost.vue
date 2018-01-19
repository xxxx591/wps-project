<template v-show="panelShow">
  <div>
    <div class="cost-box">
      <h3>该服务由PaperTime提供</h3>
      <div class="cost-content" v-if="show">
        <p class="balance">
          <span class="left-content"> 检测需扣除您的余额字数，是否继续？</span>
        </p>
        <div class="cost-list">
          <ul>
            <li>当前修改句子的字数<span class="right-content red-content">{{wordCount}}<span style="color:#888;">字</span></span></li>
            <li>需扣除字数<span class="right-content red-content">{{wordCount}}<span style="color:#888;">字</span></span></li>
            <li>余额字数<span class="right-content red-content">{{balance}}<span style="color:#888;">字</span></span></li>
          </ul>
        </div>
        <p class="remind-content"><i class="icon icon-remind"></i> 此次提交扣费<span class="red-content">{{wordCount}}</span>字，您的余额<span class="red-content">{{balance}}</span>字。</p>
      </div>
      <p class="img-box" v-else>
            <img src="../../assets/loading.gif" alt="" srcset="">
        </p>
      <div class="boder-solid"></div>
      <p class="green-content"> 实时查重<span class="red-content">计费标准</span>：根据当前修改的句子（标记成蓝色）的字数计费.</p>
      <div class="btn-box">
        <a href="javascript:;" class="btn btn-cancel" @click="hidePanel">取消</a>
        <a href="javascript:;" class="btn btn-success" @click="submit">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentCost",
  data() {
    return {
      msg: "在线改重",
      balance: '',
      atPresent: '',
      takeOut: '',
      wordCount: '',
      reviseId: "",
      status: "",
      show: true
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
    },
    docCheckId: {
      type: String
    }
  },
  mounted: function() {
    this.$http
      .get("api/v1/check/real/init.html", {
        params: {
          userId: this.userId,
          docCheckId: this.docCheckId,
          editorTxt:
            "随着网络的迅速发展,互联网在人们的生活中必需品。所以,如何学校cscscs应该从各方面培育大学生测试测试测试网络道德。 新媒体丰富了人们的信息资源,扩秩序出现,而网络道德尚未完全形成,各种网络道德失范现象引起了社会的高度关注,网络道德建设的重要性日益凸显。网络在给大学生带来便利的同时,。"
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        console.log(res);
        this.wordCount = res.data.wordCount;
        this.balance = res.data.balance;
        this.status = res.data.status;
        this.reviseId = res.data.reviseId;
      });
  },
  methods: {
    hidePanel() {
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 panelShow 变量
      this.$emit("update:panelShow", false);
    },
    submit() {
      if (this.status == "success") {
        this.show = false;
        this.$http
          .get("api/v1/check/real/submit.html", {
            params: {
              userId: this.userId,
              docCheckId: this.docCheckId,
              reviseId: this.reviseId
            },
            headers: {
              wpstoken: this.wpstoken,
              userId: this.userId
            },
            timeout: 60000
          })
          .then(res => {
            console.log(res);
            this.$emit("DupChange", res.data.status);
          });
      }
    }
  }
};
</script>
<style scoped>
.img-box{
  text-align: center;
}
</style>
