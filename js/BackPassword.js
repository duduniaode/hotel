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
        getCode(phone,'reset',imgCaptcha);
    })
// 点击下一步
    // 身份验证下一步
    $(".next-step1").click(function(){
        $(".identity-ul").hide();
        $(".reset-ul").show();
        $(".step2").addClass("step-active");
        $(".step2 span").addClass("step-num-active");
    })
    // 重置密码下一步
    $(".next-step2").click(function(){
        $(".step3").addClass("step-active");
        $(".step3 span").addClass("step-num-active");
        var phone = $(".phone-input").val();
        var smsCaptcha = $(".code-input").val();
        var password = $(".password-input").val();
        $.ajax({
            method:"POST",
            url: url+'v1/account/reset',
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
            if(data.code == "success"){
                alert("密码修改成功 请重新登录");
                window.location.href = "Login.html";
            }
        })
    })
// 按钮变色
    $("input").blur(function(){
        changeNextStep1();
        changeNextStep2();
    })
    // 验证身份下一步
    function changeNextStep1(){
        if($(".phone-input").val()!="" && $(".graphics-input").val()!="" && $(".code-input").val()!=""&& $(".error").html()==""){
            $(".next-step1").css("background","#5944C3");
            $(".next-step1").removeAttr("disabled");
            return;
        }
    }
    // 重置密码下一步
    function changeNextStep2(){
        if($(".password-input").val()!=""&& $(".repassword-input").val()!=""&& $(".error").html()==""){
            $(".next-step2").css("background","#5944C3");
            $(".next-step2").removeAttr("disabled");
            return;
        }
    }