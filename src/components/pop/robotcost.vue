<template>
  <div class="hello">
   {{msg}}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "未全文查重",
      userid:'',
    };
  },
  beforeMount: function() {
    console.log(this.$route.query);
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
