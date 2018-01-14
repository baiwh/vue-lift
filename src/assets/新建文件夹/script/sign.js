$(function () {
  // 注册页面密码判断
  $("#pwd").keyup(function () {
    var streng = 0;
    var s1 = $("#strength1");
    var s2 = $("#strength2");
    var s3 = $("#strength3");
    var tab = $("#strengthTab");
    if (len < 6 && pwd != "") {
      $("#pwdInfo").html("密码不能小于六位").attr("class", "info").show();
      $("#strength").hide();
    } else if (pwd != "") {
      $("#strength").show();
      $("#pwdInfo").hide();
      for (i = 0; i < regxs.length; i++) {
        if (pwd.match(regxs[i])) {
          streng++;
        }
      }
      if (streng == 1) {
        // 弱
        // 第一格变色。除他自己以外的统计元素无色
        s1.attr("class", "red").siblings("span").attr("class", "");
        // 改变标签位置和颜色
        tab.attr("class", "change1").animate({left: "-105px"});
      } else if (streng == 2) {
        // 中
        // 第一格变色
        s1.attr("class", "orange");
        // 第二格变色。他的下一格无色
        s2.attr("class", "orange").next("span").attr("class", "");
        // 改变标签位置和颜色
        tab.attr("class", "change2").animate({left: "-70px"});
      } else if (streng == 3) {
        // 强
        // 第一格变色
        s1.attr("class", "green");
        // 第二格变色
        s2.attr("class", "green");
        // 第三格变色
        s3.attr("class", "green");
        // 改变标签位置和颜色
        tab.attr("class", "change3").animate({left: "-35px"});
      }
    }
  })


})
