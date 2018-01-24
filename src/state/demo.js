!(function(window, document) {
  "use strict";

  // 对应 main.rb 中的ApiObject 属性方法
  // 调起浏览器窗口
  document
    .querySelector("#showBrowserBtn")
    .addEventListener("click", function(e) {
      window.ksoJsAsynCall(
        "navigateOnNewWindow",
        { url: "http://www.papertime.cc/download/task/1516097631675.dl" },
        function(res) {
          console.log(res);
        }
      );

      window.ksoJsAsynCall(
        "navigateOnNewWidget",
        { url: "http://www.wps.cn", width: 300, height: 400 },
        function(res) {
          console.log(res);
        }
      );

      window.ksoJsAsynCall("readText", {}, function(res) {
        console.log(res);
      });

      window.ksoJsAsynCall(
        "replaceData",
        { old_content: "行业", new_content: "要替换的文本", color: 1255 },
        function(res) {
          console.log(res);
        }
      );

      /*
	window.ksoJsAsynCall('login', {loginSrc:'user_name'}, function (res) {
      console.log(res);
    });
	*/

      window.ksoJsAsynCall("getUserInfo", {}, function(res) {
        console.log(res);
      });
       


      window.ksoJsAsynCall(        //弹窗页
        "navigateOnNewWidget",
        { url: "http://47.93.158.239/pop.html", width: 100, height: 100 },
        function(res) {
          console.log(res);
        }
      );
      function onNotifyToWidget(data) {
        var r = JSON.parse(window.Base64.decode(data));
        console.log(r);          //弹窗后的回调函数
      }


      document.querySelector("#close").addEventListener("click", function(e) {
        window.ksoJsAsynCall("notifyToWidget", { docId: "1" }, function(res) {
          console.log(res);
        });   // 触发回调函数
        window.ksoJsAsynCall("closeNavigate", function(res) {
          console.log(res);
        });    //关闭窗口
      });

	  window.ksoJsAsynCall('login', {loginSrc:'user_name'}, function (res) {
	    console.log(res);
	  });     //登录弹窗页面

    });
})(window, document);
