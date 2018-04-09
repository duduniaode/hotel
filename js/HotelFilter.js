$(document).ready(function(){
    addSearchMessage();
    addHeader();
    addFooter();
    checkLogin();
    getAllCity2();
    // 动态添加城市类标题
    addSelectCityTitle();
    // 日历
    Add_a_calendar( new Date().getFullYear() , new Date().getMonth()+1 , new Date().getDate()); //页面打开加载左右日历
    // getHotelList(d.cityName,1,1,d.checkTime,d.hotelKeyword);
    // 行政区 url+"v1/city/area" "../php/xingzhengqu.js"
    clickPosition(".Administrative-text",url+"v1/city/area",".Administrative-content li",".Administrative-content",5,".Administrative-area img");
    // 商圈 url+"v1/city/trad" "../php/shangquan.js"
    clickPosition(".trading-text",url+"v1/city/trad",".trading-content li",".trading-content",6,".trading img");
    // 景点 url+"v1/city/view/spot" "../php/jingdian.js"
    clickPosition(".scenic-spot-text",url+"v1/city/view/spot",".scenic-spot-content li",".scenic-spot-content",4,".scenic-spot img");
    
    // 价格不限按钮点击
    unlimitedBtnClick(".price",priceRange);
     // 星座不限按钮点击
    unlimitedBtnClick(".star",starLevel);
    // 品牌不限按钮点击
    unlimitedBtnClick(".brand",brand);
})
function addSearchMessage(){
    // var str = location.href.split("?")[1];
    // console.log("str:"+str);
    // // 解码
    // var d = JSON.parse(decodeURIComponent(str));
    // console.log("d:"+d);
    // console.log(d.cityName);
    // console.log(d.checkTime);
    // $(".city_input").val(d.cityName);
    // console.log(d.checkTime.split(',')[0]);
    // console.log(timestampToTime(d.checkTime.split(',')[0]));
    // console.log(timestampToTime(d.checkTime.split(',')[1]));
    // $(".time_input").val(timestampToTime(d.checkTime.split(',')[0])+"至"+timestampToTime(d.checkTime.split(',')[1]));
    var href = location.href.split("?")[1];
    var data_arr = href.split("&");
    $(".city_input").val(decodeURI(data_arr[0].split("=")[1]));
    // timestampToTime(time_input.split(",")[0])+"至"+timestampToTime(time_input.split(",")[1])
    var time_input = decodeURI(data_arr[1].split("=")[1]);
    console.log(time_input);
    console.log(timestampToTime(time_input.split(",")[0])+"至"+timestampToTime(time_input.split(",")[1]));
    $(".time_input").val(timestampToTime(time_input.split(",")[0])+"至"+timestampToTime(time_input.split(",")[1]));
    $(".time_input").attr("data-time",decodeURI(data_arr[3].split("=")[1]))
    $(".hotelKeyword").val(decodeURI(data_arr[2].split("=")[1]));
}

