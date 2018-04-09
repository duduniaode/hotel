$(document).ready(function(){
    // 更换酒店时 清除本地count
    localStorage.count = "";
    addHeader();
    addFooter();
    checkLogin();
    // 添加酒店详细信息
    addHotelDetails();
     // 日历
     Add_a_calendar( new Date().getFullYear() , new Date().getMonth()+1 , new Date().getDate()); //页面打开加载左右日历
     getHotelReview(1,1,'all');
})

// 日历start
    function Choice_hotel_time(){

    }
    var Check_i = "";  //用来保存入住的li下标
    var leave_i = "";  //用来保存离开的li下标
    // 入住
    $(".in-room-div").click(function(){
        event.stopPropagation();
        $(".in-room-li .date_time").show();
        $(".out-room-li .date_time").hide();
        // 点击选择入住时间
        inHotelTime();
    })
    // 离店
    $(".out-room-div").click(function(){
        event.stopPropagation();
        $(".out-room-li .date_time").show();
        $(".in-room-li .date_time").hide();
        // 点击选择入住时间
        outHotelTime();
    })
    
    //选取住店和离店日期
    // 住店
    function inHotelTime(){   
        console.log("time_li:"+time_li);    
        var time_li = $(".in-room-li .now_month_div .day ul li");   //用来保存左侧days天数的li;
        var right_li = $(".in-room-li .next_month_div .day ul li"); //用来保存右侧days天数的li;
        for(i=0;i<right_li.length;i++){ 
            time_li.push(right_li[i]);   //右侧days天数的li push 进总的数组
        }
        for(i=0;i<time_li.length;i++){
            $( time_li[i] ).attr("data-subscript", i );
          
            $( time_li[i] ).click(function(){
                if( $(this).attr("class") != "disable"){
                    if( $(this).attr("data-subscript") === Check_i){
                        $(this).html( $(this).attr("data-day") );
                        // $(this).removeClass("the_hotel");
                        $(this).addClass("start");
                        // Check_i = "";
                    }else{
                        $(this).removeClass("start");
                        $(this).addClass("the_hotel");
                        $(this).html("入住"); 
                    }
                }
                for(i=0;i<time_li.length;i++){
                    if( $(time_li[i]).attr("class") == "the_hotel" ){
                        Check_i = i;
                    }
                }
                if( Check_i !== "" ){
                    setTimeout(function(){
                        $(".in-room-li .date_time").hide();
                        var now_month_div = $(".in-room-li .now_month_div .day li");
                        for(i=0;i<now_month_div.length;i++){
                            $(now_month_div[i]).html( $(now_month_div[i]).attr("data-day") );
                            $(now_month_div[i]).removeClass("the_hotel");
                        }
                        var next_month_div = $(".in-room-li .next_month_div .day li");
                        for(i=0;i<next_month_div.length;i++){
                            $(next_month_div[i]).html( $(next_month_div[i]).attr("data-day") );
                            $(next_month_div[i]).removeClass("the_hotel");
                        }
                    },300);
                    console.log( "入住时间："+$(time_li[Check_i]).attr("data-id"));
                    var timer1 =  $(time_li[Check_i]).attr("data-id") ;
                    var timer_stamp1 = $(time_li[Check_i]).attr("data-time");
                    console.log("timer_stamp1:"+timer_stamp1);
                    $(".in-room-div .fl").html( timer1 );
                    $(".in-room-div").attr( "data-time",timer_stamp1);
                }
            })
        }
    }
    // 离店
    function outHotelTime(){
        var time_li = $(".out-room-li .now_month_div .day ul li");   //用来保存左侧days天数的li;
        var right_li = $(".out-room-li .next_month_div .day ul li"); //用来保存右侧days天数的li;
        for(i=0;i<right_li.length;i++){ 
            time_li.push( right_li[i] );   //右侧days天数的li push 进总的数组
        }
        for(i=0;i<time_li.length;i++){
            $( time_li[i] ).attr("data-subscript", i );
            $( time_li[i] ).click(function(){
                if( $(this).attr("class") != "disable"){
                    if( $(this).attr("data-subscript") === Check_i){
                        $(this).html( $(this).attr("data-day") );
                        $(this).addClass("start");
                        // Check_i = "";
                    }else if( Check_i === ""){
                        alert("请选择入住时间");
                        return;
                    }else if( Check_i !== ""){
                        console.log("Check_i:"+Check_i);
                        console.log('$(this).attr("data-subscript")'+$(this).attr("data-subscript"));
                        if($(this).attr("data-subscript") < Check_i ){
                            alert("选取离开时间不能在入住时间之前");
                            for(i=0;i<time_li.length;i++){
                                $(time_li[i]).html( $(time_li[i]).attr("data-day") );
                                // $(time_li[i]).removeClass("leave");
                                // Check_i = ""; 
                            }
                        }else{
                            $(this).removeClass("the_hotel");
                            $(this).addClass("leave");
                            $(this).html("离开");
                            
                        }
                    }
                    for(i=0;i<time_li.length;i++){
                        if( $(time_li[i]).attr("class") == "leave" ){
                            leave_i = i;
                        } 
                    }
                    if(  leave_i !== ""){
                        setTimeout(function(){
                            $(".out-room-li .date_time").hide();
                            var now_month_div = $(".now_month_div .day li");
                            for(i=0;i<now_month_div.length;i++){
                                $(now_month_div[i]).html( $(now_month_div[i]).attr("data-day") );
                                $(now_month_div[i]).removeClass("leave");
                            }
                            var next_month_div = $(".next_month_div .day li");
                            for(i=0;i<next_month_div.length;i++){
                                $(next_month_div[i]).html( $(next_month_div[i]).attr("data-day") );
                                $(next_month_div[i]).removeClass("leave");
                            }
                        },300);
                        console.log("离开时间"+$(time_li[leave_i]).attr("data-id"));
                        var timer2 = $(time_li[leave_i]).attr("data-id");
                        var timer_stamp2 = $(time_li[leave_i]).attr("data-time");
                        $(".out-room-div .fl").html( timer2 );
                        $(".out-room-div").attr( "data-time",timer_stamp2);
                    }
                }
            })
        }
    }
    $(document).click(function(){
        $(".date_time").hide();
    })
