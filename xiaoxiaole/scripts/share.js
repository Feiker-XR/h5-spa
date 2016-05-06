
var debug = false;
var shareData = {
    title: '亚马逊人生必读100本书',  // 分享标题
    desc: '颜值高的人都喜欢读书，亚马逊人生必读100本书',   // 分享描述   
    link: 'http://' + window.location.host + '/Home/Index',  // 分享链接
    imgUrl: 'http://' + window.location.host + '/share.jpg',  // 分享图标
    type: '',     // 分享类型,music、video或link，不填默认为link
    dataUrl: '',  // 如果type是music或video，则要提供数据链接，默认为空
    success: function (res) {
        // 用户确认分享后执行的回调函数
        $("#p6").hide();
        Statistics(3);

    },
    cancel: function (res) {
        // 用户取消分享后执行的回调函数
    }
};
var jsApiList =
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

wx.ready(function () {
    shareFun();
});

function shareReady(config) {
    //alert(config.appId + '_' + config.timestamp + '_' + config.nonceStr + '_' + config.signature);
    wx.config({
        debug: debug,
        appId: config.appId,           // 必填，公众号的唯一标识
        timestamp: config.timestamp,   // 必填，生成签名的时间戳
        nonceStr: config.nonceStr,     // 必填，生成签名的随机串
        signature: config.signature,   // 必填，签名，见附录1
        jsApiList: jsApiList           // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

function shareFun() {
    ///分享到朋友圈
    wx.onMenuShareTimeline(
        {
            title: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success: shareData.success,
            cancel: shareData.cancel
        });

    ///分享给朋友
    wx.onMenuShareAppMessage(
        {
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            type: shareData.type,
            dataUrl: shareData.dataUrl,
            success: shareData.success,
            cancel: shareData.cancel
        });

    ///分享到QQ
    wx.onMenuShareQQ({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success: shareData.success,
        cancel: shareData.cancel
    });
    ///分享到腾讯微博
    wx.onMenuShareWeibo({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl,
        success: shareData.success,
        cancel: shareData.cancel
    });
}

//function chooseImage1() {
//    $(".sb").hide();
//    R('/Home/SubPhoto', { serverId: "uHo-2jqzOmsRLvo6QtsMb4e1b6Hl9mq2FmFZsNeziFDMl5HRSXiRfAs64_zMzbh3" }, function (rep) {
//        if (rep.Msg == 'OK') {

//        }
//        else {
//            layer.msg(rep.Msg, 1, -1);
//        }
//        $(".sb").show();
//    });
//}


