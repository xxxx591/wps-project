<template>
  <div class="logo">
    <p>
      <span @click="checkAll" ><i class="icon icon-return"></i>返回</span>
      <span class="logo-content-right">
        <!-- <button class="check-btn" @click="checkAll">全文查重</button> -->
      </span>
    </p>
  </div>
</template>
<style scoped>
.logo {
  height: 3.3rem;
  width: 100%;
  line-height: 3.3rem;
}

.logo span {
  display: inline-block;
  cursor: pointer;
}
.logo-btn {
  outline: none;
  border: 0;
  padding: 0.5rem;
  background: #fff;
  cursor: pointer;
}
.logo-content-right {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #888888;
  letter-spacing: 0.28px;
  float: right;
}
.logo-content-right span {
  color: #101000;
}
.check-btn {
  background: #3b7aca;
  border-radius: 4px;
  width: 13.33rem;
  height: 2.5rem;
  color: #fff;
  cursor: pointer;
}
</style>
<script>
export default {
  name: "logotab",
  data() {
    return {};
  },
  props: {
    balance: {
      type: Number
    }
  },
  methods: {
    change() {
      this.$emit("returnChange", "返回上一页");
    },
    checkAll() {
      this.$emit('returncheck','返回全文查重')
    },
    changeQq(e) {}
  }
};
</script>
