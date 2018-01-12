<template>
  <div>
    <div class="hello">
      <div class="icon icon-loading">
          <div class="pointer"></div>
      </div>
    </div>
    <div class="progress">
      <div class="progress-green">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "等待全文查重结果",
    };
  },
  mounted: function() {
    let num = 1;
    let wid = 1;
    setInterval(function() {
      $(".pointer").css("transform", "rotate(" + num + "deg)");
      num += 4;
      if (wid >= 99) {
        return;
      } else {
        $(".progress-green").css("width", wid + "%");
        wid += 1;
      }
    }, 500);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
  margin: 77px 20px 62px;
}
.pointer {
  position: absolute;
  height: 45px;
  border: 4px solid #999;
  top: 50%;
  margin-top: -45px;
  left: 50%;
  margin-left: -4px;
  transform: rotate(0deg);
  transform-origin: 4px 50px;
  transition: all 0.5s linear;
}
.progress {
  height: 4px;
  margin: 0 20px;
  background: #e6e6e6;
  position: relative;
  border-radius: 2px;
}
.progress-green {
  height: 4px;
  background: #50b379;
  border-radius: 2px;
  position: absolute;
  top: 0;
  z-index: 100;
}
</style>
