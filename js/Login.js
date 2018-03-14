$(document).ready(function(){
    // 加载顶部
    addHeader();
    // 加载底部
    addFooter();
    // 图文验证码
    getGraphical($(".graphical-code"));
})

// 账号登录
$(".account-login-title").click(function(){
    $(".account-login").css("display","");
    $(".code-login").css("display","none");
    $(".account-login-title").css({"background": "#5944C3","width":"225px"});
    $(".account-login-title span").addClass("triangle-selected");
    $(".code-login-title").css({"background": "rgba(0, 0, 0, .35)","width":"224px"});
    $(".code-login-title span").removeClass("triangle-selected");
})
// if($(".phone").val()!="" && $(".password").val()!=""){
//     $("#btn-login").css("background","#5944C3");
// }
$(".btn-login").click(function(){
    localStorage.clear();
    var nameOrPhone = $(".phone").val();
    var password = $(".password").val();
    
    $.ajax({
        method: "POST",
        url: url+"v1/account/login",
        dataType: "json",
        data:{
            nameOrPhone:nameOrPhone,
            password:password
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            if(data.code == "success"){
                alert("登录成功");
                localStorage._id = data.data.account._id;
                localStorage.token = data.data.account.token;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
                localStorage.password = password;
                return;
            }if(data.code == "account_password_error"){
                alert("用户名或密码错误");
                return;
            }
        }
    )
})

// 获取短信验证码
$(".getcode").click(function(){
    getCode($("#phone-fast").val(),"login",$(".graphical-input").val());
})
// 查看验证码
$(".seecode").click(function(){
    if(localStorage.smsCaptcha == "" || localStorage.smsCaptcha == undefined){
        alert("您还未获取验证码");
    }else{
        alert("短信验证码为："+localStorage.smsCaptcha);
    }
    
})
// 短信快捷登录
$(".code-login-title").click(function(){
    $(".account-login").css("display","none");
    $(".code-login").css("display","");
    $(".code-login-title").css({"background": "#5944C3","width":"225px"});
    $(".code-login-title span").addClass("triangle-selected");
    $(".account-login-title").css({"background": "rgba(0, 0, 0, .35)","width":"224px"});
    $(".account-login-title span").removeClass("triangle-selected");
})
$("#btn-login-fast").click(function(){
    localStorage.clear();
    var phone = $("#phone-fast").val();
    var smsCaptcha = $(".code-input").val();
    $.ajax({
        method: "POST",
        url: url+"v1/account/login/fast",
        dataType: "json",
        data:{
            phone:phone,
            smsCaptcha:smsCaptcha
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            if(data.code == "success"){
                alert("登录成功");
                localStorage._id = data.data.account._id;
                localStorage.token = data.data.account.token;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
                   //    清空本地验证码
                 localStorage.smsCaptcha = "";
                return;
            }
            if(data.code == "sms_captcha_fail"){
                alert("短信验证码错误");
            }
            if(data.code == "account_not_found"){
                alert("该用户不存在");
            }
        }
    )
})
  