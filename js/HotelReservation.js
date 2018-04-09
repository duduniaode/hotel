$(document).ready(function(){
    // addSearchMessage();
    addHeader();
    addFooter();
    checkLogin();
    fillData();
    // 日历
    Add_a_calendar( new Date().getFullYear() , new Date().getMonth()+1 , new Date().getDate()); //页面打开加载左右日历
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
// 表头数据填充start
    function fillData(){
        var href = location.href.split("?")[1];
        var data_arr = href.split("&");
        console.log(data_arr);
        console.log(decodeURI(data_arr[2].split("=")[1]));
        // 左侧
        var hotel_message = `
            <!-- 酒店 -->
            <div class="hotel-div">
                <img src="`+data_arr[1].split("=")[1]+`" alt="">
                <span class="hotel-title">`+decodeURI(data_arr[2].split("=")[1])+`</span>
                <span class="hotel-address">`+decodeURI(data_arr[3].split("=")[1])+`</span>
                <span class="hotel-tel">`+decodeURI(data_arr[4].split("=")[1])+`</span>
            </div>
            <!-- 房间 -->
            <div class="room-div">
                <span class="room-name">`+decodeURI(data_arr[5].split("=")[1])+`</span>
                <span class="room-bed">床型：<span>`+decodeURI(data_arr[6].split("=")[1])+`</span></span>
                <span class="room-area">面积：<span>`+decodeURI(data_arr[7].split("=")[1])+`</span></span>
                <span class="room-Wifi">宽带：<span>`+decodeURI(data_arr[8].split("=")[1])+`</span></span>
                <span class="room-breakfast">早餐：<span>`+decodeURI(data_arr[9].split("=")[1])+`</span></span>
            </div>
        `
        $(".left-div div").remove();
        $(".left-div").append(hotel_message);
        // 右侧
            // 房型名称
        $(".room-type span").html(decodeURI(data_arr[5].split("=")[1]));
            // 入住时间
        $(".in-room-div .fl").html(decodeURI(data_arr[11].split("=")[1]));
            // 入住时间戳
        $(".in-room-div").attr("data-time",decodeURI(data_arr[12].split("=")[1]));
            // 离开时间
        $(".out-room-div .fl").html(decodeURI(data_arr[13].split("=")[1]));
            // 离开时间戳
        $(".out-room-div").attr("data-time",decodeURI(data_arr[14].split("=")[1]));
            // 房间数量默认为1
        $(".num").val("1");
            // 房费
        $(".room-price-all span").html(decodeURI(data_arr[10].split("=")[1]));
        $(".price").html(decodeURI(data_arr[10].split("=")[1]));
            
        // 房间数量选择
        roomNumAddOrSub();
        console.log(decodeURI(data_arr[15].split("=")[1]));
    }
// 表头数据填充end
// 房间数量选择start
    function roomNumAddOrSub(){
        var href = location.href.split("?")[1];
        var data_arr = href.split("&");
        // 单间房的价格
        var single_price = $(".room-price-all span").html();
          // 判断加减是否可用
        $(".room-num-select-div").focus(function(){
           // 减
            if($(".num").val()<1){
                $(".num-sub").attr("disabled","disabled");
                $(".num-sub").removeClass("num-active");
                $(".num-sub").addClass("num-no");
            }else{
                $(".num-sub").removeAttr("disabled");
                $(".num-sub").removeClass("num-no");
                $(".num-sub").addClass("num-active");
            }
           // 加
            if($(".num").val()==decodeURI(data_arr[15].split("=")[1])){
                $(".num-add").attr("disabled","disabled");
                $(".num-add").removeClass("num-active");
                $(".num-add").addClass("num-no");
                $(".error").show();
            }else{
                $(".error").hide();
                $(".num-add").removeAttr("disabled");
                $(".num-add").removeClass("num-no");
                $(".num-add").addClass("num-active");
            }
        })
       // 减
        $(".num-sub").click(function(){
            var num = $(".num").val();
            num--;
            // 减
            $(".num").val(num);
            $(".room-price-all span").html(single_price*num);
            $(".price").html(single_price*num);
            if($(".num").val()<1){
                $(".num-sub").attr("disabled","disabled");
                $(".num-sub").removeClass("num-active");
                $(".num-sub").addClass("num-no");
            }else{
                $(".num-sub").removeAttr("disabled");
                $(".num-sub").removeClass("num-no");
                $(".num-sub").addClass("num-active");
            }
            // 加
            if($(".num").val()==decodeURI(data_arr[15].split("=")[1])){
                $(".num-add").attr("disabled","disabled");
                $(".num-add").removeClass("num-active");
                $(".num-add").addClass("num-no");
                $(".error").show();
            }else{
                $(".error").hide();
                $(".num-add").removeAttr("disabled");
                $(".num-add").removeClass("num-no");
                $(".num-add").addClass("num-active");
            }
            // 判断信息是否完整
            checkInformation();
        })
       // 加
        $(".num-add").click(function(){
            var num = $(".num").val();
            num++;
            console.log(num);
            $(".num").val(num);
            $(".room-price-all span").html(single_price*num);
            $(".price").html(single_price*num);
            // 加
            if($(".num").val()==decodeURI(data_arr[15].split("=")[1])){
                $(".num-add").attr("disabled","disabled");
                $(".num-add").removeClass("num-active");
                $(".num-add").addClass("num-no");
                $(".error").show();
            }else{
                $(".num-add").removeAttr("disabled");
                $(".num-add").removeClass("num-no");
                $(".num-add").addClass("num-active");
                $(".error").hide();
            }
            // 减
            if($(".num").val()<1){
                $(".num-sub").attr("disabled","disabled");
                $(".num-sub").removeClass("num-active");
                $(".num-sub").addClass("num-no");
            }else{
                $(".num-sub").removeAttr("disabled");
                $(".num-sub").removeClass("num-no");
                $(".num-sub").addClass("num-active");
            }
            // 判断信息是否完整
            checkInformation();
        })
    }
// 房间数量选择end
// 客人信息start
   // 姓名
    $(".username-input input").blur(function(){
        // 判断信息是否完整
        checkInformation();
        if($(".username-input input").val().length==0){
            $(".username-remind").html("至少填写一位客人姓名");
        }else{
            $(".username-remind").html("");
        }
        
    })
   // 电话
     $(".phone-input input").blur(function(){
         // 判断信息是否完整
        checkInformation();
        if($(".phone-input input").val().length==0){
             $(".phone-remind").html("请输入联系电话");
        }else if(!(/^1[34578]\d{9}$/.test($(".phone-input input").val()))){
            $(".phone-remind").html("手机号码格式有误");
            return;
            }else {
                $(".phone-remind").html("");
            }
     })   
// 客人信息end
// 判断信息是否完整
    function checkInformation(){
        // 判断信息是否完整
        if($(".num").val()!="0" && $(".in-room-div .fl").html()!="" && $(".out-room-div .fl").html()!="" && $(".username-input input").val().length!=0 && $(".phone-input input").val().length!=0 && $(".phone-remind").html().length==0){
            $(".submit-btn").removeAttr("disabled");
            $(".submit-btn").addClass("button-active");
        }else{
            $(".submit-btn").attr("disabled","disabled");
            $(".submit-btn").removeClass("button-active");
        }
    }
// 提交按钮点击
    $(".submit-btn").click(function(){
        console.log(111);
        var href = location.href.split("?")[1];
        var data_arr = href.split("&");
        var token = localStorage.token;
        // 判断是否登录
        if(token==""||token==undefined){    
            alert("请您先登录");
            window.location.href = "Login.html";
        }else{
            var roomName = $(".room-type span").html();
            var hotelId = decodeURI(data_arr[0].split("=")[1]);
            var checkTime = $(".in-room-div").attr("data-time")+","+$(".out-room-div").attr("data-time");
            // var time1 = $(".in-room-div .fl").html();
            // var time2 = $(".out-room-div .fl").html();
            // console.log(time1);
            // var checkTime1 = new Date(time1);
            // var checkTime2 = new Date(time2);
            // var check1 = checkTime1.getTime();
            // var check2 = checkTime2.getTime();
            // var checkTime = ''+check1+','+check2+'';
            var roomNumber = $(".num").val();
            var customerName = $(".username-input input").val();
            var customerPhone = $(".phone-input input").val();
            $.ajax({
                method: "POST",
                url: url+"v1/order/create",
                dataTpye: "json",
                data: {
                    token: token,
                    roomName: roomName,
                    hotelId: hotelId,
                    checkTime: checkTime,
                    roomNumber: roomNumber,
                    customerName:customerName,
                    customerPhone:customerPhone
                },
                xhrFields: {
                    withCredentials: true // 允许跨域名储存和访问cookie
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    // 订单id
                    var order_id = data.data._id;
                    var hotelPicture = data.data.hotelPicture;
                    var hotelName = data.data.hotelName;
                    var roomName = data.data.roomName;
                    var orderAmount = data.data.orderAmount;
                    alert(data.message);
                    window.location.href = "Payment.html?order_id="+order_id+"&hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount;
                }
            })
        }
    })
 