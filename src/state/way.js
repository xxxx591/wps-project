
function onNotifyToWidget(data) {
  var r = JSON.parse(window.Base64.decode(data));
  console.log(r.docId); //弹窗后的回调函数

}

function userStateChanged(data) {
    var r = JSON.parse(window.Base64.decode(data));
    console.log(data);
    window.ksoJsAsynCall("getUserInfo", {}, function(res) {
      console.log(res);
    });
  }function userStateChanged(data) {
    var r = JSON.parse(window.Base64.decode(data));
    console.log(data);
    window.ksoJsAsynCall("getUserInfo", {}, function(res) {
      console.log(res);
    });
  }