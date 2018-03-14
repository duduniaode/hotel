

// 退出登录
$("#exit").click(function(){
    localStorage.clear();
    window.open('Login.html');  
})

// 判断登录状态
function checkLoginState(){
    var token = localStorage.token;
    if(token == ''){
        $(".not-login").css("display","");
        $(".login-state").css("display","none");
    }else{
        $(".not-login").css("display","none");
        $(".login-state").css("display","");
        console.log("localStorage.name:"+localStorage.name);
        console.log("localStorage.avatar:"+localStorage.avatar);
        $(".nav-head").attr("src",img_url + localStorage.avatar);
        $(".nav-name").html( localStorage.name );
    }
}

// 获取用户详细信息
function getUserDetails(){
   var token = localStorage.token;
   $.ajax({
        method: "GET",
        url: url+"v1/account/detail",
        dataType: "json",
        data:{
            token:token
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            if( data.code == "success" ){
                var user_data = data.data.account;
                if( user_data.avatar != undefined){
                    $(".upimg").css("background","url("+ img_url + user_data.avatar +")");
                    $(".upimg").css("background-size","100% 100%");
                }else{
                    $(".upimg").css("background","url(../img/1.gif)");
                    $(".upimg").css("background-size","100% 100%");
                }
                $(".nav-head").attr("src",img_url + user_data.avatar);
                $(".nav-name").html( user_data.name );
                $(".pnumber").html( user_data.phone );
                localStorage._id = data.data.account._id;
                localStorage.phone = data.data.account.phone;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
                localStorage.weipayId = data.data.account.weipayId;
                return;
            }
        }
    )
}

// 点击选择城市
    var all_city = {}; // 用来保存所有城市数据
    $(".city_input").click(function(){
        // 不再派发事件。
        // 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
        // 调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
        // 该方法将停止事件的传播，阻止它被分派到其他 Document 节点。
        //在事件传播的任何阶段都可以调用它。注意，虽然该方法不能阻止同一个 Document 
        //节点上的其他事件句柄被调用，但是它可以阻止把事件分派到其他节点。
        event.stopPropagation();
        // 删除类名title-active
        $(".select-city-div .select-city-div-title").children().removeClass("title-active");
        // 给第一个li标签（也就是热门城市）添加title-active类
        $(".select-city-div .select-city-div-title li")[0].className="title-active";
        // 获取热门城市
        addHotCityName( all_city );
        // 显示选择城市框
        $(this).parent().find(".select-city-div").show();
    });
// 动态生成城市类型标题
    var city_title = [
        {name:"热门",id:"hot"},
        {name:"ABCDEF",id:"abcdef"},
        {name:"GHJK",id:"ghjk"},
        {name:"LMNPQ",id:"lmnpq"},
        {name:"RSTW",id:"rstw"},
        {name:"XYZ",id:"xyz"},
    ];
    function addCityTitle(){
        var str = "";
        for(var i=0;i<city_title.length;i++){
            str += '<li data-id="'+ city_title[i].id +'">'+city_title[i].name+'</li>';
        }
        $(".select-city-div-title").append(str);
        $(".select-city-div-title li")[0].className = "title-active";
        $(".select-city-div-title li").width($(".select-city-div-title").width() / city_title.length);
    }
// 获取城市列表（所有城市）
    function getAllCity(){
        $.ajax({
            method: "GET",
            // url: url+"v1/city/list",
            url: "../php/city.js",
            dataType: "json",
            async: true,
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            if(data.code == "success"){
                //保存所有城市数据到定义的容器中
                all_city = data.data;
                console.log(all_city);
                //动态添加热门城市导航
                addHotCityNav();
            }
        })
    }
//动态追加热门城市到页面上
    function addHotCityName(data){
        // 清除类名为select-city-div-content的元素
        $(".select-city-div").find(".select-city-div-content").remove();
        var str_hot = '<ul class="select-city-div-content" data-id="hot">'
        for( var i = 0 ; i<data.hot.length;i++){
            str_hot += '<li title="'+ data.hot[i].cityName +'">'+ data.hot[i].cityName +'</li>';
        }
        str_hot += '</ul>';
        $(".select-city-div").append(str_hot);
        $(".select-city-div-content li").width($(".select-city-div-content").width()/6);
    }


//城市拼音动态切换和动态设置每个宽度
    function switchCityTitle(){
        $(".select-city-div-title").on('mouseover','li',function(){
            $(this).parent().children().removeClass("title-active");
            $(this).addClass("title-active");
        //  定义城市拼音对应的城市名称 数组
            var city_data_switch = [];
        // $(this).attr("data-id") 参数为：要获取的属性的名称，该操作会返回指定属性对应的值
            var city_str = '<ul class="select-city-div-content" data-id="'+ $(this).attr("data-id") +'">';
            if($(this).attr("data-id") == "hot"){
                for(var i = 0; i<all_city.hot.length;i++){
                    city_str += '<li title="'+all_city.hot[i].cityName+'">'+all_city.hot[i].cityName+'</li>';
                }
            }else{
            //  ?????????
                for(let i in all_city.cityList){
                    if($(this).attr("data-id").indexOf(all_city.cityList[i][0].cityFirstLetter)>=0){
                        city_data_switch.push(all_city.cityList[i]);
                    }
                }
                for(var i=0;i<city_data_switch.length;i++){
                    for(var a=0;a<city_data_switch[i].length;a++){
                    city_str += '<li title="'+ city_data_switch[i][a].cityName +'">'+ city_data_switch[i][a].cityName +'</li>';
                    }
                }
            }
            city_str += '</ul>';
            $(".select-city-div").find(".select-city-div-content").remove();
            $(".select-city-div").append(city_str);
            $(".select-city-div-content li").width($(".select-city-div-content").width()/6);
            
        });
    } 
  
// 鼠标选中的城市变色
    $(".select-city-div").on('mouseover','.select-city-div-content li',function(){
        $(this).parent().children().removeClass("title-active");
        $(this).addClass("title-active");
    })
//选中城市显示在城市input输入框 
    $(".select-city-div").on("click",".select-city-div-content li",function(){
        $(".city_input").val($(this).html());
        $(".city_input").parent().find(".select-city-div").hide();
    })
//  $(".city_input").keyup(function(){
//      if( $(this).val().length>0 ){
//          $(".select-city-div").hide();
//      }
//      if( $(this).val().length == 0 ){
//         $(".select-city-div").show();
//     }
//  })

// 表头
function Header(){
    var str = 
    `
    <header>
        <ul>
            <!-- 左侧 -->
            <li class="logo fl">
                <a href="index.html">
                    <img src="../img/logo_white.png" alt="">   
                    <span class="logo-line"></span>
                    <span class="logo-text">酒店项目</span>
                </a>    
            </li>
            <!-- 右侧 -->
            <li class="fr nav">
                <!-- 未登录 -->
                <div class="not-login" style="display:none">
                    <a class="not-login-tologin" href="Login.html" >登录</a>
                    <a class="" href="Register.html" >注册</a>
                </div>
                <!-- 登录 -->
                <div class="login-state" >
                    <a class="fl" href="PersonalCenter.html"><img src="" alt="" class="nav-head"></a>
                    <a href="PersonalCenter.html"><span class="nav-name"></span></a>
                    <!-- 三角框 -->
                    <div class="triangle-div">
                        <img src="../img/icon_arrow_down.png" alt="" class="triangle" id="triangle">
                        <ul class="triangle-set">
                            <span class="horn"></span>
                            <li><a href="PersonalCenter.html"><img src="../img/icon_my.png" alt="">我的订单</a></li>
                            <li><a href="AccountSet.html"><img src="../img/icon_setting.png" alt="">账户设置</a></li>
                            <li><a href="" id="exit"><img src="../img/icon_out.png" alt="">退出登录</a></li>
                        </ul>
                    </div>
                    <a href="PersonalCenter.html" class="myorder">我的订单</a>
                </div>
            </li>
        </ul>
    </header>
    `
    $("body").prepend(str);
    console.log("页面顶部加载完毕");
}
// 页脚
function Footer(){
    var str = `
    <footer>
        <span>Copyright © 2017 apis.sh All Rights Reserved | 陕ICP备15013925号-3</span>
    </footer>
    
    `
    $("body").append(str);
    console.log("页面底部加载完毕");
}