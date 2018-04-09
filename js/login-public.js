


// 服务器数据提交或请求
   // 获取图文验证码
    function getGraphics(element){
        $.ajax({
            method:"GET",
            url:url+"v1/img/captcha",
            dataType:"html",
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            element.html(data);
        })
    }
   // 获取短信验证码
    function getCode(phone,type,imgCaptcha){
        $.ajax({
            method: "POST",
            url: url+'v1/sms/captcha',
            dataType: "json",
            data: {
                phone: phone,
                type: type,
                imgCaptcha: imgCaptcha
            },
            xhrFields: {
                withCredentials:true
            }
        })
        .done(function(data){
            console.log(data);
            if(data.code == "success"){
                alert("验证码："+data.data.smsCaptcha);
                console.log("smsCaptcha:"+data.data.smsCaptcha);
                localStorage.smsCaptcha = data.data.smsCaptcha;
                return;
            }
            if(data.code == "captcha_fail"){
                alert("图形验证码错误");
                return;
            }
            if(data.code == "account_has_registered"){
                alert("用户已注册");
                return;
            }
            if(data.code == "account_not_found"){
                alert("账户不存在");
                return;
            }
            if(data.code == "sms_captcha_has_sent"){
                alert("验证码已发送，请5分钟后再试");
                return;
            }
        })
    }
    
    // 登录
    // 快捷登录

// 按钮变色
   //查看验证码 
    function changeSeeCode(){
        if(localStorage.smsCaptcha != "" & localStorage.smsCaptcha != undefined){
            console.log("smsCaptcha:"+localStorage.smsCaptcha);
            $(".seecode-btn").css("background","#5944C3");
            $(".seecode-btn").removeAttr("disabled");
        }
    }
   // 获取验证码
    function changeGetCode(){
        if($(".phone-input").val()!="" && $(".graphics-input").val()!="" && $(".phone-error").html()=="" && $(".graphics-error").html()==""){
            $(".code-btn").css("background","#5944C3");
            $(".code-btn").removeAttr("disabled");
        }
    }
    // 注册按钮
    function changeRegisterBtn(){
        if($(".phone-input").val()!="" && $(".graphics-input").val()!="" && $(".code-input").val()!=""&& $(".password-input").val()!=""&& $(".repassword-input").val()!="" && $(".error").html()==""){
            $(".register-btn").css("background","#5944C3");
            $(".register-btn").removeAttr("disabled");
        }
    }

// 输入框校验
   //用户名
    $(".username-input").blur(function(){
        if($(".username-input").val()==""){
            $(".username-error").html("请输入用户名/手机号");
            return;
        }
    }) 
   // 手机号码
    $(".phone-input").blur(function(){
        checkPhone($(this));
         // 获取验证码按钮
        changeGetCode();
    })
    function checkPhone(element){
        if(element.val() == ""){
            $(".phone-error").html("请输入手机号码");
            return;
        }
        if(element.val().length !=11){
            $(".phone-error").html("手机号码应为11位");
            return;
        }
        if(!(/^1[34578]\d{9}$/.test(element.val()))){
            $(".phone-error").html("手机号码格式有误");
            return;
        }else{
            $(".phone-error").html("");
        }
    }
   // 图文验证码
    $(".graphics-input").blur(function(){
        checkGraphics($(this));
         // 获取验证码按钮
         changeGetCode();
        // 查看验证码按钮
        changeSeeCode();
    })
    function checkGraphics(element){
        if(element.val() == ""){
            $(".graphics-error").html("请输入右侧图文验证码");
            return;
        }
        if(element.val().length != 4){
            $(".graphics-error").html("图文验证码长度有误");
            return;
        }else{
            $(".graphics-error").html("");
            return;
        }
    }
   // 短信验证码
    $(".code-input").blur(function(){
        checkCode($(this));
    })
    function checkCode(element){
        if(element.val() == ""){
            $(".code-error").html("请输入短信验证码");
            return;
        }
        if(element.val().length != 6){
            $(".code-error").html("短信验证码长度有误 请重新输入");
            return;
        }else{
            $(".code-error").html("");
            return;
        }
        
    }
   // 密码
    $(".password-input").blur(function(){
        checkPassword($(this));
    })
    function checkPassword(element){
        if(element.val() == ""){
            $(".password-error").html("请输入密码");
            return;
        }
        if(element.val().length < 6){
            $(".password-error").html("密码安全性过低 请重新输入");
            return;
        }else{
            $(".password-error").html("");
            return;
        }
    }
   // 重复密码
    $(".repassword-input").blur(function(){
        checkRepassword($(this));
    })
    function checkRepassword(element){
        if(element.val() == ""){
            $(".repassword-error").html("请重复密码");
            return;
        }
        if(element.val() != $(".password-input").val()){
            $(".repassword-error").html("两次密码不一致 请重新输入");
            return;
        }else{
            $(".repassword-error").html("");
            return;
        }
    }
// 页面头部动态获取
    function addHeader(){
        var str = `
        <header>
            <a href="index.html" class="logo">
                <span class="logo-pic"><img src="../img/logo_white_color.png" alt="酒店项目"></span>
                <span class="logo-line">|</span>
                <span class="logo-text">酒店项目</span>
            </a>
        </header>
        `
        $("body").prepend(str);
        console.log("页面顶部加载完毕");
    }
// 页面底部动态获取
    function addFooter(){
        var str = `
        <footer>
            <span>Copyright © 2017 apis.sh All Rights Reserved | 陕ICP备15013925号-3</span>
        </footer>
        `
        $("body").append(str);
        console.log("页面底部加载完毕");
    }