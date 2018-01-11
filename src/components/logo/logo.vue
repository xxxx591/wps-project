<template>
  <div class="logo">
      <span><i class="icon icon-return"></i>返回</span>
      <div class="logo-box"></div>
  </div>
</template>
<style scoped>
.logo {
  height: 48px;
  width: 100%;
  position: relative;
  padding-bottom: 15px;
  border-bottom: 1px solid #888;
}
.logo span {
  display: inline-block;
  position: absolute;
  top: 0;
  font-size: 14px;
  cursor: pointer;
}
.logo-box {
  width: 130px;
  height: 44px;
  display: inline-block;
  position: absolute;
  top: 50%;
  margin-top: -37px;
  left: 50%;
  margin-left: -65px;
  background: url(../../assets/logo.png)no-repeat;
}
</style>
