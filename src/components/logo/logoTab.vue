<template>
  <div class="logo">
      <span><i class="icon icon-return"></i>返回</span>
      <span><i class="icon icon-refresh"></i>实时查重</span>
      <span>余额{{balance}}字</span>
  </div>
</template>
<style scoped>
.logo {
  height: 48px;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #ececec;
}
.logo span {
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}
</style>
<script>
export default {
  name: "logotab",
  data() {
    return {
      balance: 1234
    };
  }
};
</script>
