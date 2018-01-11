<template v-show="panelShow">
  <div>
    <div class="cost-box">
      <h3>该服务由PaperTime提供</h3>
      <div class="cost-content">
        <p class="balance">
          <span class="left-content"> 检测需扣除您的余额字数，是否继续？</span>
        </p>
        <div class="cost-list">
          <ul>
            <li>当前修改句子的字数<span class="right-content red-content">{{allNumberWords}}<span style="color:#888;">字</span></span></li>
            <li>需扣除字数<span class="right-content red-content">0<span style="color:#888;">字</span></span></li>
            <li>余额字数<span class="right-content red-content">{{balance}}<span style="color:#888;">字</span></span></li>
          </ul>
        </div>
        <p class="remind-content"><i class="icon icon-remind"></i> 此次提交扣费<span class="red-content">{{allNumberWords+robotWords}}</span>字，您的余额<span class="red-content">{{balance}}</span>字。</p>
      </div>
      <div class="boder-solid"></div>
      <p class="green-content"> 实时查重<span class="red-content">计费标准</span>：根据当前修改的句子（标记成蓝色）的字数计费.</p>
      <div class="btn-box">
        <a href="javascript:;" class="btn btn-cancel" @click="hidePanel">取消</a>
        <a href="javascript:;" class="btn btn-success">确定</a>
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
      balance: 10000,
      atPresent: 120,
      takeOut: 36,
    };
  },
  props: {
    panelShow: {
      type: Boolean
    }
  },
  methods: {
    hidePanel() {
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 panelShow 变量
      this.$emit("update:panelShow", false);
    }
  }
};
</script>