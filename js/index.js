$(document).ready(function(){
    addHeader();
    addFooter();
    checkLogin();
    getAllCity();
    // 动态添加城市类标题
    addSelectCityTitle();
    // 日历
    Add_a_calendar( new Date().getFullYear() , new Date().getMonth()+1 , new Date().getDate()); //页面打开加载左右日历
})
// 获取所有的城市
   var all_city = "";
   function getAllCity(){
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
               // 添加热门城市导航栏
                 addHotCityNav();
           }
       })
   }
  // 动态添加城市类型标题
   function addSelectCityTitle(){
       // getAllCity();
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
// 搜索 
$(".search-btn").click(function(){
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
    var time = $(".time_input").attr( "data-time");
    // var a={
    //     checkTime:checkTime,
    //     hotelKeyword:hotelKeyword,
    //     cityName:cityName
    // }
    // console.log("a:"+a);
    // // 字符串
    // var b=JSON.stringify(a);
    // console.log("b:"+b);
    // // 编码
    // var c = encodeURIComponent(b);
    // console.log("c:"+c);
    window.location.href="HotelFilter.html?cityName="+cityName+"&checkTime="+checkTime+"&hotelKeyword="+hotelKeyword+"&time="+time;
})

   // 添加热门城市导航栏
function addHotCityNav(){
    // console.log(all_city);
    var hot_str = "";
    for(var i=0;i<all_city.hot.length;i++){
        hot_str += '<li><span>'+all_city.hot[i].cityName+'</span></li>';
    }
    $(".hot-hotel-city li").remove();
    $(".hot-hotel-city").append(hot_str);
    $(".hot-hotel-city li").eq(0).append('<div class="hot-hotel-title-sharp"></div>');
    // 添加热门酒店
    addHotCityHotel($(".hot-hotel-city li span").eq(0).html(),1,1);
}
// 热门城市导航栏点击事件
$(".hot-hotel-city").on("click","li",function(){
    $(".hot-hotel-title-sharp").remove();
    $(this).append('<div class="hot-hotel-title-sharp"></div>');
    // 动态添加热门城市
    
    addHotCityHotel($(this).find("span").html(),1,1);
})
// 热门城市动态添加
function addHotCityHotel(cityName,limit,page){
    $.ajax({
        method: "GET",
        // url: "../php/jiudian.js",
        url: url + "v1/hotel/list",
        dataType: "json",
        data: {
            cityName: cityName,
            limit: limit,
            page: page
        },
        xhrFields: {
            withCredentials: true // 允许跨域名储存和访问cookie
        }
    })
    .done(function(data){
        if(data.code == "success"){
            console.log(data.data);
            var hotel_data = data.data.hotelList;
            var hotel_list = "";

            for(var i=0;i<hotel_data.length;i++){
                var hotel_style = "";
                if(hotel_data[i].price <300){
                    hotel_style = "高档型";
                }else if(hotel_data[i].price >= 300){
                    hotel_style = "豪华型";
                }
                hotel_list += `
                <li>
                    <a href="HotelDetails.html?hotelId=`+hotel_data[i]._id+`">
                        <img src="`+img_url+hotel_data[i].picture[0]+`" alt="">
                        <div class="hotel-information clearfix">
                            <span class="hotel-name">`+hotel_data[i].name+`</span>
                            <span class="fr">`+hotel_style+`</span>
                            <div class="hotel-price">`+hotel_data[i].price+`</div>
                        </div>
                    </a>
                </li>
            `
            }
            $(".hotel-line li").remove();
            $(".hotel-line div").remove();
            $(".hotel-line").append(hotel_list);
            return;
        }if(data.code == "hotel_not_found"){
            $(".hotel-line li").remove();
            $(".hotel-line").append('<div class="hotel-error"><img src="../img/abc.png">暂无酒店数据</div>');
            return;
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
