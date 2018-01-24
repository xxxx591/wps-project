function StringBuffer() {
  this.__strings__ = new Array();
}
StringBuffer.prototype.append = function(str) {
  this.__strings__.push(str);
  return this; //方便链式操作
};
StringBuffer.prototype.toString = function() {
  return this.__strings__.join("");
};
function replaceBlank(content) {
  var result = new StringBuffer();
  for (var i = 0; i < content.length; i++) {
    var d = content.charAt(i);
    var patt1 = new RegExp(/\s+/g);
    if (patt1.test(d)) {
      result.append("&nbsp;");
    } else {
      result.append(d);
    }
  }
  return result.toString();
}
function getMyDate(str) {
  var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime =
      oYear +
      "-" +
      getzf(oMonth) +
      "-" +
      getzf(oDay) +
      " " +
      getzf(oHour) +
      ":" +
      getzf(oMin) +
      ":" +
      getzf(oSen); //最后拼接时间
  return oTime;
}
//补0操作
function getzf(num) {
  if (parseInt(num) < 10) {
    num = "0" + num;
  }
  console.log(num);
}
function onNotifyToWidget(data) {
  var r = JSON.parse(window.Base64.decode(data));
  console.log(r); //弹窗后的回调函数
}

function userStateChanged(data) {
  var r = JSON.parse(window.Base64.decode(data));
  console.log(data);
  window.ksoJsAsynCall("getUserInfo", {}, function(res) {
    console.log(res);
  });
}

export { StringBuffer, replaceBlank, getMyDate, getzf, onNotifyToWidget, userStateChanged};
