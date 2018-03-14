$(document).ready(function(){
    // 加载顶部
    addHeader();
    // 加载底部
    addFooter();
    // getCodeBtn();
    // SeeCodeBtn();
    // RegisterBtn();
    // 图文验证码
    getGraphical($(".graphical-code"));
    // 注册
})

// 点击切换图文验证码
$(".graphical-code").click(function(){
    getGraphical($(".graphical-code"));
})
// 获取短信验证码
$(".getcode").click(function()
{
    getCode($(".phone").val(),"register",$(".graphical-input").val());
})
// 查看验证码
$(".seecode").click(function(){
    if(localStorage.smsCaptcha == "" || localStorage.smsCaptcha == undefined){
        alert("您还未获取验证码");
    }else{
        alert("短信验证码为："+localStorage.smsCaptcha);
    }
    
})

// 注册
$(".btn-register").click(function(){ //提交注册数据
    var phone = $(".phone").val();
    var password = $(".password").val();
    var smsCaptcha = $(".code-input").val();
    $.ajax({
        method: "POST",
        url: url + "v1/account/register",
        async: true,
        dataType: "json",
        data:{
            phone:phone,
            password:password,
            smsCaptcha:smsCaptcha
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            console.log(data);
           if(data.code == "success"){
               alert("注册成功！请登录！");
            //    清空本地验证码
            localStorage.smsCaptcha = "";
                return;
           }
           if(data.code == "param_incomplete"){
               alert("注册信息输入不完整");
                return;
            }
            if(data.code == "phone_format_error"){
               alert("手机号码格式不正确");
                return;
            }
            if(data.code == "password_format_error"){
               alert("密码格式不正确");
                return;
            }
            if(data.code == "sms_captcha_not_found"){
               alert("短信验证码不存在,请重新获取");
                return;
            }
            if(data.code == "sms_captcha_illegal"){
               alert("非法短信验证码,请重新获取");
                return;
            }
            if(data.code == "sms_captcha_fail"){
               alert("短信验证码错误,请重新获取");
                return;
            }
            if(data.code == "phone_has_registered"){
               alert("该手机号码已被注册");
                return;
            }
            if(data.code == "account_create_fail"){
               alert("注册失败,请重新注册");
                return;
            }
        }
    )
})