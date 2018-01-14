<template>
  <div class="hello">
   <Menu></Menu>
  </div>
</template>

<script>
import Menu from '@/components/logo/menu'
export default {
  name: "viewReport",
  data() {
    return {
      msg: "你好啊",
    };
  },
  components:{
    Menu,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
