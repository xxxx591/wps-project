<template>
  <div class="hello">
    <logo-tab></logo-tab>
    <div class="paper-list">
      <ul>
        <li id="list-heard">
          <span>标题</span>
          <span>时间</span>
          <span>操作</span>
        </li>
        <li class="list-content" v-for="(list,index) in listItem" :key="index">
          <span>标题</span>
          <span>时间</span>
          <span id="check-details" @click="checkDetails">详情</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import logoTab from "@/components/logo/logoTab";
export default {
  name: "viewReport",
  data() {
    return {
      msg: "你好啊",
      userId: null,
      docCheckId: [],
      title: [],
      submitTime: [],
      listItem: []
    };
  },
  components: {
    logoTab
  },
  mounted: function() {
    var that = this;
    this.userId = this.$route.query.userid;
    this.$http
      .get("api/v1/paper/checkTaskList.html", {
        params: {
          userId: this.userId,
          pageSize: 4,
          pageNow: 1
        }
      })
      .then(function(res) {
        that.listItem = res.data.list;
        console.log(res.data.list);
      });
  },
  methods: {
    checkDetails() {
      console.log("点我干嘛");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#list-heard {
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #ededed;
  height: 30px;
  line-height: 30px;
}
#list-heard span {
  display: inline-block;
  width: 32%;
  font-size: 14px;
}
.list-content {
  height: 20px;
  line-height: 20px;
}
.list-content span {
  display: inline-block;
  width: 32%;
  font-size: 12px;
}
</style>