// 日历end
// 酒店详细信息start
    function addHotelDetails(){
       //获取表头路径 截取酒店id
        var hotelId = location.href.split("=")[1];
        console.log("hotelId:"+hotelId);
       // 获取数据      
        $.ajax({
            method: "GET",
            url: url+"v1/hotel/detail",
            // url: "../php/jiudianxiangqing.js",
            dataType: "json",
            data: {
                hotelId: hotelId
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            if(data.code == "success"){
                var hotel_details = data.data.hotel;
                console.log(hotel_details);
                // 酒店星级
                var hotel_star = "";
                for(var i=0;i<hotel_details.star_level;i++){
                    hotel_star += '<img src="../img/icon_star.png" alt="">';
                }
               // 酒店标题
                var hotel_title = `
                <div class="hotel-name-div clearfix fl">
                    <div class="hotel-name clearfix">
                        <span class="hotel-name-text fl">`+hotel_details.name+`</span>
                        <div class="hotel-start fl">
                            `+hotel_star+`
                        </div>
                    </div>
                    <div class="hotel-address">
                        <span>`+hotel_details.address+`</span>
                        <a class="map-link" href="#traffic-position-div">-地图</a>
                    </div>
                </div>
                <div class="hotel-score-div fl">
                    <span class="hotel-score">`+hotel_details.overall_rating+`</span>/<span class="total-score">5分</span>
                    <div>
                        <span class="comments-num">`+hotel_details.comment_num+`</span>
                        <span>次点评</span>
                    </div>
                </div>
                <div class="hotel-price-div fl">
                    <span class="hotel-price">￥`+hotel_details.price+`</span>起
                </div>
                <div class="wechat-all fr" >
                    <button class="wechat-btn fr">
                        <img src="../img/icon_share.png" alt="">
                        微信
                    </button>
                    <div class="wechat-div" style="display:none">
                        <span>使用微信扫一扫</span>
                        <div class="wechat"><img src="" alt=""></div>
                    </div>
                </div>
                `
                // 坐标
                var location = new BMap.Point(hotel_details.location.lng, hotel_details.location.lat)
                $(".hotel-title-div").append(hotel_title);
               // 酒店图片 ../img/jq.jpg  img_url+hotel_details.picture[0]
                // `+img_url+hotel_details.picture[i]+`
                var hotel_pic_arr = "";
                for(var i=1;i<hotel_details.picture.length;i++){
                    hotel_pic_arr += `<li class="hotel-picture-right"><img src="`+img_url+hotel_details.picture[i]+`" title="`+hotel_details.name+`"></li>`;
                }
                var hotel_pic = `
                    <!-- 右侧 -->
                    <div class="fr">
                        <ul class="hotel-picture-ul">
                            <li class="hotel-picture-left"><img src="`+img_url+hotel_details.picture[0]+`" title="`+hotel_details.name+`"></li>
                            `+hotel_pic_arr+`
                        </ul>
                    </div>
                `
                $(".hotel-picture").append(hotel_pic);
                // 图片点击
                $(".hotel-picture").on("click","li",function(){
                    $(".hotel-picture-left").addClass("hotel-picture-right");
                    $(".hotel-picture-left").removeClass("hotel-picture-left");
                    $(this).removeClass("hotel-picture-right");
                    $(this).addClass("hotel-picture-left");
                    $(".hotel-picture-left").remove();
                    $(".hotel-picture-ul").prepend($(this));
                })
                var hotel_room = "";
                
               // 酒店信息
                var hotel_information = "";
                    // 酒店介绍
                        // 电话传真
                    // var contact_way = "";
                    // for(var i=0;i<hotel_details.hotel_introductio.contact_way.length;i++){
                    //     contact_way += hotel_details.hotel_introductio.contact_way[i];
                    //     contact_way += " ";
                    // }
                        // 基本信息
                    var basic_info = "";
                    for(var i=0;i<hotel_details.hotel_introductio.basic_info.length;i++){
                        basic_info += hotel_details.hotel_introductio.basic_info[i];
                        basic_info += '&nbsp;&nbsp;';
                    }
                    // 酒店设施
                        // 综合设施
                    var integrated = "";
                    for(var i=0;i<hotel_details.hotel_facilities.integrated.length;i++){
                        integrated += '<li><span>'+hotel_details.hotel_facilities.integrated[i]+'</span></li>';
                    }   
                        // 客房设施
                    var room = "";
                    for(var i=0;i<hotel_details.hotel_facilities.room.length;i++){
                        room += '<li><span>'+hotel_details.hotel_facilities.room[i]+'</span></li>';
                    }
                        // 服务项目
                    var service_items = "";
                    for(var i=0;i<hotel_details.hotel_facilities.service_items.length;i++){
                        service_items += '<li><span>'+hotel_details.hotel_facilities.service_items[i]+'</span></li>';
                    }
                        // 活动设施
                    var activity = "";
                    for(var i=0;i<hotel_details.hotel_facilities.activity.length;i++){
                        activity += '<li><span>'+hotel_details.hotel_facilities.activity[i]+'</span></li>';
                    }
                hotel_information = `
                    <div class="hotel-introduce-div">
                        <div class="hotel-introduce-title">酒店介绍</div>
                        <div class="hotel-introduce-information">`+basic_info+`&nbsp;&nbsp;
                            <span class="hotel-tel">`+hotel_details.hotel_introductio.contact_way[0]+`</span>&nbsp;&nbsp;`+hotel_details.hotel_introductio.contact_way[1]+`
                        </div>
                        <div class="hotel-introduce-content">`+hotel_details.hotel_introductio.detail+`
                        </div>
                        <!-- 酒店设施 -->
                        <div class="hotel-facility-div">
                            <div class="hotel-introduce-title">酒店设施</div>
                            <!-- 综合设施 -->
                            <div class="hotel-integrated-facility clearfix">
                                <span class="facility-title fl">综合设施</span>
                                <ul class="fl">`+integrated+`
                                    <!--<li><img src="../img/icon_parking.png" alt=""><span>停车场</span></li>
                                    <li><img src="../img/icon_parking.png" alt=""><span>停车场</span></li>
                                    <li><img src="../img/icon_parking.png" alt=""><span>停车场</span></li>
                                    <li><img src="../img/icon_parking.png" alt=""><span>停车场</span></li>-->
                                </ul>
                            </div>
                            <!-- 客房设施 -->
                            <div class="hotel-room-facility clearfix">
                                <span class="facility-title fl">客房设施</span>
                                <ul class="fl">
                                    `+room+`
                                </ul>
                            </div>
                            <!-- 服务项目 -->
                            <div class="hotel-service-item clearfix">
                                <span class="facility-title fl">服务项目</span>
                                <ul class="fl">
                                    `+service_items+`
                                </ul>
                            </div>
                            <!-- 活动设施 -->
                            <div class="hotel-activity-facility clearfix">
                                <span class="facility-title fl">活动设施</span>
                                <ul class="fl">
                                    `+activity+`
                                </ul>
                            </div>
                        </div>
                        <!-- 酒店政策 -->
                        <div class="hotel-policy-div">
                            <div class="hotel-introduce-title">酒店政策</div>
                            <!-- 入店和离店 -->
                            <div class="in-out clearfix">
                                <span class="facility-title fl">入店和离店</span>
                                <ul class="fl">
                                    <li>`+hotel_details.hotel_policy.departure_time+`</li>
                                    <li>`+hotel_details.hotel_policy.entry_time+`</li>
                                </ul>
                            </div>
                            <!-- 儿童政策 -->
                            <div class="child-policy clearfix">
                                <span class="facility-title fl">儿童政策</span>
                                <ul>
                                    <li>`+hotel_details.hotel_policy.child_policy+`</li>
                                </ul>
                            </div>
                            <!-- 宠物 -->
                            <div class="pet clearfix">
                                <span class="facility-title fl">宠物</span>
                                <ul>
                                    <li>`+hotel_details.hotel_policy.pet_policy+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
                $(".hotel-information-div").append(hotel_information);
               // 酒店位置
                const map = new BMap.Map("map") // 创建一个地图实例，其参数可以是元素id也可以是元素对象
                // 中心点坐标默认为位置列表中的第一个酒店数据的位置
                map.centerAndZoom(location, 13) // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true) // 启用滚轮放大缩小，默认禁用
                map.addControl(new BMap.ScaleControl()) // 添加控件，比例尺控件
                map.addControl(new BMap.NavigationControl({
                    type: BMAP_NAVIGATION_CONTROL_ZOOM
                })) // 添加控件，平移缩放控件，type值表示只显示控件的缩放部分功能
                const marker = new BMap.Marker(location) // 创建标注点
                // map.clearOverlays();//清除之前的覆盖物    
                map.addOverlay(marker) // 向地图添加标注点
                marker.setLabel(new BMap.Label(hotel_details.name, {
                    offset: new BMap.Size(20)
                })) // 向标注点添加标注文本
            }
        })
    }
    // 标题上地图点击到位置
    $(".hotel-title-div").on("click",".map-link",function(){
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
          }, {
            duration: 500,
            easing: "swing"
          });
          return false;
    })
    // 中间导航栏点击页面到指定位置
    $(".middle-nav").find("a").click(function(){
        $(".middle-nav-active").removeClass("middle-nav-active");
        $(this).addClass("middle-nav-active");
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
          }, {
            duration: 500,
            easing: "swing"
          });
          return false;
    })
