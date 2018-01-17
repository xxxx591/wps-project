<template v-show="panelShow">
  <div>
    <div class="cost-box">
      <h3>该服务由PaperTime提供</h3>
      <div class="cost-content">
        <p class="balance">
          <span class="left-content">余额 {{balance}}字</span>
          <span class="right-content">全文字数 {{allNumberWords}}字</span>
        </p>
        <div class="cost-list">
          <ul>
            <li><i class="icon icon-disable-input"></i>全文查重<span class="right-content red-content">{{allNumberWords}}<span style="color:#888;">字</span></span></li>
            <li><i class="icon icon-disable-input"></i>在线改重+实时查重<span class="right-content red-content">0<span style="color:#888;">字</span></span></li>
            <li><i class="icon" @click="change" :class="select"></i>机器人降重<span class="right-content red-content">{{robotWords}}<span style="color:#888;">字</span></span></li>
          </ul>
        </div>
        <p class="remind-content" v-if="show"><i class="icon icon-remind"></i> 此次提交扣费<span class="red-content">{{allNumberWords+robotWords}}</span>字，您的余额<span class="red-content">{{balance}}</span>字。</p>
        <p class="remind-content" v-else><i class="icon icon-remind"></i> <span class="red-content">{{msg}}</span></p>
      </div>
      <div class="boder-solid"></div>
      <p class="green-content">(温馨提示:在线改重+实时查重是根据使用时修改的句子扣费）</p>
      <div class="btn-box">
        <a href="javascript:;" class="btn btn-cancel" @click="hidePanel">取消</a>
        <a href="javascript:;" class="btn btn-success" @click="submit">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstCost",
  data() {
    return {
      msg: "第一次全文查重",
      balance: null,
      allNumberWords: null,
      robotWords: null,
      select: "icon-select-input",
      show: true,
      auto: 1
    };
  },
  props: {
    panelShow: {
      type: Boolean
    },
    userId: {
      type: String
    },
    wpstoken: {
      type: String
    }
  },
  mounted: function() {
    var store = window.sessionStorage;
    this.userId = store.userId;
    this.wpstoken = store.wpstoken;
    this.$http
      .get("api/v1/check/full/init.html", {
        params: {
          userId: this.userId,
          title: "让网络成为一种内在的道德享用",
          editorTxt:
            "摘要:随着网络的迅速发展,互联网在人们的生活中成为了必需品。近年来,以网络技术为代表的新媒体技术迅猛发展,带来了传播媒介的新变革,推动着人类迈入一个崭新的信息时代。而它也是一把双刃剑,有好有坏。所以,如何在这种严峻的形势下培养大学生正确的网络道德观就变得极为重要。学校应该从各方面培育大学生网络道德。 新媒体丰富了人们的信息资源,扩展了人们的视野,另一方面新媒体带来的信息良莠不齐,使人们的道德观念受到冲击,传统的道德秩序出现失衡,而网络道德尚未完全形成,各种网络道德失范现象引起了社会的高度关注,网络道德建设的重要性日益凸显。网络在给大学生带来便利的同时,也为大学教育质量、学生社交能力以及学生身体健康带来了极大的负面影响。 智能手机是一把双刃剑,为大学生开辟了学习交流、休闲娱乐、涉猎信息的新天地,但也带来了一系列的负面问题有研究表明,长时间使用手机上网会使大脑中的化学物多巴胺水平升高,这种化学物质令个体呈现短时间的高度兴奋,沉溺于虚拟世界不能自拔。学习和生活所遇到的问题带来的压力会使人产生无望感,而这种无望感也会引起大学生的紧张和焦虑情绪,在这种情绪状态下,大学生会盲目希望自己拥有尽可能多的信息;另外,手机给大学生提供了一个虚拟平台,这种非面对面的交流由于视觉和听觉线索的缺失变得更加容易,人们不必担心自己的外表或一些生理缺陷会影响和别人的交流。经历消极生活事件后,可以到通过手机到网上社交平台上寻求帮助,这种支持会让大学生产生一种归属感,有效地缓解生活事件带来的压力。当他们过度沉迷于这种虚拟社交时就可能导致手机网络成瘾的形成。大学生作为国家未来的栋梁,其道德水平的高低关系着整个社会道德的发展。在新媒体环境下,大学生对网络的黏附性逐渐增大,各种网络应用普及率高,大学生的心理、观念等都受到网络的影响。由于大学生的年龄、心理发展水平的制约,其道德自控能力不足以抵御不良信息的干扰,出现了网络信息滥用、网络语言暴力、侵犯他人隐私、剽窃等网络不道德行为。几年来,在媒体的快速发展下,出现了很多盗取个人隐私的违法事件,例如,前两年人人谈论的“人肉搜索”,这一恶劣的现象正是新媒体弊端的体现。因为网民在使用媒体网络的时候并没有更多的保护个人信息,导致很多不良用户的有机可乘,出现了今天的“人肉搜索”事件。另一方面,也是网民网络道德的缺失的体现,现在的大学生群体尚未形成成熟的价值观以及思考的方式,这就导致了当这一事件出现时,很多大学生盲目跟风,更是助长了嚣张的气焰。从这一事件可以看出参与这一事件的大多数网民是对个人隐私的侵犯,是不尊重他人的表现。这给我们敲响了警钟,当前大学生对于这种网络弊端毫无抵御能力。裂变式的传播方式的传播速度和范围都是以几何形成加倍增长,大学生对于网络信息还没有具有正确的判断能力,所以无辜的大学生就成为了网络舆情的始发人员。在这个过程中,严重的影响了大学生形成正确的世界观、价值观。所以,大学生网络道德问题仍需解决。 "
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        console.log(res);
        console.log(this.wpstoken);
        if (res.data.status == "fail") {
          this.msg = "论文内容为空, 不能全文查重";
          this.show = false;
        } else if (res.data.status == "success") {
          this.balance = res.data.balance;
          this.allNumberWords = res.data.wordCount;
          this.robotWords = res.data.wordCount;
        }
      });
  },
  methods: {
    change() {
      if (this.select == "icon-select-input") {
        this.select = "icon-input";
        this.robotWords = 0;
        this.auto = 0;
      } else {
        this.select = "icon-select-input";
        this.robotWords = this.allNumberWords;
        this.auto = 1;
      }
    },
    hidePanel() {
      // 下面的语句配合开头写的 .sync 就会更新父组件中的 panelShow 变量
      this.$emit("update:panelShow", false);
    },
    submit() {
      var that = this;
      this.$http
        .get("api/v1/check/full/submit.html", {
          params: {
            userId: this.userId,
            auto: this.auto
          },
          headers: {
            wpstoken: this.wpstoken,
            userId: this.userId
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.status == "success") {
            that.$emit("submitChange", res.data.docCheckId);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cost-box {
  width: 78.33rem;
  height: 48.33rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -39.165rem;
  margin-top: -24.165rem;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  color: #888888;
  letter-spacing: 0.42px;
  font-family: MicrosoftYaHei;
}
.cost-box h3 {
  text-align: center;
  font-size: 1.67rem;
  padding: 1.58rem 0;
  border-bottom: 1px solid #888;
  margin: 0 1.67rem;
  font-weight: 500;
}
.cost-content {
  width: 25.6rem;
  height: 25rem;
  margin: 0 auto;
}
.balance {
  margin: 4.17rem 0 3.33rem;
  font-size: 1.16rem;
}
.right-content {
  float: right;
}
.red-content {
  color: red;
}
.balance::after {
  clear: both;
}
.cost-list ul li {
  font-size: 1.16rem;
  margin-bottom: 3.33rem;
  letter-spacing: 0.28px;
}
.remind-content {
  font-size: 1.16rem;
  margin-bottom: 5.42rem;
}
.boder-solid {
  margin: 0 1.67rem;
  border-bottom: 1px solid #888;
}
.green-content {
  color: #03802c;
  margin: 0 1.67rem;
}
.btn-box {
  text-align: right;
  margin: 0 1.67rem;
}
.btn-box .btn {
  text-align: center;
  display: inline-block;
  width: 12.33rem;
  height: 3rem;
  border-radius: 0.3rem;
  line-height: 3rem;
  font-size: 1.67rem;
}
.btn-box .btn-cancel {
  border: 1px solid #888;
  background: #fff;
  color: #888;
}
.btn-box .btn-success {
  background: #03802c;
  border: 1px solid #03802c;
  color: #fff;
  margin-left: 0.83rem;
}
</style>
