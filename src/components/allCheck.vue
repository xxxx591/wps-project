<template>
  <div class="index">
    <div class="index-content">
      <h5>该服务由PaperTime提供一站式查重，改重，降重。</h5>
    </div>
    <div class="content-list">
      <ul>
        <li v-for="item in iconList" :key="item.id">
          <div class="list-icon" :class="item.class"></div>
          <div class="right-content">
            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="btn" @click="showbox">
        开始全文查重
      </div>
      <p class="remind-title"><i class="icon icon-remind"></i>对于新用户，系统赠送10000字免费体验。</p>
      <router-link to="/" class="history">历史记录</router-link>
    </div>
    <frist-cost :panelShow.sync="panelShow" v-if="panelShow" :userId="userId" v-on:submitChange="submitChange"></frist-cost>
  </div>
</template>

<script>
import logo from "@/components/logo/logo";
import fristCost from "@/components/pop/fristcost";
export default {
  name: "HelloWorld",
  data() {
    return {
      iconList: [
        {
          class: "icon-check",
          title: "全文查重",
          content: "在完成论文初稿后，提交全文查重3~10分_钟即可出一个查重报告。"
        },
        {
          class: "icon-robot",
          title: " 机器人降重",
          content: "对于重复率高的句子，机器人给出修改建议 可以一键替换原文，省心，省力，高效。"
        },
        {
          class: "icon-current-time",
          title: "在线改重+实时查重",
          content: "边修改边检测，哪里相似，修改哪里，通过 哪里，每次实时查重只对当前修改的句子计费。"
        }
      ],
      panelShow: false,
      userId: ""
    };
  },
  mounted: function() {
    this.userId = this.$route.query.userid;
  },
  components: {
    logo,
    fristCost
  },
  methods: {
    showbox() {
      this.panelShow = true;
      console.log(this.userId);
    },
    submitChange(data) {
      this.$router.push({
        path: "/loading",
        query: { userid: this.userId, docCheckId: data }
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-content h5 {
  background: #fff5e3;
  border-radius: 2px;
  margin: 0 0.83rem;
  font-family: MicrosoftYaHei;
  color: #fc750c;
  letter-spacing: 0.28px;
  text-align: center;
  font-weight: 400;
  margin-bottom: 4.17rem;
  padding: 0.58rem 0;
}
.content-list ul li {
  height: 6rem;
  margin-bottom: 2.9rem;
  color: #888;
}
.content-list ul li .list-icon {
  display: inline-block;
}
.right-content {
  float: right;
  width: calc(100% - 80px);
}
.right-content h3 {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222226;
  letter-spacing: -0.39px;
  margin-bottom: 0.42rem;
}
.right-content p {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #888888;
  letter-spacing: -0.29px;
}
.remind-title {
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #888888;
  letter-spacing: -0.29px;
}
.btn {
  margin: 5.83rem 1rem 0.83rem;
  text-align: center;
  font-size: 14px;
  line-height: 3rem;
  height: 3rem;
  background: #3b7aca;
  border-radius: 0.2px;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.34px;
}
.history {
  display: block;
  text-align: center;
  color: #3479d4;
  text-decoration: underline;
}
</style>