// 酒店详细信息end
// 获取微信二维码start
    $(".hotel-title-div").on("click",".wechat-btn",function(){
        event.stopPropagation();
        $(".wechat-div").show();
        $(".wechat img").attr("src",url+"v1/hotel/share");
    })
    $(document).click(function(){
        $(".wechat-div").hide();
    })
// 获取微信二维码end
// 房间信息start
    $(".search-btn").click(function(){
        if($(".in-room-div .fl").html()=="" || $(".out-room-div .fl").html()==""){
            // $(".search-btn").attr("disabled",disabled);
            // $(".search-btn").addClass("disabled");
            // $(".search-btn").removeClass("abled");
            alert("请选择查询时间范围");
            return;
        }else {
            // $(".search-btn").attr("disabled","");
            $(".search-btn").removeClass("disabled");
            $(".search-btn").addClass("abled");
            //获取表头路径 截取酒店id
            var hotelId = location.href.split("=")[1];
            console.log("hotelId:"+hotelId);
            var checkTime = $(".in-room-div").attr("data-time")+","+ $(".out-room-div").attr("data-time");
            console.log("checkTime:"+checkTime);
            $.ajax({
                method: "GET",
                url: url+"v1/hotel/room",
                // url: "../php/fangxing.js",
                dataType: "json",
                data: {
                    hotelId: hotelId,
                    checkTime: checkTime
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    var room_arr = data.data.roomList;
                    var room_list = "";
                    for(var i=0;i<room_arr.length;i++){
                        var add_class = "";
                        console.log("1:"+room_arr[i].canCheckIn);
                        if(room_arr[i].canCheckIn==true){
                            add_class = "have-room";
                        }else if(room_arr[i].canCheckIn==false){
                            add_class = "no-room";
                            }
                        room_list += `
                        <ul class="room-reservation-information" data-count="`+room_arr[i].count+`">
                            <li class="room-layout">`+room_arr[i].name+`</li>
                            <li class="room-bed-layout">`+room_arr[i].bedType+`</li>
                            <li class="room-area">`+room_arr[i].area+`M²</li>
                            <li class="room-way-internet">`+room_arr[i].wayOfInternet+`</li>
                            <li class="room-breakfast">`+room_arr[i].breakfast+`</li>
                            <li class="room-window">`+room_arr[i].window+`</li>
                            <li class="room-cancel-rule">`+room_arr[i].cancelOfRules+`</li>
                            <li class="room-price">￥<span>`+room_arr[i].price+`</span></li>
                            <li class="fr"><button class="reserve-btn `+add_class+`">预定</button></li>
                        </ul>
                        `

                    }
                    $(".room-reservation-div ul").remove();
                    $(".room-reservation-div").append(room_list);
                    $(".have-room").removeAttr("disabled");
                    $(".no-room").attr("disabled","disabled");
                    $(".no-room").html("已定完");
                }
            })
        }
        
    })
