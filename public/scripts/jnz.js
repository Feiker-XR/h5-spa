$(function () {
    $(window).on('scroll.elasticity', function (e) {
        e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
        e.preventDefault();
    });

    $(".page").height(window.innerHeight * 640 / window.innerWidth).hide();
    $("#container").height(window.innerHeight * 640 / window.innerWidth).css("zoom", window.innerWidth / 640);
    var music = document.getElementById("audio");
    var isplay = false;
    $(".music").bind("click", function () {
        if (!isplay) {
            music.pause();
            $(".music").css("backgroundImage", "url(./../public/images/jnz/music_off.png)");
            isplay = !isplay;
        } else {
            music.play();
            $(".music").css("backgroundImage", "url(./../public/images/jnz/music_on.png)");
            isplay = !isplay;
        }
    })

    var flag = false;
    var gif = 0;
    $("#logo").hide();
    $("#arrow").hide();
    $("#loading").show();

    //-----------------------p1
    var startY;
    var endY;
    $("#p1").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p1").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p1").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p1").removeClass("scaleNomalPage").addClass("scaleSmallPage");
            //p2
            //  $(".p2-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            // gif++;
            //$(".p2-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            clearInterval(cloud);
            setTimeout(function () {
                $("#p1").hide(10, function () {
                    $(".p1-img-1").stop(true).animate().css("left", "-66px").siblings().stop(true);
                    $("#p1 .p1-words").stop(true).removeClass("p1-word-animation");
                    $("#p1 .p1-words-1").stop(true).removeClass("p1-word-animation");
                    enterP2();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            if (flag == false) {
                alert("已经是第一页");
            } else {
                clearInterval(cloud);
                $("#p1").removeClass("scaleNomalPage").addClass("scaleSmallPage");
                $(".p1-img-2").hide().siblings().show();
                $(".p1-img-1").css("left", "-124px").siblings().stop(true).show();
                $("#p1 .p1-words").removeClass("p1-word-animation");
                $("#p1 .p1-words-1").removeClass("p1-word-animation-1");
                $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo2.png)");
                $("#arrow").hide();
                setTimeout(function () {
                    $("#p1").hide();
                    enterP11();
                }, 500);
            }
        }

        startY = null;
        endY = null;
    });
    //------------------------p2

    $("#p2").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p2").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p2").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p2").removeClass("scaleBigPage").removeClass("scaleNomalPage").addClass("scaleSmallPage");
            $(".p2-img").stop(true, false).animate();
            //p2
            //$(".p2-circle-once").css("backgroundImage", "none");
            //$(".p3-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p2-circle-once").empty();
           // $(".p3-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            setTimeout(function () {
                $("#p2").hide(0, function () {
                    $(".p2-cloud-1").removeClass("p2-cloud-1-animation");
                    $(".p2-cloud-2").removeClass("p2-cloud-2-animation");
                    $(".p2-cloud-3").removeClass("p2-cloud-3-animation");
                    enterP3();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p2").removeClass("scaleBigPage").removeClass("scaleNomalPage").addClass("scaleSmallPage");
            $("#p2-circle").removeClass("p2-circle-once");
            $(".p2-img").stop(true, false).animate();
            $("#p1 .p1-words-1").removeClass("p1-word-animation-1");
            $(".p2-circle-once").children().remove();


            setTimeout(function () {
                $("#p2").hide(0, function () {
                    $(".p1-cloud-1").hide();
                    $(".p1-cloud-2").hide();
                    $(".p1-cloud-3").hide();
                    enterP1();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });
    //-----------------------p3	
    $("#p3").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p3").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p3").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p3").removeClass("scaleBigPage").removeClass("scaleNomalPage").addClass("scaleSmallPage");
            $(".p3-img").stop(true, false).animate();
            //$(".p3-circle-once").css("backgroundImage", "none"); //p3
            $(".p3-circle-once img").remove();

            setTimeout(function () {
                $("#p3").hide(0, function () {
                    enterP4();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p3").removeClass("scaleBigPage").removeClass("scaleNomalPage").addClass("scaleSmallPage");
            //$("#p2-circle").removeClass("p2-circle-once");
            $(".p3-img").stop(true, false).animate();
            //p3
            //$(".p3-circle-once").css("backgroundImage", "none");
            //$(".p2-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p3-circle-once img").remove();
            //$(".p2-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;


            setTimeout(function () {
                $("#p3").hide(0, function () {
                    $("#p2").removeClass("scaleSmallPage").addClass("scaleNomalPage").show();
                    $(".p2-cloud-1").removeClass("p2-cloud-1-animation");
                    $(".p2-cloud-2").removeClass("p2-cloud-2-animation");
                    $(".p2-cloud-3").removeClass("p2-cloud-3-animation");
                    enterP2();
                });
            }, 1000);
        }
        startY = null;
        endY = null;
    });
    //-----------------------p4	
    $("#p4").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p4").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p4").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            //p4-start click
        } else if (startY - endY < -100 && endY != null) {
            $("#p4").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //to p3
            //$(".p3-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            $("#arrow").show();
            setTimeout(function () {
                $("#p4").hide(0, function () {
                    enterP3();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });

    $(".p4-start").bind("touchstart", function () {
        $("#p4").removeClass("scaleBigPage").addClass("scaleSmallPage");
        $("#arrow").show();
        setTimeout(function () {
            $("#p4").hide(0, function () {
                enterP5();
            });
        }, 500);
    });



    //---------------------------p5	
    $("#p5").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p5").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p5").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p5").removeClass("scaleBigPage").addClass("scaleSmallPage");
            $(".p6-title").hide();
            $(".p6-img-c").hide();
            setTimeout(function () {
                $("#p5").hide(0, function () {
                    $("#p6").removeClass("scaleSmallPage").addClass("scaleBigPage").show();
                    $(".p6-img").addClass("p6-img-animation");
                    $(".p6-words").hide();
                    $(".p6-car").css("left", "640px"); $(".p6-img-1").hide();
                    $(".p6-img-2").hide();
                    $(".p6-img-3").hide();
                    $(".p6-img-4").hide();
                    $(".p6-img-5").hide();
                    $(".p6-rotate").hide();
                    setTimeout(function () {
                        enterP6();
                    }, 2000);

                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p5").removeClass("scaleBigPage").addClass("scaleSmallPage");
            setTimeout(function () {
                $("#p5").hide(0, function () {
                    enterP4();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });

    //------------------------p6	
    $("#p6").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p6").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p6").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p6").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p7        
            //$(".p7-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            setTimeout(function () {
                $("#p6").hide(0, function () {
                    enterP7();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p6").removeClass("scaleBigPage").addClass("scaleSmallPage");
            setTimeout(function () {
                $("#p6").hide(0, function () {
                    enterP5();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });
    //---------------------------p7
    $("#p7").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p7").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p7").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p7").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p8
            //$(".p7-circle-once").css("backgroundImage", "none");
            //$(".p8-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p7-circle-once img").remove();
            //$(".p8-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            setTimeout(function () {
                $("#p7").hide(0, function () {
                    enterP8();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p7").removeClass("scaleBigPage").addClass("scaleSmallPage");
            $(".p6-title").removeClass("p6-title-animation").hide();
            $(".p6-words").hide();
            $(".p6-img-c").hide();
            $(".p6-car").css("left", "640px");

            //$(".p7-circle-once").css("backgroundImage", "none");   //p7
            $(".p7-circle-once img").remove();

            setTimeout(function () {
                $("#p7").hide(0, function () {
                    $("#p6").removeClass("scaleSmallPage").addClass("scaleBigPage").show();
                    $(".p6-img").addClass("p6-img-animation");
                    $(".p6-img-1").hide();
                    $(".p6-img-2").hide();
                    $(".p6-img-3").hide();
                    $(".p6-img-4").hide();
                    $(".p6-img-5").hide();
                    $(".p6-rotate").hide();
                    setTimeout(function () {
                        enterP6();
                    }, 2000);
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });
    //-------------------------p8
    $("#p8").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p8").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p8").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p8").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p8
            //$(".p8-circle-once").css("backgroundImage", "none");
            //$(".p9-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p8-circle-once img").remove();
            //$(".p9-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;


            setTimeout(function () {
                $("#p8").hide(0, function () {
                    enterP9();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p8").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p7
            //$(".p8-circle-once").css("backgroundImage", "none");
            //$(".p7-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p8-circle-once img").remove();
            //$(".p7-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            setTimeout(function () {
                $("#p8").hide(0, function () {
                    enterP7();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });
    //-----------------------p9	

    $("#p9").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p9").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p9").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p9").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p9
            //$(".p9-circle-once").css("backgroundImage", "none");
            //$(".p10-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p9-circle-once img").remove();
            //$(".p10-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;


            setTimeout(function () {
                $("#p9").hide(0, function () {
                    enterP10();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p9").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p8
            //$(".p9-circle-once").css("backgroundImage", "none");
            //$(".p8-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p9-circle-once img").remove();
            $(".p8-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            gif++;

            setTimeout(function () {
                $("#p9").hide(0, function () {
                    enterP8();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });
    //------------------------------p10	
    $("#p10").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p10").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p10").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            $("#p10").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p10
            $(".p10-circle-once img").remove();

            setTimeout(function () {
                $("#p10").hide(0, function () {
                    enterP11();
                });
            }, 500);
        } else if (startY - endY < -100 && endY != null) {
            $("#p10").removeClass("scaleBigPage").addClass("scaleSmallPage");
            //p10
            //$(".p10-circle-once").css("none");
            //$(".p9-circle-once").css("backgroundImage", "url(./../public/images/jnz/circle-once.gif?" + gif + ")");
            //gif++;
            $(".p10-circle-once img").remove();
            //$(".p9-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            setTimeout(function () {
                $("#p10").hide(0, function () {
                    enterP9();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });
    //-----------------p11	
    $("#p11").bind("touchstart", function (e) {
        startY = e.originalEvent.touches[0].pageY;
    });
    $("#p11").bind("touchmove", function (e) {
        endY = e.originalEvent.touches[0].pageY;
    });
    $("#p11").bind("touchend", function (e) {
        if (startY - endY > 100 && endY != null) {
            flag = true;
            $("#p11").removeClass("scaleBigPage").addClass("scaleSmallPage");
            $(".p1-img-1").show();
            $(".p2-img").stop(true, false).animate();
            $("#p1 .p1-words-1").removeClass("p1-word-animation-1");
            setTimeout(function () {
                $("#p11").hide(0, function () {
                    enterP1();
                });
            }, 1000);
        } else if (startY - endY < -100 && endY != null) {
            $("#p11").removeClass("scaleBigPage").addClass("scaleSmallPage");
            $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo.png)");
            $("#arrow").show();
            //p10
            //$(".p10-circle-once").append("<img src='img/circle-once.gif?" + gif + "'/>");
            //gif++;

            setTimeout(function () {
                $("#p11").hide(0, function () {
                    enterP10();
                });
            }, 500);
        }
        startY = null;
        endY = null;
    });

	$(".link").bind("click",function(){
		location.href="http://ford-edge.ser2.ford001.com/jnz.html";
	});
    /**********函数定义*************/
    //进入第一页
    var cloud;
    function enterP1() {
        $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo.png)");
        $("#arrow").show();
        //$(".p1-cloud-1").css("left","275px").hide();
        //$(".p1-cloud-2").css("left","0px").hide();
        //$(".p1-cloud-3").css("right","0px").hide();
        $("#p1").removeClass("scaleSmallPage").addClass("scaleNomalPage").show();
        //$(".p1-img-2").hide();	
        $(".p1-img-1").show();
        $(".p1-img-1").animate({ "left": "-66px" }, 1000, function () {
            //$(this).fadeOut(1500);
            //$(".p1-img-2").fadeIn(1500);
        });
        $("#p1 .p1-words").removeClass("scaleSmallPage").addClass("p1-word-animation");
        setTimeout(function () {
            $("#p1 .p1-words-1").removeClass("scaleSmallPage").addClass("p1-word-animation-1");
            /*setTimeout(function(){
                var speed = 275;
                cloud = setInterval(function(){
                if(speed > 640){
                    clearInterval(cloud);
                }
                $(".p1-cloud-1").animate({"left":speed+"px"}).show();
                $(".p1-cloud-2").animate({"left":speed-275+"px"}).show();
                $(".p1-cloud-3").animate({"right":speed-275+"px"}).show();
                speed += 10;
            },16);
        },1000);*/

        }, 2000);
    }
    //进入第二页
    function enterP2() {
        //$(".p2-circle-once").css("backgroundImage","url(./../public/images/jnz/circle-once.gif?"+gif+")");
        //gif++;
        $(".p2-rotate").hide();
        $(".p2-words").hide();
        $(".p2-words div").hide();
        $(".p2-img-1").hide();
        $(".p2-cloud-1").css("left", "0px");
        $(".p2-cloud-2").css("left", "180px");
        $(".p2-cloud-3").css("left", "296px");
        $("#p1 .p1-words-1").removeClass("p1-word-animation-1");
        setTimeout(function () {
            //$(".p2-rotate").fadeIn(1000);
        }, 2000);
        $("#p2").show().addClass("scaleBigPage");
        $(".p2-cloud-1").addClass("p2-cloud-1-animation");
        $(".p2-cloud-2").addClass("p2-cloud-2-animation");
        $(".p2-cloud-3").addClass("p2-cloud-3-animation");
        $(".p2-img").addClass("p2-move-bg");
        $(".p2-words").fadeIn(1000, function () {
            $(".p2-img-1").fadeIn(3000);
            $(".p2-words .p2-words-1").fadeIn(700, function () {
                $(".p2-words .p2-words-2").fadeIn(700, function () {
                    $(".p2-words .p2-words-3").fadeIn(700);
                });
            });
        });
    }
    //进入第三页
    function enterP3() {
        //$(".p3-circle-once").css("backgroundImage","url(./../public/images/jnz/circle-once.gif?"+gif+")");
        //gif++;
        $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo.png)");
        $(".p3-rotate").hide();
        $(".p3-words").hide();
        $(".p3-words div").hide();
        $("#p3").show(0).addClass("scaleBigPage");
        //$(".p3-img").addClass("p2-move-bg");
        setTimeout(function () {
            //$(".p3-rotate").fadeIn(1000);
        }, 2000);
        $(".p3-words").fadeIn(1000, function () {
            $(".p3-words .p3-words-1").fadeIn(700, function () {
                $(".p3-words .p3-words-2").fadeIn(700, function () {
                    $(".p3-words .p3-words-3").fadeIn(700);
                });
            });
        });
    }

    //进入第四页
    function enterP4() {
        $("#p3-circle").removeClass("p3-circle-once");
        $("#arrow").hide();
        $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo3.png)");
        $("#p4").removeClass("scaleSmallPage").show().addClass("scaleBigPage");
        $(".p4-word-2").addClass("p4-word-animation");
        $(".p4-start-1").addClass("p4-start-animation");
    }
    //进入第五页
    function enterP5() {
        $(".p5-img-3").hide();
        $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo.png)");
        $("#p5").removeClass("scaleSmallPage").show();
        $(".p5-title").hide();
        $(".p5-words").hide();
        $(".p5-img-5").hide();
        $(".p5-img-1").removeClass("scaleBigPage");
        setTimeout(function () {
            $(".p5-img-3").fadeIn(1000);
        }, 2000);
        $(".p5-img-4").css("left", "-320px");
        $(".p5-img-1").addClass("scaleBigPage");
        $(".p5-img-4").animate({ "left": 0 + "px" }, 1000);
        $(".p5-title").addClass("p5-title-animation").delay(1000).show(0, function () {
            $(".p5-words").delay(1000).fadeIn(1000, function () {
                $(".p5-img-5").fadeIn(1000);
            })
        });
    }

    //进入第六页
    function enterP6() {

        $(".p6-car").css("backgroundImage", "url(./../public/images/jnz/p6-car-1.png)");
        setTimeout(function () {
            $(".p6-rotate").fadeIn(1000);
        }, 2000);
        $(".p6-img-c").fadeIn(1000, function () {
            //$(".p6-img-5").fadeIn(1000,function(){
            $(".p6-title").addClass("p6-title-animation").show();
            $(".p6-car").animate({ "left": "0px" }, 1500, function () {
                $(".p6-car").css("backgroundImage", "url(./../public/images/jnz/p6-car.png)");
                $(".p6-words").fadeIn(1000);
            });
            //});
        });
    }

    //进入第七页
    function enterP7() {
        $(".p7-title").css("left", "-87px");
        $(".p7-img-2").hide();
        $(".p7-words").hide();
        $(".p7-img-1").hide();
        $(".p7-rotate").hide();
        //$(".p7-circle-once").css("backgroundImage","url(./../public/images/jnz/circle-once.gif?"+gif+")");
        //gif++;
        $("#p7").removeClass("scaleSmallPage").addClass("scaleBigPage").show();
        setTimeout(function () {
            //$(".p7-rotate").fadeIn(1000);
        }, 2000);
        $(".p7-img-1").addClass("p6-img-animation").show();
        setTimeout(function () {
            $(".p7-title").animate({ "left": "30px" }, 1000);
            $(".p7-img-2").fadeIn(1000, function () {
                $(".p7-words").fadeIn(1000);
            });
        }, 2000);
    }

    //进入第八页
    function enterP8() {
        $(".p8-img-2").hide();
        $(".p8-words").hide();
        $(".p8-title").hide();
        $(".p8-rotate").hide();
        //$(".p8-circle-once").css("backgroundImage","url(./../public/images/jnz/circle-once.gif?"+gif+")");
        //gif++;
        $("#p8").removeClass("scaleSmallPage").addClass("scaleBigPage").show(0, function () {
            $(".p8-img-2").addClass("p6-img-animation").show();
            setTimeout(function () {
                //$(".p8-rotate").fadeIn(1000);
            }, 2000);
            setTimeout(function () {
                $(".p8-title").addClass("p5-title-animation").show();
                setTimeout(function () {
                    $(".p8-words").fadeIn(1000);
                }, 1500);
            }, 2000);
        });
    }

    //进入第九页
    function enterP9() {
        $(".p9-title").hide();
        $(".p9-words").hide();
        $(".p9-img-2").hide();
        $(".p9-rotate").hide();
        //$(".p9-circle-once").css("backgroundImage","url(./../public/images/jnz/circle-once.gif?"+gif+")");
        //gif++;
        $("#p9").removeClass("scaleSmallPage").addClass("scaleBigPage").show(0, function () {
            $(".p9-img-1").addClass("p9-img1");
            setTimeout(function () {
                //$(".p9-rotate").fadeIn(1000);
            }, 2000);
            setTimeout(function () {
                $(".p9-img-2").fadeIn(1000);
                $(".p9-title").addClass("p6-title-animation").show();
                setTimeout(function () {
                    $(".p9-words").fadeIn(1000);
                }, 1000)
            }, 1000);
        });
    }
    //进入第十页
    function enterP10() {
        $(".p10-words").hide();
        $(".p10-img-2").hide();
        $(".p10-words").hide();
        $(".p10-title").hide();
        $(".p10-rotate").hide();
        $(".p10-img-1-1").css("bottom", "1136px");
        $(".p10-img-4").hide();
        $(".p10-img-5").hide();
        //$(".p10-circle-once").css("backgroundImage","url(./../public/images/jnz/circle-once.gif?"+gif+")");
        //gif++;
        $(".p10-img-1").css("backgroundImage", "url(./../public/images/jnz/p10-img-1.png)");
        $("#p10").removeClass("scaleSmallPage").addClass("scaleBigPage").show(0, function () {
            $(".p10-img-2").fadeIn(1500);
            setTimeout(function () {
                //$(".p10-rotate").fadeIn(1000);
            }, 2000);
            setTimeout(function () {
                $(".p10-title").addClass("p6-title-animation").show();
                $(".p10-img-1-1").animate({ "bottom": "724px" }, 1000, function () {
                    $(".p10-img-1").css("backgroundImage", "url(./../public/images/jnz/p10-img-1-2.png)");
                });
                $(".p10-img-4").fadeIn(1000);
                $(".p10-img-5").fadeIn(1000);
                setTimeout(function () {
                    $(".p10-words").fadeIn(1000);
                }, 1000);
            }, 1000);
        });
    }
    //进入第十一页
    function enterP11() {
		$(".link").hide();
        $("#logo").css("backgroundImage", "url(./../public/images/jnz/logo2.png)");
        //$(".p11-cloud-1").css("left","0px");
        //$(".p11-cloud-2").css("left","0px");
        //$(".p11-cloud-3").css("left","0px");
        //$(".p11-cloud-4").css("left","0px");
        $(".p11-title").hide();
        $("#arrow").hide();
        $(".p11-words").hide();
        $(".p11-name").hide();
        $("#p11").removeClass("scaleSmallPage").addClass("scaleBigPage").show(0, function () {
            //$(".p11-cloud-1").animate({"left":"640px"},2000)
            //$(".p11-cloud-2").animate({"left":"640px"},2000)
            //$(".p11-cloud-3").animate({"left":"-640px"},2000)
            //$(".p11-cloud-4").animate({"left":"-640px"},2000,function(){
            $(".p11-title").fadeIn(500, function () {
                $(".p11-name").fadeIn(500, function () {
                    $(".p11-words").addClass("p4-word-animation").show();
					$(".link").fadeIn(3000);
                });
            })
            //})

        });
    }

    /**===>>>loading handling**/

    var imgsstr = ["./../public/images/jnz/arrow.png", "./../public/images/jnz/logo.png", "./../public/images/jnz/logo2.png", "./../public/images/jnz/music_off.png", "./../public/images/jnz/music_on.png", "./../public/images/jnz/p1-bg-1.jpg",
	"./../public/images/jnz/p1-word.png", "./../public/images/jnz/p2-img.jpg", "./../public/images/jnz/p2-img-1.png", "./../public/images/jnz/p2-rotate.gif", "./../public/images/jnz/p2-words.png", "./../public/images/jnz/p3-img.jpg", "./../public/images/jnz/p3-words.png", "./../public/images/jnz/p4-bg.gif",
	"./../public/images/jnz/p4-start.png", "./../public/images/jnz/p4-word-1.png", "./../public/images/jnz/p4-word-2.png", "./../public/images/jnz/p5-bg.png", "./../public/images/jnz/p5-img-1.png", "./../public/images/jnz/p5-img-2.png", "./../public/images/jnz/p5-img-4.png",
	"./../public/images/jnz/p5-img-5.png", "./../public/images/jnz/p5-title.png", "./../public/images/jnz/p5-word.png", "./../public/images/jnz/p6-bg.jpg", "./../public/images/jnz/p6-car.png", "./../public/images/jnz/p6-img.jpg", "./../public/images/jnz/p6-title.png", "./../public/images/jnz/p6-words.png",
	"./../public/images/jnz/p7-img-1.png", "./../public/images/jnz/p7-img-2.png", "./../public/images/jnz/p7-title.png", "./../public/images/jnz/p7-words.png", "./../public/images/jnz/p8-bg.jpg", "./../public/images/jnz/p8-img-1.png", "./../public/images/jnz/p8-img-2.png", "./../public/images/jnz/p8-title.png",
	"./../public/images/jnz/p8-words.png", "./../public/images/jnz/p9-img-1.jpg", "./../public/images/jnz/p9-img-2.jpg", "./../public/images/jnz/p9-title.png", "./../public/images/jnz/p9-words.png", "./../public/images/jnz/p10-img-1.png", "./../public/images/jnz/p10-img-3.png",
	"./../public/images/jnz/p10-title.png", "./../public/images/jnz/p10-words.png", "./../public/images/jnz/p11-bg.jpg", "./../public/images/jnz/p11-name.png", "./../public/images/jnz/p11-title.png", "./../public/images/jnz/p11-words.png", "./../public/images/jnz/share.jpg", "./../public/images/jnz/busy.gif",

	"./../public/images/jnz/p6-car-1.png", "./../public/images/jnz/p6-img-c.png", "./../public/images/jnz/p10-img-1-1.png", "./../public/images/jnz/p10-img-1-2.png", "./../public/images/jnz/p10-img-2.png",
	"./../public/images/jnz/p10-img-4.png", "./../public/images/jnz/p10-img-5.png", "./../public/images/jnz/circle-once.gif", "./../public/images/jnz/logo3.png", "./../public/images/jnz/logo4.png"];

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
                    $("#loading .content").text("已加载" + parseInt(percent) + "%");
                    loadCount--;
                    if (loadCount == 0) {
                        $("#loading").hide();
                        $("#logo").show();
                        $("#arrow").show();
                        enterP1();
                    }
                });
            }
        }
        if (loadCount == 0) {
            $("#loading").hide();
            $("#logo").show();
            $("#arrow").show();
            enterP1();
        }
    }




});