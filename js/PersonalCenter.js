$(document).ready(function(){
    // addSearchMessage();
    addHeader();
    addFooter();
    checkLogin();
    // 请求全部订单
    getOrderListByState(status,4,1);
    
    // 日历
    Add_a_calendar( new Date().getFullYear() , new Date().getMonth()+1 , new Date().getDate()); //页面打开加载左右日历
})
var status = "";
// 点击事件start
  // 订单类型点击事件start
    //  全部订单 
    $(".all-order").click(function(){
        $(this).siblings("li").removeClass("order-nav-active");
        $(this).addClass("order-nav-active");
        // 清除之前的数据
        $(".order-list-content-div").find("ul").remove();
        status="";
        getOrderListByState(status,4,1);
    })
    // 待付款
    $(".pending-payment").click(function(){
        $(this).siblings("li").removeClass("order-nav-active");
        $(this).addClass("order-nav-active");
        // 清除之前的数据
        $(".order-list-content-div").find("ul").remove();
        status = "待付款";
        getOrderListByState(status,4,1);
        console.log(status);
    })
    // 预定中
    $(".reservation").click(function(){
        $(this).siblings("li").removeClass("order-nav-active");
        $(this).addClass("order-nav-active");
        // 清除之前的数据
        $(".order-list-content-div").find("ul").remove();
        status = "预定中";
        getOrderListByState(status,4,1);
    })
    // 已完成
    $(".completed").click(function(){
        $(this).siblings("li").removeClass("order-nav-active");
        $(this).addClass("order-nav-active");
        // 清除之前的数据
        $(".order-list-content-div").find("ul").remove();
        status = "已完成";
        getOrderListByState(status,4,1);
    })
    // 已取消
    $(".cancelled").click(function(){
        $(this).siblings("li").removeClass("order-nav-active");
        $(this).addClass("order-nav-active");
        // 清除之前的数据
        $(".order-list-content-div").find("ul").remove();
        status = "已取消";
        getOrderListByState(status,4,1);
    })
  // 订单类型点击事件end
  //  搜索按钮点击事件start
   // 按钮状态更改
    // $(".search input").blur(function(){
    //     if($(".order-num-input").val().length!=0 || $(".passenger-input").val().length!=0 || $(".time_input").val()!=""){
    //         $(".search-btn").addClass("search-btn-active");
    //         $(".search-btn").removeAttr("disabled");
    //     }else{
    //         $(".search-btn").removeClass("search-btn-active");
    //         $(".search-btn").attr("disabled","disabled");
    //         console.log($(".time_input").val());
    //     }
    // })
   // 按钮点击
    $(".search-btn").click(function(){
        var orderNo = $(".order-num-input").val();
        var customerName = $(".passenger-input").val();
        var checkTime = $(".time_input").attr("data-time");
        // 清除之前的数据
        $(".order-list-content-div").find("ul").remove();
        getOrderListByBtn(status,orderNo,customerName,checkTime,4,1);
    })
  // 搜索按钮点击事件end 
  // 分页点击start  
   // 前后页点击
    $(".pre-page").click(function(){
        var page = $(".page-active").html();
        page --;
        console.log(page);
        // getPaging(localStorage.count,limit,page)
        console.log("status:"+status);
        getOrderListByState(status,4,page);
    })
    $(".next-page").click(function(){
        var page = $(".page-active").html();
        console.log("page1:"+page);
        page++;
        console.log("page2:"+page);
        getOrderListByState(status,4,page);
    })
   //li标签点击事件
    $(".paging ul").on("click","li",function(){
        if($(this).html()!="..."){
            $(this).addClass("page-active");
            var page = $(this).html();
            getOrderListByState(status,4,page);
        }
    })
  // 分页点击end
  // 订单其他操作start
    // 查看
    $(".order-list-content-div").on("click",".tosee",function(){
        var orderId = $(this).parent().parent(".order").attr("data-id");
        window.open("Center-tosee.html?order_id="+orderId);
    })
    // 去支付
    $(".order-list-content-div").on("click",".topay",function(){
        var orderId = $(this).parent().parent(".order").attr("data-id");
        var hotelPicture = img_url + $(this).parent("li").siblings(".nav-order-name").find("div").find(".hotel-name").attr("data-hotelpic");
        var hotelName = $(this).parent("li").siblings(".nav-order-name").find("div").find(".hotel-name").html();
        var roomName = $(this).parent("li").siblings(".nav-order-name").find("div").find(".room-name").html();
        var orderAmount = $(this).parent("li").siblings(".nav-order-allprice").find("span").html();
        console.log("orderId="+orderId+"hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount)
        // window.location.herf = "Payment.html?order_id="+orderId+"&hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount;
        window.open("Payment.html?order_id="+orderId+"&hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount);
    })
    // 取消预定
    $(".order-list-content-div").on("click",".tocancel",function(){
        var orderId = $(this).parent().parent(".order").attr("data-id");
        window.open("Center-tocancel.html?order_id="+orderId);
    })
    // 去评价  
    $(".order-list-content-div").on("click",".toevaluate",function(){
        var orderId = $(this).parent().parent(".order").attr("data-id");
        var hotelPicture = img_url + $(this).parent("li").siblings(".nav-order-name").find("div").find(".hotel-name").attr("data-hotelpic");
        var hotelName = $(this).parent("li").siblings(".nav-order-name").find("div").find(".hotel-name").html();
        var roomName = $(this).parent("li").siblings(".nav-order-name").find("div").find(".room-name").html();
        var orderAmount = $(this).parent("li").siblings(".nav-order-allprice").find("span").html();
        console.log("orderId="+orderId+"hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount)
        // window.location.herf = "Payment.html?order_id="+orderId+"&hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount;
        window.open("Center-toevaluate.html?order_id="+orderId+"&hotelPicture="+hotelPicture+"&hotelName="+hotelName+"&roomName="+roomName+"&orderAmount="+orderAmount);
    })
  // 订单其他操作end 
// 点击事件end
// 定义函数start
 //  根据订单状态请求订单列表
    /**
     * 
     * @param {*} status  订单状态 ['待付款', '预定中', '已完成', '已取消']
     * @param {*} limit 每页多少条信息
     * @param {*} page 第几页（必须大于0）
     */
    function getOrderListByState(status,limit,page){
        var token = localStorage.token;
        if(token=="" || token==undefined){
            alert("请您先登录");
            window.location.href = "Login.html";
        }else{
            $.ajax({
                method: "GET",
                url: url+"v1/order/list",
                // url: "../php/dingdan.js",
                dataType: "json",
                data: {
                    token: token,
                    status: status,
                    limit: limit,
                    page: page
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    var order_data = data.data.orderList;
                    console.log(data.data);
                    var order_list = "";
                    $(".order-list-content-div .order").remove();
                    for(var i=0;i<data.data.orderList.length;i++){
                         order_list = `
                        <ul class="order" data-id="`+order_data[i]._id+`">
                            <li class="nav-order-num-text">`+order_data[i].orderNo+`</li>
                            <li class="nav-order-name">
                                <div>
                                    <span class="hotel-name" title="`+order_data[i].hotel.name+`" data-hotelid="`+order_data[i].hotel._id+`" data-hotelpic="`+order_data[i].hotel.picture[0]+`">`+order_data[i].hotel.name+`</span>
                                    <span class="room-name" title="`+order_data[i].roomName+`">`+order_data[i].roomName+`</span>
                                </div>
                            </li>
                            <li class="nav-order-create-time">`+timestampToTime2(order_data[i].create_time)+`</li>
                            <li class="nav-order-passanger">`+order_data[i].customerName+`</li>
                            <li class="nav-order-allprice">￥<span>`+order_data[i].amount+`</span></li>
                            <li class="nav-order-state">`+order_data[i].status+`</li>
                            <li class="nav-order-operation">
                                <span class="tosee">查看</span>
                                
                            </li>
                        </ul>
                        `
                        $(".order-list-content-div").append(order_list);
                        $(".order-list-content-div").attr("data-count",data.data.count);
                        console.log(data.data.count);
                        // 判断插入的操作
                        checkOtherOperation(order_data[i].status,i);
                    }
                    // 分页
                    $(".paging").show();
                    getPaging(data.data.count,4,page);
                }
                if(data.code=="order_not_found"){
                   $(".order-list-content-div").append('<ul class="order-error"><li>订单不存在</li></ul>');
                    $(".paging").hide();
                }
            })
        }
    }

 //  根据订单号 客户名 预定时间段 请求订单列表 
    function getOrderListByBtn(status,orderNo,customerName,checkTime,limit,page){
        var token = localStorage.token;
        if(token == "" || token == undefined){
            alert("请您先登录");
            window.location.href = "Login.html";
        }else{
            $.ajax({
                method: "GET",
                url: url+"v1/order/list",
                // url: "../php/dingdan.js",
                dataType: "json",
                data: {
                    token: token,
                    status: status,
                    orderNo: orderNo,
                    customerName: customerName,
                    checkTime: checkTime,
                    limit: limit,
                    page: page
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    var order_data = data.data.orderList;
                    var order_list = "";
                    $(".order-list-content-div .order").remove();
                    for(var i=0;i<data.data.orderList.length;i++){
                         order_list = `
                        <ul class="order"  data-id="`+order_data[i]._id+`>
                            <li class="nav-order-num-text">
                                 `+order_data[i].orderNo+`
                            </li>
                            <li class="nav-order-name">
                                <div>
                                    <span class="hotel-name">`+order_data[i].hotel.name+`</span>
                                    <span class="room-name">`+order_data[i].roomName+`</span>
                                </div>
                            </li>
                            <li class="nav-order-create-time">`+timestampToTime2(order_data[i].create_time)+`</li>
                            <li class="nav-order-passanger">`+order_data[i].customerName+`</li>
                            <li class="nav-order-allprice">￥<span>`+order_data[i].amount+`</span></li>
                            <li class="nav-order-state">`+order_data[i].status+`</li>
                            <li class="nav-order-operation">
                                <span class="tosee">查看</span>
                                
                            </li>
                        </ul>
                        `
                        $(".order-list-content-div").append(order_list);
                        $(".order-list-content-div").attr("data-count",data.data.count);
                        // 判断插入的操作
                        checkOtherOperation(order_data[i].status,i);
                        // 分页
                        getPaging(data.data.count,4,page);
                    }
                }
            })
        }
    }
 //  根据状态判断插入的操作
    function checkOtherOperation(status,i){
        console.log("status:"+status);
        if(status=="待支付"){
            $(".order").eq(i).find(".nav-order-operation .other-operation").remove();
            $(".order").eq(i).find(".nav-order-operation").append('<span class="topay other-operation">去支付</span>');
            // status = "";
        }
        if(status=="预定中"){
            $(".order").eq(i).find(".nav-order-operation .other-operation").remove();
            $(".order").eq(i).find(".nav-order-operation").append('<span class="tocancel other-operation">取消预定</span>');
            // status = "";
        }
        if(status=="已完成"){
            $(".order").eq(i).find(".nav-order-operation .other-operation").remove();
            $(".order").eq(i).find(".nav-order-operation").append('<span class="toevaluate other-operation">去评价</span>');
            // status = "";
        }
    }
// 定义函数end
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