// 房间信息end
// 房间预订start
    $(".room-reservation-div").on("click",".reserve-btn",function(){
        // 酒店
        var hotelId = location.href.split("=")[1]; //酒店ID
        var hotelName = $(".hotel-name-text").html(); //酒店名称
        var hotelImg = $(".hotel-picture-left img").attr("src"); //酒店图片
        var hotelAddress = $(".hotel-address span").html(); //酒店地址
        var hotelTel = $(".hotel-tel").html(); //酒店电话
        // 房间
        var roomName = $(this).parent().siblings(".room-layout").html(); //房间名称
        var roomBed = $(this).parent().siblings(".room-bed-layout").html(); //床型
        var roomArea = $(this).parent().siblings(".room-area").html();
        var roomWifi = $(this).parent().siblings(".room-way-internet").html();
        var roomBreakfast = $(this).parent().siblings(".room-breakfast").html();
        var roomPrice = $(this).parent().siblings(".room-price").find("span").html();
            // 剩余数量
        var roomCount = $(this).parent().parent().attr("data-count");
        // 入住和离开时间
        var inTime = $(".in-room-div .fl").html();
        var intime = $(".in-room-div").attr("data-time");
        var outTime = $(".out-room-div .fl").html();
        var outtime = $(".out-room-div").attr("data-time");
        window.location.href = "HotelReservation.html?hotelId="+hotelId+"&hotelImg="+hotelImg+"&hotelName="+hotelName+"&hotelAddress="+hotelAddress+
        "&hotelTel="+hotelTel+"&roomName="+roomName+"&roomBed="+roomBed+"&roomArea="+roomArea+"&roomWifi="+roomWifi+"&roomBreakfast="+roomBreakfast+
        "&roomPrice="+roomPrice+"&inTime="+inTime+"&intime="+intime+"&outTime="+outTime+"&outtime="+outtime+"&roomCount="+roomCount;
        console.log(hotelId,hotelName,hotelImg,hotelAddress,hotelTel,roomName,roomBed,roomArea,roomWifi,roomBreakfast,roomPrice);
    })
