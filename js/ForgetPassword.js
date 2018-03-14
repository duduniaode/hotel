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

// 获取短信验证码
$(".getcode").click(function(){
    getCode($(".phone").val(),"reset",$(".graphical-input").val());
})
// 查看验证码
$(".seecode").click(function(){
    if(localStorage.smsCaptcha == "" || localStorage.smsCaptcha == undefined){
        alert("您还未获取验证码");
    }else{
        alert("短信验证码为："+localStorage.smsCaptcha);
    }
})
$(".btn-identify").click(function(){
    var phone = $(".phone").val();
    var smsCaptcha = $(".code-input").val();
    $(".code-find").css("display","none");
    $(".pwd-reset").css("display","");
    $(".find-process").addClass('find-process2');
    $(".blueline").addClass('blueline2');
    // window.open('Forget-reset.html');
    $(".btn-reset").click(function(){
        var password = $(".password").val();
        $.ajax({
            method: "POST",
            url: url+"v1/account/reset",
            dataType: "json",
            data:{
                phone:phone,
                smsCaptcha:smsCaptcha,
                password:password
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(
            function(data){
                if(data.code == "success"){
                    $(".find-process").addClass('find-process3');
                    $(".blueline").addClass('blueline3');
                    alert("密码修改成功 请重新登录");
                    
                }
                if(data.code == "sms_captcha_not_found"){
                    alert("短信验证码不存在")
                }
                if(data.code == "sms_captcha_fail"){
                    alert("短信验证码错误")
                }
                if(data.code == "account_not_found"){
                    alert("用户不存在")
                }
            }
        )
    })
})
