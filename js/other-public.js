


// 搜索框选择城市satrt
    $(".city_input").click(function(){
        $(".select-city-div").show();
        addCity($(".select-city-div-title li")[0],all_city);
    })
   // 获取所有的城市
    var all_city = "";
    function getAllCity2(){
        $.ajax({
            method: "GET",
            // url: url+"v1/city/list",
            url: "../php/city.js",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            if(data.code == "success"){
                all_city = data.data;
                console.log(all_city);
                // // 添加热门城市导航栏
                //   addHotCityNav();
            }
        })
    }
   // 动态添加城市类型标题
    function addSelectCityTitle(){
        var city_title = [
            {name:"热门",id:"hot"},
            {name:"ABCDEF",id:"abcdef"},
            {name:"GHJK",id:"ghjk"},
            {name:"LMNPQ",id:"lmnpq"},
            {name:"RSTW",id:"rstw"},////
            {name:"XYZ",id:"xyz"}
        ];
        var str="";
        for(var i=0;i<city_title.length;i++){
            str+='<li id="'+city_title[i].id+'">'+city_title[i].name+'</li>';
        }
        $(".select-city-div-title").append(str);
        $(".select-city-div-title li").width($(".select-city-div-title").width()/city_title.length);
        $(".select-city-div-title li")[0].className = "title-active";
        $(".select-city-div-title li").hover(function(){
            $(".select-city-div-title li").removeClass("title-active");
            this.className = "title-active";
            console.log(this.id);
            addCity(this,all_city);            
        })
        
    }
   //动态添加城市
    /**
        * 
        * @param {*} city_type 城市的类型
        *  @param {*} data 所有城市
        */
        function addCity(city_type,data){
            // getAllCity();
            var city_str = "";
            var city_data = [];
            city_str += '<ul class="select-city-div-content" id="'+city_type+'">';
            if($(city_type).attr("id") == "hot"){
                for(var i=0;i<data.hot.length;i++){
                    city_str += '<li>'+data.hot[i].cityName+'</li>';
                }
            }else{
                for(let i in data.cityList){
                    if($(city_type).attr("id").indexOf(data.cityList[i][0].cityFirstLetter)>=0){
                        city_data.push(data.cityList[i]);
                    }
                }
                for(var i=0;i<city_data.length;i++){
                    for(var j=0;j<city_data[i].length;j++){
                        city_str += '<li>'+city_data[i][j].cityName+'</li>';
                    }
                }
            }
            city_str += '</ul>';
            $(".select-city-div-content").remove();
            $(".select-city-div").append(city_str);
            $(".select-city-div-content li").width($(".select-city-div-content").width()/6);
            $(".select-city-div-content li").hover(function(){
                $(".select-city-div-content li").removeClass("title-active");
                this.className = "title-active";
            })
            // 城市点击事件
            $(".select-city-div").on("click",".select-city-div-content li",function(){
                $(".city_input").val($(this).html());
                $(".select-city-div").hide();
            })
        } 
        $(document).click(function(){
            $(".select-city-div").hide();
        })
        // 阻止父元素的冒泡事件
        $(".city_input").click(function(event){
            event.stopPropagation();
            $(".select-city-div").show();
            $(".date_time").hide();
        })
