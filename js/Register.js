$(document).ready(function(){
    // 加载页面顶部
    addHeader();        
    // 加载页面底部
    addFooter();
    // 获取图文验证码
    getGraphics($(".graphics-div"));
})
// 点击切换图文验证码
    $(".graphics-div").click(function(){
        getGraphics($(".graphics-div"));
    })
// 获取短信验证码
    $(".code-btn").click(function(){
        var phone = $(".phone-input").val();
        var imgCaptcha = $(".graphics-input").val();
        getCode(phone,'register',imgCaptcha);
    })
// 注册 
   $(".register-btn").click(function(){
       var phone = $(".phone-input").val();
       var password = $(".password-input").val();
       var smsCaptcha = $(".code-input").val();
        $.ajax({
            method: "POST",
            url: url+"v1/account/register",
            dataType: "json",
            data: {
                phone:phone,
                password:password,
                smsCaptcha: smsCaptcha
            },
            xhrFileds: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            if(data.code == "success"){
                alert("注册成功！请登录")
                window.location.href = "Login.html";
            }
            
        })
   })
// 按钮变色
    $("input").blur(function(){
        // 注册按钮
        changeRegisterBtn();
    })