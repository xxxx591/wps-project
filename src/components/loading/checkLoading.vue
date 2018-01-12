<template>
  <div>
    <div class="hello">
      <div class="icon icon-loading">
          <div class="pointer"></div>
      </div>
    </div>
    <div class="progress-box">
      <div class="progress">
        <div class="progress-green">

        </div>
      </div>
      <p class="progress-title01">0%</p>
      <h2 class="progress-title02">正在拼命检测中...请稍等片刻</h2>
      <ul v-for="item in checkList" :key="item.index">
        <li>{{item.content}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "等待全文查重结果",
      listItem: [
        { content: "全文查重时间：通常情况下，需要3至10分钟。如果是在论文检测的高峰期，则可能需要更长的时间。" },
        { content: "关闭文档或者电脑不会影响检测。" },
        { content: "红色句子表示相似度在80%以上，橙色句子表示相似度在50%~80%，点击句子即可查看详细相似来源。" },
        { content: "全文查重完成后，可以对相似度高的红色句子进行机器人降重。" },
        { content: "修改几句就可以点击论文助手顶部的实时查重，立刻同步查重结果。" }
      ],
      checkList: [
        { content: "实时查重时间：通常情况下，30秒以内可以出结果，修改的句子越多，则可能需要更长的时间。" },
        { content: "关闭文档或者电脑不会影响检测。" },
        { content: "实时查重完成后，可以对相似度高的红色句子进行机器人降重。" }
      ]
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
        $(".progress-title01").html(wid + "%");
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
.progress-box {
  text-align: center;
  color: #222226;
}
.progress {
  height: 4px;
  margin: 0 20px;
  background: #e6e6e6;
  position: relative;
  border-radius: 2px;
  margin-bottom: 6px;
}
.progress-green {
  height: 4px;
  background: #50b379;
  border-radius: 2px;
  position: absolute;
  top: 0;
  z-index: 100;
}
.progress-title01 {
  margin-bottom: 18px;
}
.progress-title02 {
  padding: 0 20px 42px;
  border-bottom: 1px solid #ececec;
  margin-bottom: 16px;
}
.progress-box ul {
  text-align: left;
}
.progress-box ul li {
  list-style: inside;
  margin-bottom: 5px;
}
</style>
