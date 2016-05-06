var game;
var ispause = false;
$(function () {
    /** ===>>>for ios **/
    $(window).on('scroll.elasticity', function (e) {
        e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
        e.preventDefault();
    });

    /** ===>>>scale settings (The standard size:640*1008) **/
    var scale;
    $("#outer-container,.page").css({ "width": window.innerWidth + "px", "height": window.innerHeight + "px" }).hide();   //set container as device size，hide the pages
    $("#outer-container").show();																				 //show container
    $("#loading").show();																						 //show loading
    scale = window.innerHeight / 1008 < window.innerWidth / 640 ? window.innerHeight / 1008 : window.innerWidth / 640;	 //confirm the scale proportion
    $("#outer-container .content").css({"zoom":scale,"left":(window.innerWidth*1/scale-640)/2+"px","top":(window.innerHeight*1/scale-1008)/2+"px"});  //scale and center
    //$("#outer-container .content").css({ "transform": "scale(" + scale + ")", "left": (window.innerWidth - scale * 640) / 2 + "px", "top": (window.innerHeight - scale * 1008) / 2 + "px", "-ms-transform": "scale(" + scale + ")", "-moz-transform": "scale(" + scale + ")", "-webkit-transform": "scale(" + scale + ")", "-o-transform": "scale(" + scale + ")" });  //scale and center

    /** ===>>>main **/
    $('body').bind("touchstart", function (e) {
        switch (e.target.getAttribute("class")) {
            case 'p1-button-start':
                $("#p4").show();
                break;
            case 'p1-button-rule':
                $("#p2").show();
                break;
            case 'p1-button-showpic':
                $("#p3").show();
                break;
            case 'p2-close':
                $("#p2").hide();
                break;
            case 'p3-close':
                $("#p3").hide();
                break;
            case 'p4-button-start':             //进入游戏界面
                $("#p5").show();
                game.start();
                break;
            case 'p6-button-draw':              //需要显示的抽奖结果
                $("#p6").hide();
                var random = Math.floor(Math.random() * 10000) % 4;  //前台随机测试
                if (random == 0) {
                    $("#p7").show();
                } else if (random == 1) {
                    $("#p8").show();
                } else if (random == 2) {
                    $("#p9").show();
                } else if (random == 3) {
                    $("#p10").show();
                } else {
                    alert("没有此选项！");
                }
                break;
            case 'p7-go-tmall':
                location.href = "";             //中奖丰谷代金券，天猫店的地址
                break;
            case 'p7-go-weibo':
                location.href = "";             //微博地址
                break;
            case 'p8-go-wxstore':
                location.href = "";             //中奖丰谷代金券，微店地址
                alert("1");
                break;
            case 'p8-go-weixin':
                location.href = "";             //微信地址，可能是提示分享到朋友圈
                alert("2");
                break;
            case 'p9-submit':                  //中奖旅行箱，填写信息
                checkSubInfo();
                break;
            case 'p10-flaunt':
                //alert("炫耀一下！");
				$("#curtion").show();
                break;
            case 'p5-pause':                    //暂停按钮
                if (!ispause) {
                    game.pause();
                } else {
                    game.resume();
                }
                break;
            case 'again':
                $("#gameover").hide();
                game = new Game(30);
                game.start();
				break;
			case 'page curtion':
				$("#curtion").hide();
				break;

        }
    });
	
    $(".picbox img").bind("touchmove", function (e) {
        e.stopPropagation();
    })
    //移动人
    var startX;
    var endX;
    var originPosLeft;
    $("#p5 .p5-boy").bind("touchstart", function (e) {
        originPosLeft = parseFloat($("#p5 .p5-boy").css("left"));
        startX = e.originalEvent.touches[0].pageX;
    });

    $("#p5 .p5-boy").bind("touchmove", function (e) {
        endX = e.originalEvent.touches[0].pageX;
        if (!ispause) {
            $("#p5 .p5-boy").css({ "left": endX * 1 / scale - 83 + "px" });
        }
    });
    $("#p5 .p5-boy").bind("touchend", function () {
        if (parseInt($(this).css("left")) <= 0) {
            $(this).css("left", "0px");
        } else if (parseInt($(this).css("left")) >= 488) {
            $(this).css("left", "488px");
        }
    });

    var Game = function (time) {
        var self = this;
        var timeinterval;
        var addinterval;
        var picinterval;
        var originTime = time;
        var score = 0;


        var imgs = [];
        for (var i = 1; i <= 6; i++) {
            var img = new Image();
            img.src = "images/" + i + ".png";
            img.index = i;
            imgs.push(img);
        }

        this.getRandomPic = function () {
            return imgs[Math.floor(Math.random() * 10000 % 6)].cloneNode(true);
        }



        this.start = function () {
            $("#p5 .content img").remove();
            $("#p5 .p5-time-bar").css({ "width": "418px" });
            $("#p5 .p5-scores").text(0);
            score = 0;
            ispause = false;
            self.setTimeBar();
            self.appendPics();
        }

        this.appendPics = function () {
            addinterval = setInterval(function () {
                if (!ispause) {
                    var pic = self.getRandomPic();
                    $(pic).css("left", Math.random() * 10000 % (640 - pic.width));
                    $("#p5 .content").append(pic);
                    self.checkPosition(pic, 40, 40);
                }
            }, 500);
        }

        this.pause = function () {
            ispause = true;
        }

        this.resume = function () {
            ispause = false;
        }

        this.setTimeBar = function () {
            timeinterval = setInterval(function () {
                if(!ispause) {                    
                    $("#p5 .p5-time-bar").animate({ "width": (418 / originTime * time) + "px" }, 1000);
                    time--;
                    if (time == -1) {
                        self.end();
                        $("#gameover").show();
                    }
                }
            }, 1000);

        };

        this.end = function () {
            self.pause();
            clearInterval(timeinterval);
            clearInterval(picinterval);
            clearInterval(addinterval);
        }

        this.checkPosition = function (pic, speed, atime) { //参数：图片对象，每一次下落的像素值，时间间隔
            var ptop = parseInt($(pic).css("top"));
            picinterval = setInterval(function () {
                if (!ispause) {
                    $(pic).css("top", ptop + "px");
                    ptop += speed;
                    var vspace = parseInt($("#p5 .p5-boy").css("top")) + parseInt($("#p5 .p5-boy").css("height")) / 2 - parseInt($(pic).css("top")) + parseInt($(pic).css("height")) / 2;
                    var hspace = Math.abs(parseInt($("#p5 .p5-boy").css("left")) + parseInt($("#p5 .p5-boy").css("width")) / 2 - (parseInt($(pic).css("left")) + parseInt($(pic).css("width")) / 2));
                    if (vspace > 0 && vspace < parseInt($(pic).css("height")) / 2 && hspace >= 0 && hspace < parseInt($(pic).css("width")) / 2) {    //两个图片的中心点的距离是否小于下落图片的一半
                        var index = parseInt(pic.src.split("/")[pic.src.split("/").length - 1].substring(0, 1)); //背景图片
                        if (index < 5) {	
                            score += 25;										//加分
                            $("#p5 .p5-scores").text(score);
                            if (score >= 200) {
                                self.end();
                                $("#p6").show();
                            }
                        } else {
                            score -= 25;							//减分
                            $("#p5 .p5-scores").text(score);
                        }

                        $(pic).remove();

                    }

                }

                if (parseInt($(pic).css("top")) > (1010 + pic.height)) {
                    clearInterval(this);
                    $(pic).remove();
                }
            }, atime);
        }
    }

    game = new Game(30);
    



    //提交信息检查
    var checkSubInfo = function () {
        var name = $(".p9-name").val();
        var phone = $(".p9-phone").val();
        var address = $(".p9-address").val();
        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (name == '' || name == null) {
            alert("请输入您的姓名");
            return;
        }
        if (phone == '' || phone == null) {
            alert("请输入您的联系电话");
            return;
        }
        if (!reg.test(phone)) {
            alert("手机号码不正确~");
            return;
        }
        if (address == '' || address == null) {
            alert("请输入您的地址");
            return;
        }
    }

    /**===>>>loading handling**/

    var imgsstr = ["images/p1-bg.jpg", "images/p1-bg.png", "images/music-on.png", "images/music-off.png", "images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png", "images/6.png",
    "images/close.png", "images/logo.png", "images/p2-bg.png", "images/p3-bg.png", "images/p3-pics.png", "images/p4-bg.png", "images/p5-bg.jpg", "images/p5-bg.png", "images/p5-boy.png",
    "images/p5-img.png", "images/p5-timebar.png", "images/p5-timebox.png", "images/p6-bg.png", "images/p7-bg.png", "images/p8-bg.png", "images/p9-bg.png", "images/p10-bg.png","images/gameover.png"];  //array test data
    var imgs = new Array();
    var img;
    var percent = 0;
    for (var i = 0; i < imgsstr.length; i++) {
        img = new Image();
        img.src = imgsstr[i];
        imgs.push(img);
    }
    var loadCount = 0;
    loadingPicture(imgs);
    function loadingPicture(images) {
        for (i = 0; i < images.length; i++) {
            if (!images[i].complete) {
                loadCount++;
                $(images[i]).bind("load", function (e) {
                    percent += 100 / imgsstr.length;
                    $("#loading .content").val(parseInt(percent) + "%");
                    loadCount--;
                    if (loadCount == 0) {
                        $("#loading").hide();
                        $("#p1").css("top", "0px").show();
                    }
                });
            }
        }
        if (loadCount == 0) {
            $("#loading").hide();
            $("#p1").css("top", "0px").show();
        }
    }
});