// 房间预订end
// 时间戳转换为日期格式start
    function timestampToTime2(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() ;
        // h = date.getHours() + ':';
        // m = date.getMinutes() + ':';
        // s = date.getSeconds();
        // return Y+M+D+h+m+s;
        return Y+M+D;
    }
// 用户评价start
    // 获取page
   // 获取酒店评论数据
    /**
     * @param {*} page 第几页（必须大于0）
     * @param {*} sort 全部，好评，差评，有图，['all', 'praise', 'negative', 'picture']
     */
    function getHotelReview(limit,page,sort){
         //获取表头路径 截取酒店id
         var hotelId = location.href.split("=")[1];
         console.log("hotelId:"+hotelId);
        
        $.ajax({
            method: "GET",
            url: url+"v1/hotel/evaluate/list",
            // url: "../php/pinglun.js",
            dataType: "json",
            data: {
                hotelId: hotelId,
                limit: limit,
                // page: 2,
                sort:sort
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            if(data.code == "success"){
                var review_data = data.data.evaluate;
                var review_list = "";
                for(var i=0;i<review_data.length;i++){
                    // 用户头像：../img/1.gif `+img_url+review_data[i].account.avatar+`
                    // 星级
                    var star_list = "";
                    for(var j=0;j<review_data[i].score;j++){
                        star_list += '<img src="../img/icon_star.png" alt="">';
                    }
                    // 时间
                    var create_time = timestampToTime2(review_data[i].create_time);
                    // 评论图片../img/jq.jpg  `+img_url+review_data[i].picture[j]+`
                    var review_pic = "";
                    for(var j=0;j<review_data[i].picture.length;j++){
                        review_pic += `<li class="fl"><img src="`+img_url+review_data[i].picture[j]+`" alt=""></li>`
                    }
                    review_list += `
                    <div class="user-review clearfix">
                        <!-- 用户信息 -->
                        <div class="user-information-div fl" data-id="`+review_data[i].account._id+`">
                            <div class="user-head-img">
                                <img src="../img/1.gif" alt="`+review_data[i].account.name+`">
                            </div>
                            <span class="user-name">`+review_data[i].account.name+`</span>
                        </div>
                        <!-- 评论内容 -->
                        <div class="review-div fr clearfix">
                            <div class="clearfix">
                                <div class="review-star fl">
                                    `+star_list+`
                                </div>
                                <span class="review-data fl">`+create_time+`</span>
                            </div>
                            <div class="review-content"> 
                                `+review_data[i].content+`
                            </div>
                            <!-- 图片 -->
                            <ul class="review-pic fl">
                                `+review_pic+`
                            </ul>
                        </div>
                    </div>
                    `
                }
                // 之前数据移除
                $(".user-review-div").find(".user-review").remove();
                // 插入数据
                $(".user-review-div").append(review_list);
                // 评论数量
                var count = data.data.count;
                localStorage.count = data.data.count;
                console.log("count:"+count);
                getPaging(count,1,page);
            }else{
                alert("酒店不存在或该酒店没有评论");
                return;
            }
        })
    }
// 用户评价end
 // 请求评论类型
    var sort = "";
    sort = "all";
    // 好评
    $(".user-review-praise").click(function(){
        $(this).siblings("li").removeClass("review-type-active");
        $(this).addClass("review-type-active");
        sort = "praise";
    })
    // 差评
    $(".user-review-worse").click(function(){
        $(this).siblings("li").removeClass("review-type-active");
        $(this).addClass("review-type-active");
        sort = "negative";
    })
    // 有图
    $(".user-review-haveimg").click(function(){
        $(this).siblings("li").removeClass("review-type-active");
        $(this).addClass("review-type-active");
        sort = "picture";
    })
 // 前后页点击
    $(".pre-page").click(function(){
        var page = $(".page-active").html();
        page --;
        console.log(page);
        // getPaging(localStorage.count,limit,page)
        console.log("sort:"+sort);
        getHotelReview(1,page,sort);
    })
    $(".next-page").click(function(){
        var page = $(".page-active").html();
        console.log("page1:"+page);
        page++;
        console.log("page2:"+page);
        getHotelReview(1,page,sort);
    })
 //li标签点击事件
    $(".paging ul").on("click","li",function(){
        if($(this).html()!="..."){
            $(this).addClass("page-active");
            var page = $(this).html();
            getHotelReview(1,page,sort);
        }
    })