// 点击搜索start
$(".search-btn").click(function(){
    // 筛选页获取酒店列表
    if($(".city_input").val().length==0){
        alert("请选择城市");
        return;
    }else{
        var checkTime = "";
        if($(".time_input").attr("data-time")!="" && $(".time_input").attr("data-time")!=undefined){
            checkTime = $(".time_input").attr("data-time");
        }else{
            alert("请选择日期");
            return;
        }
        console.log($(".time_input").attr("data-time"));
        var hotelKeyword = "";
        if($(".hotelKeyword").val().length!=0){
              hotelKeyword = $(".hotelKeyword").val();
        }
    }   
    var cityName = $(".city_input").val();
    // ,specialLevel:"+specialLevel+" 品牌类型没写
    console.log("cityName:"+cityName+",checkTime:"+checkTime+",hotelKeyword:"+hotelKeyword+",positionType:"+positionType+",position:"+position+",priceRange:"+priceRange+",starLevel:"+starLevel+",brand:"+brand);
    // 搜索获取酒店
    getHotelList(cityName,4,1,checkTime,hotelKeyword,positionType,position,priceRange,starLevel,brand,overallRating,price,distance)  
})
// 点击搜索end 
// 位置start
  // 定义选中的的的单个数据start   
    // 当前选中的标题校验
    var check_title = "";
    // 位置类型
    var positionType = "";
    // 位置
    var position = "";
  // 定义选中的单个数据end
  // 点击事件定义函数（行政区、商圈、景点）start
    /**
     * 
     * @param {*} title 当前点击选择框的标题
     * @param {*} url 服务器请求数据的URL
     * @param {*} data_li 动态生成的li标签
     * @param {*} data_li_parent 动态生成的li标签的父亲
     * @param {*} n 每行的元素个数
     * @param {*} img 标题上需要变化的小三角
     * @param {*} positon_data 选中位置类型下获取的单个数据
     */
    function clickPosition(title,url,data_li,data_li_parent,n,img){
        // 用于校验城市输入框中的内容是否变化
        var checkCityName = "";
        // 用于校验当前的点击事件是否为同一个
        var checkTitle = "";
        $(title).click(function(){
            //   阻止父元素的冒泡事件
            event.stopPropagation();
            // 判断城市输入框中内容是否为空
            if($(".city_input").val().length==0){
                alert("请选择城市");
                return;
            }else{
                // console.log("checkCityName:"+checkCityName);
                // console.log("checkTitle:"+checkTitle);
                var cityName = $(".city_input").val();
                if(cityName != checkCityName || $(title).html()!=checkTitle){
                    checkCityName = cityName;
                    checkTitle = $(title).html();
                    // 所有数据对象
                    var data_str_all = [];
                    // 所有数据
                    var data_str = [];
                    $.ajax({
                        method: "GET",
                        url: url,
                        dataType: "json",
                        data: {
                            cityName:cityName
                        },
                        xhrFields: {
                            withCredentials: true // 允许跨域名储存和访问cookie
                        }
                    })
                    .done(function(data){
                        if(data.code == "success"){
                            
                            data_str_all = data.data;
                            $.each(data_str_all,function(a,val){
                                data_str.push(val);
                            })
                            console.log("data_str:"+data_str);
                            var data_list = "";
                            for(var i=0;i<data_str[1].length;i++){
                                data_list += '<li title="'+data_str[1][i]+'">'+data_str[1][i]+'</li>'
                            }
                            // console.log("data_list:"+data_list);
                            $(data_li).remove();
                            $(data_li_parent).append(data_list);
                            $(data_li).width($(data_li_parent).width()/n);
                            // 点击页面任意位置隐藏
                            clickHide();
                            // 点击的标题变色 ul显示
                            clickTitleEvent(title,img,data_li_parent);
                            // 点击哪个元素就给哪个添加position_active 赋值 其余清除赋值
                            clickContentEvent(data_li_parent,data_li_parent,title,img)
                        }else{
                            alert("未找到该城市");
                            return;
                        }
                    })
                }else{
                    clickHide();
                    // 点击的标题变色 ul显示
                    clickTitleEvent(title,img,data_li_parent);
                    // 点击哪个元素就给哪个添加position_active 赋值 其余清除赋值
                    clickContentEvent(data_li_parent,data_li_parent,title,img)
                    // console.log("data_li_parent:"+data_li_parent);
                }
            }
        })
    }
  // 点击事件定义函数（行政区、商圈、景点）end
  // 用于校验城市输入框中的内容是否变化
  var checkCityName1 = "";
  // 点击事件地铁站start
    $(".Metro-station-text").click(function(){
        //   阻止父元素的冒泡事件
        event.stopPropagation();
        if($(".city_input").val().length==0){
            alert("请选择城市");
            return;
        }else{
            var cityName = $(".city_input").val();
            if(cityName!=checkCityName1){
                console.log("cityName:"+cityName);
                checkCityName1 = cityName;
                 console.log(checkCityName1);
                $.ajax({
                    method: "GET",
                    url: url+"v1/city/subway/station",
                    // url: "../php/ditie.js",
                    dataType: "json",
                    data: {
                        cityName: cityName
                    },
                    xhrFields: {
                        withCredentials: true // 允许跨域名储存和访问cookie
                    }
                })
                .done(function(data){
                    if(data.code == "success"){
                        var subway_line = []; //地铁线路
                        var subway_station = []; //地铁站
                        var data_subway = data.data.subway;
                        //获取数据
                        $.each(data_subway,function(i,val){
                            subway_line.push(i);
                            subway_station.push(val);
                        })
                        // console.log("subway_line:"+subway_line);
                        // console.log("subway_station:"+subway_station);
                        // 清除原有数据
                        $(".metro-line li").remove();
                        $(".Metro-line-content ul").remove();
                       // 地铁线添加start
                        var line_list = "";
                        for(var i=0;i<subway_line.length;i++){
                            console.log(subway_line[i].split("铁")[1]);
                            line_list += '<li>'+subway_line[i].split("铁")[1]+'</li>';
                           // 地铁站添加start
                            var station_list = "";
                            station_list += '<ul class="'+subway_line[i].split("铁")[1]+'" style="display:none">';
                            for(var j=0;j<subway_station[i].length;j++){
                                station_list += '<li title="'+subway_station[i][j]+'">'+subway_station[i][j]+'</li>';
                            }
                            station_list += '</ul>';
                            // console.log(station_list);
                            $(".Metro-line-content").append(station_list);
                            $(".Metro-line-content ul li").width($(".Metro-content").width()/6);
                           // 地铁站添加end
                        }
                        $(".metro-line").append(line_list);
                        $(".metro-line li").eq(0).addClass("position-active");
                        $(".Metro-line-content ul").eq(0).show();
                        clickTitleEvent(".Metro-station-text",".Metro-station img",".Metro-content");
                        
                       // 地铁线添加end
                        // 地铁线路点击start
                        $(".metro-line").on("click","li",function(){
                             //   阻止父元素的冒泡事件
                            event.stopPropagation();
                            console.log($(this).index());
                            var index = $(this).index();
                            $(this).siblings("li").removeClass("position-active");
                            $(this).addClass("position-active");
                            // 地铁站显示
                            $(".Metro-line-content ul").eq(index).siblings().hide();
                            $(".Metro-line-content ul").eq(index).show();
                        })
                        // 地铁线路点击end
                        // 地铁站点击start
                        clickContentEvent(".Metro-line-content",".Metro-content",".Metro-station-text",".Metro-station img");
                        // 点击页面中任意位置 隐藏
                        clickHide();
                        // 地铁站点击end
                    }else{
                        alert("未找到该城市");
                        return;
                    }
                })
            }else{
                clickTitleEvent(".Metro-station-text",".Metro-station img",".Metro-content");
                // 点击页面中任意位置 隐藏
                clickHide();
               // 地铁线添加end
                // 地铁线路点击start
                $(".metro-line").on("click","li",function(){
                    console.log($(this).index());
                    var index = $(this).index();
                    $(this).siblings("li").removeClass("position-active");
                    $(this).addClass("position-active");
                    // 地铁站显示
                    $(".Metro-line-content ul").eq(index).siblings().hide();
                    $(".Metro-line-content ul").eq(index).show();
                })
                // 地铁线路点击end
                // 地铁站点击start
                clickContentEvent(".Metro-line-content",".Metro-content",".Metro-station-text",".Metro-station img");
                // 点击页面中任意位置 隐藏
                clickHide();
                // 地铁站点击end
            }
        }
    })
  // 点击事件地铁站end
  // 点击事件车站start
  var checkCityName2 = "";
  $(".Station-text").click(function(){
      //   阻止父元素的冒泡事件
      event.stopPropagation();
    if($(".city_input").val().length==0){
        alert("请选择城市");
        return;
    }else{
        var cityName = $(".city_input").val();
        console.log("cityName:"+cityName);
        if(cityName!=checkCityName2){
            console.log("checkCityName2:"+checkCityName2);
            checkCityName2 = cityName;
            // 进行ajax请求
            $.ajax({
                method: "GET",
                url: url+"v1/city/station",
                // url: "../php/chezhan.js",
                dataType: "json",
                data: {
                    cityName: cityName
                },
                xhrFields: {
                    withCredentials:true
                }
            })
            .done(function(data){
                console.log(1111);
                if(data.code == "success"){
                    // 清除原有数据
                    $(".Station-content li").remove();
                    // 全部数据对象
                    var station_code_all = data.data.station;
                    console.log("station_code_all:"+station_code_all);
                    // 全部车站数据
                    var station_code = [];
                    $.each(station_code_all,function(i,val){
                        station_code.push(val);
                    })
                    console.log("station_code:"+station_code);
                  // 火车站
                    var train_list="";
                    for(var i=0;i<station_code[0].length;i++){
                        train_list += '<li title="'+station_code[0][i]+'">'+station_code[0][i]+'</li>'
                    }
                    $(".station-train").append(train_list);
                    $(".station-train li").width($(".station-train").width()/4);
                    // div的高度 = li标签总数除以每行元素个数向上取整 * li标签行高
                    $(".station-train").parent().height(Math.ceil($(".station-train li").length/4)*$(".station-train li").height());
                  // 长途汽车站
                    var bus_list = "";
                    for(var i=0;i<station_code[1].length;i++){
                        bus_list += '<li title="'+station_code[1][i]+'">'+station_code[1][i]+'</li>';
                    }
                    // 插入数据
                    $(".station-bus").append(bus_list);
                    $(".station-bus li").width($(".station-bus").width()/3);
                    $(".station-bus").parent().height(Math.ceil($(".station-bus li").length/3)*$(".station-bus li").height());
                    console.log('$(".station-bus").parent().height:'+$(".station-bus").parent().height());
                  // 飞机场
                    var airport_list = "";
                    for(var i=0;i<station_code[2].length;i++){
                        airport_list += '<li title="'+station_code[2][i]+'">'+station_code[2][i]+'</li>';
                    }
                    // 插入数据
                    $(".station-airport").append(airport_list);
                    $(".station-airport li").width($(".station-airport").width()/3);
                    $(".station-airport").parent().height(Math.ceil($(".station-airport li").length/3)*$(".station-airport li").height());
                    console.log('$(".station-airport").parent().height:'+$(".station-airport").parent().height());
                    // 点击的title发生变化 内容框显示
                    clickTitleEvent(".Station-text",".Station>img",".Station-content");
                    // 点击任意地方隐藏
                    clickHide();
                    // 车站的点击事件
                    clickContentEvent(".Station-content",".Station-content",".Station-text",".Station>img");
                }else{
                    alert("未找到该城市");
                    return;
                }
            })
        }else{
            // 点击的title发生变化 内容框显示
            clickTitleEvent(".Station-text",".Station>img",".Station-content");
            // 点击任意地方隐藏
            clickHide();
            // 车站的点击事件
            clickContentEvent(".Station-content",".Station-content",".Station-text",".Station>img");
        }
    }
  })
  // 点击事件车站end
  
  // 定义调用函数start  
    // 点击标题变色 ul显示
    function clickTitleEvent(title,img,data_li_parent){
        
         // 行政区
         $(".Administrative-text").removeClass("area-active");
         $(".Administrative-area img").css("transform","rotate(0deg)");
         $(".Administrative-content").hide();
         // 商圈
         $(".trading-text").removeClass("area-active");
         $(".trading img").css("transform","rotate(0deg)");
         $(".trading-content").hide();
         // 地铁站
         $(".Metro-station-text").removeClass("area-active");
         $(".Metro-station img").css("transform","rotate(0deg)");
         $(".Metro-content").hide();
         // 车站
         $(".Station-text").removeClass("area-active");
         $(".Station>img").css("transform","rotate(0deg)");
         $(".Station-content").hide();
         // 景点
         $(".scenic-spot-text").removeClass("area-active");
         $(".scenic-spot img").css("transform","rotate(0deg");
         $(".scenic-spot-content").hide();
         // 当前点击区域框
         $(title).addClass("area-active");
         $(img).css("transform","rotate(180deg)");
         $(data_li_parent).show();
    }
    // 点击哪个元素就给哪个添加position_active 赋值 其余清除赋值
    /**
     * 
     * @param {*} data_li_parent 
     * @param {*} positon_data 选中位置类型下获取的单个数据
     */
    function clickContentEvent(data_li_parent1,data_li_parent2,title,img){
        $(data_li_parent1).on("click","li",function(){
           //  给所有的标题删除类
           $(".area-name").removeClass("positionType_active");
            // 给当前点击的标题添加类
            $(title).addClass("positionType_active");
            $(this).siblings("li").removeClass("position-active");
            //定义数据全部清空 
            clearPositionData();
             // 选中的定义数据
             console.log($(this));
             $(this).addClass("position-active");
            
            //  不限button
             $(".position .unlimited").css("background","rgba(149,149,149,0.5)");
             position = $(this).html();
            //  位置类型
            // positionType += "['";
             positionType = $(title).html();
            //  positionType += "']";
             console.log("positionType",positionType);
             console.log("$(this).html():"+$(this).html());
             console.log("position:"+position);
             $(data_li_parent2).hide();
             $(title).removeClass("area-active");
             $(img).css("transform","rotate(0deg)");
             
        })
    }
    //定义数据全部清空
    function clearPositionData(){
        // 位置类型
        positionType = "";
        // 位置
        position = "";
        //行政区  
        // Administrative_position = "";
        $(".Administrative-content li").removeClass("position-active");
        // 商圈
        // trading_position = "";
        $(".trading-content li").removeClass("position-active");
        // 地铁站
        // Metro_position = "";
        $(".Metro-line-content li").removeClass("position-active");
        // 车站
        // Station_position ="";
        $(".Station-content li").removeClass("position-active");
        // 景点
        // scenic_spot_position = "";
        $(".scenic-spot-content li").removeClass("position-active");
    }
    // 点击页面中任意位置 显示的选择框隐藏
    function clickHide(){
        $(document).click(function(){
            // $(data_li_parent).hide();
            clickTitleEvent();
        })
    }
  // 定义调用函数end 
   // 不限button start
    $(".position .unlimited").click(function(){
        console.log(11111111);
        // 清除所有数据
        clearPositionData();
        // button颜色变化
        $(".position .unlimited").css("background","#5944C3");
    })
   // 不限button end
