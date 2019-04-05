
function toDetail(acctId) {
  $('#AccountTradeDetailQueryInitForm input[name="acctId"]').val(acctId);
  $('#AccountTradeDetailQueryInitForm').submit();
}

function toTransfer(acctId) {
    $('#SingleTransferForm input[name="skipAcctNo"]').val(acctId);
  $('#SingleTransferForm').submit();
}
function etoTransfer(acctId, acctType) {
    $('#EaTransferForm input[name="acctNo"]').val(acctId);
    $('#EaTransferForm input[name="acctType"]').val(acctType);
    $('#EaTransferForm').submit();
}

function getAcctBal(acctId) {
    $.getBalance({
        'acct': acctId,
        'type': 'one',
        'callback': function(data){
            if (typeof data !== 'undefined' && data[0]["currUseBalance"] !== '') {
                $('.span_' + acctId).html($.fmtMoney(data[0]["currUseBalance"]));
            }
            else {
                $('.span_' + acctId).html('账户/卡异常');
            }
        }
    });
}
function getCreditRepay(acctId) {
    $.ajax({
        type: "post",
        url: "ccPayInfoQryAct.do",
        data: { "ccCardRepay": acctId },
        dataType: "json",
        success: function (rspObj) {
            $('.span_' + acctId).html($.fmtMoney(rspObj.acctPaymentRMB));
        }
    });
}
function updateBalShow(show) {
    $.ajax({
        type: "post",
        url: "UpdateBalShowAct.do",
        data: { "debitShow": show[0], "creditShow": show[1], "elecShow": show[2] },
        success: function () {
        }
    });
}
//交叉营销信用卡申请
function creditAppGo(cardCode, cardName, picName)
{
    if (cardCode == "" || cardCode == null || cardCode == undefined)
    {
        return false;
    }
    else
    {
        creditApplyForm.entranceTypeIndex.value = "1";
        creditApplyForm.cardCodeIndex.value = cardCode;
        creditApplyForm.cardNameIndex.value = cardName;
        creditApplyForm.picNameIndex.value = picName;
        creditApplyForm.submit();
    }
}
function getCreditCustType()
{
    var t_cardArray = [];
    var t_custType = marketCreditInfo.custTypes;
    var t_custMinCredit = marketCreditInfo.custMinCredit;
    var certNo = userSec.certNo;
    var sex = certNo.substring(certNo.length - 2, certNo.length - 1);
    if (sex % 2 == "0") {
        sex = "F";
    }
    else {
        sex = "M";
    }

        if (t_custType == "1305")
        {
            if (t_custMinCredit >= 10000)  //目标客户展示 12张卡
            {
                t_cardArray = ["CCPH1I", "CCGM8I", "CCGN4I", "CCGJ77", "MCG00W", "VCGJW0", "CCG810", "CCGH2I", "CCGI7I", "MCGC0I", "CCGA6I", "CCGN8I", "CCGC0I"];
            }
            else
            {           //非1305类型展示11张（除悠然白金卡）
                t_cardArray = ["CCGM8I", "CCGN4I", "CCGJ77", "MCG00W", "VCGJW0", "CCG810", "CCGH2I", "CCGI7I", "MCGC0I", "CCGA6I", "CCGN8I", "CCGC0I"];
            }
        } //end custType "1305"
        else
        {
            if (t_custMinCredit >= 10000)   // 除靓居信用卡
            {
                t_cardArray = ["CCPH1I", "CCGN4I", "CCGJ77", "MCG00W", "VCGJW0", "CCG810", "CCGH2I", "CCGI7I", "MCGC0I", "CCGA6I", "CCGN8I", "CCGC0I"];
            }
            else  //除悠然白金卡和靓居信用卡
            {
                t_cardArray = ["CCGN4I", "CCGJ77", "MCG00W", "VCGJW0", "CCG810", "CCGH2I", "CCGI7I", "MCGC0I", "CCGA6I", "CCGN8I", "CCGC0I"];
            }
        }
   
    return t_cardArray;
}

//获取随机数方法
function getCardNumber(len){
    //cardNumber = Math.floor(Math.random()*cardArray.length);
    return Math.floor(Math.random() * len);
}


