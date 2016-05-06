var game;
var timecount = 0;
$(function () {
    /** ===>>>for ios **/
    $(window).on('scroll.elasticity', function (e) {
        e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
        e.preventDefault();
    });

    /** ===>>>scale settings (The standard size:640*1008) **/
    var scale;
    $("#outer-container,.page").css({ "width": window.innerWidth + "px", "height": window.innerHeight + "px" }).hide();   //set container as device size��hide the pages
    $("#outer-container").show();																				 //show container
    $("#loading").show();																						 //show loading
    scale = window.innerHeight / 1008 < window.innerWidth / 640 ? window.innerHeight / 1008 : window.innerWidth / 640;	 //confirm the scale proportion
    $("#outer-container .content").css({ "transform": "scale(" + scale + ")", "left": (window.innerWidth - scale * 640) / 2 + "px", "top": (window.innerHeight - scale * 1008) / 2 + "px", "-ms-transform": "scale(" + scale + ")", "-moz-transform": "scale(" + scale + ")", "-webkit-transform": "scale(" + scale + ")", "-o-transform": "scale(" + scale + ")" });  //scale and center
    /** ===>>>main **/
    $(".p1bg").height(window.innerHeight * 640 / window.innerWidth + "px").css("zoom", window.innerWidth / 640);
    $(".p1-road").css("height", "0px");
    $(".p1-button-rule").bind("click", function () {
        $("#p2").show();
    });
    $(".p1-button-start").bind("click", function () {
        $("#p1").hide();
        $("#p2").hide();
        $("#p3").show();
        game.begin();
    });

    $(".p2-button-close").bind("click", function () {
        $("#p2").hide();
    });
    $(".p2-go-store").bind("click", function () {
        //window.location.href = "";					//后台要替换的地址
        alert("商场地址？");
    });
    $(".p2-go-regist").bind("click", function () {
        //window.location.href = "";					//后台要替换的地址2
        alert("注册地址？");
    });

//会员玩游戏结束时的按钮
    $("#p4 div").bind("click", function (e) {
        e.stopPropagation();
        switch (e.target.className) {
            case "p4-close":
                $("#p4 .content").hide();
                break;
            case "p4-play-again":
                $("#p4").hide();
                if (parseInt($(".p3-user-score span")[0].innerText) > 0) {
                    game.begin();
                } else if (parseInt($(".p3-user-score span")[0].innerText) == 0) {
                    $("#p7").show();
                }        
                break;
            case "p4-share":
                alert("请点击右上角分享！");
                break;
        }
    });
    //排行榜页面滑动
    var pstartY;
    var pendY;
    var offtop;
    $("#p5 ul").bind("touchstart", function (e) {
        pstartY = e.originalEvent.touches[0].pageY;
        offtop = parseFloat($("#p5 ul").css("top"));
    });
    $("#p5 ul").bind("touchmove", function (e) {
        pendY = e.originalEvent.touches[0].pageY;
        if (pstartY - pendY > 0) {
            $("#p5 ul").css({ "top": offtop + (-(pstartY - pendY)) + "px" });
        } else if (pstartY - pendY < 0) {
            $("#p5 ul").css({ "top": offtop + (-(pstartY - pendY)) + "px" });
        }
    })
    $("#p5 ul").bind("touchend", function () {
        pstartY = null;
        pendY = null;
        if (parseFloat($("#p5 ul").css("top")) > 0) {
            $("#p5 ul").animate({ "top": 0 + "px" }, 300);
        }
        var temp = parseFloat($("#p5 ul").css("height")) - parseFloat($("#p5 .ulbox").css("height"));
        if (parseFloat($("#p5 ul").css("height")) - parseFloat($("#p5 .ulbox").css("height")) < -parseFloat($("#p5 ul").css("top"))) {
            $("#p5 ul").animate({ "top": -temp + "px" }, 300);
        }
    })



//非会员结束游戏的界面按钮
    $("#p6 div").bind("click", function (e) {
        e.stopPropagation();
        switch (e.target.className) {
            case "p4-close":
                $("#p6 .content").hide();
                break;
            case "p4-play-again":
               $("#p6").hide();												/*第二次修改：modify 2015年9月17日15:50:46*/
			   $("#p9").show();
                //alert("游戏机会已经用完，请注册或者分享！");
                break;
            case "p4-share":
                alert("请点击右上角分享！");
                break;
        }
    });

    for (var i = 0; i < 3; i++) {
        $($($("#p5 ul li")[i]).find(".p5-rank")[0]).css("backgroundImage", "url(images/p5-rank-bg-" + (i + 1) + ".png");
    }
    $("#p5 ul").bind("touchmove", function (e) { e.stopPropagation() });
    $(".p5-close").bind("click", function () {
        $("#p5").hide();
    })
    $(".p1-button-rank").bind("click", function () {
        $("#p5").show();
    })

    // $(".gamebox").css("overflow", "visible");

    
    $("#p7").bind("touchstart", function (e) {
        if ($(e.target).hasClass("p7-close")) {
            $("#p7 .content").hide();
        } else if ($(e.target).hasClass("p7-button1")) {
            alert("消耗20换一次游戏机会");
        } else if ($(e.target).hasClass("p7-button2")) {
            alert("请点击右上角分享");
        }
    })

	
	 $("#p9").bind("touchstart", function (e) {
        if ($(e.target).hasClass("p9-close")) {
            $("#p9 .content").hide();
        } else if ($(e.target).hasClass("p9-button1")) {
            alert("消耗20换一次游戏机会");
        } else if ($(e.target).hasClass("p9-button2")) {
            alert("请点击右上角分享");
        }
    })
	
  /*  $("#p8").show();
    var helphim = false;
    $(".p8-help-him").bind("touchstart", function () {
        if (!helphim) {
            $(this).css("background", "url(images/p8-again.png) no-repeat center center").css("background-size", "cover");
            alert("已成功助力");
            helphim = !helphim;
        } else {
            alert("你已经助力过了，请不要重新助力");
            $(this).unbind("touchstart");
        }
    });
    $(".p8-i-play").bind("click", function (e) {
        e.stopPropagation();
        $("#p8").hide();
    });
*/

    var audiobg = document.getElementById("audiobg");
    $("#music").css({ "zoom":scale});
    $("#music").addClass("mcircle");
    $("#music").bind("click", function (e) {
        e.stopPropagation();
        if ($("#music").attr("sign") == "0") {
            $("#music").removeClass("mcircle");
            $("#music").css("backgroundImage", "url(images/music_off.png)");
            audiobg.pause();
            $("#music").attr("sign","1");
        } else {
            $("#music").addClass("mcircle");
            $("#music").css("backgroundImage", "url(images/music_on.png)");
            $("#music").attr("sign","0");
            audiobg.play();
        }
    })

    var sound = document.getElementById("sound");

    /***********game***************/

    var Game = function (time) {
        this.ready = false;						//是否初始化结束				
        this.checking = false;					//是否正在检查中
        this.playing = false;   //是否游戏中
        //图片列表
        this.imgs = [];
        for (var i = 1; i <= 5; i++) {
            var img = new Image();
            img.src = 'images/' + i + '.png';
            img.setAttribute('index', i);
            this.imgs.push(img);
        }

        //返回随机图片
        this.getRandomImage = function () {
            return $(this.imgs[Math.floor(Math.random() * 10000) % this.imgs.length]).clone()[0];
        }

        this.orgTime = this.time = time;					//游戏时间

        //----------刚开始和重新开始
        this.reset = function () {
            this.ready = false;
            this.time = this.orgTime;

            $('.block img').remove();  //开始之前清空img

            this.fillDivs(function () { });

            this.initCallback();

        }

        //--------时间进度条		
        this.setTimeBar = function (time, callback) {
            var temptime = time;
            timeFormat();
            var timeBar = setInterval(function () {
                if (time == 0) {
                    clearInterval(timeBar);
                    callback();
                }
                time--;
                $(".p3-time-bar").animate({ "width": 395 / temptime * time + "px" }, 1000);
                timeFormat();
            }, 1000);

            function timeFormat() {
                if (time >= 120 && time < 180) {
                    $(".p3-timer span")[0].innerHTML = "2";
                    $(".p3-timer span")[1].innerHTML = (time - 120) + "";
                }
                if (time >= 60 && time < 120) {
                    $(".p3-timer span")[0].innerHTML = "1";
                    $(".p3-timer span")[1].innerHTML = (time - 60) + "";
                }
                if (time >= 0 && time < 60) {
                    $(".p3-timer span")[0].innerHTML = "0";
                    $(".p3-timer span")[1].innerHTML = time + "";
                }
            }
        }

        //----------游戏结束

        this.gameover = function () {
            this.playing = false;
            this.stopTip();
            this.hideTip();
			var test = Math.random()*100%2;
			if(test == 1){				//会员
				$("#p4").show();
				$(".p4-rate").text(Math.floor(Math.random() * 40) + 60 + "%");      //后台算概率
				$(".p4-scores").text($(".p3-scores span")[0].innerText);
			}else{			//非会员
				$("#p6").show();
			}
            
        }

        this.tip_timer = 0;


        this.startTip = function () {
            timecount = 0;
            this.tip_timer = setInterval(this.showTip.bind(this), 5000);
        };

        this.stopTip = function () {
            clearInterval(this.tip_timer);
        }

        this.showTip = function () {
            var temparr = [];
            for (var t = 0; t < 7; t++) {
                var tt = [];
                temparr.push(tt);
            }
            //构建index值的临时二位数组
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 7; j++) {
                    temparr[i][j] = $(".r" + i + ".c" + j + " img").attr("index");
                }
            }
            // listArr(temparr);

            var result = [];        //存的是返回回来横向可消除两个元素的第一个元素的坐标
            result = checkHorizontal();      //先横排检查
            if (result.length > 0 && result[timecount] != null) {
                //console.log("横向可交换" + result.length + "个");
                //console.log(timecount);
                var divx = $("<div></div>");
                divx.css({ "width": "574px", "height": "574px", "position": "absolute", "left": "33px", "bottom": "206px", "overflow": "visible", "zIndex": "3" }).appendTo("#p3 .content");
                var div = $("<div></div>");
                div.css({ "width": "106px", "height": "123px", "position": "absolute", "z-index": "10", "backgroundImage": "url(images/hand.png)" }).appendTo(divx);
                div.css({ "left": $(".r" + result[timecount][0] + ".c" + result[timecount][1])[0].style.left, "bottom": (parseFloat($(".r" + result[timecount][0] + ".c" + result[timecount][1])[0].style.bottom) - 82) + "px" });

                div.animate({
                    left: (parseFloat($(".r" + result[timecount][0] + ".c" + result[timecount][1])[0].style.left) + 82) + "px",
                }, {
                    duration: 400,              /*modify 2015年9月15日11:06:59*/
                    complete: function () {
                        divx.remove();
                    }
                });
                timecount++;
            } else {  //横排没有则检查竖排
                result = checkVitical();
                //console.log(timecount);
                timecount = 0;
                if (result.length > 0 && result[timecount] != null) {
                    var divx = $("<div></div>");
                    divx.css({ "width": "574px", "height": "574px", "position": "absolute", "left": "33px", "bottom": "206px", "overflow": "visible", "zIndex": "3" }).appendTo("#p3 .content");
                    var div = $("<div></div>");
                    div.css({ "width": "106px", "height": "123px", "position": "absolute", "z-index": "10", "backgroundImage": "url(images/hand.png)" }).appendTo(divx);
                    div.css({ "left": $(".r" + result[timecount][0] + ".c" + result[timecount][1])[0].style.left, "bottom": (parseFloat($(".r" + result[timecount][0] + ".c" + result[timecount][1])[0].style.bottom) - 82) + "px" });
                    div.animate({
                        bottom: $(".r" + result[timecount][0] + ".c" + result[timecount][1])[0].style.bottom + "px",
                    }, {
                        duration: 400,          
                        complete: function () {
                            divx.remove();
                        }
                    });
                    timecount++;
                } else {//竖排也没有的话就不能再耍了 
                    alert("已经没有可以消除的元素了，请重新开始");
                }
            }
            //横排交换
            function checkHorizontal() {
                var results = [];
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 6; j++) {
                        var temp = temparr[i][j];
                        temparr[i][j] = temparr[i][j + 1];
                        temparr[i][j + 1] = temp;
                        if (checkIndex(temparr)) {
                            //console.log(".r" + i + ".c" + j + "和" + ".r" + i + ".c" + (j + 1) + "交换");
                            results.push([i, j]);
                        }
                        temparr[i][j + 1] = temparr[i][j];
                        temparr[i][j] = temp;
                    }
                }
                return results;
            }
            //竖排交换
            function checkVitical() {
                var results = [];
                for (var i = 0; i < 6; i++) {
                    for (var j = 0 ; j < 7; j++) {
                        var temp = temparr[i][j];
                        temparr[i][j] = temparr[i + 1][j];
                        temparr[i + 1][j] = temp;
                        if (checkIndex(temparr)) {
                            //console.log(".r" + i + ".c" + j + "和" + ".r" + (i + 1) + ".c" + (j) + "交换");
                            results.push([i, j]);
                        }
                        temparr[i + 1][j] = temparr[i][j];
                        temparr[i][j] = temp;
                    }
                }
                return results;
            }

            //元素是否可消除检查工具

            function checkIndex(arr) {
                var allrow = [];
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 7; j++) {
                        var temp = arr[i][j];       //找到这个元素
                        var tempindex = [];
                        for (var t = j; t < 7; t++) {   //找这个元素右侧的元素
                            if (arr[i][t] == temp) {
                                tempindex.push(arr[i][t]);
                            } else {
                                break;
                            }
                        }
                        if (tempindex.length < 3) {
                            tempindex = [];
                        }
                        for (var r = i; r < 7; r++) {
                            if (arr[r][j] == temp) {
                                tempindex.push(arr[r][j]);
                            } else {
                                break;
                            }
                        }

                        if (tempindex.length > 2) {  //证明有可消除元素
                            allrow.push($.unique(tempindex));
                        }
                    }
                }
                if (allrow.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }

        }

        this.hideTip = function () {

        }


        /*		this.reset2 = function() {
                    
                }
        */
        //-----------初始化视图		

        for (var i1 = 0; i1 < 7; i1++) {
            for (var j1 = 0; j1 < 7; j1++) {
                var oDiv = document.createElement("div");
                oDiv.classList.add('block');
                oDiv.classList.add('r' + i1);
                oDiv.classList.add('c' + j1);
                oDiv.row = i1;
                oDiv.col = j1;
                oDiv.style.left = j1 * 82 + "px";
                oDiv.style.bottom = i1 * 82 + "px";
                document.getElementsByClassName("gamebox")[0].appendChild(oDiv);

                oDiv.addEventListener('touchstart', (function (evt) {

                    if (!this.ready || this.checking) return;				//是否初始化完or检查完

                    var div = $(evt.target).parents('.block')[0];			//点的哪个格子
                    if ($(div).hasClass('selected')) {					//如果是被选中状态	
                        $(div).removeClass('selected');					//移除状态
                    }
                    else {
                        var lastSelected = $('.gamebox .selected');			//把最后选中的放入
                        if (lastSelected.length == 0) {						//若果为空，则置为选中
                            $(div).addClass('selected');
                        }
                        else {												//若已经有选中状态的，则判断相邻情况
                            var div1 = lastSelected[0];				//最后选中的元素
                            var div2 = div;							//点了的元素
                            var flag = false;
                            if (div1.row == div2.row) {			//同行若相邻
                                if (div1.col == div2.col + 1 || div1.col == div2.col - 1) {
                                    flag = true;
                                }
                            }
                            else if (div1.col == div2.col) {		//同列若相邻	
                                if (div1.row == div2.row + 1 || div1.row == div2.row - 1) {
                                    flag = true;
                                }
                            }

                            if (!flag) {					//如果不相邻
                                lastSelected.removeClass('selected');		//切换选中样式
                                $(div).addClass('selected');
                            }
                            else {					//如果相邻
                                $('.selected').removeClass('selected');		//移除选中样式
                                this.checking = true;				        //开始检查or 交换
                                var img1 = $(div1).find('img')[0];
                                var img2 = $(div2).find('img')[0];

                                img1.style.left = div1.style.left;
                                img1.style.bottom = div1.style.bottom;
                                img2.style.left = div2.style.left;
                                img2.style.bottom = div2.style.bottom;

                                $('.gamebox').append(img1).append(img2);		//跳出格子，进入大容器
                                //return;

                                $(img1).animate({								//交换位置
                                    left: parseFloat(div2.style.left),
                                    bottom: parseFloat(div2.style.bottom)
                                }, {
                                    duration: 200,
                                    complete: function () {
                                        $(img1).css({
                                            left: '0px',
                                            bottom: '0px'
                                        }).appendTo(div2);
                                    }
                                });

                                $(img2).animate({
                                    left: parseFloat(div1.style.left),
                                    bottom: parseFloat(div1.style.bottom)
                                }, {
                                    duration: 200,
                                    complete: function () {
                                        $(img2).css({
                                            left: '0px',
                                            bottom: '0px'
                                        }).appendTo(div1);
                                    }
                                });
                                //以上是交换过程

                                //交换完成后，进行判断删除

                                setTimeout((function () {
                                    this.lastDeleted = null;
                                    this.checkDel((function () {
                                        // console.log(count);                     //-------------打印一次性消除了多少分
                                        if (!this.lastDeleted) {			//如果没有可删除的元素，交换回来
                                            img1.style.left = div2.style.left;
                                            img1.style.bottom = div2.style.bottom;
                                            img2.style.left = div1.style.left;
                                            img2.style.bottom = div1.style.bottom;

                                            $('.gamebox').append(img1).append(img2);

                                            $(img1).animate({
                                                left: parseFloat(div1.style.left),
                                                bottom: parseFloat(div1.style.bottom)
                                            }, {
                                                duration: 200,
                                                complete: function () {
                                                    $(img1).css({
                                                        left: '0px',
                                                        bottom: '0px'
                                                    }).appendTo(div1);
                                                }
                                            });

                                            $(img2).animate({
                                                left: parseFloat(div2.style.left),
                                                bottom: parseFloat(div2.style.bottom)
                                            }, {
                                                duration: 200,
                                                complete: function () {
                                                    $(img2).css({
                                                        left: '0px',
                                                        bottom: '0px'
                                                    }).appendTo(div2);
                                                }
                                            });

                                            //
                                            setTimeout((function () {
                                                this.checking = false;
                                                this.lastDeleted = null;
                                            }).bind(this), 300);
                                        }
                                        else {
                                            if (this.playing) {
                                                this.startTip();
                                            }
                                            else {
                                                this.gameover();
                                            }
                                            this.checking = false;
                                            this.lastDeleted = null;
                                            //

                                        }
                                    }).bind(this));
                                }).bind(this), 300);
                            }
                        }
                    }

                }).bind(this));
            }
        }


        //----------初始化回调,初始化完成后ready为true		
        this.initCallback = function () {

            this.checkDel((function () {
                this.ready = true;
            }).bind(this));

        }

        //-------------删除方法		
        this.del = function (imgs, callback) {
            if (this.ready) {						    //游戏消除
                for (var i = 0; i < imgs.length; i++) {   //消除前先替换图片
                    imgs[i].src = "images/circle.png";
                }
                sound.play();
                $(imgs).addClass('delete');			//删除时候的样式
                setTimeout(function () {
                    $(imgs).remove();				//删除
                    $(".p3-scores span")[0].innerText = parseInt($(".p3-scores span")[0].innerText) + 10 * imgs.length;  //加分
                    callback();
                }, 200);
            }
            else {									//初始化消除
                $(imgs).remove();
                callback();
            }
        }

        this.lastDeleted = null;

        //----------检查是否有删除，有就删，删就填，填了再删...	
        var count = 0;
        this.checkDel = function (callback) {
            if (this.lastDeleted == null) {
                this.lastDeleted = false;
            }

            var delImgs = [];
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 7; j++) {
                    var imgs = this.ifCanDel($('.r' + i + '.c' + j)[0]);   //检查是否有可删除
                    for (var k = 0; k < imgs.length; k++) {			        //把所有可删除元素放入大数组中
                        delImgs.push(imgs[k]);
                    }
                }
            }

            var onDeleteComplete = (function () {		//删除完成

                var onFillComplete = (function () {		//填充完成
                    this.checkDel(callback);				//填充完成后继续检查删除
                }).bind(this);

                this.fillDivs(onFillComplete);

            }).bind(this);

            if (delImgs.length > 0) {
                this.hideTip();
                this.stopTip();

                count += $.unique(delImgs).length * 10;     //一次性消除的分数
                this.lastDeleted = true;
                this.del($.unique(delImgs), onDeleteComplete);
                delImgs = [];
            }
            else {
                callback();
                count = 0;

            }
        };

        //-----------------填充方法		
        this.fillDivs = function (callback) {
            if (this.ready)					//消除后的状况
            {
                for (var j = 0; j < 7; j++) {
                    var imgs = $('.c' + j + ' img').toArray();		//剩下列元素
                    var len = imgs.length;
                    while (imgs.length < 7) {				        //补充满一列
                        imgs.push(this.getRandomImage());
                    }

                    for (var i = 0; i < imgs.length; i++) {              //列中元素
                        //原来的位置	
                        if (imgs[i].parentNode != null) {				//旧节点置于顶层
                            imgs[i].style.left = imgs[i].parentNode.style.left;
                            imgs[i].style.bottom = imgs[i].parentNode.style.bottom;
                            $('.gamebox').append(imgs[i]);
                        }
                        else {											        //新节点
                            imgs[i].style.left = j * 82 + 'px';
                            imgs[i].style.bottom = (7 + i - len) * 82 + 'px';   // ---
                            $('.gamebox').append(imgs[i]);
                        }

                        imgs[i].row = i;
                        imgs[i].col = j;

                        $(imgs[i]).animate({
                            bottom: i * 82 + 'px'				//下落后的位置
                        }, {
                            duration: 200,
                            complete: (function () {				//动画完成后，放入格子中
                                $(this).css({
                                    left: '0px',
                                    bottom: '0px'
                                }).appendTo($('.r' + this.row + '.c' + this.col));
                            }).bind(imgs[i])
                        });
                    }
                }

                setTimeout(function () {
                    callback();
                }, 210);
            }
            else {						        //初始化填充
                for (var j = 0; j < 7; j++) {
                    var imgs = $('.c' + j + ' img').toArray();
                    while (imgs.length < 7) {			            //装满一列
                        imgs.push(this.getRandomImage());
                    }

                    for (var i = 0; i < imgs.length; i++) {			//显示一列
                        $('.r' + i + '.c' + j).append(imgs[i]);
                    }
                }

                callback();
            }
        }


        //-----------传入一个元素，判断是否有相邻可消除		
        this.ifCanDel = function (div) {
            var rowImgs = [];
            var colImgs = [];
            var img = $(div).find('img')[0];
            if (div.row < 5) {
                for (var r = div.row; r < 7; r++) {
                    var img2 = $('.r' + r + '.c' + div.col + ' img')[0];
                    if ($(img).attr('index') == $(img2).attr('index')) {
                        rowImgs.push(img2);
                    }
                    else {
                        break;
                    }
                }
            }

            if (div.col < 5) {
                for (var c = div.col; c < 7; c++) {
                    var img2 = $('.r' + div.row + '.c' + c + ' img')[0];
                    if ($(img).attr('index') == $(img2).attr('index')) {
                        colImgs.push(img2);
                    }
                    else {
                        break;
                    }
                }
            }

            var imgs = [];
            if (rowImgs.length > 2) {
                for (var i = 0; i < rowImgs.length; i++) {
                    imgs.push(rowImgs[i]);
                }
            }

            if (colImgs.length > 2) {
                for (var i = 0; i < colImgs.length; i++) {
                    imgs.push(colImgs[i]);
                }
            }
            return imgs;
        }


        //-----------------游戏开始方法		
        this.begin = function () {

            $(".p3-scores span")[0].innerText = "0";
            $(".p3-time-bar").css("width", "395px");
            this.reset();
            this.startTip();
            this.setTimeBar(this.time, (function () {
                this.playing = false;
                if (!this.checking) {
                    this.gameover();
                }
            }).bind(this));
            this.playing = true;
        };

    };

    game = new Game(150);




    /**===>>>loading handling**/

    var imgsstr = ["images/bg.jpg", "images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png",
	               "images/p2-bg.png", "images/p3-bg.png", "images/p3-line.png", "images/p4-bg.png", "images/p4-bg.png", "images/p5-rank-bg-1.png",
	               "images/p5-rank-bg-2.png", "images/p5-rank-bg-3.png", "images/circle.png", "images/hand.png", "images/p6-bg.png", "images/p1-bg.jpg",
	              "images/p1-cars.png", "images/p1-circle.png", "images/p1-rank.png", "images/p1-red.png", "images/p1-road.png", "images/p1-rule.png", "images/p1-something.png",
	               "images/p1-star.png", "images/p1-start.png", "images/p1-words.png", "images/score1.png", "images/gamecount.png", "images/music_off.png",
                   "images/music_on.png","images/p7-bg.png","images/p8-again.png"];

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
                        p1Animation();
                    }
                });
            }
        }
        if (loadCount == 0) {
            p1Animation();
        }
    }
    function p1Animation() {
        $("#loading").hide();
        $("#p1").css("top", "0px").show(0, function () {
            $(".p1-road").animate({ "height": "172px" }, 1000, function () {
                $(".p1-cars").fadeIn(300);
            });
            $(".p1-circle").addClass("circle");
            setTimeout(function () {
                $(".p1-something").fadeIn(1000);
                $(".p1-star").show(0, function () {
                    $(".p1-redbox").show().animate({ "width": "599px", "left": "20px" }, 1000, function () {
                        $(".p1-words").show().addClass("words");
                        setTimeout(function () {
                            $(".p1-button-start").fadeIn(300, function () {
                                $(".p1-button-rule").fadeIn(300, function () {
                                    $(".p1-button-rank").fadeIn(300);
                                });
                            });
                        }, 1010);
                    });
                }).addClass("star");
            }, 1010);

        });
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});