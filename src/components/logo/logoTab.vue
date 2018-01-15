<template>
  <div class="logo">
    <p>
      <span @click="change"><i class="icon icon-return"></i>返回</span>
      <span><i class="icon icon-refresh"></i>实时查重</span>
      <span class="logo-content-right">余额{{balance}}字</span>
    </p>
    <p>
      <span><button class="logo-btn" :class="{'selected':select}">全文标红</button></span>
      <span><button class="logo-btn" :class="{'selected':selectFalse}">相似片段</button></span>
      <span class="logo-content-right">
        <i class="icon icon-download"></i>
        <i class="icon icon-qq"></i>
      </span>
    </p>
  </div>
</template>
<style scoped>
.logo {
  height: 48px;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #ececec;
}
.logo p {
  margin: 10px 0;
}
.logo span {
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  width: 32%;
}
.logo-btn {
  outline: none;
  border: 0;
  padding: 5px;
  background: #fff;
  cursor: pointer;
}
.logo-content-right {
  text-align: right;
}
.logo-content-right i{
  margin-right: 5px;
}
.selected {
  background: #f1f1f2;
}
</style>
<script>
export default {
  name: "logotab",
  data() {
    return {
      select: true,
      selectFalse: false
    };
  },
  props: {
    balance: {
      type: Number
    }
  },
  methods: {
    change() {
      this.$emit("returnChange", "返回上一页");
    }
  }
};
</script>
