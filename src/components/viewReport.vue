<template>
  <div class="hello">
    <logo :userId="userId" v-on:returncheck="returncheck"></logo>
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
          <span id="check-details"><button @click="checkDetails(list.docCheckId,list.dataState)">详情</button></span>
        </li>
      </ul>
      <p class="paging">
        <span class="prev" @click="prev">上一页</span>
        <span class="left-view">共{{pageAll}}页</span>
        <span class="centent-view">当前第{{pageNow}}页</span>
        <span class="next" @click="next">下一页</span>
      </p>
    </div>
  </div>
</template>

<script>
import logo from "@/components/logo/logo";
import { getMyDate, getzf } from "../state/index";
export default {
  name: "viewReport",
  data() {
    return {
      msg: "你好啊",
      userId: this.GLOBAL.userId,
      wpstoken: this.GLOBAL.wpstoken,
      listItem: [],
      pageSize: 10,
      pageNow: 1,
      pageAll: 123,
      state: null,
      viewTrue: true,
      n: 0,
      s: 0
    };
  },
  components: {
    logo
  },
  mounted: function() {
    this.$http
      .get("http://wpsapi2357.papertime.cn/v1/paper/checkTaskList.html", {
        params: {
          userId: this.userId,
          pageSize: this.pageSize,
          pageNow: this.pageNow
        },
        headers: {
          wpstoken: this.wpstoken,
          userId: this.userId
        }
      })
      .then(res => {
        this.pageAll = parseInt(res.data.page.totalRow / 10 + 1);
        console.log(res);
        for (let i = 0; i < res.data.list.length; i++) {
          this.listItem.push({
            title: res.data.list[i].title,
            submitTime: getMyDate(res.data.list[i].submitTime),
            docCheckId: res.data.list[i].docCheckId,
            dataState: res.data.list[i].status
          });
        }
        // console.log(this.listItem);
        if (res.data.page.totalRow % 10 == 0) {
          this.pageAll = parseInt(res.data.page.totalRow / 10);
        } else {
          this.pageAll = parseInt(res.data.page.totalRow / 10 + 1);
        }
      });
  },
  methods: {
    checkDetails(event, state) {
      console.log(event);
      this.docCheckId = event;
      this.state = state;
      if (state == 0 || state == 1) {
        this.$router.push({
          path: "/loading",
          query: {
            docCheckId: this.docCheckId
          }
        });
      } else if (state == 2) {
        this.$router.push({
          path: "/fullTxt",
          query: {
            docCheckId: this.docCheckId
          }
        });
      } else {
        return;
      }
    },
    prev() {
      if (this.pageNow == 1) {
        return;
      } else {
        this.pageNow -= 1;
        this.$http
          .get("http://wpsapi2357.papertime.cn/v1/paper/checkTaskList.html", {
            params: {
              userId: this.userId,
              pageSize: this.pageSize,
              pageNow: this.pageNow
            },
            headers: {
              wpstoken: this.wpstoken,
              userId: this.userId
            }
          })
          .then(res => {
            this.listItem = [];
            for (let i = 0; i < res.data.list.length; i++) {
              this.listItem.push({
                title: res.data.list[i].title,
                submitTime: getMyDate(res.data.list[i].submitTime),
                docCheckId: res.data.list[i].docCheckId,
                dataState: res.data.list[i].status
              });
            }
          });
      }
    },
    next() {
      if (this.pageNow < this.pageAll) {
        this.pageNow += 1;
        this.$http
          .get("http://wpsapi2357.papertime.cn/v1/paper/checkTaskList.html", {
            params: {
              userId: this.userId,
              pageSize: this.pageSize,
              pageNow: this.pageNow
            },
            headers: {
              wpstoken: this.wpstoken,
              userId: this.userId
            }
          })
          .then(res => {
            this.listItem = [];
            for (let i = 0; i < res.data.list.length; i++) {
              this.listItem.push({
                title: res.data.list[i].title,
                submitTime: getMyDate(res.data.list[i].submitTime),
                docCheckId: res.data.list[i].docCheckId,
                dataState: res.data.list[i].status
              });
            }
          });
      } else {
        return;
      }
    },
    returncheck(data) {
      this.$router.push({
        path: "/allCheck",
        query: {
          userId: this.userId
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .left-view{
  float: left;
} */
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
  text-align: center;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list-content span:last-of-type {
  text-align: center;
}
#check-details button {
  border: 0;
  outline: none;
  background: #3b7aca;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
}
.paging {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #696969;
  letter-spacing: 0.28px;
  text-align: center;
  line-height: 1.33rem;
}
.paging span {
  height: 1.33rem;
  line-height: 1.33rem;
  display: inline-block;
  cursor: pointer;
}
.page-box {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 6rem;
}
.paper-list{
  padding: 0 0.83rem;
}
</style>
