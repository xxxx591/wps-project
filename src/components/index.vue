<template>
  <div class="index">
    <logo></logo>
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
      <p class="remind-title"><i class="icon icon-remind"></i>对于新用户，系统赠送10000字免费体验。</p>
      <div class="btn" @click="showbox">
        开始全文查重
      </div>
      <router-link to="/" class="history">历史记录</router-link>
    </div>
    <frist-cost :panelShow.sync="panelShow" v-if="panelShow"></frist-cost>
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
      panelShow: false
    };
  },
  components: {
    logo,
    fristCost
  },
  methods: {
    showbox() {
      this.panelShow = true;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-content h5 {
  color: #888;
  text-align: center;
  margin: 26px 0;
  font-weight: 400;
}
.content-list ul li {
  height: 60px;
  margin-bottom: 29px;
  color: #888;
}
.content-list ul li .list-icon {
  display: inline-block;
  width: 34px;
  height: 40px;
}
.right-content {
  display: inline-block;
  height: 60px;
  width: 252px;
  margin-left: 13px;
}
.remind-title {
  text-align: center;
  color: #888;
}
.btn {
  margin-top: 90px;
  text-align: center;
  font-size: 20px;
  line-height: 36px;
  height: 36px;
  background: #50b379;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.history{
  display: block;
  text-align: center;
  color: #3479D4;
  text-decoration: underline;
}
</style>
