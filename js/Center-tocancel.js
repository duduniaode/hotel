$(document).ready(function(){
    addHeader();
    addFooter();
    checkLogin();
    addContent();
})

function addContent(){
    var orderId = location.href.split("?")[1].split("=")[1];
    console.log(orderId);
    // 获取详细信息
    $.ajax({
        method: "GET",
        url: url+"v1/order/detail",
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
            var order = data.data.order;
            var content = `
                <div>
                    <div class="order-information">
                        <dl>
                            <dt>订单信息</dt>
                            <dd class="order-num"><span class="title-text">订单编号：</span>  <span>`+order.orderNo+`</span></dd>
                            <dd class="hotel-name"><span class="title-text">酒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店：</span><span>`+order.hotel.name+`</span></dd>
                            <dd class="hotel-room"><span class="title-text">房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span><span>`+order.roomName+`</span></dd>
                            <dd class="creat-time"><span class="title-text">预定时间：</span><span>`+timestampToTime2(order.create_time)+`</span></dd>
                            <dd class="in-time"><span class="title-text">入住时间段：</span><span>`+timestampToTime2(order.check_in_time)+`至`+timestampToTime2(order.check_out_time)+`</span></dd>
                        </dl> 
                    </div>
                    <div class="intotel-information">
                        <dl>
                            <dt>入住信息</dt>
                            <dd class="guest-name">客人姓名：<span>`+order.customerName+`</span></dd>
                            <dd class="phone">手机号码：<span>`+order.customerPhone+`</span></dd>
                        </dl>
                    </div>
                </div>
            `
            $("main").prepend(content);
        }else{
            alert("订单不存在");
        }
    })
}

// 取消按钮点击事件
$(".cancel-btn").click(function(){
    if(localStorage.token==""|| localStorage.token==undefined){
        alert("请您先登录！");
        window.location.href = "Login.html";
    }else{
        var token = localStorage.token;
        var orderId = location.href.split("?")[1].split("=")[1];
        $.ajax({
            method: "POST",
            url: url+"v1/order/cancle",
            dataType: "json",
            data: {
                token: token,
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
                alert("订单取消失败！请重试！");
            }
        })
    }
})