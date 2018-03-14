$(document).ready(function(){
    Header();
    Footer();
    // 动态生成城市类型标题
    addCityTitle();
    // checkLoginState();
    // 获取所有城市
    getAllCity();
    //城市拼音动态切换和动态设置每个宽度
    switchCityTitle();
    
        
})

// 请求热门城市数据并追加到页面上
// data；城市名称
function getHotHotel(data){
    $.ajax({
        method: "GET",
        url:url+"v1/hotel/list",
        dataType: "json",
        data: {
            cityName:data,
            limit:8,
            page:1
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
        if(data.code == "success"){
            var city_data = data.data.hotelList;
            var str = "";
            for(var i=0;i<city_data.length;i++){
                var style = "";
                if(city_data[i].price < 300){
                    style = "高档型"
                }else if(city_data[i].price >= 300){
                    style = "豪华型"
                }
                str += `
                <li>
                    <a href="HotelDetails.html?`+city_data[i]._id+`">
                        <img src="`+ img_url+city_data[i].picture[0] +`" alt="">
                        <div class="hotel-information clearfix">
                            <span title="`+city_data[i].name+`">`+city_data[i].name+`</span>
                            <span class="fr">`+style+`</span>
                            <div class="hotel-price">¥`+city_data[i].price+`</div>
                        </div>
                    </a>
                </li>
                `
                $(".hotel-line li").remove();
                $(".hotel-line").append(str);
                return;
            }
            if(data.code == "hotel_not_found"){
                $(".hotel-line li").remove();
                $(".hot_hotel").append('<div class="hotel-error"><img src="../img/abc.png">暂无酒店数据</div>');

            }
        }
    })
}

//动态添加热门城市导航
function addHotCityNav(){
    $(".hot-hotel-city").find("li").remove();
    console.log("1");
    var str_hot_nav = "";
    console.log( all_city )
    console.log( all_city.hot );
    for(var i=0;i<all_city.hot.length;i++){
        str_hot_nav += '<li>'+all_city.hot[i].cityName+'</li>';
    }
    $(".hot-hotel-city").append(str_hot_nav);
    $(".hot-hotel-city li").eq(0).append('<span class="hot-hotel-title-sharp"></span>')
    console.log("2");
} 

// 热门城市导航点击
$(".hot-hotel-city").on("click","li",function(){
    $(this).parent().find(".hot-hotel-title-sharp").remove();
    $(this).append('<span class="hot-hotel-title-sharp"></span>');
})  
