// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios' 
import base64 from "./state/base64";
import kso from "./state/kso";
import global_ from './Global'//引用文件

require('./components/css/style.css')
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
window.userStateChanged = function(data) {
  var r = JSON.parse(window.Base64.decode(data));
  console.log(data);
  window.ksoJsAsynCall("getUserInfo", {}, function(res) {
    console.log(res);
    window.user_id = res.result.user_id;
  });
}
Vue.prototype.$http=axios;



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
