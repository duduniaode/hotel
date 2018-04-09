$(document).ready(function(){
    addHeader();
    addFooter();
    
})
// 点击切换图文验证码
$(".graphics-div").click(function(){
    getGraphics($(".graphics-div"));
})
// 获取短信验证码
$(".code-btn").click(function(){
    var phone = $(".phone-input").val();
    var imgCaptcha = $(".graphics-input").val();
    getCode(phone,'login',imgCaptcha);
})
// 服务器端数据请求或提交
   // 账号登录
    $(".account-login-btn").click(function(){
        // 清除本地数据
        localStorage.clear();
        var nameOrPhone = $(".username-input").val();
        var password = $(".password-input").val();
        $.ajax({
            method: "POST",
            url: url+'v1/account/login',
            dataType: "json",
            data: {
                nameOrPhone:nameOrPhone,
                password:password
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            if(data.code == "success"){
                alert("登录成功");
                // window.location.href="AccountSet.html";
                window.location.href="index.html";
                localStorage._id = data.data.account._id;
                localStorage.token = data.data.account.token;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
            }
        })
    })
   // 短信快捷登录
    $(".message-login-btn").click(function(){
        var phone = $(".phone-input").val();
        var smsCaptcha = $(".code-input").val();
        $.ajax({
            method: "POST",
            url: url+'v1/account/login/fast',
            dataType: "json",
            data: {
                phone:phone,
                smsCaptcha:smsCaptcha
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            if(data.code == "success"){
                alert("登录成功");
                // window.location.href('index.html');
                localStorage._id = data.data.account._id;
                localStorage.token = data.data.account.token;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
            }
        })
    })


// 登录按钮
    $(".password-input").blur(function(){
        // checkPassword($(this));
        // 账号登录按钮
        changeALoginBtn();
    })
    // 账号登录按钮
    function changeALoginBtn(){
        if($(".username-input").val()!=""&& $(".username-error").html()==""&& $(".password-input").val()!="" && $(".password-error").html()==""){
            $(".account-login-btn").css("background","#5944C3");
            $(".account-login-btn").removeAttr("disabled");
        }
    }
    $(".code-input").blur(function(){
         // 短信快捷登录按钮
         changeMLoginBtn();
    })
    // 短信快捷登录按钮
    function changeMLoginBtn(){
        console.log(11);
        if($(".phone-input").val()!="" && $(".graphics-input").val()!="" && $(".code-input").val()!=""&& $(".error").html()==""){
            $(".message-login-btn").css("background","#5944C3");
            $(".message-login-btn").removeAttr("disabled");
            console.log(22);
        }
    }

// 登录方式选择
   // 账号登录
    $(".account-login-title").click(function(){
        $(".box-title").find("button").removeClass("login-click");
        $(".account-login-title").addClass("login-click");
        $(".message-login").hide();
        $(".account-login").show();
    })
   // 短信快捷登录
    $(".message-login-title").click(function(){
        // 获取图文验证码
         getGraphics($(".graphics-div"));
        $(".box-title").find("button").removeClass("login-click");
        $(".message-login-title").addClass("login-click");
        $(".account-login").hide();
        $(".message-login").show();
    })