// 位置end
// 定义函数（价格、星级）start
  // 选择框点击事件
    /**
     * 
     * @param {*} li_parent 如price、star
     * @param {*} data_type data-price 
    //  * @param {*} param priceRange
     */
    function checkBoxClick(li_parent){
            // 所有价格下的图片都变回原图
        $(this).siblings("li").find("img").attr("src","../img/icon_checkbox.png");
            // 该li标签下的图片更改
        $(this).find("img").attr("src","../img/icon_checkbox_choose.png");
            //  不限按钮变色灰色
        $(li_parent).find(".unlimited").css("background","rgba(149,149,149,0.5)");
    }
    
  // 不限按钮点击 
    function unlimitedBtnClick(li_parent,param){
        $(li_parent).find(".unlimited").click(function(){
            $(this).css("background","#5944C3");
            $(this).siblings("li").find("img").attr("src","../img/icon_checkbox.png");
            $(this).siblings("li").find("img").removeClass("img_active");
            param = "";
            // $(li_parent).find(".ok_btn").css("background","rgba(149,149,149,0.5)")
            // $(li_parent).find(".ok_btn").attr("disabled","disabled");
        })
    }
// 定义函数（价格、星级）end
// 价格start
   // 定义价格区间
    var priceRange = "";
    // 价格选择框点击
    $(".price").find("li").click(function(){
        // 所有价格下的图片都变回原图
        $(this).siblings("li").find("img").attr("src","../img/icon_checkbox.png");
        // 清除选择了的类名
        $(this).siblings("li").find("img").removeClass("img_active");
        // 自定义价格清空
        $(".Custom-price input").val("");
        $(".Custom-price input").attr("min","1");
        // 按钮变灰色
        $(".Custom-price .ok_btn").css("background","rgba(149,149,149,0.5)");
        // 不可用
        $(".Custom-price .ok_btn").attr("disabled","disabled");
        priceRange = "";
        // 该li标签下的图片更改
         $(this).find("img").attr("src","../img/icon_checkbox_choose.png");
         $(this).find("img").addClass("img_active");
        //  不限按钮变色灰色
        $(".price").find(".unlimited").css("background","rgba(149,149,149,0.5)");
        console.log('$(this).attr("data-price"):'+$(this).attr("data-price"));
        priceRange = $(this).attr("data-price");
        console.log("priceRange:"+priceRange);
    })
    // 自定义价格start
    //左侧低价输入框失去焦点时 右侧的最小值变为低价的值
    $(".lower-limit").blur(function(){
        $(".upper-limit").attr("min",$(".lower-limit").val());
        if($(".Custom-price input").val()<0){
            alert("价格不能低于0元");
            return;
        }
    })
    //右侧高价输入框失去焦点时 左侧的最大值变为高价的值
    $(".upper-limit").blur(function(){
        $(".lower-limit").attr("max",$(".upper-limit").val());
        if($(".Custom-price input").val()<0){
            alert("价格不能低于0元");
            return;
        }
    })
    $(".Custom-price input").blur(function(){
        console.log('$(".lower-limit").val():'+$(".lower-limit").val());
        console.log('$(".upper-limit").val():'+$(".upper-limit").val());
        // 检测左右输入框中内容是否为空 
        if($(".lower-limit").val().length==0 || $(".upper-limit").val().length==0){
            // 按钮变为灰色
            $(".Custom-price .ok_btn").css("background","rgba(149,149,149,0.5)");
            // 不可用
            $(".Custom-price .ok_btn").attr("disabled","disabled");
        }else{
            if($(".lower-limit").val()>$(".upper-limit").val()){
                alert("下限价格不能低于上限价格");
                return;
            }else {
                     // 所有价格下的图片都变回原图
                    $(".price li").find("img").attr("src","../img/icon_checkbox.png");
                    // 不限按钮变为灰色
                    $(".price .unlimited").css("background","rgba(149,149,149,0.5)");
                    $(".Custom-price .ok_btn").css("background","#5944C3");
                    // 可用
                    $(".Custom-price .ok_btn").removeAttr("disabled");
                }
        }
    })
    // 不限按钮
    $(".price .unlimited").click(function(){
        $(".Custom-price input").val("");
        $(".Custom-price input").attr("min","1");
        // 按钮变灰色
        $(".Custom-price .ok_btn").css("background","rgba(149,149,149,0.5)");
        // 不可用
        $(".Custom-price .ok_btn").attr("disabled","disabled");
        priceRange = "";
        console.log("priceRange:"+priceRange);
    })
    // 点击确认
    $(".Custom-price .ok_btn").click(function(){
        priceRange = $(".lower-limit").val() + ","+ $(".upper-limit").val();
        console.log(priceRange);
    })
   // 自定义价格end
    // 左右价格校验
        // 右边输入框的最小值为左边框的值
        console.log($(".lower-limit").val());
        $(".upper-limit").attr("min",);
        console.log(111);
        console.log('$(".lower-limit").val():'+$(".lower-limit").val());
        console.log('$(".upper-limit").attr("min"):'+$(".upper-limit").attr("min"));
