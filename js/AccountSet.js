$(document).ready(function(){
    addHeader();
    addFooter();
    // 判断登录状态
    checkLogin();
    // 数据填充
    dataFilling();
})
// 上传头像
    $("#file-img").change(function(){
        var file = this.files[0];
        // 清空inputFile内容时，不执行下面的代码
        if (!file) return 
        // 判断是否为图片文件,否就跳出function
        if (!/image\/\w+/.test(file.type)) return console.log('只支持png，jpg等图片格式') 
        // 或是根据需求判断某种格式图片文件，否就跳出function
        if (file.type === 'image/svg+xml') return console.log('不支持上传svg图片') 
        // 判断上传图片大小，否就跳出function
        if (file.size > 5242880) return console.log('只支持上传5m以下大小的图片') 
        var img_reader = new FileReader();
        // 开始读取指定的file中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
        img_reader.readAsDataURL(file) 
        img_reader.onload = function(e){
            $(".img-div").css("background","url("+e.target.result+")");
            $(".img-div").css("background-size","100% 100%");
        }
        var token = localStorage.token;
        var img = $("#file-img").get(0).files[0];
        var formData = new FormData();
        formData.append('img',img);
        formData.append('type',"avatar");
        formData.append('token',token);
        $.ajax({
            method: "POST",
            url: url + "v1/upload/picture",
            async: true,
            dataType: "json",
            data:formData,
            // processData设置为false。因为data值'是FormData对象，不需要对数据做处理。*****
            processData: false,
            contentType: false,
            xhrFields: {
                withCredentials: true
            } 
        })
        .done(function(data){
            if(data.code=="success"){
                console.log(data.data.picturePath);
                localStorage.avatarPath = data.data.picturePath;
            }
        })
    })

//账户设置页面中的数据填充 
    function dataFilling(){
        var token = localStorage.token;
        if(token!="" && token!=undefined){
            // 获取用户详细信息
            getUserDetails();
            $(".img-div").css("background","url("+img_url+localStorage.avatar+")");
            $(".img-div").css("background-size","100% 100%");
            $(".username").val(localStorage.name);
            $(".phone").html(localStorage.phone);
        }
    }
// 微信绑定
    $(".wechat-btn").click(function(){
        $(".bg-div").show();
        $(".bg-div").click(function(){
            $(".bg-div").hide();
        })
        var token = localStorage.token;
        $(".wechat img").attr("src",url+"v1/account/wei/bind?token="+token);
    })
//确认修改
    $(".modify").click(function(){
        var token = localStorage.token;
        var name = $(".username").val();
        var avatarPath = localStorage.avatarPath;
        $.ajax({
            method: "POST",
            url: url+"v1/account/detail/change",
            dataType: "json",
            data: {
                token: token,
                name: name,
                avatarPath: avatarPath
            },
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            if(data.code=="success"){
                alert("修改成功，请重新登录");
            }
        })
    })