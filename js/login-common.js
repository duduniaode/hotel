



// 获取图文验证码
function getGraphical(element){
    $.ajax({
            method: "GET",
            url: url + "v1/img/captcha",
            async: true,
            // 如果参数为json，加上这句  
            contentType:"text/json",  
            // 规定反参类型为text  
            dataType:"text",
            xhrFields: {
                withCredentials: true
            },
        })
        .done(
            function(data){
                element.html(data);
            }
        )
}
// 获取短信验证码
function getCode(phone,type,imgCaptcha){
    $.ajax({
            method: "POST",
            url: url + "/v1/sms/captcha",
            async: true,
            data:{
                phone:phone,
                type:type,
                imgCaptcha:imgCaptcha
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            if(data.code == "success"){
                localStorage.smsCaptcha = data.data.smsCaptcha;
                console.log("短信验证码为："+ data.data.smsCaptcha);
                alert("短信验证码为："+ data.data.smsCaptcha );
                // $(".code-input").val() = data.data.smsCaptcha;
                return;
            }
            if(data.code == "param_incomplete"){
                alert("请输入手机号码");
                return;
            }
            if(data.code == "phone_format_error"){
                alert("手机号码格式不正确");
                return;
            }
            if(data.code == "param_type_error"){
                 alert("验证码类型错误");
            }
            if(data.code == "captcha_fail"){
                alert("图形验证码错误");
            }
            if(data.code == "account_has_registered"){
                alert("用户已注册");
            }
            if(data.code == "account_not_found"){
                alert("用户不存在");
            }
            if(data.code == "sms_captcha_has_sent"){
                alert("验证码已经发送,请5分钟后再试");
            }
        })
}





















// 手机号输入框下无错误信息 获取验证码变色
function getCodeBtn(){
    var phone = $(".phone").val();
  if(phone.length == 11 &&S (/^1[34578]\d{9}$/.test(phone))){
        $(".getcode").css("background", "#5944C3");
  }
}
// 查看验证码按钮
function SeeCodeBtn(){
    console.log(localStorage.code);
    if(localStorage.code != "" & localStorage.code != undefined){
       $(".seecode").css("background", "#5944C3");
    }else{
        $(".seecode").css("background", "rgba(0, 0, 0, .35)");
    }
}
// 注册按钮
function RegisterBtn(){
    var errorContent = $(".error").html();
    if(errorContent == ""){
        $(".btn-register").css("background", "#5944C3");
    }else{
        $(".btn-register").css("background", "rgba(0, 0, 0, .35)");
    }
}




// 错误信息
    // 手机号码输入框
    $(".phone").blur(function(){
        checkPhone($(this));
    })
    $(".phone").focus(function(){
        $(".phone-error").html("");
    })
    // 图文验证码输入框
    $(".graphical-input").blur(function(){
        checkGraphical($(this));
    })
    $(".graphical-input").focus(function(){
        $(".graphical-error").html("");
    })
    // 短信验证码输入框
    $(".code-input").blur(function(){
        checkCode($(this));
    })
    $(".code-input").focus(function(){
        $(".code-error").html("");
    })
    // 密码输入框
    $(".password").blur(function(){
        checkPassword($(this));
    })
    $(".password").focus(function(){
        $(".password-error").html("");
    })
    // 重复密码输入框
    $(".repassword").blur(function(){
        checkRepassword($(this));
    })
    $(".repassword").focus(function(){
        $(".repassword-error").html("");
    })


// 判断输入框信息是否完整
    /**
     *  判断手机号码输入框的输入信息是否完整
     * @param {*} element 手机号码输入框input
     */
    function checkPhone(element){
        if(element.val() == ""){
            $(".phone-error").html("请输入手机号码");
            return;
        }
        if(element.val().length != 11){
            $(".phone-error").html("手机号码长度应为11位");
            return;
        }
        if(!(/^1[34578]\d{9}$/.test( element.val() )) ){
            $(".phone-error").html("手机号码格式不正确");
            return;
        }
    }
    /**
     * 判断图文验证码输入框输入信息是否完整
     * @param {*} element 图文验证码输入框input 
     */
    function checkGraphical(element){
        if(element.val() == ""){
            $(".graphical-error").html("请输入右侧图文验证码");
            return;
        }
        if(element.val().length != 4){
            $(".graphical-error").html("图文验证码长度不符");
            return;
        }
    }
    /**
     * 判断短信验证码输入框输入信息是否完整
     * @param {*} element 短信验证码输入框input
     */
    function checkCode(element){
        if( element.val() == ""){
        $(".code-error").html("请输入短信验证码");
            return;
        }
        if( element.val().length != 6){
        $(".code-error").html("短信验证码长度不符");
            return;
        }
    }
    // 密码框
    function checkPassword(element){
        if(element.val() == ""){
            $(".password-error").html("请输入密码");
            return;
        }
        if(element.val().length<6 || element.val().length>32){
            $(".password-error").html("请输入6~32位密码");
            return;
        }
    }
    // 重复密码框
    function checkRepassword(element){
        if(element.val() == ""){
            $(".repassword-error").html("请重复密码");
            return;
        }
        if(element.val() != $(".password").val()){
            $(".repassword-error").html("两次密码不一致！请重新输入");
            return;
        }
    }




// 顶部加载
function addHeader(){
    var str_header = ` 
        <header>
            <a href="index.html" >
                <span class="hotel-title"><span class="header-line"></span>酒店项目</span>
            </a>
         </header>
    `
    $("body").prepend(str_header);
    console.log("页面顶部加载完毕");
}
// 底部加载
function addFooter(){
    var str_footer = `
        <footer>
            Copyright © 2017 apis.sh All Rights Reserved | 陕ICP备15013925号-3
        </footer>
    `
    $("body").append(str_footer);
    console.log("页面底部加载完毕");
}

// //手机号码输入框输入错误提示信息
//     var  input_phone_number = "请输入手机号码" ;
//     var  phone_length_eleven = "手机号码长度应为11位";
//     var  phone_number_format_error = "手机号码格式不正确";
//     //图文验证码输入框输入错误提示信息
//     var input_graphical_code = "请输入右侧图文验证码";
//     var graphical_code_length_error = "图文验证码长度不符";
//     //短信验证码输入框输入错误提示信息
//     var input_code = "请输入短信验证码";
//     var code_length_error = "短信验证码长度不符";
//     //密码输入框输入错误提示信息
//     var input_password = "请输入密码";
//     var password_length_error = "密码长度为6到32位";
//     //重复密码输入框输入错误提示信息
//     var input_repassword = "请输入重复密码";
//     var two_pwd_error = "两次密码不一致";
