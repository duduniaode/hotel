
$(document).ready(function(){
    Header();
    Footer();
    getUserDetails();
    checkLoginState();
})

// 上传头像
$("#up-head").change(function(){
    var inputFile = $("#up-head");
    const file = this.files[0] // 单个文件直接files[0]就可以取到，多个文件要做循环
    if (!file) return // 清空inputFile内容时，不执行下面的代码
    if (!/image\/\w+/.test(file.type)) return console.log('只支持png，jpg等图片格式') // 判断是否为图片文件,否就跳出function
    if (file.type === 'image/svg+xml') return console.log('不支持上传svg图片') // 或是根据需求判断某种格式图片文件，否就跳出function
    if (file.size > 5242880) return console.log('只支持上传5m以下大小的图片') // 判断上传图片大小，否就跳出function
    const fileReader = new FileReader() // 创建FileReader对象
    fileReader.readAsDataURL(file) // 开始读取指定的file中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    fileReader.onload = function (e) { // 当读取完成
        $(".upimg").css("background","url("+ e.currentTarget.result +")");
        $(".upimg").css("background-size","100% 100%");
    }
    var  img = $("#up-head")[0].files[0];
    var abc = new FormData();
        abc.append( 'token',localStorage.token );
        abc.append( 'type',"avatar" );
        abc.append( 'img',img );
    $.ajax({
        method: "POST",
        url: url + "v1/upload/picture",
        async: true,
        dataType: "json",
        data:abc,
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: true
        } 
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            localStorage.picturePath = data.data.picturePath;
            return;
        }
        if( data.code == "account_token_invalid" ){
            alert("身份已失效,请重新登陆");
            return;
        }
        if( data.code == "image_create_fail" ){
            alert("头像上传失败,请重新上传");
            return;
        }
    })
})

//微信绑定
$(".binding").click(function(){
    // $(".wechat-div").parent().css("background","rgba(0,0,0,0.35)");
    $(".wechat-all").css("display","");
    $(".wechat img").attr("src",url+"v1/account/wei/bind?token="+localStorage.token);
    $(".wechat-div").show();
})
$(".wechat-all").click(function(){
    $(this).hide();
})

// 确认修改
$(".btn-modify").click(function(){
    var token = localStorage.token;
    var avatarPath = localStorage.picturePath;
    var name = $(".username").val();
    $.ajax({
        method: "POST",
        url: url+"v1/account/detail/change",
        dataType: "json",
        data:{
            token:token,
            avatarPath:avatarPath,
            name:name
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            if(data.code == "success"){
                alert("修改成功");
                return;
            }if(data.code == "account_token_invalid"){
                alert("身份已失效,请重新登陆");
                return;
            }
        }
    )
})