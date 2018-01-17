
const obj = {
  userId : '',
  wpstoken : '',
}

function userid(userid,tokenid) {
  $.ajax({
    type: "get",
    url: "api/v1/check/init.html",
    data: {
      uuid: 'test',
    },
    dataType: "json",
    success: res => {
      // console.log(res);
      obj.userId = res.userId;
      obj.wpstoken = res.wpstoken;
      // console.log(obj);
    }
  });
}
export {
  obj,userid
}
