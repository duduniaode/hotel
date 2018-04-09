$(document).ready(function(){
    addHeader();
    addFooter();
    checkLogin();
    // 添加内容
    addContent();
})
// 总体评价start
    var n=1;
    $(".star-div span img").click(function(){
        // 当前点击的索引值
        var star_num = $(this).index()+1;
        console.log("star_num:"+star_num);
        // 黄色星的个数
        var yes_num = $(".star-div").find(".yes").length;
        console.log("yes_num:"+yes_num);
        if(star_num<yes_num){
            n=-1;
        }else{
            n=1;
        }
        console.log(n);
        if(n==1){
            // 黄色星增加
            for(var i=0;i<=star_num;i++){
                $(".star-div span img").eq(i).attr("src","../img/icon_star_yes.png");
                $(".star-div span img").eq(i).addClass("yes");
            }
        }else{
            // 黄色星减少
            for(var j=star_num;j<=4;j++){
                $(".star-div span img").eq(j).attr("src","../img/icon_star_no.png");
                $(".star-div span img").eq(i).removeClass("yes");
            }
        }
    })
// 总体评价end
// 上传照片start

    $("#up-pic").change(function(){
        var pic_num = $(".img-div").find("img").length;
        if(pic_num < 10){
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
            img_reader.readAsDataURL(file); 
            img_reader.onload = function(e){
                $(".img-div").append('<img src="'+e.target.result+'" alt="">');
            }
           // 上传图片
            if(localStorage.token==""||localStorage.token==undefined){
                alert("请您先登录！");
                window.open('Login.html');
            }else{
                var token = localStorage.token;
                // 图片
                
                var picturePathArry = "";
                var pic_arr =  $("#up-pic");
                if(pic_arr.length>1){
                    var pic_url_arr = [];
                    for(var i=0;i<pic_arr.length-1;i++){
                        picturePathArry = pic_arr[i].files[0];
                        var formData = new FormData();
                        formData.append('token',token);
                        formData.append('type','evaluate');
                        formData.append('img',picturePathArry);
                        $.ajax({
                            method: "POST",
                            url: url + "v1/upload/picture",
                            async: true,
                            dataType: "json",
                            data:formData,
                            processData: false,
                            contentType: false,
                            xhrFields: {
                                withCredentials: true
                            }
                        })
                        .done(function(data){
                            if(data.code == "success"){
                                pic_url_arr.push( data.data.picturePath );
                                localStorage.pic_url_arr = pic_url_arr;
                            }
                        })
                    }
                    // // 提交评价start
                    //     pic_url_arr = JSON.stringify(pic_url_arr);
                    //     $(".submit-btn").click(function(){
                    //         if(localStorage.token=="" || localStorage.token==undefined){
                    //             alert("请您先登录");
                    //             window.location.href="Login.html";
                    //         }else{
                    //             var token = localStorage.token;
                    //             var orderId = location.href.split("?")[1].split("&")[0].split("=")[1];
                    //             var score = $(".star-div").find(".yes").length;
                    //             var content = $(".evaluate-content-div textarea").val();
                    //             $.ajax({
                    //                 method: "POST",
                    //                 url: url+"v1/order/evaluate",
                    //                 dataType: "json",
                    //                 // data: formData,
                    //                 data: {
                    //                     token: token,
                    //                     orderId: orderId,
                    //                     score: score,
                    //                     content: content,
                    //                     picturePathArry: pic_url_arr
                    //                 },
                    //                 xhrFileds: {
                    //                     withCredentials: true
                    //                 }
                    //             })
                    //             .done(function(data){
                    //                 if(data.code == "success"){
                    //                     alert(data.message);
                    //                 }else{
                    //                     alert("评价失败！请重试");
                    //                 }
                    //             })
                    //         }
                    //     })
                    // // 提交评价end 
                }
            }
        }else{
            alert("最多上传10张照片哦");
        }
    })
// 上传照片end
// 提交评价start
    $(".submit-btn").click(function(){
        if(localStorage.token=="" || localStorage.token==undefined){
            alert("请您先登录");
            window.location.href="Login.html";
        }else{
            pic_url_arr = JSON.stringify(localStorage.pic_url_arr);
            var token = localStorage.token;
            var orderId = location.href.split("?")[1].split("&")[0].split("=")[1];
            var score = $(".star-div").find(".yes").length;
            var content = $(".evaluate-content-div textarea").val();
            $.ajax({
                method: "POST",
                url: url+"v1/order/evaluate",
                dataType: "json",
                // data: formData,
                data: {
                    token: token,
                    orderId: orderId,
                    score: score,
                    content: content,
                    picturePathArry: pic_url_arr
                },
                xhrFileds: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    alert(data.message);
                }
                if(data.code == "order_not_found"){
                    alert("订单不存在");
                }
                if(data.code == "already_evaluated"){
                    alert("该订单已经评价过了");
                }else{
                    alert("评价失败！请重试");
                }
               
            })
        }
    })
// 提交评价end
// 定义函数
    function addContent(){
        var href = location.href.split("?")[1];
        var data_arr = href.split("&");
        var hotel_content = `
            <div class="hotel-information clearfix">
                <div class="hotel-img fl">
                    <img src="`+decodeURI(data_arr[1].split("=")[1])+`" alt="">
                </div>
                <div class="fl">
                    <span class="hotel-name">`+decodeURI(data_arr[2].split("=")[1])+`</span>
                    <span class="room-name">`+decodeURI(data_arr[3].split("=")[1])+`</span>
                </div>
                <span class="hotel-price fr">￥<span>`+decodeURI(data_arr[4].split("=")[1])+`</span></span>
            </div>
        `;
        $("main>div").prepend(hotel_content);
    }