// 价格end
// 星级start
    var starLevel = "";
    // 星级选择框点击
    $(".star").find("li").click(function(){
        // 所有价格下的图片都变回原图
        $(this).siblings("li").find("img").attr("src","../img/icon_checkbox.png");
        // 该li标签下的图片更改
         $(this).find("img").attr("src","../img/icon_checkbox_choose.png");
         $(this).find("img").addClass("img_active");
        //  不限按钮变色灰色
        $(".star").find(".unlimited").css("background","rgba(149,149,149,0.5)");
        console.log('$(this).attr("data-star"):'+$(this).attr("data-star"));
        starLevel = $(this).attr("data-star");
        console.log("starLevel:"+starLevel);
    })
// 星级end
// 品牌start
    var brand = "";
    $(".brand").find("li").click(function(){
        // 所有价格下的图片都变回原图
        // $(this).siblings("li").find("img").attr("src","../img/icon_checkbox.png");
            // 该li标签下的图片更改
        $(this).find("img").attr("src","../img/icon_checkbox_choose.png");
        $(this).find("img").addClass("img_active");
            //  不限按钮变色灰色
        $(".brand").find(".unlimited").css("background","rgba(149,149,149,0.5)");
        console.log('$(this).attr(data_type):'+$(this).attr("data-brand"));
        brand += $(this).attr("data-brand");
        brand += ",";
        console.log("brand:"+brand);
    })
