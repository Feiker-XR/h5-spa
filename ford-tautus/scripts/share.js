var WXENV = new (function (ticketUrl) {

    var self = this;

    self.ticketUrl = ticketUrl;

    self.ready = false;

    self.readyHandlers = [];

    self.shareData = {
        title: '一场交流，亦是一场交心',  // 分享标题
        desc: '开启无止境的人生格局',   // 分享描述
        link: 'http://taurusinvatition.ser2.ford001.com/index.html',  // 分享链接
        imgUrl: 'http://taurusinvatition.ser2.ford001.com/img/share.jpg',  // 分享图标
        type: '',   // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function (res) {
            // 用户确认分享后执行的回调函数
        },
        cancel: function (res) {
            // 用户取消分享后执行的回调函数
        }
    };

    self.debug = false;

    self.jsApiList =
    [
        //'chooseWXPay',
        //'openProductSpecificView',
        //'addCard',
        //'chooseCard',
        //'openCard',
        //以上接口为支付、小店、卡券类接口，有权限的公众号才能开启
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode'
    ];

    self.addReadyHandler = function (callback) {
        if (self.ready) {
            callback();
        }
        else {
            self.readyHandlers.push(callback);
        }
    };

    self.updateShareData = function (data) {
        if (typeof (data) == 'undefined') {
            data = self.shareData;
        }

        if (self.ready) {
            self._updateShareData(data);
        }
        else {
            self.addReadyHandler(function () {
                self._updateShareData(data);
            });
        }
    };

    self._updateShareData = function (data) {
        wx.onMenuShareTimeline({
            title: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            success: data.success,
            cancel: data.cancel
        });

        wx.onMenuShareAppMessage({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            type: data.type,
            dataUrl: data.dataUrl,
            success: data.success,
            cancel: data.cancel
        });

        wx.onMenuShareQQ({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            success: data.success,
            cancel: data.cancel
        });

        wx.onMenuShareWeibo({
            title: data.title,
            desc: data.desc,
            link: data.link,
            imgUrl: data.imgUrl,
            success: data.success,
            cancel: data.cancel
        });
    };

    window.WXENV_CALLBACK = function (config) {
        config.debug = self.debug;
        config.jsApiList = self.jsApiList;
        
        wx.config(config);
    };

    var js = document.getElementsByTagName('script')[0];

    self.onEnvReady = function () {
        var url = self.ticketUrl;
        if (url.indexOf('?') == -1) {
            url += '?';
        }
        else {
            url += '&';
        }

        url += 'url=' + encodeURIComponent(window.location.href);

        url += '&callback=WXENV_CALLBACK';

        url += '&_=' + new Date().valueOf();

        var script = document.createElement('script');
        script.src = url;
        js.parentNode.insertBefore(script, js.nextSibling);
    };

    var wxjs = document.createElement('script');
    wxjs.addEventListener('load', function () {
        wx.ready(function () {
            self.ready = true;
            self.updateShareData();

            //wx.hideAllNonBaseMenuItem();

            for (var i = 0; i < self.readyHandlers.length; i++) {
                self.readyHandlers[i]();
            }

            self.readyHandlers = [];
        });
        self.onEnvReady();
    });
    wxjs.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    js.parentNode.insertBefore(wxjs, js.nextSibling);

})('http://wx.e2capp.com/jsticket.ashx?serv_name=taurusinvatition');




