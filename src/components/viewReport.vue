<template>
  <div class="hello">
    <logo-tab></logo-tab>
  </div>
</template>

<script>
import logoTab from '@/components/logo/logoTab'
export default {
  name: "viewReport",
  data() {
    return {
      msg: "你好啊",
    };
  },
  components:{
    logoTab,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
