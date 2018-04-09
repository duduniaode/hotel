$(document).ready(function(){
    addHeader();
    addFooter();
    checkLogin();
    // 添加内容
    addContent();
})

function addContent(){
    var orderId = location.href.split("?")[1].split("=")[1];
    console.log(orderId);
    $.ajax({
        method: "GET",
        url: url+"v1/order/detail",
        dataType: "json",
        data: {
            orderId:orderId
        },
        xhrFields: {
            withCredentials: true // 允许跨域名储存和访问cookie
        }
    })
    .done(function(data){
        if(data.code == "success"){
            var order = data.data.order;
            // 实付金额?
            
            var content = `
                <div class="order-nav">
                    <span class="order-state">订单状态：<span>`+order.status+`</span></span>
                    <span class="order-price1">应付金额：<span>￥`+order.amount+`</span></span>
                    <span class="order-price2">实付金额：<span>￥`+order.amount+`</span></span>
                </div>
                <div class="order-information">
                    <dl>
                        <dt>订单信息</dt>
                        <dd class="order-num"><span class="title-text">订单编号：</span>  <span>`+order.orderNo+`</span></dd>
                        <dd class="hotel-name"><span class="title-text">酒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店：</span><span>`+order.hotel.name+`</span></dd>
                        <dd class="hotel-room"><span class="title-text">房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span><span>`+order.roomName+`</span></dd>
                        <dd class="creat-time"><span class="title-text">预定时间：</span><span>`+timestampToTime2(order.create_time)+`</span></dd>
                        <dd class="in-time"><span class="title-text">入住时间段：</span><span> `+timestampToTime2(order.check_in_time)+`至`+timestampToTime2(order.check_out_time)+`</span></dd>
                    </dl> 
                </div>
                <div class="intotel-information">
                    <dl>
                        <dt>入住信息</dt>
                        <dd class="guest-name">客人姓名：<span>`+order.customerName+`</span></dd>
                        <dd class="phone">手机号码：<span>`+order.customerPhone+`</span></dd>
                    </dl>
                </div>
                
            `;
            $("main").append(content);
            // 评价
            if(order.status == "已完成"){
                if(order.evaluate.length != 0){
                   // 评分
                    var evaluate_score = order.evaluate.score;
                    var score_list = "";
                    for(var i=0;i<evaluate_score;i++){
                        score_list += '<img src="../img/icon_star_yes.png" alt="">';
                    }
                   // 评价图片
                    var  evaluate_pic = order.evaluate.picture;
                    var  pic_list = "";
                    for(var i=0;i<evaluate_pic.length;i++){
                        pic_list += `<img src="`+img_url+evaluate_pic[i]`" alt="">`;
                    }
                   var order_evaluate =`
                        <div class="evaluate">
                            <dl>
                                <dt>我的评价</dt>
                                <dd class="star">
                                    `+score_list+`
                                </dd>
                                <dd class="evaluate-content">
                                    `+order.evaluate.content+`
                                </dd>
                                <dd class="evaluate-pic">
                                    `+pic_list+`
                                </dd>
                            </dl>
                        </div>
                    `
                }else{
                    $(".evaluate dl").append('<div class="no-evaluate">您还没有评价哦~ </div>')
                }
            }if(order.status == "预定中"){
                $("main").append(' <div class="complete-div"><span class="tocomplete">点击完成订单</span></div>')
            }
        }
    })
    
}
// 点击完成订单
    $("main").on("click",".tocomplete",function(){
        var orderId = location.href.split("?")[1].split("=")[1];
        $.ajax({
            method: "POST",
            url: url+"v1/order/complete",
            dataType: "json",
            data: {
                orderId: orderId
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            if(data.code == "success"){
                alert(data.message);
                window.open('PersonalCenter.html');
            }else{
                alert("订单完成失败！请重试！");
            }
        })
    })