// 搜索框选择城市end
/** 日历start */
    // 日期
    /**
     * @param  {} year  年份
     * @param  {} month 月份  
     * @param  {} day_one   当前日历显示天数的第一个li
     */
    function getWeek(year,month,day_one){  //判断月份第一天是周几
        //1.根据年度和月份，创建日期
        //应该先对year,month进行整数及范围校验的。
            var margin_left = 32;
            var d = new Date();
            d.setYear(year);
            d.setMonth(month-1);
            d.setDate(1);
            d.getDay(); //判断月份第一天是周几 周天 返回 0
            day_one.css("margin-left", margin_left  * d.getDay()+"px" );
    }     
    /**
     * @param  {} year  年
     * @param  {} month 月
     * @param  {} day   日
     */
    var time_stamp = ""; //用来保存时间戳
    function Conversion_timestamp(year,month,day){ //转换指定时间时间戳
        // 获取某个时间格式的时间戳
        var stringTime = year+"-"+month+"-"+day;
        var timestamp2 = Date.parse(new Date(stringTime));
        // timestamp2 = timestamp2 / 1000;
        // timestamp2 = timestamp2;
        
        time_stamp = timestamp2;
    }

    /**
     * @param  {} year  传入指定年份
     * @param  {} month 传入指定月份
     */
    var days;   //保存指定月份天数
    function judge_day_number(year,month){  //判读传入年月下的这个月的天数
        if( month == 2){
            days = year % 4 == 0 ? 29 : 28;
        }else if( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
            days = 31;
        }else{
            days = 30;
        }
    }

    /**
     * @param  {} year  传入左边日历年份
     * @param  {} month 传入左边日历月份
     */
    function last_btn(year,month){    //判断上年上月按钮是否显示
        if( year <= new Date().getFullYear() ){
            $(".last_year").css("display","none");
        }else{
            $(".last_year").css("display","block");
        }
        if( month<= new Date().getMonth()+1 && year <= new Date().getFullYear()){
            $(".last_month").css("display","none");
        }else{
            $(".last_month").css("display","block");
        }
    }
    /**
     * @param  {} left_year         左侧日历年
     * @param  {} left_month        左侧日历月
     * @param  {} now_day           当前日
     */
    function Add_a_calendar( left_year , left_month , now_day){    //网页打开页面上动态添加 左边日历 和 右边日历
        $(".now_month_div .day ul li").remove();
        $(".next_month_div .day ul li").remove();
        var day = now_day; //当前日
        last_btn(left_year , left_month );
        var left_day_str = ""; //左侧日历天数动态数据
        var right_day_str = ""; //右侧日历天数动态数据
        var now_year =  left_year; //左侧日历年
        var now_month_div =  left_month; //左侧日历月
        $(".now_month_div .header .years .year").html( now_year );
        $(".now_month_div .header .years .month").html( now_month_div );
        judge_day_number( now_year , now_month_div);
        for( i=1;i<days+1;i++ ){
            Conversion_timestamp( now_year , now_month_div , i);
            if( i<day && now_year == new Date().getFullYear() && now_month_div == new Date().getMonth()+1 ){
                left_day_str += '<li class="disable">'+ i +'</li>';
            }else if( i == day && now_year == new Date().getFullYear() && now_month_div == new Date().getMonth()+1 ){
                left_day_str += '<li data-time="'+ time_stamp +'" data-id="'+ now_year +'年'+ now_month_div+'月'+ i +'日" data-day="今天">今天</li>';
                continue;
            }else{
                left_day_str += '<li data-time="'+ time_stamp +'" data-id="'+ now_year +'年'+ now_month_div+'月'+ i +'日" data-day="'+ i +'">'+ i +'</li>';
            } 
        }
        $(".now_month_div .day ul").append( left_day_str );
        getWeek( now_year , now_month_div , $(".now_month_div .day li:first-child") );

        var next_year; //右侧日历年
        var next_month_div; //右侧日历月
        if( now_month_div == 12){
            next_year = now_year+1;
            next_month_div = 1;
        }else{
            next_year = now_year;
            next_month_div = now_month_div + 1;
        }
        $(".next_month_div .header .years .year").html( next_year );
        $(".next_month_div .header .years .month").html( next_month_div );
        judge_day_number( next_year , next_month_div);
        for( i=1;i<days+1;i++ ){
            Conversion_timestamp( next_year , next_month_div , i);
            right_day_str += '<li data-time="'+ time_stamp +'" data-id="'+ next_year +'年'+ next_month_div+'月'+ i +'日" data-day="'+ i +'">'+ i +'</li>';
        }
        $(".next_month_div .day ul").append( right_day_str );
        getWeek( next_year , next_month_div , $(".next_month_div .day li:first-child") );
        Choice_hotel_time();
    }
    //日历四个按钮事件
    $(".next_month_div .next_month").click(function(){  //上月按钮
        var year = Number( $(".now_month_div .years .year").html() );
        var month = Number( $(".now_month_div .years .month").html() );
        if( month == 12){
            year = year + 1;
            month = 1;
            Add_a_calendar( year , month , new Date().getDate() );
        }else{
            month++;
            Add_a_calendar( year , month , new Date().getDate() );
        }
    }) 
    $(".now_month_div .last_month").click(function(){ //下月按钮
        var year = Number( $(".now_month_div .years .year").html() );
        var month = Number( $(".now_month_div .years .month").html() );
        if( month == 1){
            year = year - 1;
            month = 12;
            Add_a_calendar( year , month , new Date().getDate() );
        }else{
            month--;
            Add_a_calendar( year , month , new Date().getDate() );
        }
    })
    $(".next_month_div .next_year").click(function(){  //下年按钮
        var year = Number( $(".now_month_div .years .year").html() );
        var month = Number( $(".now_month_div .years .month").html() );
        year++;
        Add_a_calendar( year , month , new Date().getDate() );
    }) 
    $(".now_month_div .last_year").click(function(){  //上年按钮
        var year = Number( $(".now_month_div .years .year").html() );
        var month = Number( $(".now_month_div .years .month").html() );
        year--;
        if( year <= new Date().getFullYear() && month < new Date().getMonth()+1 ){
            year = new Date().getFullYear();
            month = new Date().getMonth()+1;
            Add_a_calendar( year , month , new Date().getDate() );
        }else{
            Add_a_calendar( year , month , new Date().getDate() );
        } 
    }) 
    
    
    