// 品牌end
// 排序start
    // 评分
    var overallRating = "";
    // 价格 
    var price = "";
    // 距离
    var distance = "";
    // 默认
    // overallRating = -1;
     // 由低到高
    // price =1;
    // distance = 1;
     // 点击次数
     var n1=0;
     var n2=0;
     var n3=0;
   // 评价
    $(".sort-evaluate").click(function(){
        n1++;
      // 其兄弟元素恢复原状start
        n2=0;
        n3=0;
        // 价格 
        price = "";
        // 距离
        distance = "";
       // 价格
        $(".sort-price").removeClass("position-active");
        $(".sort-price img").attr("src","../img/icon_arrow_up1.png");
        price = "";
       // 距离
        $(".sort-distance").removeClass("position-active");
        $(".sort-distance img").attr("src","../img/icon_arrow_up1.png");
        distance = "";
      // 其兄弟元素恢复原状end
        if(n1==1){
            $(".sort-evaluate").addClass("position-active");
            // 白色图片
            $(".sort-evaluate img").attr("src","../img/icon_arrow_down1_white.png");
            overallRating = -1;
            getSortList(1,overallRating,price,distance);
        }
        if(n1==2){
            $(".sort-evaluate img").attr("src","../img/icon_arrow_up1_white.png");
            overallRating = 1;
            getSortList(1,overallRating,price,distance);
        }
        if(n1==3){
            $(".sort-evaluate").removeClass("position-active");
            $(".sort-evaluate img").attr("src","../img/icon_arrow_down1.png");
            overallRating = "";
            n1=0;
            getSortList(1,overallRating,price,distance);
        }
        console.log("overallRating:"+overallRating);
    })
   // 价格
    $(".sort-price").click(function(){
        n2++;
      // 其兄弟元素恢复原状start
        n1=0;
        n3=0;
        // 评分
        overallRating = "";
        // 距离
        distance = "";
       // 评价
        $(".sort-evaluate").removeClass("position-active");
        $(".sort-evaluate img").attr("src","../img/icon_arrow_down1.png");
        overallRating = "";
      // 距离
        $(".sort-distance").removeClass("position-active");
        $(".sort-distance img").attr("src","../img/icon_arrow_up1.png");
        distance = "";
     // 其兄弟元素恢复原状end
        if(n2==1){
            $(".sort-price").addClass("position-active");
            // 白色图片
            $(".sort-price img").attr("src","../img/icon_arrow_up1_white.png");
            price = 1;
            getSortList(1,overallRating,price,distance);
        }
        if(n2==2){
            $(".sort-price img").attr("src","../img/icon_arrow_down1_white.png");
            price = -1;
            getSortList(1,overallRating,price,distance);
        }
        if(n2==3){
            $(".sort-price").removeClass("position-active");
             $(".sort-price img").attr("src","../img/icon_arrow_up1.png");
             price = "";
             n2=0;
             getSortList(1,overallRating,price,distance);
        }
        console.log("price:"+price);
    })
    // 距离
    $(".sort-distance").click(function(){
        n3++;
      // 其兄弟元素恢复原状start
        n1=0;
        n2=0;
        // 评分
        overallRating = "";
        // 价格 
        price = "";
       // 评价
        $(".sort-evaluate").removeClass("position-active");
        $(".sort-evaluate img").attr("src","../img/icon_arrow_down1.png");
        overallRating = "";
       // 价格
        $(".sort-price").removeClass("position-active");
        $(".sort-price img").attr("src","../img/icon_arrow_up1.png");
        price = "";
      // 其兄弟元素恢复原状end
        if(n3==1){
            $(".sort-distance").addClass("position-active");
            // 白色图片
            $(".sort-distance img").attr("src","../img/icon_arrow_up1_white.png");
            distance = -1;
            getSortList(1,overallRating,price,distance);
        }
        if(n3==2){
            $(".sort-distance").removeClass("position-active");
            $(".sort-distance img").attr("src","../img/icon_arrow_up1.png");
            distance = "";
            n3=0;
            getSortList(1,overallRating,price,distance);
        }
        console.log("distance:"+distance);
    })

