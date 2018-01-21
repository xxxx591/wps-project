;
!(function (window, document) {
  'use strict';

  // 对应 main.rb 中的ApiObject 属性方法
  // 调起浏览器窗口
  document.querySelector('#showBrowserBtn').addEventListener('click', function (e) {
	
	window.ksoJsAsynCall('navigateOnNewWindow', {url: 'http://www.papertime.cc/download/task/1516097631675.dl'}, function (res) {
      console.log(res);
    });
	
	window.ksoJsAsynCall('navigateOnNewWidget', {url: 'http://www.wps.cn',width:300,height:400}, function (res) {
      console.log(res);
    });

	window.ksoJsAsynCall('readText', {}, function (res) {
      console.log(res);
    });
	
	window.ksoJsAsynCall('replaceData', {old_content:'行业',new_content:'要替换的文本',color:1255}, function (res) {
      console.log(res);
    });
	
	/*
	window.ksoJsAsynCall('login', {loginSrc:'user_name'}, function (res) {
      console.log(res);
    });
	*/
	
	window.ksoJsAsynCall('getUserInfo', {}, function (res) {
      console.log(res);
    });
  })
}(window, document));