<template>
  <div class="logo">
    <p>
      <span @click="change"><i class="icon icon-return"></i>返回</span>
      <span class="logo-content-right">余额<span>{{balance}}</span>字
      <i class="icon icon-download" @click="changeDownload"></i>
      <i class="icon icon-qq" @click="changeQq"></i>
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
.selected {
  background: #f1f1f2;
}
.icon-qq:hover{
  background-position: -196px -467px;
}
.icon-qq:active{
    background-position: -347px -467px;
}
.icon-download:hover{
  background-position: -196px -426px;
}
.icon-download:active{
  background-position: -346px -426px;
}
</style>
<script>
export default {
  name: "logotab",
  data() {
    return {
      
    };
  },
  props: {
    balance: {
      type: Number
    },

  },
  methods: {
    change() {
      this.$emit("returnChange", "返回上一页");
    },
    changeDownload(e){
      
      },
    changeQq(e){
      
      },
  }
};
</script>
