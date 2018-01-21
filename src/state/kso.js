;
!(function (window) {
  'use strict';

  var _jsAsynCall = window.external && window.external.jsAsynCall;
  var _cefQuery = window.cefQuery;
  var _isWpsEnv = _jsAsynCall || _cefQuery;
  var jsAsynCallCallbackCount = 0;

  /**
   * webJs 与 KsoApi 通信一级接口
   * @param  {String}   methodName    KsoApi方法名
   * @param  {[JSON]}   [args]        KsoApi方法约定数据格式JSON
   * @param  {[Function]} [callback]  KsoApi执行回调
   * @return {[type]}                 undefined
   */
  var jsAsynCall = function (methodName, args, callback) {
    var callbackName = methodName + '_async_callback_' + ++jsAsynCallCallbackCount;

    var invokeParams = {
      method: methodName,
      params: args,
      callback: callbackName
    };

    window[callbackName] = function (res) {
      delete window[callbackName];
      callback instanceof Function && callback(JSON.parse(window.Base64.decode(res)));
    };

    var jsonIn = window.Base64.encode(JSON.stringify(invokeParams));
    if (_cefQuery) {
      _cefQuery({
        request: 'jsAsynCall("' + jsonIn + '")',
        persistent: false
      });
    } else {
      _jsAsynCall(jsonIn);
    }
  }

  window.ksoJsAsynCall = jsAsynCall;

}(window));