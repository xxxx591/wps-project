
<script>
  var wpstoken = null;
  var userId = null;
  var wpstokenIP = "//192.168.1.117:1009/";
  const tokenn = "123123123";
  var fullCheck = null;
function getToken() {
  $.ajax({
    type: "get",
    url: "http://wpsapi2357.papertime.cn/v1/check/init.html",
    data: {
      userName: "test",
      userId: "1"
    },
    dataType: "json",
    async:false,
    success: res => {
        console.log(res);
      userId = res.userId;
      wpstoken = res.wpstoken;
      fullCheck = res.fullCheck;
    }
  });
}
getToken();
console.log(userId + "----" + wpstoken);
export default {
  userId, //用户ID
  wpstoken, //用户随机token值
  wpstokenIP, //API地址
  tokenn,
  fullCheck  //状态位
};
</script>