/** 日历end */
// 时间戳转换为日期格式start
function timestampToTime(timestamp) {
    var date = new Date(timestamp / 1000 *1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + '日';
    // h = date.getHours() + ':';
    // m = date.getMinutes() + ':';
    // s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
function timestampToTime2(timestamp) {
    var date = new Date(timestamp / 1000 *1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    // h = date.getHours() + ':';
    // m = date.getMinutes() + ':';
    // s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
// 时间戳转换为日期格式end
// 我的订单点击
    $("body").on("click",".myorder",function(){
        window.location.href = "PersonalCenter.html";
    })
// 分页start
 // 动态添加分页
  function getPaging(count,limit,page){
   
    // 页数
     var page_all =  Math.ceil(count/limit);
     console.log("page_all:"+page_all);
     console.log("page:"+page);
    // 页面底部分页动态添加
     var page_list = "";
     if(page_all<7){
         for(var i=1;i<=page_all;i++){
             page_list += '<li>'+i+'</li>';
         }
     }else{
         if(page<=3){
             for(var i=1;i<=3;i++){
                 page_list += '<li>'+i+'</li>';
             } 
             page_list += '<li>'+"..."+'</li>';
             for(var j=page_all-1;j<=page_all;j++){
                 page_list += '<li>'+j+'</li>';
             }
         }else{
             if(page_all-page <=3){
                 for(var i=page_all-4;i<=page_all;i++){
                     page_list += '<li>'+i+'</li>';
                 }
             }else{
                 for(var i=page-2;i<=page;i++){
                     page_list += '<li>'+i+'</li>';
                 } 
                 page_list += '<li>'+"..."+'</li>';
                 for(var j=page_all-1;j<=page_all;j++){
                     page_list += '<li>'+j+'</li>';
                 }
             }
         }
     }
    //  判断
     // 前一页
     if(page==1){
         $(".pre-page").attr("disabled","disabled");
     }else{
         $(".pre-page").removeAttr("disabled");
     }
     // 后一页
     if(page==page_all){
         $(".next-page").attr("disabled","disabled");
     }else{
         $(".next-page").removeAttr("disabled");
     }
     // 清除之前数据
     $(".paging ul").find("li").remove();
     // 插入数据
     $(".paging ul").append(page_list);
     // 动态添加active
     if(page_all<7){
         $(".paging ul li").eq(page-1).addClass("page-active");
     }else{
         if(page<=3){
             $(".paging ul li").eq(page-1).addClass("page-active");
         }else{
             if(page_all - page <=3){
                 $(".paging ul li").eq(page-(page_all-4)).addClass("page-active");
             }else{
                 $(".paging ul li").eq(2).addClass("page-active");
             }
         }
     }
     // $(".paging ul li").eq().addClass("page-active");
  }
// 分页end
// 判断登录状态
function checkLogin(){
    var token = localStorage.token;
    if(token!=""&&token!=undefined){
        $(".not-login").hide();
        $(".login-state").show();
        $(".user-head").attr("src",img_url+localStorage.avatar);
        $(".user-name").html(localStorage.name);
    }else{
        $(".login-state").hide();
        $(".not-login").show();
    }
}
// 退出登录
$("body").on("click",".exit",function(){
    localStorage.clear();
    window.location.href="index.html";
})
// 获取用户详细信息
function getUserDetails(){
    var token = localStorage.token;
    $.ajax({
        method:"GET",
        url: url+"v1/account/detail",
        dataType: "json",
        data: {
            token:token
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if(data.code == "success"){
            localStorage._id = data.data.account._id;
            localStorage.phone = data.data.account.phone;
            localStorage.name = data.data.account.name;
            localStorage.avatar = data.data.account.avatar;
            localStorage.weipayId =data.data.account.weipayId;
        }
    })

}
// 头部
function addHeader(){
    var str = `
    <header>
        <div class="w">
            <a class="fl">
                <img src="../img/logo_white.png" alt="">
                <span class="logo-line">|</span>
                <span>酒店项目</span>
            </a>
            <div class="fr">
                <!-- 未登录状态 -->
                <ul class="not-login" >
                    <li><a href="Login.html">登录</a></li>
                    <li><a href="Register.html">注册</a></li>
                </ul>
                <!-- 登录状态 -->
                <ul class="login-state" style="display:none">
                    <li class="toPersonalCenter">
                        <img src="`+img_url+localStorage.avatar+`" alt="" class="user-head">
                        <span class="user-name"></span>
                    </li>
                    <!-- 三角框 -->
                    <li>
                        <div class="trangel-div">
                            <img src="../img/icon_pickup.png" alt=""  class="trangle-pic">
                            <ul class="trangle-set">
                                <span class="angle"></span>
                                <li class="toPersonalCenter">
                                    <img src="../img/icon_my.png" alt="">
                                    <span class="myorder">我的订单</span>
                                </li>
                                <li class="toAccountSet">
                                    <img src="../img/icon_setting.png" alt="">
                                    <span>
                                        <a href="AccountSet.html">账户设置</a>
                                    </span>
                                </li>
                                <li>
                                    <img src="../img/icon_out.png" alt="">
                                    <span class="exit">退出登录</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <!-- 我的订单 -->
                    <li>
                        <span class="myorder">我的订单</span>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    `
    $("body").prepend(str);
    console.log("页面头部加载完成");
}
// 底部
function addFooter(){
    var str =`
    <footer>
        <span>Copyright © 2017 apis.sh All Rights Reserved | 陕ICP备15013925号-3</span>
    </footer>
    `
    $("body").append(str);
    console.log("页面底部加载完成");
}