//获取卡名称
function getCardName(mCode,mCard){
    //switch(cardArray[cardNumber])
    //var marketCard = {cardName:"",cardLink:"",picName:""};
    switch (mCode)
    {
        case "VCGJW0":
            mCard.cardName = "环球商旅卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ProductsRec/CardIntro/201312/t20131218_416300.htm";
            mCard.picName = "globalBsnTrip.jpg";
            mCard.ads = ['“0”货币转换费', '国际航线立减优惠', '200万航空意外险保障'];
            break;
        case "MCG00W":
            mCard.cardName = "悠游世界卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ProductsRec/CardIntro/201301/t20130130_314775.htm";
            mCard.picName = "leisureWorld.jpg";
            mCard.ads = ['“0”货币转换费', '航空公司里程兑换', '免费境外WIFI租赁'];
            break;
        case "CCPH1I":
            mCard.cardName = "悠然白金卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ProductsRec/CardIntro/201304/t20130422_336145.htm ";
            mCard.picName = "platinum.jpg";
            mCard.ads = ['免首年年费', '“1元”机场停车', '高星级酒店“住二送一”'];
            break;
        case "CCGM8I":
            mCard.cardName = "靓居信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ProductsRec/CardIntro/201502/t20150213_686195.htm";
            mCard.picName = "huoseLoan.jpg";
            mCard.ads = ['首年免年费', '专享超低分期费率优惠', '优质房贷客户专属'];
            break;
        case "CCGJ77":
            mCard.cardName = "漂亮升级妈妈信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ProductsRec/CardIntro/201404/t20140401_452155.htm";
            mCard.picName = "CreditCard/prettyMom.jpg";
            mCard.ads = ['专属兑换专区礼品', '6积分兑亲子乐园门票', '星级酒店游泳健身'];
            break;
        case "CCGH2I":
            mCard.cardName = "QQ联名信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201601/t20160127_827046.htm?cardId=352";
            mCard.picName = "card_kins_qq.png";
            mCard.ads = ['终身免年费', '同城本行取超存免费', '卡面凸印专属QQ号'];
            break;

        case "CCGI7I":
            mCard.cardName = "喜羊羊联名信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201601/t20160127_826992.htm?cardId=369";
            mCard.picName = "yangyang.png";
            mCard.ads = ['专享积分专区礼遇', '精致水彩风卡面限量版', '72小时失卡保障'];
            break;
        
        case "CCGN4I":
            mCard.cardName =  "南航明珠联名信用卡";
            mCard.cardLink =  "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201705/t20170503_1062095.htm?cardId=468";
            mCard.picName = "chinaSouthAir.png";
            mCard.ads = ['自动兑换南航里程', '200万航空意外险', '南航会员服务'];
            break;

        case "CCG810":
            mCard.cardName =  "东航联名信用卡",
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201601/t20160127_827078.htm?cardId=448";
            mCard.picName = "chinaEastAir.png";
            mCard.ads = ['自动兑换东航积分', '200万航空意外险', '东航会员服务'];
            break;

        case "MCGC0I":
            mCard.cardName = "My Way信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201708/t20170808_1117951.htm?cardId=483";
            mCard.picName = "MyWay.png";
            mCard.ads = ['三款个性卡面可选', '喜马拉雅FM听读权益', '多项海外优惠权益'];
            break;
        case "CCGA6I":
            mCard.cardName = "百联通联名信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201709/t20170913_1142044.htm?cardId=489";
            mCard.picName = "bailiantong.jpg";
            mCard.ads = ['首年免年费', '超值兑换百联通积分', '办卡送百联通代金券'];
            break;
        case "CCGN8I":
            mCard.cardName = "凤凰知音国航联名卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201711/t20171121_1188512.htm?cardId=494";
            mCard.picName = "AirChinaGold.jpg";
            mCard.ads = ['积分15：1自动兑换里程', '高达200万航空意外险', '国航会员服务'];
            break;
        case "CCGC0I":
            mCard.cardName = "My Way银联信用卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ApplyCard/cardinfo/201709/t20170904_1135618.htm?cardId=486";
            mCard.picName = "MyWayVisa.png";
            mCard.ads = ['三款个性卡面可选', '刷卡5次免年费', '乐享周六缤纷活动'];
            break;
        default:
            mCard.cardName = "环球商旅卡";
            mCard.cardLink = "http://www.abchina.com/cn/CreditCard/ProductsRec/CardIntro/201312/t20131218_416300.htm";
            mCard.picName = "globalBsnTrip.jpg";
            mCard.ads = ['“0”货币转换费', '国际航线立减优惠', '200万航空意外险保障'];
            break;
    }
}
var index = 0;
function init(num) {
    index = 0;
    if (num == 1) {
        $(".left-arrow").addClass("invisible disable");
        $(".right-arrow").addClass("invisible disable");
        $("#title-cell").addClass("invisible disable");
    }
    else {
        $(".left-arrow").addClass("disable");
        $(".right-arrow").addClass("enable");
    }
}
//多客户经理的滑动
function slide(num,sum) {
    if (num == 1 && index != sum-1) {
        index++;
        slideAnimate();
    } else if (num == -1 && index != 0) {
        index--;
        slideAnimate();
    }
    arrowControl(sum);
    titleCell();
}

function slideAnimate() {
    $(".slide .slide-box").each(function () {
        if ($(this).hasClass("show")) {
            $(this).stop(true, true).animate({ opacity: 0 }, 1000, function () {
                $(this).removeClass("show")
            });
        }
    })
    $(".slide .slide-box").eq(index).addClass("show");
    $(".slide .slide-box").eq(index).stop(true, true).animate({ opacity: 1 }, 1000);
}

function titleCell() {
    $(".title-circle").removeClass("enable");
    $(".title-circle").removeClass("disable");
    $(".title-circle").each(function () {
        if ($(this).index() == index) {
            $(this).addClass("enable");
        } else {
            $(this).addClass("disable");
        }
    })
}

