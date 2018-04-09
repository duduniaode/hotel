$(document).ready(function(){
    // addSearchMessage();
    addHeader();
    addFooter();
    checkLogin();
    // 表头数据填充
    fillData();
})
// 表头数据获取填充start
    function fillData(){
        var href = location.href.split("?")[1];
        var data_arr = href.split("&");
        console.log(data_arr);
        var data_str = `
            <div class="hotel-img fl">
                <img src="`+img_url+decodeURI(data_arr[1].split("=")[1])+`" alt="">
            </div>
            <div class="fl hotel-name-div">
                <span class="hotel-name ">`+decodeURI(data_arr[2].split("=")[1])+`</span>
                <span class="room-name">`+decodeURI(data_arr[3].split("=")[1])+`</span>
            </div>
            <div class="price fr">￥<span>`+decodeURI(data_arr[4].split("=")[1])+`</span></div>
        `
        // $(".hotel-div").find("div").remove();
        $(".hotel-div").append(data_str);
        $(".pay-price span").html(decodeURI(data_arr[4].split("=")[1]));
    }
// 表头数据获取填充end
// 支付方式选择start
$(".pay-div>div").click(function(){
    $(this).siblings("div").removeClass("pay-way-active");
    $(this).siblings("div").children("span").removeClass("check-mark");
    $(this).addClass("pay-way-active");
    $(this).children("span").addClass("check-mark");
})
// 支付方式选择end
// 点击支付
    $(".pay-btn").click(function(){
        var token = localStorage.token;
        if(token=="" || token==undefined){
            alert("请您先登录");
            return;
        }else{
            var href = location.href.split("?")[1];
            var data_arr = href.split("&");
            var orderId = decodeURI(data_arr[0].split("=")[1]);
            var payType = $(".pay-way-active").attr("data-type");
            $.ajax({
                method: "POST",
                url: url+"v1/order/pay",
                dataType: "json",
                data: {
                    token: token,
                    orderId: orderId,
                    payType: payType
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    console.log(data.message);
                    alert(data.message);
                    window.location.href = "PersonalCenter.html";
                }else{
                    alert("支付失败 请重新支付");
                    return;
                }
            })
        }
    })