// 排序end
// 搜索获取酒店
function getHotelList(cityName,limit,page,checkTime,hotelKeyword,positionType,position,priceRange,starLevel,specialLevel,brand,overallRating,price,distance){
    $.ajax({
        method:"GET",
        url: url + "v1/hotel/list",
        // url: "../php/jiudian.js",
        dataType: "json",
        data: {
            cityName: cityName,
            limit: limit,
            page: page,
            checkTime: checkTime, //入住时间
            hotelKeyword: hotelKeyword, 
            positionType: positionType, //位置类型
            position: position,  //位置名称
            priceRange: priceRange,
            starLevel: starLevel,
            specialLevel: specialLevel,
            brand: brand,
            overallRating: overallRating,   //评分，[1, -1]，正序1，倒序-1
            price:  price,   //价格，[1, -1]
            distance: distance  //距离，[1]
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if(data.code == "success"){
            // 定义用于存储酒店位置数据的数组
            const hotelDataArry = [];
            $(".hotel-main").find(".hotel-sort").remove();
            var hotel_data = data.data.hotelList;
            var hotel_list = "";
            console.log("hotel_data.length:"+hotel_data.length);
            for(var i=0;i<hotel_data.length;i++){
                // 星级
                var start_str = "";
                for(var j=0;j<hotel_data[i].star_level;j++){
                    start_str += ' <img src="../img/icon_star.png" alt="">';
                }
                // $(".hotel-detail-start").append(start_str);
                // console.log("hotel_data[i].star_level:"+hotel_data[i].star_level);
                // console.log("start_str:"+start_str);
                // `+img_url+hotel_data[i].picture[0]+`
                hotel_list += `
                <div class="hotel-sort fl">
                    <img src="`+img_url+hotel_data[i].picture[0]+`" alt="" class="fl">
                    <div class="hotel-detail fl">
                        <span class="hotel-detail-name fl">`+hotel_data[i].name+`</span>
                        <span class="hotel-detail-start fr">`+start_str+`
                        </span>
                        <div class="hotel-detail-address fl">
                            `+hotel_data[i].address+`
                            <span class="map-link">-地图</span>
                        </div>
                    </div>
                    <!-- 评分 -->
                    <div class="hotel-score fl">
                        <span><span class="score">`+hotel_data[i].overall_rating+`</span>/5分</span>
                        <div class="comment"><span>`+hotel_data[i].comment_num+`</span>次点评</div>
                    </div>
                    <!-- 价格 查看详情 -->
                    <div class="hotel-price fr">
                        <span><span class="hotel-pricered">￥`+hotel_data[i].price+`</span>起</span>
                        <button class="tosee">查看详情</button>
                    </div>
                </div>
                `
                // 地图start
                var hotel_position = "";
                hotel_position = {
                    name: hotel_data[i].name,
                    location: new BMap.Point(hotel_data[i].location.lng, hotel_data[i].location.lat)
                }
                hotelDataArry.push(hotel_position);
                // 地图end
            }
            $(".hotel-main").append(hotel_list);
          
            const map = new BMap.Map("container") // 创建一个地图实例，其参数可以是元素id也可以是元素对象
            // 中心点坐标默认为位置列表中的第一个酒店数据的位置
            map.centerAndZoom(hotelDataArry[0].location, 13) // 初始化地图，设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true) // 启用滚轮放大缩小，默认禁用
            map.addControl(new BMap.ScaleControl()) // 添加控件，比例尺控件
            map.addControl(new BMap.NavigationControl({
                type: BMAP_NAVIGATION_CONTROL_ZOOM
            })) // 添加控件，平移缩放控件，type值表示只显示控件的缩放部分功能
            hotelDataArry.forEach(el => {
                const marker = new BMap.Marker(el.location) // 创建标注点
                // map.clearOverlays();//清除之前的覆盖物    
                map.addOverlay(marker) // 向地图添加标注点
                marker.setLabel(new BMap.Label(el.name, {
                    offset: new BMap.Size(20)
                })) // 向标注点添加标注文本
            })
            $.each($(".hotel-sort"),function(index,el){
                /** 点击哪一个酒店下的地图 该酒店位置就是中心点坐标 
                //添加星号（未实现）
                // 返回当前列表索引*/
                $(this).find(".map-link").click(function(){
                    console.log(index);
                    map.centerAndZoom(hotelDataArry[index].location, 13) // 初始化地图，设置中心点坐标和地图级别
                    // const marker = new BMap.Marker(hotelDataArry[index].location) // 创建标注点
                    // const icon = new BMap.Icon('../img/error.png','25px');
                    // map.clearOverlays();//清除之前的覆盖物
                    // marker.setIcon(icon); //添加覆盖物
                    // map.addOverlay(marker) //向地图添加标注点
                })
                // 查看详情start
                $(this).find(".tosee").click(function(){
                    // console.log(hotel_data[index]._id);
                    window.open("HotelDetails.html?hotelId="+hotel_data[index]._id);
                })
                // 查看详情end
            })
        }
    })
}
// 搜索排序数据
function getSortList(page,overallRating,price,distance){    
    // 城市
    var cityName = $(".city_input").val();
    // 日期
    var checkTime = $(".time_input").attr("data-time");
    // 关键字
    var hotelKeyword = $(".hotelKeyword").val();
    // 位置类型
    var positionType = "";
    if($(".area-name.positionType_active").html()!=undefined){
        positionType = $(".area-name.positionType_active").html();
    }
    console.log("positionType1:"+positionType);
    // 位置名称
    var position = "";
    if($(".position-area .position-active").html()!=undefined){
        position = $(".position-area .position-active").html();
    }
    var position = $(".position-area .position-active").html();
    console.log("position1:"+position);
    // 价格区间
    var priceRange = "";
    if($(".lower-limit").val().length!=0 && $(".upper-limit").val().length!=0){
        priceRange = $(".lower-limit").val() + ","+ $(".upper-limit").val();
    }else if($(".price .img_active").parent("li").attr("data-price")!=undefined){
        priceRange = $(".price .img_active").parent("li").attr("data-price");
    }
    console.log("priceRange1:"+priceRange);
    // 星级
    var starLevel = "";
    if($(".star .img_active").parent("li").attr("data-star")!=undefined){
        starLevel = $(".star .img_active").parent("li").attr("data-star");
    }
    console.log("starLevel1:"+starLevel);
    // 品牌类型
    var specialLevel = "";
    // 品牌
    var brand = "";
    if($(".brand .img_active").parent("li").attr("data-brand")!=undefined){
        for(var i=0;i<$(".brand .img_active").length;i++){
            brand += $(".brand .img_active").eq(i).parent("li").attr("data-brand");
            brand += ",";
        }
    }
    console.log("brand1:"+brand);
    $.ajax({
        method: "GET",
        url: url + "v1/hotel/list",
        // url: "../php/jiudian.js",
        dataType: "json",
        data: {
            cityName: cityName,
            limit: 4,
            page: page,
            checkTime: checkTime, //入住时间
            hotelKeyword: hotelKeyword, 
            positionType: positionType, //位置类型
            position: position,  //位置名称
            priceRange: priceRange,
            starLevel: starLevel,
            specialLevel: specialLevel,
            brand: brand,
            overallRating: overallRating,   //评分，[1, -1]，正序1，倒序-1
            price:  price,   //价格，[1, -1]
            distance: distance  //距离，[1]
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if(data.code == "success"){
            $(".hotel-main").find(".hotel-sort").remove();
            var hotel_data = data.data.hotelList;
            var hotel_list = "";
            console.log("hotel_data.length:"+hotel_data.length);
            for(var i=0;i<hotel_data.length;i++){
                // 星级
                var start_str = "";
                for(var j=0;j<hotel_data[i].star_level;j++){
                    start_str += ' <img src="../img/icon_star.png" alt="">';
                }
                // $(".hotel-detail-start").append(start_str);
                // console.log("hotel_data[i].star_level:"+hotel_data[i].star_level);
                // console.log("start_str:"+start_str);
                // `+img_url+hotel_data[i].picture[0]+`
                hotel_list += `
                <div class="hotel-sort fl">
                    <img src="`+img_url+hotel_data[i].picture[0]+`" alt="" class="fl">
                    <div class="hotel-detail fl">
                        <span class="hotel-detail-name fl">`+hotel_data[i].name+`</span>
                        <span class="hotel-detail-start fr">`+start_str+`
                        </span>
                        <div class="hotel-detail-address fl">
                            `+hotel_data[i].address+`
                            <span class="map-link">-地图</span>
                        </div>
                    </div>
                    <!-- 评分 -->
                    <div class="hotel-score fl">
                        <span><span class="score">`+hotel_data[i].overall_rating+`</span>/5分</span>
                        <div class="comment"><span>`+hotel_data[i].comment_num+`</span>次点评</div>
                    </div>
                    <!-- 价格 查看详情 -->
                    <div class="hotel-price fr">
                        <span><span class="hotel-pricered">￥`+hotel_data[i].price+`</span>起</span>
                        <button class="tosee">查看详情</button>
                    </div>
                </div>
                `
               
            }
            $(".hotel-main").append(hotel_list);
            // // 查看详情start
            // $(".tosee").click(function(){
            //     window.open("HotelDetails.html?hotelId="+hotel_data[i]._id);
            // })
            // // 查看详情end
        }
    })
}
// 日历start
    var Check_i = "";  //用来保存入住的li下标
    var leave_i = "";  //用来保存离开的li下标
    function Choice_hotel_time(){       //选取住店和离店日期
        var time_li = $(".now_month_div .day ul li");   //用来保存左侧days天数的li;
        var right_li = $(".next_month_div .day ul li"); //用来保存右侧days天数的li;
        for(i=0;i<right_li.length;i++){ 
            time_li.push(  right_li[i] );   //右侧days天数的li push 进总的数组
        }
        for(i=0;i<time_li.length;i++){
            $( time_li[i] ).attr("data-subscript", i );
            $( time_li[i] ).click(function(){
                if( $(this).attr("class") != "disable"){
                    if( $(this).attr("data-subscript") === Check_i){
                        $(this).html( $(this).attr("data-day") );
                        $(this).removeClass("the_hotel");
                        $(this).addClass("start");
                        Check_i = "";
                    }else if( Check_i === ""){
                        $(this).removeClass("start");
                        $(this).addClass("the_hotel");
                        $(this).html("入住"); 
                    }else if( Check_i !== ""){
                        if($(this).attr("data-subscript") < Check_i ){
                            alert("选取离开时间不能在入住时间之前");
                            for(i=0;i<time_li.length;i++){
                                $(time_li[i]).html( $(time_li[i]).attr("data-day") );
                                $(time_li[i]).removeClass("the_hotel");
                                $(time_li[i]).removeClass("leave");
                                Check_i = ""; 
                            }
                        }else{
                            $(this).removeClass("the_hotel");
                            $(this).addClass("leave");
                            $(this).html("离开");
                            
                        }
                    }
                    for(i=0;i<time_li.length;i++){
                        if( $(time_li[i]).attr("class") == "the_hotel" ){
                            Check_i = i;
                        }
                        if( $(time_li[i]).attr("class") == "leave" ){
                            leave_i = i;
                        } 
                    }
                    if( Check_i !== "" && leave_i !== ""){
                        setTimeout(function(){
                            $(".date_time").hide();
                            var now_month_div = $(".now_month_div .day li");
                            for(i=0;i<now_month_div.length;i++){
                                $(now_month_div[i]).html( $(now_month_div[i]).attr("data-day") );
                                $(now_month_div[i]).removeClass("the_hotel");
                                $(now_month_div[i]).removeClass("leave");
                            }
                            var next_month_div = $(".next_month_div .day li");
                            for(i=0;i<next_month_div.length;i++){
                                $(next_month_div[i]).html( $(next_month_div[i]).attr("data-day") );
                                $(next_month_div[i]).removeClass("the_hotel");
                                $(next_month_div[i]).removeClass("leave");
                            }
                        },300);
                        console.log( "入住时间："+$(time_li[Check_i]).attr("data-id")+"离开时间"+$(time_li[leave_i]).attr("data-id"));
                        var timer =  $(time_li[Check_i]).attr("data-id") + "至" + $(time_li[leave_i]).attr("data-id");
                        var timer_stamp = $(time_li[Check_i]).attr("data-time")+","+$(time_li[leave_i]).attr("data-time");
                        $(".time_input").val( timer );
                        $(".time_input").attr( "data-time",timer_stamp);
                        // Check_i = "";
                        // leave_i = "";
                    }
                }
            })
        }
    }
    function date_time_hide(){    //页面点击日历事件
        $(".select-datatime").find(".date_time").hide();
        Check_i = "";
        leave_i = "";
        var now_month_div = $(".now_month_div .day li");
        for(i=0;i<now_month_div.length;i++){
            $(now_month_div[i]).html( $(now_month_div[i]).attr("data-day") );
            $(now_month_div[i]).removeClass("the_hotel");
            $(now_month_div[i]).removeClass("leave");
        }
        var next_month_div = $(".next_month_div .day li");
        for(i=0;i<next_month_div.length;i++){
            $(next_month_div[i]).html( $(next_month_div[i]).attr("data-day") );
            $(next_month_div[i]).removeClass("the_hotel");
            $(next_month_div[i]).removeClass("leave");
        }
    }
    $(document).click(function(){
        date_time_hide();
    });
    $(".select-datatime").click(function(event){
        event.stopPropagation();
        $(".date_time").show();
        $(".select-city-div").hide();
    });
// 日历end