function arrowControl(sum) {
    if (index == sum-1) {
        if (!$(".right-arrow").hasClass("disable")) {
            $(".right-arrow").removeClass("enable");
            $(".right-arrow").addClass("disable");
        }
        if ($(".left-arrow").hasClass("disable")) {
            $(".left-arrow").removeClass("disable");
            $(".left-arrow").addClass("enable");
        }
    }
    else if (index == 0) {
        if (!$(".left-arrow").hasClass("disable")) {
            $(".left-arrow").removeClass("enable");
            $(".left-arrow").addClass("disable");
        }
        if ($(".right-arrow").hasClass("disable")) {
            $(".right-arrow").removeClass("disable");
            $(".right-arrow").addClass("enable");
        }
    }
    else {
        if ($(".left-arrow").hasClass("disable")) {
            $(".left-arrow").removeClass("disable");
            $(".left-arrow").addClass("enable");
        }
        if ($(".right-arrow").hasClass("disable")) {
            $(".right-arrow").removeClass("disable");
            $(".right-arrow").addClass("enable");
        }
    }
}
(function (window, $) {
    $.ajaxSetup({ cache: false });
    //客户姓名超过四个汉字截断
    var cutCustName = $.StringSuffix(custName, 9, "...");
    if (cutCustName.indexOf("...") > 0) {
        cutCustName = $.StringSuffix(custName, 6, "...");
        $('#show-custName').attr('title', custName).html(cutCustName);
    }
    else {
        $('#show-custName').html(custName);
    }
    //电子账户
    var cardCount = cardInfo.length;
    var cardShowList = ["0", "0", "0"];
    var m_cardArray = [];
    var m_cardNumber = 0;
    var m_cardShow = { cardName: "test", cardLink: "", picName: "" };
    var m_cardCode = 0;
    if (cardCount == 0) {

    }
    else {
        for (var index = 0; index < cardCount; index++) {
            var cardType = cardInfo[index]["card_type"];
            var cardAcctType = cardInfo[index]["cardAcctType"];
            var cardNo = cardInfo[index]["card_no"];
            var cardName = cardInfo[index]["card_name"];
            var cardShow = cardInfo[index]["card_show"];
            if (cardType == "1") { //借记|准贷卡
                cardShowList[0] = cardShow;
                var dCard = [];
                if (cardNo == "") {
                    $('#dCard').removeClass('m-debitcard').addClass('m-debitcard-empty');
                    dCard.push('<h3>' + cardName + '</h3>');
                    dCard.push('<div class="m-eaccountcontent"><div class="m-onecard-box">');
                    dCard.push('<a href="http://app.abchina.com/branch/" target="_blank" class="btn btn-big btn-refundbig">网点查询</a>');
                    dCard.push('</div></div>');
                }
                else {
                    var dCardBalContent = '';
                    if (cardShow == "1") {
                        dCardBalContent = '<p style="padding-top: 24px;">人民币余额： <span id="dnormal" class="normal span_' + cardNo + '"></span><span id="dencrypt" class="encrypt hide">******</span><b id="debit" class="show-hide m-visibleicon" data-acctId="' + cardNo + '"></b></p>';
                    }
                    else {
                        dCardBalContent = '<p style="padding-top: 24px;">人民币余额： <span id="dnormal" class="hide normal span_' + cardNo + '"></span><span id="dencrypt" class="encrypt">******</span><b id="debit" class="show-hide m-unvisibleicon" data-acctId="' + cardNo + '"></b></p>';
                    }
                    dCard.push('<h3>' + cardName + '</h3>');
                    dCard.push('<div class="m-paycardcontent">');
                    dCard.push('<p>' + cardNo.substr(0, 4) + '**** ' + cardNo.slice(-4) + '</p>');
                    dCard.push(dCardBalContent);
                    dCard.push('</div>');
                    dCard.push('<div class="m-multicard-box">');
                    dCard.push('<a data-pos="账户/我的账户" href="MyAccountInitAct.do" class="btn btn-refund m-redefinewidth">详情</a>');
                    dCard.push('<a data-pos="账户/我的账户" href="###" class="btn btn-refund m-redefinewidth" onclick="toDetail(\'' + cardNo + '\')">明细</a>');
                    dCard.push('<a data-pos="账户/我的账户" href="###" class="btn btn-refund m-redefinewidth-last" onclick="toTransfer(\'' + cardNo + '\')">转账</a>');
                    dCard.push('</div>');
                }
                $('#dCard').html(dCard.join(''));
                if (cardNo != "" && cardShow == "1") getAcctBal(cardNo);
            }
            else if (cardType == "2") { //贷记卡
                cardShowList[1] = cardShow;
                var cCard = [];
                if (cardNo == "") {
                    if (parseFloat(marketCreditInfo.custMaxCredit) > 0) { //信用卡交叉营销
                        m_cardArray = getCreditCustType();
                        m_cardNumber = getCardNumber(m_cardArray.length);
                        getCardName(m_cardArray[m_cardNumber],m_cardShow);
                        m_cardCode = m_cardArray[m_cardNumber];
                        cCard.push('<h3>' + cardName + '</h3>');
                        cCard.push('<div class="m-creditcardcontent credit-market">');
                        cCard.push('<p class="credit-market-p"><span>办理</span>&nbsp;<a class="g-blue g-italic" id="showCardName" href=' + m_cardShow.cardLink + ' target="_blank">' + m_cardShow.cardName + '</a>&nbsp;&nbsp;<a class="g-orange credit-market-change" id="creditChange">换一张</a></p>');
                        cCard.push('<p class="credit-market-oads"><span>&nbsp;&nbsp;立享&nbsp;</span><a id="showAds" class="g-blue g-italic" href=' + m_cardShow.cardLink + ' target="_blank">' + m_cardShow.ads[getCardNumber(3)] + '</a></p>');
                        cCard.push('<p><span class="g-orange">预授信额度：' + marketCreditInfo.custCreditValue + '元<span></p>');
                        cCard.push('<p><a id="creditApply" data-pos="信用卡/申办" href="###" class="btn btn-big btn-yellowbig">点我申请</a></p>');
                        cCard.push('</div>');
                    }
                    else { //非交叉营销目标客户
                        m_cardArray = ["CCGN4I", "CCGJ77", "MCG00W", "VCGJW0", "CCG810", "CCGH2I", "CCGI7I", "MCGC0I", "CCGA6I", "CCGN8I", "CCGC0I"];
                        m_cardNumber = getCardNumber(m_cardArray.length);
                        getCardName(m_cardArray[m_cardNumber], m_cardShow);
                        m_cardCode = m_cardArray[m_cardNumber];
                        cCard.push('<h3>' + cardName + '</h3>');
                        cCard.push('<div class="m-creditcardcontent credit-market">');
                        cCard.push('<p class="credit-market-p" style="margin-top:15px;"><span>办理</span>&nbsp;<a class="g-blue g-italic" id="showCardName" href=' + m_cardShow.cardLink + ' target="_blank">' + m_cardShow.cardName + '</a>&nbsp;&nbsp;<a class="g-orange credit-market-change" id="creditChange">换一张</a></p>');
                        cCard.push('<p class="credit-market-oads"><span>&nbsp;&nbsp;立享&nbsp;</span><a id="showAds" class="g-blue g-italic" href=' + m_cardShow.cardLink + ' target="_blank">' + m_cardShow.ads[getCardNumber(3)] + '</a></p>');
                        cCard.push('<p><a id="creditApply" data-pos="信用卡/申办" href="###" class="btn btn-big btn-yellowbig">点我申请</a></p>');
                        cCard.push('</div>');
                    }
                }
                else {
                    var cCardBalContent = '';
                    if (cardShow == "1") {
                        cCardBalContent = '<p style="padding-top: 24px;padding-right:20px;">本期未还款额： <span id="cnormal" class="normal span_' + cardNo + '"></span><span id="cencrypt" class="encrypt hide">******</span><b id="credit" class="show-hide m-visibleicon" data-acctId="' + cardNo + '"></b></p>';
                    }
                    else {
                        cCardBalContent = '<p style="padding-top: 24px;padding-right:20px;">本期未还款额： <span id="cnormal" class="hide normal span_' + cardNo + '"></span><span id="cencrypt" class="encrypt">******</span><b id="credit" class="show-hide m-unvisibleicon" data-acctId="' + cardNo + '"></b></p>';
                    }
                    cCard.push('<h3>' + cardName + '</h3>');
                    cCard.push('<div class="m-creditcardcontent">');
                    cCard.push('<p>' + cardNo.substr(0, 4) + '**** ' + cardNo.slice(-4) + '</p>');
                    cCard.push(cCardBalContent);
                    cCard.push('</div>');
                    cCard.push('<div class="m-multicard-box">');
                    cCard.push('<a data-pos="信用卡/还款" href="ccRepayAct.do?ccCardRepay=' + cardNo + '&ccRepayForm_bk=CcBack2" class="btn btn-creditcard m-redefinewidth">还款</a>');
                    cCard.push('<a data-pos="信用卡/分期" href="CreditBillAmortizeBalQryAct.do?szCardNo=' + cardNo + '&szCodCcy=01&ccBillAmorForm_bk=CcBack2" class="btn btn-creditcard m-redefinewidth">分期</a>');
                    cCard.push('<a data-pos="信用卡/账单" href="ccBillQryAct.do?ccCardBillQry=' + cardNo + '&ccBillQryForm_bk=CcBack2" class="btn btn-creditcard m-redefinewidth-last">账单</a>');
                    cCard.push('</div>');
                }
                $('#cCard').html(cCard.join(''));
                if (cardNo != "" && cardShow == "1") getCreditRepay(cardNo);
            }
            else { //电子账户
                cardShowList[2] = cardShow;
                var eCard = [];
                if (cardNo == "") {
                    $('#eCard').removeClass('m-eaccount').addClass('m-eaccount-empty');
					eCard.push('<h3>' + cardName + '</h3>');
					eCard.push('<div class="m-eaccountcontent"><div class="m-onecard-box">');
					if (canUseEA == "1") {
					    eCard.push('<a data-pos="账户/我的账户" href="EAccountRegisterInitAct.do" class="btn btn-big btn-refundbig">点我开通</a>');
					}
					else {
					    eCard.push('<a title="仅支持二代身份证开通的网银客户" href="###" class="btn btn-big btn-graybig">点我开通</a>');
					}
					eCard.push('</div></div>');
                }
                else {
                    var eCardBalContent = '';
                    if (cardShow == "1") {
                        eCardBalContent = '<p style="padding-top: 24px;">人民币余额： <span id="enormal" class="normal span_' + cardNo + '"></span><span id="eencrypt" class="encrypt hide">******</span><b id="eaccount" class="show-hide m-visibleicon" data-acctId="' + cardNo + '"></b></p>';
                    }
                    else {
                        eCardBalContent = '<p style="padding-top: 24px;">人民币余额： <span id="enormal" class="hide normal span_' + cardNo + '"></span><span id="eencrypt" class="encrypt">******</span><b id="eaccount" class="show-hide m-unvisibleicon" data-acctId="' + cardNo + '"></b></p>';
                    }
                    eCard.push('<h3>' + cardName + '</h3>');
                    eCard.push('<div class="m-paycardcontent">');
                    eCard.push('<p>' + cardNo.substr(0, 4) + '**** ' + cardNo.slice(-4) + '</p>');
                    eCard.push(eCardBalContent);
                    eCard.push('</div>');
                    eCard.push('<div class="m-multicard-box">');
                    eCard.push('<a data-pos="账户/我的账户" href="###" class="btn btn-refund m-redefinewidth" onclick="etoTransfer(\'' + cardNo + '\',701)">转入/出</a>');
                    if (cardAcctType == "702") {
                        eCard.push('<a title="电子账户（Ⅲ类户）不支持购买快e宝" href="###" class="btn btn-refund-gray m-redefinewidth">快e宝</a>');
                    }
                    else {
                        eCard.push('<a data-pos="投资/基金/农银快e宝" href="KYBFundInfoInitAct.do?acctType=701" class="btn btn-refund m-redefinewidth">快e宝</a>');
                    }
                    eCard.push('<a data-pos="账户/我的账户" href="###" class="btn btn-refund m-redefinewidth-last" onclick="toDetail(\'' + cardNo + '\')">明细</a>');
                    eCard.push('</div>');
                }
                $('#eCard').html(eCard.join(''));
                if (cardNo != "" && cardShow == "1") getAcctBal(cardNo);
            }
        }
    }
    $("#debit").on("click", function (event) {
        if ($(this).hasClass("m-visibleicon")) {
            $(this).removeClass("m-visibleicon").addClass("m-unvisibleicon");
            $("#dnormal").addClass("hide");
            $("#dencrypt").removeClass("hide");
            cardShowList[0] = "0";
        } else {
            $(this).removeClass("m-unvisibleicon").addClass("m-visibleicon");
            $("#dencrypt").addClass("hide");
            $("#dnormal").removeClass("hide");
            var acctId = $(event.target).attr('data-acctId');
            cardShowList[0] = "1";
            getAcctBal(acctId);

        }
        updateBalShow(cardShowList);
    });
    $("#eaccount").on("click", function (event) {
        if ($(this).hasClass("m-visibleicon")) {
            $(this).removeClass("m-visibleicon").addClass("m-unvisibleicon");
            $("#enormal").addClass("hide");
            $("#eencrypt").removeClass("hide");
            cardShowList[2] = "0";
        } else {
            $(this).removeClass("m-unvisibleicon").addClass("m-visibleicon");
            $("#eencrypt").addClass("hide");
            $("#enormal").removeClass("hide");
            var acctId = $(event.target).attr('data-acctId');
            cardShowList[2] = "1";
            getAcctBal(acctId);
        }
        updateBalShow(cardShowList);
    });
    $("#credit").on("click", function (event) {
        if ($(this).hasClass("m-visibleicon")) {
            $(this).removeClass("m-visibleicon").addClass("m-unvisibleicon");
            $("#cnormal").addClass("hide");
            $("#cencrypt").removeClass("hide");
            cardShowList[1] = "0";
        } else {
            $(this).removeClass("m-unvisibleicon").addClass("m-visibleicon");
            $("#cencrypt").addClass("hide");
            $("#cnormal").removeClass("hide");
            var acctId = $(event.target).attr('data-acctId');
            cardShowList[1] = "1";
            getCreditRepay(acctId);
        }
        updateBalShow(cardShowList);
    });
    $("#creditApply").on("click", function () {
        creditAppGo(m_cardCode, m_cardShow.cardName, m_cardShow.picName);
    });
    $("#creditChange").on("click", function () {
        m_cardNumber = (m_cardNumber + 1) % (m_cardArray.length);
        m_cardCode = m_cardArray[m_cardNumber];
        getCardName(m_cardCode, m_cardShow);
        $("#showCardName").html(m_cardShow.cardName);
        $("#showAds").html(m_cardShow.ads[getCardNumber(3)]);
        $('.g-italic').prop('href',m_cardShow.cardLink);
    });

    //客户经理
    var managerName = "";
    var managerMobile = "";
    var multiManger = "";
    $.ajax({
      type: "get",
      url: "EBQueryAccountManagerAct.ebf",
      dataType: "text",
      contentType: "application/x-www-form-urlencoded;charset=UTF-8",
      cache: false,
      success: function (text) {        
          if (text != null && text != '') {          
              multiManger = JSON.parse(text);
            parent.custManager = multiManger;
              $('#manager-hov').addClass('f1-click-show');
              $('.m-usericon').css({ background: 'url(' + config.imgpath + '/index/manager.png) no-repeat' });
              $('.people', window.parent.document).addClass('has-manager-tip');
              var multiContent = [];
              var ctrlContent = [""];
              for (var i = 0, len = multiManger.length; i < len; i++) {
                  if (i == 0) multiContent.push('<div class="slide-box show">');
                  else multiContent.push('<div class="slide-box">');
                  multiContent.push('<li class="manager-icon-name">&nbsp;&nbsp;<span>' + multiManger[i].UName + '</span></li>');
                  multiContent.push('<li class="manager-icon-phone">&nbsp;&nbsp;<span>' + multiManger[i].Mobile + '</span></li>');
                  multiContent.push('<li class="manager-icon-address">&nbsp;&nbsp;<span>' + multiManger[i].OrgName + '</span></li>');
                  multiContent.push('</div>');
                  if (i == 0) ctrlContent.push('<span class="title-circle enable"></span>');
                  else ctrlContent.push('<span class="title-circle disable"></span>');
              }
              $('#slide').html(multiContent.join(''));
              $('#title-cell').html(ctrlContent.join(''));
              init(multiManger.length);
              $(".left-arrow").bind("click", function () {
                  slide(-1, multiManger.length);
              })
              $(".right-arrow").bind("click", function () {
                  slide(1, multiManger.length);
              })

              $(".title-circle").bind("click", function () {
                  if (index != $(this).index()) {
                      console.log(index);
                      console.log($(this).index());
                      index = $(this).index();
                      slideAnimate();
                  }
                  arrowControl(multiManger.length);
                  titleCell();
              })
          }
              //var result = text.split('|');
              //if (result.length == 4) {
              //    var name = result[0], phone = result[1], mobile = result[2], isSnsOpen = result[3];
              //    managerName = name;
              //    managerMobile = mobile;
              //    if (name == '') {
              //        $('.m-usericon').css({ background: 'url(' + config.imgpath + '/index/nomanager.png) no-repeat' });
              //        $('.people', window.parent.document).addClass('no-manager-tip');
              //    }
              //    else {
              //        $('.m-usericon').css({ background: 'url(' + config.imgpath + '/index/manager.png) no-repeat' });
              //        $('.people', window.parent.document).addClass('has-manager-tip');
              //    }
              //}
          else {
              $('.m-usericon').css({ background: 'url(' + config.imgpath + '/index/nomanager.png) no-repeat' });
              $('.people', window.parent.document).addClass('no-manager-tip');
          }
      },
      error: function () {
          $('.m-usericon').css({ background: 'url(' + config.imgpath + '/index/nomanager.png) no-repeat' });
          $('.people', window.parent.document).addClass('no-manager-tip');
      }
    });
    //头像
    if (vipCustLevel == "03") {
        $(".m-diamondicon").css({ background: "url(" + config.imgpath + "/index/finance-user.png) no-repeat" });
    }
    else if (vipCustLevel == "04") {
        $(".m-diamondicon").css({ background: "url(" + config.imgpath + "/index/wealth-user.png) no-repeat" });
    }
    else if (vipCustLevel == "05") {
        $(".m-diamondicon").css({ background: "url(" + config.imgpath + "/index/pribank-user.png) no-repeat" });
    }
    else {
        $(".m-diamondicon").css({ background: "url(" + config.imgpath + "/index/common-user.png) no-repeat" });
    }
    if (keyForShow == "K宝" || keyForShow == "K令") {
        $(".m-kbaoicon").css({ background: "url(" + config.imgpath + "/sec-green.png) no-repeat" });
    }
    else {
        $(".m-kbaoicon").css({ background: "url(" + config.imgpath + "/sec-gray.png) no-repeat" });
    }
    var keyType = "2";
    if (userSec.ebflag1 == "1") keyType = "2";
    if (userSec.ebflag2 == "1") keyType = "5";
    $(".m-registerportrait .fl").on("mouseover", function () {
        $(".m-triangle").removeClass("hide");
        var text = "";
        var iconType = $(this).attr("data-itype");
        switch (iconType) {
            case "level":
                $(".m-hov-text").removeClass("hide");
                $(".m-hov-manager").addClass('hide');
                if (vipCustLevel == "05") $(".m-triangle").css('left', '52px');
                else $(".m-triangle").css('left', '49px');
                $('#sec-change').addClass('hide');
                text = "您是我行" + vipCustLevelName;
                $("#hov-text").html(text);
                break;
            case "manager":
                $('#sec-change').addClass('hide');
                if (multiManger.length > 0) {
                    $(".m-hov-text").addClass("hide");
                    $(".m-hov-manager").removeClass('hide');
                    $(".m-triangle").css('left', '93px');                
                }
                else {
                    $(".m-hov-text").addClass("hide");
                    $(".m-triangle").addClass("hide");
                    $(".m-hov-manager").addClass('hide');
                }
                break;
            case "kbao":
                $(".m-hov-text").removeClass("hide");
                $(".m-hov-manager").addClass('hide');
                $(".m-triangle").css('left', '143px');
                if (keyForShow == "K宝") {
                text = "当前安全工具：" + keyForShow;
                if ((logonMode == "1"||logonMode == "2" || logonMode == "3") && userSec.hasKT == "1") {
                        $('#sec-change').attr({ 'data-secFlag': '3', 'data-keyType': '4' }).html('切换到K令').removeClass('hide');
                    }
                }
                else if (keyForShow == "K令") {
                    text = "当前安全工具：" + keyForShow;
                    if ((logonMode == "1" || logonMode == "2" || logonMode == "3") && userSec.hasKT == "1") {
                      $('#sec-change').attr({ 'data-secFlag': '2', 'data-keyType': keyType }).html('切换到K宝').removeClass('hide');
                    }
                }
                else {
                    text = "当前无安全工具";
                }
                $("#hov-text").html(text);
                break;
            default:
                text = "欢迎登录中国农业网上银行";
                $("#hov-text").html(text);
        }
    }).on("mouseleave", function () {
        $(".m-hov-text").addClass("hide");
        $(".m-hov-manager").addClass("hide");
        $(".m-triangle").addClass("hide");
    });

    $('.m-hov-text').on('mouseover', function () {
        $(".m-hov-text").removeClass('hide');
        $(".m-triangle").removeClass("hide");
    }).on('mouseleave', function () {
        $(".m-hov-text").addClass('hide');
        $(".m-triangle").addClass("hide");
    });
    $('.m-hov-manager').on('mouseover', function () {
        $(".m-hov-manager").removeClass('hide');
        $(".m-triangle").removeClass("hide");
    }).on('mouseleave', function () {
        $(".m-hov-manager").addClass('hide');
        $(".m-triangle").addClass("hide");
    });

    $('#sec-change').on('click', function () {
        var dsecFlag = $('#sec-change').attr('data-secFlag');
        var dkeyType = $('#sec-change').attr('data-keyType');
        $.ajax({
            type: "get",
            dataType: "json",
            url: 'AccessMgAct.do',
            data: {
                secFlag: dsecFlag,
                keyType: dkeyType
            },
            cache: false,
            success: function (data) {
                if (data.rsCode == "0000") {
                    if (dsecFlag == "2") {
                        $('#hov-text').html('当前安全工具：K宝');
                        $('#sec-change').attr({"data-secFlag":"3","data-keyType":"4"});
                        $('#sec-change').html('切换到K令');
                      keyForShow = "K宝";
                    }
                    else if (dsecFlag == "3") {
                        $('#hov-text').html('当前安全工具：K令');
                        $('#sec-change').attr({ "data-secFlag": "2", "data-keyType": keyType });
                        $('#sec-change').html('切换到K宝');
                        keyForShow = "K令";
                    }
                }
            },
            error: function () {

            }
        });
    });


    var recData = '';
    $('#m-recommend-change').on('click', function () {
        var recHide = $('#m-recommen-fund').hasClass('hide');
        $('#m-recommen-default').toggleClass('hide');
        $('#m-recommen-fund').toggleClass('hide');
        if (recHide == true && recData == '') {
            $('#m-rec-loading').removeClass('hide');
            //推荐产品
            $.get("RecommendProductAct.do").done(function (data) {
                if (data) {
                    $('#m-rec-loading').addClass('hide');
                    var target = [];
                    var j = 0;
                    $.each(data.recomFund, function (i, n) {
                        if (j > 2) return false;
                        target.push('<img class="pull-left" src="' + config.imgpath + '/gradient-line.png" />');
                        target.push('<div class="fund-item"><div class="item-profile"><div class="item-name">' + n.iff_fndnme + '</div><div class="item-code">' + n.iff_fndcod + ' </div></div><div class="item-details"><div class="detail-info"><span class="value">' + n.iff_nav + '</span><span class="name">单位净值</span></div><div class="detail-info" ><span class="value">' + n.iff_lastmonth + '</span><span class="name">月涨幅</span></div></div><div class="item-operation"><a href="#" class="fund-buy" data-fundCode="' + n.iff_fndcod + '" data-operation="' + n.iff_mapStt + '">申购</a></div></div>');
                        j++;
                    });
                    target.push('<img class="pull-right" src="' + config.imgpath + '/gradient-line.png" />');
                    recData = target.join('');
                    $('#m-recommen-fund').append(recData);

                    $('a.fund-buy').on('click', function () {
                        var ope = $(this).attr('data-operation');
                        var code = $(this).attr('data-fundCode');
                        $.setPosInfo('投资/基金/基金购买');
                        if (ope.substring(0, 1) == '1') {
                            window.location.href = "FundSSCRSubscriptionInitAct.do?fundCode=" + code;
                        } else if (ope.substring(1, 2) == '1') {
                            window.location.href = "FundPURCSubscriptionInitAct.do?fundCode=" + code;
                        } else if (ope.substring(2, 3) == '1') {
                            window.location.href = "FixedInvestmentFundBuyInitAct.do?fundCode=" + code;
                        } else if (ope.substring(3, 4) == '1') {
                            window.location.href = "IntelliFixedInvestmentFundBuyInitAct.do?fundCode=" + code;
                        } else {
                        }
                    });
                    parent.changeFrameHeight && parent.changeFrameHeight('1');
                }
            });
        }
    });

    if (parent.isIntro !== '1' && typeof parent.tour !== 'undefined' && parent.tour) {
        parent.tour.start();
        parent.isIntro = '1';
    }

    //快捷菜单
    $('#quickMenuSet').mouseover(function () {
        $('.m-addicon').addClass('m-addicon-hover');
    }).mouseout(function () {
        $('.m-addicon').removeClass('m-addicon-hover');
    });
    $.get("GetCustMenuAct.do").done(function (data) {
        var qContent = ['<ul>']; //首页常用功能
        var fixContent = ['<ul>']; //其他页面悬浮常用功能
        if (data != "") {
            var icon = '';
            for (var k = 0; k < data.length; k++) {
                if (data[k]["icon"] == "") {
                    icon = "Menu/default.png";
                }
                else if (data[k]["iconSelf"] == "1") {
                    icon = data[k]["iconSelf"];
                }
                else {
                    icon = "Menu/" + data[k]["icon"];
                }
                var act = data[k]["menuAction"];
                if (typeof act != 'undefined' && act)
                {
                    var actarr = act.split('?');
                    if (actarr.length == 2 && actarr[1] == "openNew")
                    {
                        qContent.push('<li><a href="#" onclick=window.open("' + actarr[0] + '.do","' + actarr[0] + '")><span class="m-bankaccounticon"><img src="' + config.imgpath + '/' + icon + '"></span>' + data[k]["menuName"] + '</a></li>');
                        fixContent.push('<li><a href="#" onclick=window.open("' + actarr[0] + '.do","' + actarr[0] + '")><span>' + data[k]["menuName"] + '</span><img src="' + config.imgpath + '/' + icon + '"></a></li>');
                    }
                    else
                    {
                        qContent.push('<li><a data-pos="常用功能/' + data[k]["menuName"] + '" href="' + data[k]["menuAction"] + '.do"><span class="m-bankaccounticon"><img src="' + config.imgpath + '/' + icon + '"></span>' + data[k]["menuName"] + '</a></li>');
                        fixContent.push('<li><a target="contentFrame" data-pos="常用功能/' + data[k]["menuName"] + '" href="' + data[k]["menuAction"] + '.do"><span>' + data[k]["menuName"] + '</span><img src="' + config.imgpath + '/' + icon + '"></a></li>');
                    }
                }
                
               
            }
            fixContent.push('<li class="last settings"><a target="contentFrame" data-pos="常用功能设置" href="CustomerQuickMenuSetInitAct.do"><span>设置</span><img class="btn-add" src="' + config.imgpath + '/add-black.png"></a></li>');
        }
        qContent.push('</ul>');
        $('#quickMenu').html(qContent.join(''));
        $('#quickMenu a').unbind('click').bind('click', function () {
           
            if (typeof($(this).attr("data-pos")) != 'undefined' && $(this).attr("data-pos"))
            {
                var posinfo = $(this).attr('data-pos');
                $.setPosInfo(posinfo);
            }
            
        });

        fixContent.push('</ul>');
        $('#slide-list', window.parent.document).html(fixContent.join(''));
        var num = $("#slide-list li", window.parent.document).length;
        $("#slide-list", window.parent.document).css({ height: num * 60 + num - 1 + "px" });


    });
  



    var printEventList = function () {
        var json = new Object();

        var nowDateObj = new Date();
        var sYear = new Date(nowDateObj.getTime()).getFullYear();
        var sMonth = new Date(nowDateObj.getTime()).getMonth() + 1 + '';
        var sDay = new Date(nowDateObj.getTime()).getDate() + '';
        var eYear = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 30).getFullYear();
        var eMonth = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 30).getMonth() + 1 + '';
        var eDay = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 30).getDate() + '';
        if (sMonth.length < 2) {
            sMonth = '0' + sMonth;
        }
        if (eMonth.length < 2) {
            eMonth = '0' + eMonth;
        }
        if (sDay.length < 2) {
            sDay = '0' + sDay;
        }
        if (eDay.length < 2) {
            eDay = '0' + eDay;
        }
        json.startDate = sYear + '-' + sMonth + '-' + sDay;
        json.endDate = eYear + '-' + eMonth + '-' + eDay;
        json.eventType = '4';
        $.ajax({
            type: "post",
            url: 'GetCalendarEvents.do',
            data: json,
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data.length > 0 && data.errorCode != undefined) {
                    alert(data.errorCode + ":" + data.userErrorMsg);
                    return;
                }
                if (data.length > 0) {
                    $('#defalut-calendar').hide();
                    
                    var eventDivList = $("#calendarList");
                    eventDivList.show();
                    $('#calendarUlListP').html('');
                    //var ulContent = $('#calendarUlList');
                    var ulContent=$('<ul id="calendarUlList" />');
                    
                    for (var i = 0; i < data.length; i++) {
                        var li = $('<li/>');
                        //var contentDiv = $('#calendarEventContent');
                        //contentDiv.html("");
                        var contentDiv = $('<div />').addClass('m-mytiphintcontent clear');
                   
                        var divTitle = $('<div />').addClass('m-right m-right-bold');
                        var line = $('<div class="m-linebg"></div>');
                        var div1 = $('<div />');
                        var div2 = $('<div />');
                        var div3 = $('<div />');
                        var div4 = $('<div />');
                        var div5 = $('<div />');
                        var reg = new RegExp('-', 'g');
                        switch (data[i].type) {
                            case '0':
                                //用户自定义
                                divTitle.html("个人事件提醒");
                                div1.addClass('m-left fl');
                                div1.html('事件内容 ');
                                div2.addClass('m-right');
                                if (data[i].description.length > 5) {
                                    div2.html(data[i].description.substr(0, 5) + "...");
                                    div2.attr("title", data[i].description);
                                } else {
                                    div2.html(data[i].description);
                                }
                                div3.addClass('m-left fl');
                                div3.html('事件日期 ');
                                div4.addClass('m-right');
                                div4.html(data[i].datetime.replace(reg, "/"));
                                contentDiv.append(divTitle);
                                contentDiv.append(line);
                                contentDiv.append(div1);
                                contentDiv.append(div2);
                                contentDiv.append(div3);
                                contentDiv.append(div4);
                                contentDiv.css('height', '100px');
                                break;
                            case '1':
                                divTitle.html("节日提醒");
                                div1.addClass('m-left fl');
                                div1.html('节日 ');
                                div2.addClass('m-right');
                                div2.html(data[i].description);
                                div3.addClass('m-left fl');
                                div3.html('日期 ');
                                div4.addClass('m-right');
                                div4.html(data[i].datetime.replace(reg, "/"));
                                contentDiv.append(divTitle);
                                contentDiv.append(line);
                                contentDiv.append(div1);
                                contentDiv.append(div2);
                                contentDiv.append(div3);
                                contentDiv.append(div4);
                                contentDiv.css('height', '100px');

                                //公共节日
                                break;
                            case '2':
                                //贷记卡还款日
                                divTitle.html("还款提醒");
                                div1.addClass('m-left fl');
                                div1.html('未还款额 ');
                                div2.addClass('m-right');
                                var pbpara = data[i].COMPARA.split("|");
                                if (pbpara[1] == "01") {
                                    div2.html("￥" + pbpara[0]);
                                } else {
                                    div2.html(pbpara[0]);
                                }
                                div3.addClass('m-left fl');
                                div3.html('还款日期');
                                div4.addClass('m-right');
                                div4.html(data[i].datetime.replace(reg, "/"));
                                div5.addClass("m-btnrefund");
                                var a2 = $("<a />").addClass("btn btn-refund btn-refund-big");
                                var paraNameList = data[i].PBPARANAME.split("|");
                                var valueList = data[i].PBPARA.split("|");
                                var urlPara = "";
                                if (valueList != null && valueList.length > 0 && paraNameList.length == valueList.length) {
                                    urlPara = paraNameList[0] + '=' + valueList[0];
                                    for (var urlIndex = 1; urlIndex < valueList.length; urlIndex++) {
                                        urlPara = urlPara + "&";
                                        urlPara = urlPara + paraNameList[urlIndex] + '=' + valueList[urlIndex];
                                    }
                                }
                                urlPara = urlPara + "&ccRepayForm_bk=CcBack2";
                                a2.attr('href', data[i].PBACTION + '.do?' + urlPara);
                                a2.attr('data-pos', data[i].DATAPOS);
                                a2.html("还款");
                                a2.click(function () {
                                    $.setPosInfo($(this).attr('data-pos'));
                                });
                                div5.append(a2);
                                contentDiv.append(divTitle);
                                contentDiv.append(line);
                                contentDiv.append(div1);
                                contentDiv.append(div2);
                                contentDiv.append(div3);
                                contentDiv.append(div4);
                                contentDiv.append(div5);
                                contentDiv.css('height', '125px');
                                

                                break;
                            case '3':
                                //用户自定义个贷还款
                                divTitle.html("个贷还款提醒");
                                div3.addClass('m-left fl');
                                div3.html('还款日期 ');
                                div4.addClass('m-right');
                                div4.html(data[i].datetime.replace(reg, "/"));
                                div5.addClass("m-btnrefund");
                                var a3 = $("<a />").addClass("btn btn-refund btn-refund-big ");
                                var paraNameList = data[i].PBPARANAME.split("|");
                                var valueList = data[i].PBPARA.split("|");
                                var urlPara = "";
                                if (valueList != null && valueList.length > 0 && paraNameList.length == valueList.length) {
                                    urlPara = paraNameList[0] + '=' + valueList[0];
                                    for (var urlIndex = 1; urlIndex < valueList.length; urlIndex++) {
                                        urlPara = urlPara + "&";
                                        urlPara = urlPara + paraNameList[urlIndex] + '=' + valueList[urlIndex];
                                    }
                                }
                                urlPara = urlPara + "&";
                                urlPara = urlPara + 'sourceAction=index.ebf';
                                a3.attr('href', data[i].PBACTION + '.do?' + urlPara);
                                a3.attr('data-pos', data[i].DATAPOS);
                                a3.html("还款");
                                a3.click(function () {
                                    $.setPosInfo($(this).attr('data-pos'));
                                });
                                div5.append(a3);
                                contentDiv.append(divTitle);
                                contentDiv.append(line);
                                contentDiv.append(div3);
                                contentDiv.append(div4);
                                contentDiv.append(div5);
                                contentDiv.css('height', '100px');

                                break;
                            case '4':
                                //证书更新
                                divTitle.html("证书更新提醒");
                                div3.addClass('m-left fl');
                                div3.html('更新日期 ');
                                div4.addClass('m-right');
                                div4.html(data[i].datetime.replace(reg, "/"));
                                div5.addClass("m-btnrefund");
                                var a4 = $("<a />").addClass("btn btn-refund btn-refund-big ");
                                var paraNameList = data[i].PBPARANAME.split("|");
                                var valueList = data[i].PBPARA.split("|");
                                var urlPara = "";
                                if (valueList != null && valueList.length > 0 && paraNameList.length == valueList.length) {
                                    urlPara = paraNameList[0] + '=' + valueList[0];
                                    for (var urlIndex = 1; urlIndex < valueList.length; urlIndex++) {
                                        urlPara = urlPara + "&";
                                        urlPara = urlPara + paraNameList[urlIndex] + '=' + valueList[urlIndex];
                                    }
                                }
                                a4.attr('href', data[i].PBACTION + '.do?' + urlPara);
                                a4.attr('data-pos', data[i].DATAPOS);
                                a4.html("更新");
                                a4.click(function () {
                                    $.setPosInfo($(this).attr('data-pos'));
                                });
                                div5.append(a4);
                                contentDiv.append(divTitle);
                                contentDiv.append(line);
                                contentDiv.append(div3);
                                contentDiv.append(div4);
                                contentDiv.append(div5);
                                contentDiv.css('height', '100px');
                                break;
                            default:
                                divTitle.html("事件提醒");
                                div1.addClass('m-left fl');
                                div1.html('事件内容 ');
                                div2.addClass('m-right');
                                if (data[i].description.length > 5) {
                                    div2.html(data[i].description.substr(0, 5) + "...");
                                    div2.attr("title", data[i].description);
                                } else {
                                    div2.html(data[i].description);
                                }
                                div3.addClass('m-left fl');
                                div3.html('事件日期');
                                div4.addClass('m-right');
                                div4.html(data[i].datetime.replace(reg, "/"));
                                div5.addClass("m-btnrefund");
                                var a2 = $("<a />").addClass("btn btn-refund btn-refund-big");
                                if (data[i].type == '8') {
                                    //针对缴费项目跳转需要新开浏览器窗口
                                    a2.attr("target", "_blank");
                                }
                                var paraNameList = data[i].PBPARANAME.split("|");
                                var valueList = data[i].PBPARA.split("|");
                                var urlPara = "";
                                var pbComPara = "";
                                if (data[i].PBCOMPARA != null && data[i].PBCOMPARA != undefined) {
                                    pbComPara = data[i].PBCOMPARA;
                                }
                                if (valueList != null && valueList.length > 0 && paraNameList.length > 0 && paraNameList.length == valueList.length) {
                                    urlPara = paraNameList[0] + '=' + valueList[0];
                                    for (var urlIndex = 1; urlIndex < valueList.length; urlIndex++) {
                                        urlPara = urlPara + "&";
                                        urlPara = urlPara + paraNameList[urlIndex] + '=' + valueList[urlIndex];
                                    }
                                    if (pbComPara.length > 1) {
                                        urlPara = urlPara + "&";
                                        urlPara = urlPara + pbComPara;
                                    }
                                } else {
                                    if (pbComPara.length > 1) {
                                        urlPara = urlPara + pbComPara;
                                    }
                                }
                                
                                if (data[i].linkTitle != null && data[i].linkTitle != undefined && data[i].linkTitle.length > 1) {
                                    if (urlPara.length > 2) {
                                        a2.attr('href', data[i].PBACTION + '.do?' + urlPara);
                                    } else {
                                        a2.attr('href', data[i].PBACTION + '.do' );
                                    }
                                    a2.attr('data-pos', data[i].DATAPOS);
                                    a2.html(data[i].linkTitle);
                                    a2.click(function () {
                                        $.setPosInfo($(this).attr('data-pos'));
                                    });
                                    div5.append(a2);
                                }
                                contentDiv.append(divTitle);
                                contentDiv.append(line);
                                contentDiv.append(div1);
                                contentDiv.append(div2);
                                contentDiv.append(div3);
                                contentDiv.append(div4);
                                contentDiv.append(div5);
                                contentDiv.css('height', '125px');
                                break;
                        }
                        li.append(contentDiv);
                        ulContent.append(li);
                        $('#calendarUlListP').append(ulContent);
                    }
                    $('#calendarUlList').bxSlider({ auto: true, mode: 'vertical', speed: 1500, controls: false, pause: 6000, afterClickStop: false, autoHover: true, pager: false });
                    //$('#calendarList .bx-viewport').css('height', '102px');
                } else {
                    $("#calendarList").hide();
                    $('#defalut-calendar').show();
                }
            }
        });
    };

    var eventLinkClick = function (data) {
        alert(data.data.PBACTION);
    };

    $("#defalut-calendar").set_time();
    window.printEventList = printEventList;
    window.calendarPrintState = "0";//0是未绘制，1已经绘制
    var btnClick = function (event) {
        //$('#calendar').dialog("open");
        //event.preventDefault();
        if (window.calendarPrintState!='1') {
            $("#calendar").zabuto_calendar({
                language: "zh-cn"
            });
            $("#Addout").on("click", function () {
                printEventList(); 
                $('#calendar').popup('hide');
            });
            window.calendarPrintState="1";
        }
        $('#calendar').popup({ closeelement: '#Addout' });
        $('#calendar').popup('show');
    };

    printEventList();
    $("#calendarbtn").on('click', btnClick);
}(window,$));
