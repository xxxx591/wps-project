<template>
  <div>
    <div class="hello">
      <div class="icon icon-loading">
      </div>
    </div>
    <div class="progress-box">
      <div class="progress">
        <div class="progress-green">

        </div>
      </div>
      <p class="progress-title01">0%</p>
      <h2 class="progress-title02">正在拼命检测中...请稍等片刻</h2>
      <div class="progress-list">
        <ul>
          <li v-for="item in listItem" :key="item.index">
            <i class="icon icon-dot"></i>
            <p>{{item.content}}</p>
          </li>
        </ul>
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
  margin: 7.7rem 2rem 6.2rem;
}
.pointer {
  position: absolute;
  height: 4.5rem;
  border: 0.4rem solid #999;
  top: 50%;
  margin-top: -4.5rem;
  left: 50%;
  margin-left: -0.4rem;
  transform: rotate(0deg);
  transform-origin: 0.4rem 5rem;
  transition: all 0.5s linear;
}
.progress-box {
  text-align: center;
  color: #222226;
}
.progress {
  height: 0.4rem;
  margin: 0 2rem;
  background: #e6e6e6;
  position: relative;
  border-radius: 0.2rem;
  margin-bottom: 0.42rem;
}
.progress-green {
  height: 0.33rem;
  background: #7bb7ff;
  border-radius: 8px;
  position: absolute;
  top: 0;
  z-index: 100;
}
.progress-title01 {
  color: #888888;
  letter-spacing: -0.29px;
  margin-bottom: 1.83rem;
}
.progress-title02 {
  font-size: 14px;
  color: #222226;
  letter-spacing: -0.34px;
  font-weight: 500;
  margin-bottom: 6.67rem;
}
.progress-list {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 1.67rem 0.83rem;
}
.progress-box ul {
  text-align: left;
  font-size: 12px;
  color: #888888;
  letter-spacing: -0.29px;
}
.progress-box ul li {
  margin-bottom: 0.5rem;
  position: relative;
}
.progress-box ul li p {
  display: inline-block;
  width: 24.83rem;
  margin-left: .87rem;
}
.icon-dot {
  position: absolute;
  background: #c5c5c5;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  top: 50%;
  margin-top: -0.25rem;
}
</style>
