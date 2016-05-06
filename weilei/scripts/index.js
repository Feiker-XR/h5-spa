var scale;
$(function () {
    /** ===>>>for ios **/
    $(window).on('scroll.elasticity', function (e) {
        e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
        e.preventDefault();
    });

    /** ===>>>scale settings (The standard size:640*1008) **/
    
    $("#outer-container,.page").css({ "width": window.innerWidth + "px", "height": window.innerHeight + "px" }).hide();   //set container as device size��hide the pages
    $("#outer-container").show();																				 //show container
    $("#loading").show();																						 //show loading
    scale = window.innerHeight / 1008 < window.innerWidth / 640 ? window.innerHeight / 1008 : window.innerWidth / 640;	 //confirm the scale proportion
     $("#outer-container .content").css({"zoom":scale,"left":(window.innerWidth*1/scale-640)/2+"px","top":(window.innerHeight*1/scale-1008)/2+"px"});  //scale and center
   // $("#outer-container .content").css({ "transform": "scale(" + scale + ")", "left": (window.innerWidth - scale * 640) / 2 + "px", "top": (window.innerHeight - scale * 1008) / 2 + "px", "-ms-transform": "scale(" + scale + ")", "-moz-transform": "scale(" + scale + ")", "-webkit-transform": "scale(" + scale + ")", "-o-transform": "scale(" + scale + ")" });  //scale and center
    $(".logo").css("zoom", scale * 2 / 3);
    $(".zoomgirl").css("zoom", "0.49").css("top", "40px").css("left", "50px");
    $(".zoomlady").css({ "zoom": "0.49", "backgroundSize": "contain", "backgroundRepeat": "no-repeat", "left": "-43px", "top": "33px" });
    /*************************************************************** loading handling *************************************************************/

    var imgsstr = ["images/theme1.png", "images/theme2.png", "images/theme3.png", "images/theme4.png", "images/theme5.png", "images/theme6.png", "images/theme7.png", "images/theme8.png", "images/bg.jpg", "images/bg2.jpg", "images/face.png", "images/logo.png",
    "images/p1-bg.png", "images/p1-btn.png", "images/p2-bg.png", "images/p3-bg.png", "images/p4-bg.png", "images/p5-bg.png", "images/p6-bg.png", "images/p7-bg.png", "images/p7-lady.png", "images/p8-bg.png", "images/p9-bg.png", "images/p10-bg.png",
    "images/p10-img.png", "images/p11-bg.png", "images/p12-bg.png", "images/p13-bg.png", "images/p16-bg.png", "images/p16-cover.png", "images/p17-bg.png", "images/p18-bg.png", "images/share1.png", "images/shares.png", "images/p7-head.png", "images/head2.png", "images/p7-cover.png"];  //array test data
    for (var i = 1; i < 804; i++) {
        imgsstr.push("images/" + i + ".png");
        if (i == 30) {
            i = 200;
        }
        if (i == 210) {
            i = 300;
        }
        if (i == 310) {
            i = 400;
        }
        if (i == 410) {
            i = 500;
        }
        if (i == 504) {
            i = 600;
        }
        if (i == 603) {
            i = 700;
        }
        if (i == 703) {
            i = 800;
        }
    }
    var imgs = new Array();
    var img;
    var percent = 0;
    for (var i = 0; i < imgsstr.length; i++) {
        img = new Image();
        img.src = imgsstr[i];
        img.index = i;
        imgs.push(img);
    }

    //����ˮ��
    var inter;
    var loadWater = function () {
        var div = $("<div class='objmove'></div>");
        div.appendTo($("#p1 .content"));
        var posx = Math.random() * 600;
        $(div).css("left", posx + "px");
        var post = Math.random() * 300;
        var size = Math.random() * 2 + 0.5;
        var speed = Math.floor(Math.random() * 1000 + 1000);

        $(div).css("webkitTransform", "scale(" + size + ")").animate({ "top": post + "px" }, speed, function () {
            $(div).remove();
        });
    }

    //-----
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
                        $("#p1").css("top", "0px").show(0, function () {
                            inter = setInterval(function () {
                                loadWater();
                            }, 300);

                        })
                    }
                });
            }
        }
        if (loadCount == 0) {
            $("#loading").hide();
            $("#p1").css("top", "0px").show();
            inter = setInterval(function () {
                loadWater();
            }, 400);
        }
    }

    /********************************************************************************* ===>>>main ****************************************************/
    var animateflag;

    //-------------------------------------
    //ζ������
    var taste = {
        "1": "����", "2": "�㽶", "3": "ľ��", "4": "â��", "5": "��Ҷӣ��", "6": "����", "7": "����",
        "8": "����", "9": "��ݮ", "10": "����", "11": "����", "12": "����", "13": "���", "14": "�����",
        "15": "�ƹ�", "16": "��Ƥ", "17": "����", "18": "��ĩ", "19": "�ɿ���", "20": "���������Ѿ�", "21": "Ĩ��",
        "22": "��÷", "23": "ƻ��", "24": "����", "25": "����", "26": "������", "27": "����",
        "28": "����", "29": "�ϸ���", "30": "��"
    }

    var tastes = [];                                 //ѡ���ļ��ֿ�ζ,�������,5,9,12

    var rearr = [];                                 //����ѡ��Ŀ�ζ,������п�ζ���±�ֵ���û������ԭֵ
    var boy = 501;                                  //����������������,����ͼƬ����
    var ta = false;                                 //�Ƿ���Ta��ζ��
    var isboy = false;                              //��������Ů��
    var checkMine;                                  //�鿴�ҵ�ζ������
    var paohutaset = false;                         //��ܽ����ζ��

    /**************************************************** touches event *******************************************************************************/
    $("#outer-container").bind("click", function (e) {
        // console.log($(e.originalEvent.target));
        switch ($(e.target).attr("btn")) {
            case "p1-btn":
                $(".p1-btn").hide(0, function () {
                    $(".logo").hide();
                    $(".theme2").show(0).animate({ "left": "180px", "top": "510px" }, 500, function () {
                        $(".theme2").addClass("move");
                        $(".theme5").show(0).animate({ "left": "437px", "top": "360px" }, 800, function () {
                            $(".theme5").addClass("move");
                            $(".theme1").show(0).animate({ "left": "50px", "top": "357px" }, 1000, function () {
                                $(".theme1").addClass("move");
                                $(".theme3").show(0).animate({ "left": "296px", "top": "292px" }, 1200, function () {
                                    $(".theme3").addClass("move");
                                    $(".theme8").show(0).animate({ "left": "119px", "top": "222px" }, 1500, function () {
                                        $(".theme8").addClass("move");
                                        $(".theme6").show(0).animate({ "left": "313px", "top": "90px" }, 1800, function () {
                                            $(".theme6").addClass("move");
                                            $(".theme4").show(0).animate({ "left": "0px", "top": "20px" }, 2000, function () {
                                                $(".theme4").addClass("move");
                                                $(".theme7").show(0).animate({ "left": "482px", "top": "0px" }, 2000, function () {
                                                    $(".theme7").addClass("move");
                                                })
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case "theme":
                btnTheme(e);
                break;
            case "p3-mine":
                // $(".p7-lady-1").show();

                $("#p4").show();
                break;
            case "p3-ta":
                //$(".p7-lady-1").show();
                ta = true;                                  //Ta��ζ��
                $(".p7-face-1").css("backgroundImage", "url(images/head21.png)");
                $("#p4").show();
                break;
            case "p3-check-mine":
                if (!checkMine) {
                    alert("������δ���Ŷ");
                } else {                    //�Ѿ���ƹ������ʱ��
                    $("#p11").show().siblings().hide();
                }

                break;
            case "p4-btn":                                  //�ҳ�ŵ����
                $("#outer-container").css({ "backgroundSize": "200%", "backgroundPosition": "center bottom" });
                if (ta) {                                    //�����ҵ�ζ������������ζ�������ǳ�ҳ
                    $("#p5").show().siblings().hide();
                } else {                                    //�ҵ�ζ��
                    $("#p6").show().siblings().hide();
                }
                break;
            case "p5-start":                                //����ζ��
                var words = $('#p5 input').val();
                if (words.length > 0) {
                    if (words.length > 4) {
                        words = words.substring(0, 4);
                        $('#p5 input').val(words);
                    }
                    $("#p6 .p6-title").text("�����" + words + "��ʲô�ʵ���")
                    $("#p5").hide().next().show();
                } else {
                    alert("������TA���ǳƻ�����");
                }
                break;
            case "p6-ready":                            //ѡ�����ύ
                btnP6Ready();
                break;
            case "p6-askfor":
                paohutaset = true;
                $("#p6 textarea").val("");
                for (var i = 0; i < tastes.length; i++) {
                    $($("img")[parseInt(tastes[i]) - 1]).parent().css({ "background": "", "zIndex": "1" });
                }
               /* tastes = ["5", "9", "12"];
                for (var i = 0; i < 3; i++) {
                    $($("img")[parseInt(tastes[i]) - 1]).parent().css({ "background": "rgba(0,0,0,0.5)", "zIndex": "0" });
                }*/
                //$("#p6 textarea").val("��Ҷӣ�ҡ���ݮ������");
                $("#p6 textarea").val("#��ʵ���Լ�������αװ#ԭζ����ͦ�ã�").attr("readonly", "true");
                break;
            case "p6-prev":                                 //ѡζ�����л�
                leftCheck($(".choosebox ul"), 548);
                break;
            case "p6-next":                             //ѡζ���ұ��л�
                rightCheck($(".choosebox ul"), 548, -2192);
                break;
            case "img":                                 //ѡ��ζ�����ͼƬ��ʽ�ͱ���ͼƬ
                if (!paohutaset) {
                    btnImgs(e);
                }

                break;
            case "p7-btn1":             //ѡ�·�--����ѡ
                $(".lady").hide();
                $(".p7-lady").show();
                //$("#p7-tip").show();
                showClothes();
                leftCheck($(".p7-clothes ul"), 206, function () {
                    var temp = Math.abs(parseInt($(".p7-clothes ul").css("left")) / 206);
                    $(".p7-1").css("backgroundImage", "url(images/" + (temp + 201) + ".png)");
                });
                break;
            case "p7-btn2":             //ѡ�·�--����ѡ
                $(".lady").hide();
                $(".p7-lady").show();
                //$("#p7-tip").show();
                showClothes();
                rightCheck($(".p7-clothes ul"), 206, -1854, function () {
                    var temp = Math.abs(parseInt($(".p7-clothes ul").css("left")) / 206);
                    $(".p7-1").css("backgroundImage", "url(images/" + (temp + 201) + ".png)");
                });
                break;
            case "p7-btn3":             //ѡ����--����ѡ
                $(".lady").hide();
                $(".p7-lady").show();
                showClothes();
                leftCheck($(".p7-trous ul"), 206, function () {
                    var temp = Math.abs(parseInt($(".p7-trous ul").css("left")) / 206);
                    $(".p7-2").css("backgroundImage", "url(images/" + (temp + 301) + ".png)");
                });
                break;
            case "p7-btn4":             //ѡ����--����ѡ
                $(".lady").hide();
                $(".p7-lady").show();
                showClothes();
                rightCheck($(".p7-trous ul"), 206, -1854, function () {
                    var temp = Math.abs(parseInt($(".p7-trous ul").css("left")) / 206);
                    $(".p7-2").css("backgroundImage", "url(images/" + (temp + 301) + ".png)");
                });
                break;
            case "p7-btn5":             //ѡЬ��--����ѡ
                $(".lady").hide();
                $(".p7-lady").show();
                $("#p7-tip").show();
                leftCheck($(".p7-shoes ul"), 206, function () {
                    var temp = Math.abs(parseInt($(".p7-shoes ul").css("left")) / 206);
                    $(".p7-3").css("backgroundImage", "url(images/" + (temp + 401) + ".png)");
                });
                break;
            case "p7-btn6":             //ѡЬ��--����ѡ
                $(".lady").hide();
                $(".p7-lady").show();
                //$("#p7-tip").show();
                showClothes();
                rightCheck($(".p7-shoes ul"), 206, -1854, function () {
                    var temp = Math.abs(parseInt($(".p7-shoes ul").css("left")) / 206);
                    $(".p7-3").css("backgroundImage", "url(images/" + (temp + 401) + ".png)");
                });
                break;
            case "p7-change":           //һ����װ
                $(".lady").show();
                $(".hideclothes").hide();
                $(".p7-lady").css("backgroundImage", "none");
                $("#p7-tip").show();
                var rd = Math.floor(Math.random() * 3) + 601;
                $(".p7-lady-1").attr("rd", rd + "");
                $(".p7-lady-1").css("background", "url(images/" + rd + ".png)").css("background-position", "-20px 4px").show();
                break;
            case "p7-askfor":           //��ܽС�������Ƶ�һ��
                $(".lady").hide();
                $("#p7-tip").hide();
                var rd = Math.floor(Math.random() * 3) + 701;
                $(".p7-lady-1").attr("rd", rd + "");
                $(".p7-lady-1").css("background", "url(images/" + rd + ".png) no-repeat -80px 0").show();
                break;
            case "face":
                $("#p7-cover").show();
                break;
            case "p7-gender":           //ѡ������
                $(".p7-lady-1").hide();
                $("#p8").show().siblings().hide();
                break;
            case "p8-gender":           //����ѡŮ��ҳ
                // $(".p7-lady-1").show();
                if ($(".p7-lady").css("backgroundImage") == "none") {
                    $(".p7-lady-1").show();
                } else {
                    $(".p7-lady-1").hide();
                }

                $("#p7").show().siblings().hide();
                break;
            case "p8-prev":
                leftCheck($(".p8-box ul"), 272, function () {
                    var n = Math.abs(parseInt($(".p8-box ul").css("left")) / 272)
                    boy = $(".p8-box ul").find("img").eq(n).attr("alt");
                });
                break;
            case "p8-next":
                rightCheck($(".p8-box ul"), 272, -816, function () {
                    var n = Math.abs(parseInt($(".p8-box ul").css("left")) / 272)
                    boy = $(".p8-box ul").find("img").eq(n).attr("alt");
                });
                break;
            case "p8-askfor":
                $("#p9").show()
                break;
            case "p9-btn":
                $("#p9").hide();
                break;
            case "p7-ready":
                $("#p10").show().siblings().hide();
                break;
            case "p8-ready":

                $("#p10").show().siblings().hide();
                isboy = true;                                   //˵��ѡ��������
                break;
            case "p10-shake":
                $(".p10-img").addClass("shake");
                setTimeout(function () {
                    $(".p10-img").removeClass("shake");
                    if (!ta) {
                        checkMine = true;
                        $("#p11").show().siblings().hide();             //�Լ���(���С�/��Ů��)
                        if (!paohutaset) {
                            for (var i = 0; i < 3; i++) {
                                if (!isNaN(parseInt(rearr[i]))) {
                                    $(".p11-taste").eq(i).text("");
                                    $(".p11-taste").eq(i).css("backgroundImage", "url(images/" + rearr[i] + ".png)");
                                } else {
                                    $(".p11-taste").eq(i).text(rearr[i]);
                                }
                            }
                            var temp = rearr.length;
                            if (temp < 3) {
                                for (var t = temp; t < 3; t++) {
                                    $(".p11-taste").eq(t).text("");
                                    $(".p11-taste").eq(t).css("backgroundImage", "");
                                }
                            }
                        } else {
                            for (var i = 0; i < 3; i++) {
                                $(".p11-taste").eq(i).css("backgroundImage", "");
                                //$(".p11-taste").eq(i).text("ԭζ");
                            }
							var div = $("<div class='paohutaset' style='width:150px; height:100px;position:absolute;left:185px; top:477px; font-size:64px;'>ԭζ</div>");
							$("#p11 .content").append(div);
                        }

                        if (isboy) {
                            $(".p11-people .zoomgirl").hide();

                            $(".p7-lady-1").hide();

                            $(".p11-people").css("backgroundImage", "url(images/" + boy + ".png)");
                        } else {        //��Ů��
                            var bg = parseInt($(".p7-lady-1").attr("rd"));
                            if (isNaN(bg)) {    //˵����������װ
                                drawAvatar(document.getElementById("canvas11"));
                                $(".p11-people .hideclothes").show();
                                $(".p11-people").css("backgroundImage", "");
                            } else {
                                if (bg < 700) {     //һ����װ
                                    drawAvatar(document.getElementById("canvas11"));
                                    $(".p11-people .hideclothes").hide();
                                    $(".p11-people").css("backgroundImage", "");

                                    $(".zoomgirl").show();

                                } else {            //��ܽ�Ƽ�
                                    $(".p11-people .zoomgirl").hide();
                                    $(".p11-people .zoomlady").hide();
                                    $(".p11-people").css("backgroundImage", $(".p7-lady-1").css("backgroundImage"));
                                }
                            }
                        }
                    } else {
                        $("#p12").show().siblings().hide();             //Ta��(���С�/��Ů��)
                        $(".p12-title").text("����Ŀ�е�" + $('#p5 input').val());
                        if (!paohutaset) {
                            for (var i = 0; i < 3; i++) {
                                if (!isNaN(parseInt(rearr[i]))) {
                                    $(".p12-taste").eq(i).text("");
                                    $(".p17-taste").eq(i).text("");
                                    $(".p12-taste").eq(i).css("backgroundImage", "url(images/" + rearr[i] + ".png)");
                                    $(".p17-taste").eq(i).css("backgroundImage", "url(images/" + rearr[i] + ".png)");
                                } else {
                                    $(".p12-taste").eq(i).text(rearr[i]);
                                    $(".p17-taste").eq(i).text(rearr[i]);
                                }
                            }
                            var temp = rearr.length;
                            if (temp < 3) {
                                for (var t = temp; t < 3; t++) {
                                    $(".p12-taste").eq(t).text("");
                                    $(".p12-taste").eq(t).css("backgroundImage", "");
                                    $(".p17-taste").eq(t).text("");
                                    $(".p17-taste").eq(t).css("backgroundImage", "");
                                }
                            }
                        } else {
                            for (var i = 0; i < 3; i++) {
                                $(".p12-taste").eq(i).css("backgroundImage", "");
                                //$(".p12-taste").eq(i).text("ԭζ");
                                $(".p17-taste").eq(i).css("backgroundImage", "");
                                //$(".p17-taste").eq(i).text("ԭζ");
                            }
							var div = $("<div class='paohutaset' style='width:150px; height:100px;position:absolute;left:185px; top:477px; font-size:64px;'>ԭζ</div>");
							$("#p12 .content").append(div);
                        }
                        if (isboy) {
                            $(".p12-people .zoomgirl").hide();
                            $(".p12-people").css("backgroundImage", "url(images/" + boy + ".png)");
                            $(".p17-people .zoomgirl").hide();
                            $(".p17-people").css("backgroundImage", "url(images/" + boy + ".png)");
                        } else {
                            var bg = parseInt($(".p7-lady-1").attr("rd"));
                            if (isNaN(bg)) {    //˵����������װ
                                drawAvatar(document.getElementById("canvas12"));
                                $(".p12-people .hideclothes").show();
                                $(".p12-people").css("backgroundImage", "");

                                drawAvatar(document.getElementById("canvas17"));
                                $(".p17-people .hideclothes").show();
                                $(".p17-people").css("backgroundImage", "");
                            } else {
                                if (bg < 700) {     //һ����װ
                                    drawAvatar(document.getElementById("canvas12"));
                                    $(".p12-people .hideclothes").hide();
                                    $(".p12-people").css("backgroundImage", "");
                                    drawAvatar(document.getElementById("canvas17"));
                                    $(".p17-people .hideclothes").hide();
                                    $(".p17-people").css("backgroundImage", "");
                                } else {            //��ܽ�Ƽ�
                                    $(".p12-people .zoomgirl").hide();
                                    $(".p12-people .zoomlady").hide();
                                    $(".p12-people").css("backgroundImage", $(".p7-lady-1").css("backgroundImage"));
                                    $(".p17-people .zoomgirl").hide();
                                    $(".p17-people .zoomlady").hide();
                                    $(".p17-people").css("backgroundImage", $(".p7-lady-1").css("backgroundImage"));
                                }
                            }

                        }
                    }

                    if ($(".p7-lady-1").css("backgroundImage") != "") {
                        $(".p11-people").css("backgroundImage", "");
                    }

                }, 800);
                break;
            case "p11-backchoose":                  //�����Լ�������
                initialData();
                $("#p3").show().siblings().hide();
                break;
            case "p11-confirm":

                $("#p13").show().siblings().hide();
				if(!paohutaset){
					$(".p13-taste").eq(0).css("backgroundImage", $(".p11-taste").eq(0).css("backgroundImage")); //ͬ����p13
					$(".p13-taste").eq(0).text($(".p11-taste").eq(0).text());
					$(".p13-taste").eq(1).css("backgroundImage", $(".p11-taste").eq(1).css("backgroundImage"));
					$(".p13-taste").eq(1).text($(".p11-taste").eq(0).text());
					$(".p13-taste").eq(2).css("backgroundImage", $(".p11-taste").eq(2).css("backgroundImage"));
					$(".p13-taste").eq(2).text($(".p11-taste").eq(0).text());
					$(".p16-taste").eq(0).css("backgroundImage", $(".p11-taste").eq(0).css("backgroundImage")); //ͬ����p16
					$(".p16-taste").eq(0).text($(".p11-taste").eq(0).text());
					$(".p16-taste").eq(1).css("backgroundImage", $(".p11-taste").eq(1).css("backgroundImage"));
					$(".p16-taste").eq(1).text($(".p11-taste").eq(0).text());
					$(".p16-taste").eq(2).css("backgroundImage", $(".p11-taste").eq(2).css("backgroundImage"));
					$(".p16-taste").eq(2).text($(".p11-taste").eq(0).text());
				}else{
					var div = $("<div class='paohutaset' style='width:150px; height:100px;position:absolute;left:185px; top:390px; font-size:64px;'>ԭζ</div>");
					$("#p13 .content").append(div);
				}
                
                if (isboy) {
                    $(".p13-people .zoomgirl").hide();
                    $(".p13-people").css("backgroundImage", $(".p11-people").css("backgroundImage"));
                } else {
                    var bg = parseInt($(".p7-lady-1").attr("rd"));
                    if (isNaN(bg)) {    //˵����������װ
                        drawAvatar(document.getElementById("canvas13"));
                        $(".p13-people .hideclothes").show();
                        $(".p13-people").css("backgroundImage", "");
                    } else {
                        if (bg < 700) {     //һ����װ
                            drawAvatar(document.getElementById("canvas13"));
                            $(".p13-people .hideclothes").hide();
                            $(".p13-people").css("backgroundImage", "");
                        } else {            //��ܽ�Ƽ�
                            $(".p13-people .zoomgirl").hide();
                            $(".p13-people .zoomlady").hide();
                            $(".p13-people").css("backgroundImage", $(".p7-lady-1").css("backgroundImage"));
                        }
                    }
                }
                break;
            case "p12-tell-ta":
                $("#p14").show();
                break;
            case "p12-play-again":
                initialData();
                $("#p3").show().siblings().hide();
                //history.go(0);
                break;
            case "p12-suprise":
                //location.href = "";     //��è��ַ
                break;
            case "p13-reset":
                initialData();
                $("#p3").show().siblings().hide();
                break;
            case "p13-suprise":
                //location.href = "";     //��è��ַ
                break;
            case "p13-know":
                $("#p15").show();
                break;
            case "p14content":
                $("#p14").hide();
                break;
            case "p15content":
                $("#p15").hide();
                break;
            case "p16-agree":
                $("#p15").show();
                break;
            case "p16-disagree":
                $("#p18").show();
                break;
            case "p18-disagree":
                //location.href = "";                       //��ҳ��ַ
                break;
            case "p16-reset":
                //location.href = "";                       //��ҳ��ַ
                break;
            case "p16 - play":
                //location.href = "";                       //��ҳ��ַ
                break;
            case "p16-check":
                //location.href = "";                       //��è��ַ
                break;
            case "p16-say":
                $("#p16-1").show();
                break;
            case "16-over":
                $("#p16-1").hide();
                break;
            case "p17-agree":
                $("#p15").show();
                break;
            case "p17-disagree":
                $("#p18").show();
                break;
            case "p17-reset":
                //location.href = "";                       //��ҳ��ַ
                break;
            case "p17-play":
                //location.href = "";                       //��ҳ��ַ
                break;
            case "p17-suprise":
                //location.href = "";                        //��è��ַ
                break;
            case "p7-cover-btn":
                $(".p7-face-1").css("backgroundImage", "none");
                drawAvatar(document.getElementById("canvas7"));
                $(".p7-face .imgb").css({ "left": "0", "top": "0", "zoom": 1 / 3 });
                $("#p7-cover").hide();
                break;
        }
    })


    setInterval(function () {
        var word = $("#p5 input").val();
        if (word.length > 4) {
            $("#p5 input").val(word.substring(0, 4));
        }
    }, 100);





    var showClothes = function () {
        $(".p7-lady").css("backgroundImage", "url(images/p7-lady.png)");
        $("#p7-tip").show();
        $(".hideclothes").show();
        $(".p7-lady-1").attr("rd", null);
    }






    var himg = new Image();
    var w, h, startX, startY, moveX, moveY, iscale = 1.0, flag = false;
    var startX1, startX2, endX1, endX2, startY1, startY2, endY1, endY2, posX, posY;
    himg.src = "images/test.png";
    himg.onload = function () {
        $(".imgb").append(himg);            //��ͼƬ
        w = himg.width;
        h = himg.height;
        $("#moveobj").bind("touchstart", function (e) { //�����ϵ�div�¼�
            console.log(w + "," + h);
            if (e.originalEvent.touches.length == 1) {
                posX = parseFloat($(".imgbox img").css("left"));
                posY = parseFloat($(".imgbox img").css("top"));
                startX = e.originalEvent.touches[0].pageX * 1 / scale;
                startY = e.originalEvent.touches[0].pageY * 1 / scale;
            }

            if (e.originalEvent.touches.length == 2) {
                startX1 = e.originalEvent.touches[0].pageX * 1 / scale;
                startY1 = e.originalEvent.touches[0].pageY * 1 / scale;
                startX2 = e.originalEvent.touches[1].pageX * 1 / scale;
                startY2 = e.originalEvent.touches[1].pageY * 1 / scale;
            }

        });
        $("#moveobj").bind("touchmove", function (e) {
            if (e.originalEvent.touches.length == 1) {
                moveX = e.originalEvent.touches[0].pageX * 1 / scale;
                moveY = e.originalEvent.touches[0].pageY * 1 / scale;

                if (moveX == null || moveY == null) {
                    //
                } else {
                    if (!flag) {
                        $(".imgb img").css({ "left": (posX + moveX - startX) + "px", "top": (posY + moveY - startY) + "px" });
                    }
                }
            }


            if (e.originalEvent.touches.length == 2) {
                endX1 = e.originalEvent.touches[0].pageX * 1 / scale;     //���������
                endY1 = e.originalEvent.touches[0].pageY * 1 / scale;
                endX2 = e.originalEvent.touches[1].pageX * 1 / scale;
                endY2 = e.originalEvent.touches[1].pageY * 1 / scale;

                var beginx = Math.abs(startX2 - startX1);       //�����ʼx����
                var beginy = Math.abs(startY2 - startY1);      //�����ʼY����
                var endx = Math.abs(endX2 - endX1);         //�ƶ��������x����
                var endy = Math.abs(endY2 - endY1);         //�ƶ�������y�ľ���
                var spacex = endx - beginx;
                var spacey = endy - beginy;

                var finalx = spacex + spacey * (w / h);
                var finaly = spacey + spacex * (h / w);

                //console.log(finalx + "," + finaly);
                $(".imgb img").css({ "width": (w + finalx) + "px", "height": (h + finaly) + "px" });


                // $("#imgb img").css("webkitTransform", "scale(" + iscale + ")").css("webkitTransformOrigin", "0px 0px 0px");
            }
        });


        $("#moveobj").bind("touchend", function (e) {
            w = parseInt($(".imgb img").css("width"));
            h = parseInt($(".imgb img").css("height"));

            startX = null;
            moveX = null;
            startY = null;
            moveY = null;
            endX1 = null;
            startX1 = null;
            endX2 = null;
            startX2 = null;
            if (e.originalEvent.touches.length == 1) {
                flag = true;
            } else {
                flag = false;
            }
        });
    }






    /******************************************* function define *********************************************************************/

    //============>�˸����ݰ�ť<======================================

    var canvas;
    var ctx;
    var btnTheme = function (e) {
        $(e.target).css("zIndex", "0").addClass("changebg");
        var temp = 0;
        for (var i = 0; i < 8; i++) {
            if ($(".theme" + i).css("zIndex") == "0") {
                temp++;
            }
        }
        if (temp == 7) {
            $(".theme").hide();
            clearInterval(inter);
            $(".objmove").remove();
            canvas = document.getElementById("cv");
            //canvas.width = 640;
            //canvas.height = 1008;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var cimg = new Image();
            cimg.src = "images/p2-bg.png";
            cimg.onload = function () {
                ctx.drawImage(cimg, 0, 0, window.innerWidth, window.innerHeight);
            }
            $("#p2").show();
            //$("#p3").show();
        }
    }

    var area = 0;
    var clear = function (e) {
        /*var x = e.originalEvent.touches[0].clientX * 1 / scale;
        var y = e.originalEvent.touches[0].clientY * 1 / scale;
        ctx.clearRect(x, y, 50, 50);
        if (x > 102 && x < 544 && y > 733 && y < 870) {
            area += 50 * 50;
        }*/
        var x = e.originalEvent.touches[0].clientX;
        var y = e.originalEvent.touches[0].clientY;
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        //ctx.drawImage(cimg, 0,0,window.innerWidth, window.innerHeight);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillstyle = "rgba(255,255,255,0)";
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 360);
        ctx.fill();
        ctx.closePath();

        //ctx.clearRect(x,y,20,20);
        area += 15 * 15;
    }

    $("#cv").bind("touchstart", function (e) {
        clear(e);
    });
    $("#cv").bind("touchmove", function (e) {
        clear(e);
    });
    $("#cv").bind("touchend", function (e) {
        console.log(area);
        if (area > 10000) {
            $("#p3").show().siblings().hide();
        }
    });






    //============>ζ��ѡ���˰�ť<======================================
    var btnP6Ready = function () {
        if (!ta) {                                                          //Ϊ˭ѡ����
            $(".p8-title").text("Ϊ�Լ����������~");
        } else {
            $(".p8-title").text("Ϊ" + $('#p5 input').val() + "���������~");
        }
        var tastestemp = $("#p6 textarea").val();   //�ı����ֵ
        var temparr = tastestemp.split('��');        //�ָ�������                      
        var deleteBlank = function (arr) {              //ɾ���հ�����
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "") {
                    arr.splice(i, 1);
                    deleteBlank(arr);
                }
            }
        }
        deleteBlank(temparr);

        if (temparr.length > 3) {
            alert("�������ֿ�ζ��");
            return;
        }
        //�����Ƿ����ֶ������

        for (var i = 0; i < temparr.length; i++) {
            var flag = false;
            for (var j = 1; j <= 30; j++) {
                if (temparr[i] == taste[j + ""]) {
                    //rearr.push(taste[j + ""]);
                    rearr.push(j);
                    flag = true;
                }
            }
            if (flag == false) {
                rearr.push(temparr[i]);
            }
        }
        rearr.sort();
        // console.log("asdf:"+rearr.length);  
        if (rearr.length < 4 && rearr.length > 0) {
            $("#p7").show().siblings().hide();
            if ($(".p7-lady").css("backgroundImage") == "none") {
                $(".p7-lady-1").show();
            } else {
                $(".p7-lady-1").hide();
            }
        }
    }

    //============>ѡζ����ѡ����δѡ�е��л�<======================================
    var btnImgs = function (e) {
        //console.log($(e.target).parent().css("zIndex"));
        if ($(e.target).parent().css("zIndex") == "1") {
            if (tastes.length < 3) {
                $(e.target).parent().css({ "background": "rgba(0,0,0,0.5)", "zIndex": "0" });
                var bgNo = $(e.target).attr("src").split('/')[$(e.target).attr("src").split('/').length - 1].split('.')[0];
                tastes.push(bgNo);
                tastes.sort();
                if (tastes.length == 3) {
                    $("#p6 textarea").val($("#p6 textarea").val() + taste[bgNo]);
                } else {
                    $("#p6 textarea").val($("#p6 textarea").val() + taste[bgNo] + "��");
                }
                //console.log(tastes);
            } else {
                alert("���ֻ��ѡ��3�ܿ�ζŶ��");
            }

        } else {
            $(e.target).parent().css({ "background": "", "zIndex": "1" });
            var bgNo = $(e.target).attr("src").split('/')[$(e.target).attr("src").split('/').length - 1].split('.')[0];
            for (var i = 0; i < 3; i++) {
                if (bgNo == tastes[i]) {
                    tastes.splice(i, 1);
                    tastes.sort();
                    //console.log(tastes);
                    break;
                }
            }
            tastes.sort();
            $("#p6 textarea").val("");
            for (var j = 0; j < tastes.length; j++) {
                $("#p6 textarea").val($("#p6 textarea").val() + taste[tastes[j]] + "��");
            }
        }
    }

    //=======================>���й���(����)<===================================
    var leftCheck = function (obj, space, callback) {
        if (!animateflag) {
            animateflag = true;
            if (parseInt(obj.css("left")) >= 0) {
                alert("û������");
                animateflag = false;
            } else {
                obj.animate({ "left": (parseInt(obj.css("left")) + space) + "px" }, "normal", function () {
                    animateflag = false;
                    if (callback) {
                        callback();
                    }
                });
            }

        } else {
            return;
        }

    }
    //=======================>���й���(����)<===================================
    var rightCheck = function (obj, space, lastPos, callback) {
        if (!animateflag) {
            animateflag = true;
            if (parseInt(obj.css("left")) <= lastPos) {
                alert("û������");
                animateflag = false;
            } else {
                obj.animate({ "left": (parseInt(obj.css("left")) - space) + "px" }, "normal", function () {
                    animateflag = false;
                    if (callback) {
                        callback();
                    }
                });
            }
        } else {
            return;
        }

    }

    //===========================������div�Ĵ�С�ͼ���ͼƬ��=========================================
    var loadDivImage = function () {
        for (var i = 0; i < 8; i++) {
            imgs[i].onload = function () {
                $(".theme").eq(this.index).css({ "width": this.width + "px", "height": this.height + "px", "background": "url(images/theme" + (this.index + 1) + ".png) no-repeat center center", "backgroundSize": "contain", "zIndex": "1", "top": "900px" }).hide();
                $(".theme1").css("left", "50px");
                $(".theme2").css("left", "180px");
                $(".theme3").css("left", "296px");
                $(".theme4").css("left", "0px");
                $(".theme5").css("left", "437px");
                $(".theme6").css("left", "313px");
                $(".theme7").css("left", "482px");
                $(".theme8").css("left", "119px");
            }
        }
    }();
    $(".p7-btn:odd").css("left", "551px");

    //================================����ʼ���ݡ�================================================
    var initialData = function () {
        $("#p6 textarea").val("").removeAttr("readonly");
        paohutaset = false;
		$(".paohutaset").remove();
        $(".choosebox ul").css("left", "0");
        $('#p5 input').val("");
        /* $(".p7-box ul").css("left", "0");
         $(".p8-box ul").css("left", "0");
         $(".p11-taste").css("backgroundImage", "");
         $(".p12-taste").css("backgroundImage", "");
         $(".p13-taste").css("backgroundImage", "");
         $(".p11-people").css("backgroundImage", "");
         $(".p12-people").css("backgroundImage", "");
         $(".p13-people").css("backgroundImage", "");
         $(".p7-1").css("backgroundImage", "images/201.png");
         $(".p7-2").css("backgroundImage", "images/301.png");
         $(".p7-3").css("backgroundImage", "images/401.png");*/
        for (var i = 0; i < tastes.length; i++) {
            $($("img")[parseInt(tastes[i]) - 1]).parent().css({ "background": "", "zIndex": "1" });
        }
        tastes = [];
        rearr = [];
        ta = false;
        isboy = false;
        boy = 501;
    }



});

function drawAvatar(canvas) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    var headimg1 = new Image();
    var headimg2 = new Image();
    var photo = $(".imgb img")[0];
    var width = parseFloat($(photo).css("width"));
    var height = parseFloat($(photo).css("height"));
    var left = parseFloat($(photo).css("left"));
    var top = parseFloat($(photo).css("top"));
    if (width == 0) {
        width = photo.width;
    }
    if (height == 0) {
        height = photo.height;
    }
    context.drawImage(photo, left, top, width, height);
    context.globalCompositeOperation = 'destination-in';

    headimg1.onload = function () {
        var zoom = canvas.width / headimg1.width;
        var imgHeight = headimg1.height * zoom;
        headimg2.onload = function () {
            context.drawImage(headimg2, 0, (canvas.height - imgHeight) / 2, canvas.width, imgHeight);
            context.globalCompositeOperation = 'source-over';
            context.drawImage(headimg1, 0, (canvas.height - imgHeight) / 2+10, canvas.width, imgHeight);
        }
        headimg2.src = "images/b.png";
    }
    headimg1.src = "images/a.png";
}