
var obj ;

function userid(userid,tokenid) {
  $.ajax({
    type: "get",
    url: "http://wpsapi2357.papertime.cn/v1/check/init.html",
    data: {
      userName: 'test',
      userId:'1'
    },
    dataType: "json",
    success: res => {
      console.log(res);
      obj = res.userId;
    }
  });
  console.log(obj);
}
userid();
console.log(obj);
export {
  obj,userid
}
