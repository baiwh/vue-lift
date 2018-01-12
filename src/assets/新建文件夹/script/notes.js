/**
 * Created by 白 on 2017/10/26.
 */
$(function () {

    // 如果分钟小于10。前边加个0
    if (minute<10){
        minute="0"+minute;
    }
    // 给当天的日期去掉透明度
    $(".theYear:contains("+year+")").animate({"opacity":"1"}).addClass("choose").attr("id","chooseYear");
    $(".theMonth:eq("+(month-1)+")").animate({"opacity":"1"}).addClass("choose").attr("id","chooseMonth");
    $(".theDay:eq("+(day-1)+")").addClass("choose").attr("id","chooseDay");

    // 调整到指定位置
    $(".year").animate({"scrollTop":(year-2017)*40});
    $(".month").animate({"scrollTop":(month-1)*40});
    $(".day").animate({"scrollTop":(day-1)*40});

    $(".theYear").click(function () {
        // 如果点击的这个是choose。且没有选择日和月。就去掉透明度。
        if($(this).hasClass("choose")&&($("#chooseDay").length<1)&&($("#chooseMonth").length<1)){
            $(this).animate({"opacity":"0.3"}).removeClass("choose");
            //去掉id
            $(this).attr("id","");
            $(this).siblings().attr("id","");
            time(null,null);
        }else {
            // 它同级的透明度0.3
            $(this).siblings().animate({"opacity":"0.3"}).removeClass("choose");
            // 不透明
            $(this).animate({"opacity":"1"}).addClass("choose");
            //给它加上id
            $(this).attr("id","chooseYear");
            $(this).siblings().attr("id","");
            // 获取这个数字
            var number=$(this).html();
            // 年的先减2016
            number=number-2017;
            var scroll=number*40;
            $(this).parent().animate({"scrollTop":scroll});
            // 如果选择了月
            if($("#chooseMonth").length>0){
                // 选择了日
                if($("#chooseDay").length>0){
                    var startTime=$(this).html()+"-"+$("#chooseMonth").html()+"-"+$("#chooseDay").html();
                    var endTime=$(this).html()+"-"+$("#chooseMonth").html()+"-"+$("#chooseDay").html();
                }
                if($("#chooseDay").length<1){
                    var startTime=$(this).html()+"-"+$("#chooseMonth").html()+"-01";
                    var endTime=$(this).html()+"-"+$("#chooseMonth").html()+"-31";
                }
            }else {
                var startTime=$(this).html()+"-01-01";
                var endTime=$(this).html()+"-12-31";
            }
            time(startTime,endTime);
        }
    })
    $(".theMonth").click(function () {
        // 如果点击的这个是choose。就去掉透明度。
        if($(this).hasClass("choose")&&($("#chooseDay").length<1)){
            $(this).animate({"opacity":"0.3"}).removeClass("choose");
            //去掉id
            $(this).attr("id","");
            $(this).siblings().attr("id","");
            var startTime=$("#chooseYear").html()+"-01-01";
            var endTime=$("#chooseYear").html()+"-12-31";
            time(startTime,endTime);
        }else {
            // 如果年已经被选中
            if ($("#chooseYear").length>0){
                // 它同级的透明度0.3
                $(this).siblings().animate({"opacity":"0.3"}).removeClass("choose");
                // 不透明
                $(this).animate({"opacity":"1"}).addClass("choose");
                //给它加上id
                $(this).attr("id","chooseMonth");
                $(this).siblings().attr("id","");
                // 获取这个数字
                var number=$(this).html();
                // 月和日的span往上挪.先获取点击的HTML。然后*40
                var scroll=(number-1)*40;
                $(this).parent().animate({"scrollTop":scroll});
                // 如果选择了日
                if($("#chooseDay").length>0){
                    var startTime=$("#chooseYear").html()+"-"+$(this).html()+"-"+$("#chooseDay").html();
                    var endTime=$("#chooseYear").html()+"-"+$(this).html()+"-"+$("#chooseDay").html();
                }else {
                    var startTime=$("#chooseYear").html()+"-"+$(this).html()+"-01";
                    var endTime=$("#chooseYear").html()+"-"+$(this).html()+"-31";
                }
                time(startTime,endTime);
            }
        }
    })
    $(".theDay").click(function () {
        // 如果点击的这个是choose。就去掉透明度。
        if($(this).hasClass("choose")){
            $(this).animate({"opacity":"0.3"}).removeClass("choose");
            //去掉id
            $(this).attr("id","");
            $(this).siblings().attr("id","");
            var startTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-01";
            var endTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-31";
            time(startTime,endTime);
        }else {
            // 如果年月已经被选中
            if(($("#chooseYear").length>0)&&($("#chooseMonth").length>0)){
                // 它同级的透明度0.3
                $(this).siblings().animate({"opacity":"0.3"}).removeClass("choose");
                // 不透明
                $(this).animate({"opacity":"1"}).addClass("choose");
                //给它加上id
                $(this).attr("id","chooseDay");
                $(this).siblings().attr("id","");
                // 获取这个数字
                var number=$(this).html();
                // 月和日的span往上挪.先获取点击的HTML。然后*40
                var scroll=(number-1)*40;
                $(this).parent().animate({"scrollTop":scroll});
                var startTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-"+$(this).html();
                var endTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-"+$(this).html();
                time(startTime,endTime);
            }
        }
    })

    //时间筛选的Ajax
    function time(startTime,endTime) {
        $("#noteInputForm").load("../note/noteInputList.action?startTime=" + startTime+"&endTime="+endTime);

    }



})
