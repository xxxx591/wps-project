<template>
  <div class="hello">
    <logo></logo>
    <div class="paper-list">
      <ul>
        <li id="list-heard">
          <span>标题</span>
          <span>时间</span>
          <span>操作</span>
        </li>
        <li class="list-content" v-for="list in listItem" :key="list.index">
          <span>{{list.title}}</span>
          <span>{{list.submitTime}}</span>
          <span id="check-details"><button @click="checkDetails(list.docCheckId)">详情</button></span>
        </li>
      </ul>
      <p class="paging">当前页{{pageNow}}，共{{pageAll}}页<span @click="next">下一页</span><span @click="prev">上一页</span></p>
    </div>
  </div>
</template>

<script>
import logo from "@/components/logo/logo";
export default {
  name: "viewReport",
  data() {
    return {
      msg: "你好啊",
      userId: null,
      listItem: [],
      pageSize: 10,
      pageNow: 1,
      pageAll: 123
    };
  },
  components: {
    logo
  },
  mounted: function() {
    var that = this;
    this.userId = this.$route.query.userid;
    this.$http
      .get("api/v1/paper/checkTaskList.html", {
        params: {
          userId: this.userId,
          pageSize: this.pageSize,
          pageNow: this.pageNow
        }
      })
      .then(function(res) {
        that.listItem = res.data.list;
        that.pageAll = parseInt(res.data.page.totalRow / 10 + 1);
      });
  },
  methods: {
    checkDetails(event) {
      this.docCheckId = event;
      console.log(this.docCheckId);
      this.$router.push({
        path: "/fullTxt",
        query: { userid: this.userId, docCheckId: this.docCheckId }
      });
    },
    prev() {
      var that = this;
      if (this.pageNow == 1) {
        return;
      } else {
        this.pageNow -= 1;
        this.$http
          .get("api/v1/paper/checkTaskList.html", {
            params: {
              userId: this.userId,
              pageSize: this.pageSize,
              pageNow: this.pageNow
            }
          })
          .then(function(res) {
            that.listItem = res.data.list;
          });
      }
    },
    next() {
      var that = this;
      if (this.pageNow < this.pageAll) {
        this.pageNow += 1;
        this.$http
          .get("api/v1/paper/checkTaskList.html", {
            params: {
              userId: this.userId,
              pageSize: this.pageSize,
              pageNow: this.pageNow
            }
          })
          .then(function(res) {
            that.listItem = res.data.list;
          });
      } else {
        return;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#list-heard {
  text-align: left;
  font-weight: 600;
  border-bottom: 0.1rem solid #ededed;
  height: 3rem;
  line-height: 3rem;
}
#list-heard span {
  display: inline-block;
  width: 32%;
  font-size: 1.4rem;
}
.list-content {
  height: 2.8rem;
  line-height: 2.8rem;
  padding: 0.5rem 0;
  border-bottom: 0.1rem solid #ededed;
}
.list-content span {
  display: inline-block;
  width: 32%;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
#check-details button {
  border: 0;
  outline: none;
  background: #3479d4;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
}
.paging {
  font-weight: 600;
  padding: 1rem;
  height: 2.6rem;
  line-height: 2.6rem;
}
.paging span {
  float: right;
  background: #3479d4;
  cursor: pointer;
  color: #fff;
  margin-right: 1rem;
  padding: 0 0.5rem;
  border-radius: 0.4rem;
}
</style>
