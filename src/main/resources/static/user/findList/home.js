$(function () {
    $.ajaxSetup({ cache: false });
    $(document).on('click', 'a[href="javascript:;"],a[href="javascript:"]', function (e) { e.preventDefault(); });
    $(document).bind('contextmenu', function (event) {
        if (event.preventDefault) event.preventDefault();
        else event.returnValue = false;
    });
    window.custManager = [];
    var setFrameHeight = function (e) {
        var iframe = $('iframe[name="contentFrame"]');
        var frmWindow = iframe.get(0).contentWindow;

        // 解决高度改变后滚动条位置变动，记录初始位
        var scrollTop = $(window).scrollTop();
        var additionalHeight = $('.location-wrap').hasClass('hide') ? 55 : 0;
        var screenHeight = window.innerHeight - (240 - additionalHeight) || window.screen.height - 330;
        var scrollHeight = 0;
        if (frmWindow.document.body) {
            if ($.browser.ie && $.browser.ie < 8) {
                scrollHeight = frmWindow.document.documentElement.scrollHeight - 20;
            } else {
                scrollHeight = Math.min(frmWindow.document.body.scrollHeight, frmWindow.document.documentElement.scrollHeight);
            }
        }
        if (screenHeight < 450 && scrollHeight < 450) {
            $(iframe).height(450);
        }
        else if (screenHeight > scrollHeight) {
            $(iframe).height(screenHeight);
        }
        else {
            $(iframe).height(scrollHeight);
        }
        //0设置为永远不动，没有滚动到头部，其他值滚动到原位置
        if (e && e != "0") {
            $(window).scrollTop(scrollTop);
        } else if (e != "0") {
            $(window).scrollTop(0);
        }
    };
    window.changeFrameHeight = setFrameHeight;

    window.getFrameHeight = function () {
        return $('iframe[name="contentFrame"]').height();
    };

    function frameLoaded() {
        var that = this, frmWindow = that.contentWindow;
        frmWindow.$ && frmWindow.$.ajaxSetup({
            complete: setFrameHeight
        });
        $(frmWindow.document).click(function (e) {
            $(that).height() > 0 && setFrameHeight(e);
        });
        $(frmWindow.document).bind('contextmenu', function (event) {
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
        });
        setFrameHeight();
        var src = "index.do";
        var src1 = frmWindow.location.href;
        if (src1.indexOf(src) > -1) {
            $("#slide-list").addClass("hide");
        } else {
            if (window.screen.width <= 1024 || (typeof (frmWindow.cancelHide) !== 'undefined' && frmWindow.cancelHide === '1')) {
                $("#slide-list").addClass('hide');
            }
            else{
                $("#slide-list").removeClass("hide");
            }
            $('#slide-list a').unbind('click').bind('click', function () {
                $.setPosInfo($(this).attr('data-pos'));
            });
        }
        if (data.showPosition != '') {
            $.setPosInfo(data.showPosition); //交易定位位置信息更新
            data.showPosition = '';
            if (window.screen.width > 1024) {
                //获取常用功能
                $.get("GetCustMenuAct.do").done(function (rdata) {
                    var fixContent = ['<ul>']; //其他页面悬浮常用功能
                    if (rdata != "") {
                        var icon = '';
                        for (var k = 0; k < rdata.length; k++) {
                            if (rdata[k]["icon"] == "") {
                                icon = "Menu/default.png";
                            }
                            else if (rdata[k]["iconSelf"] == "1") {
                                icon = rdata[k]["iconSelf"];
                            }
                            else {
                                icon = "Menu/" + rdata[k]["icon"];
                            }
                            fixContent.push('<li><a target="contentFrame" data-pos="常用功能/' + rdata[k]["menuName"] + '" href="' + rdata[k]["menuAction"] + '.do"><span>' + rdata[k]["menuName"] + '</span><img src="' + data.imgpath + '/' + icon + '"></a></li>');
                        }
                        fixContent.push('<li class="last settings"><a target="contentFrame" data-pos="常用功能设置" href="CustomerQuickMenuSetInitAct.do"><span>设置</span><img class="btn-add" src="' + data.imgpath + '/add-black.png"></a></li>');
                        fixContent.push('</ul>');
                        $('#slide-list').html(fixContent.join(''));
                        var num = $("#slide-list li").length;
                        $("#slide-list").css({ height: num * 60 + num - 1 + "px" }).removeClass("hide");
                    }
                });
            }
        }
        if ($('.foot').css('visibility') != 'visible') {
            $('.foot').css('visibility', 'visible');
        }
    }

    window.IntroExitCallBack = function () {
        if ('1' == data.isHaveBlackCard) {
            $('#blackcard-box').popup('toggle');
            $('#blackcard-confirm').click(function () {
                $('#blackcard-box').popup('hide');
                openProtocolUpdate();
            });
        }
        else {
            openProtocolUpdate();
        }
    }

    if ($.browser.ie && $.browser.ie < 8) {
        //ie7以下不显示引导
    }
    else {
        //$.jStorage.deleteKey('abc_tipIntro'); //测试用，后删除
        window.isIntro = $.jStorage.get('abc_tipIntro');
        if (isIntro !== '1') {
            var tooltipPosition = {
                parent_intro1_1: { left: '-15px', top: '35px' },
                parent_intro1_2: { left: '-130px', top: '-120px' },
                parent_intro4_1: { left: '670px', top: '50px' },
                son_intro2_1: { left: '350px', top: '180px' },
                son_intro3_1: { left: '50px', top: '-150px' },
                son_intro3_2: { left: '350px', top: '-100px' },
                son_intro4_2: { left: '80px', top: '190px' }
            };
            window.tour = intro();
            tour.setOption('totalStep', 4);
            tour.setOption('frameName', 'contentFrame');
            tour.setOption('tooltipBasepath', data.imgpath);
            tour.setOption('tooltipPosition', tooltipPosition);
            tour.setOption('introExitCallback', IntroExitCallBack);
            $.jStorage.set('abc_tipIntro', '1', { TTL: 31536000000 });
        }
    }

    $('iframe[name="contentFrame"]').load(frameLoaded);



});
(function (window, $) {
    //我的奖品
//  if (data.whiteFlag == '1') {
//      $('#myPrize').removeClass('hide');
//  }
    $('.my-items').click(function () {
        $('.box-mine').fadeOut();
    });

    window.openChannelUpdate = function () {
        if (data.isUpdateAllChannel == '1') {
            $('#maskLayer').removeClass('hide');
            $('#contentLayer').removeClass('hide');
            $('#CIUpdateChange').prop('src', data.updateLinkUrl);
            dragMove($('#contentLayer')[0], $('#contentLayer h3')[0]);
        }
    }
    window.openProtocolUpdate = function () {
        if ('1' == data.cProtocolVersion) {
            $('#updateProtocolPopup').popup('toggle');
            $('#agree').click(function () {
                if ($(this).prop('checked') == true) {
                    $('#updateConfirm').removeClass('btn-secondary').addClass('btn-primary');
                }
                else {
                    $('#updateConfirm').removeClass('btn-primary').addClass('btn-secondary');
                }
            });
            $('#updateConfirm').click(function () {
                if ($(this).hasClass('btn-primary')) {
                    $.ajax({
                        type: "post",
                        dataType: "text",
                        url: 'UpdateProtocol.do',
                        data: {
                        },
                        cache: false,
                        success: function (data) {
                            $('#updateProtocolPopup').popup('hide');
                            openChannelUpdate();
                        },
                        error: function () {
                            $('#updateProtocolPopup').popup('hide');
                            openChannelUpdate();
                        }
                    });
                }
                else {
                    return false;
                }
            });
        }
        else {
            openChannelUpdate();
        }
    }

    var abc_tipIntro = $.jStorage.get('abc_tipIntro');
    if (abc_tipIntro === '1') {
        openProtocolUpdate();
    }

    window.openAMLTip = function () {
        if (data.amlType === '1') { //多id
            Alert('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的客户，为保护我行客户资金与交易安全，并提供更好的服务，根据监管要求，我行率先启动客户信息完善工作，您的身份信息需要补充或更新，烦请携带本人有效身份证件及任一张名下卡（折）原件到我行网点更新信息；如您同时曾用15位或其它身份证件开户，也请尽量携带齐全旧证件名下的卡（折）一并前往。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为避免业务受到限制，请您于' + data.amlDate + '0:00前完善信息。如果给您带来不便，敬请谅解，感谢您对农业银行一如既往的支持。如有疑问,可前往我行网点，或致电客户服务热线95599。', '重要提示', undefined, 'aml-alert');
        } else if (data.amlType === '3') { //敏感信息不全
            Alert('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的客户，为保护我行客户资金与交易安全，并提供更好的服务，根据监管要求，我行率先启动客户信息完善工作，您的“姓名”、“手机”、“证件类型”、“证件号码”、“证件有效期”中个别信息需要补充或更新，烦请携带本人有效身份证件及名下任一张卡（折）原件到我行网点更新信息。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为避免业务受到限制，请您于' + data.amlDate + '0:00前完善信息。如果给您带来不便，敬请谅解，感谢您对农业银行一如既往的支持。如有疑问,可前往我行网点，或致电客户服务热线95599。', '重要提示', undefined, 'aml-alert');
        } else if (data.amlType === '4') { //非敏感信息不全
            Alert('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的客户，为保护我行客户资金与交易安全，并提供更好的服务，根据监管要求，我行率先启动客户信息完善工作，您的“性别”、“职业”、“联系地址”、“固定电话”中个别信息需要补充或更新，烦请您点击“确定”按钮补充信息。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为避免业务受到限制，请您于' + data.amlDate + '0:00前完善信息。如果给您带来不便，敬请谅解，感谢您对农业银行一如既往的支持。如有疑问,可前往我行网点，或致电客户服务热线95599。', '重要提示', function () {
                $.setPosInfo('我的/我的信息');
                document.amlForm.submit();
            }, 'aml-alert');
        } else { //正常客户

        }
    }

    window.hideMenu = function(flag) {
        if (flag) {
            $('.head,.nav,.slide-list').addClass('hide');
        } else {
            $('.head,.nav').removeClass('hide');
            if (window.screen.width > 1024) $(".slide-list").removeClass("hide");
        }
    }

    //反洗钱提示
    if (data.isUpdateAllChannel !== '1') {
        openAMLTip();
    }

    var timeFlag = data.logonTimes;
    if (timeFlag == 1) $('#time-flag').html('首次');
    $('#logout_btn,#logout_a').click(perbankLogout);
    window.onbeforeunload = perbankLogout;
    window.commonLogout = perbankLogout;

    function perbankLogout(event) {
        var showMsg = {
            confirmLogoutKey: function () { return confirm("是否确定要退出中国农业银行网上银行系统？\r\n\r\n如在电脑上插有K宝，请拔除K宝"); },
            confirmLogout: function () { return confirm("是否确定要退出中国农业银行网上银行系统？"); },
            alertLogoutKey: function () { alert("您已退出中国农业银行网上银行，但尚未拔除K宝。\r\n\r\n为了您的资金安全，请拔除K宝"); },
            alertLogout: function () { alert("您已退出中国农业银行网上银行，欢迎您再次使用"); }
        },
          logout = function () {
              window.onbeforeunload = null;
              window.location.href = 'logout.do';
          },
          close = function () {
              window.onbeforeunload = null;
              $.ajax({
                  url: "logout.do",
                  type: "post",
                  async: false,
                  success: function () { }
              });
          };
        // 非点击退出
        if (event && event.type !== 'beforeunload') {
            if (data.certType === '2' || data.certType === '5') {
                if (showMsg.confirmLogoutKey()) {
                    try {
                        if (ABCPrintCtl4RA1 && parseInt(ABCPrintCtl4RA1.getAllMediaIDCounts()) > 0)
                            showMsg.alertLogoutKey();
                    } catch (e) { }
                    logout();
                }
            }
            else if (data.logonMode !== '1' && data.certType === '1') {
                showMsg.alertLogout();
                logout();
            }
            else {
                if (showMsg.confirmLogout()) logout();
            }
        }
        else {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                if (data.certType === '2' || data.certType === '5') {
                    if (data.logonMode !== '1') showMsg.alertLogoutKey();
                    try {
                        if (ABCPrintCtl4RA1 && parseInt(ABCPrintCtl4RA1.getAllMediaIDCounts()) > 0) {
                            showMsg.alertLogoutKey();
                        }
                    } catch (e) { }
                } else if (data.logonMode !== '1') {
                    showMsg.alertLogout();
                }
                logout();
            }
            else {
                close();
            }
        }
    }

    //回到旧版
    $('#back-old').click(function () {
        var title = '尊敬的客户：'
        var message = '为了给您提供更好的服务，我行推出了时尚版网上银行，经典版网上银行将于近期停止服务，欢迎您使用时尚版网上银行。感谢您的理解与支持！';
        Confirm(message, title, function () {
            return false;
        }, function () {
            window.onbeforeunload = null;
            window.location.href = 'redirectToOldLogin.do';
            return false;
        }, 'mid-comfirm', '使用时尚版', '进入经典版');
    });

    $('#chooseLangBtn').click(function () {
        $("#choseLangPanel").toggle();
    });
    $('#choseLangPanel a').click(function () {
        if ($(this).attr("data-lang") !== $('#chooseLangBtn').attr("data-lang")) {
            window.location.href = "changeLocace.do?lang=" + $(this).attr("data-lang");
        }
    });
    //我的系列
    $('.popbox-mine').popbox({ open: '.open-mine', box: '.box-mine' });
    //消息弹框
    $('.popbox').popbox();
    //消息提醒
    var unReadNum = 0;
    function msgInfoHTML(info, infoType) {
        if (info && info.length > 0) {
            var infoLen = info.length;
            var msgInfoLen = infoLen > 6 ? 6 : infoLen;
            var infoHTML = ['<ul id="' + infoType + '">'];
            for (var i = 0; i < msgInfoLen; i++) {
                var proWay = info[i].proWay;
                var read = info[i].msgStatus == "0" ? "unRead" : "read";
                var cutProName = $.StringSuffix(info[i].proName, 40, "...");
                var cutFlag = cutProName.indexOf("...");
                if (proWay == '1') { //链接
                    var proInfo = info[i].proInfo;
                    if (proInfo.indexOf('http') == -1) proInfo = 'http://' + info[i].proInfo;
                    if (cutFlag < 0) infoHTML.push('<li><span class="one-title"><a data-pos="0" data-protype="' + info[i].proType + '" data-prono="' + info[i].proNo + '" class="' + read + '" href="' + proInfo + '" target="_blank">' + cutProName + '</a></span><span>' + info[i].buildTime + '</span></li>');
                    else infoHTML.push('<li><span class="one-title"><a title="' + info[i].proName + '" data-pos="0" data-protype="' + info[i].proType + '" data-prono="' + info[i].proNo + '" class="' + read + '" href="' + proInfo + '" target="_blank">' + cutProName + '</a></span><span>' + info[i].buildTime + '</span></li>');
                }
                else if (proWay == '2') { //内容
                    if (cutFlag < 0) infoHTML.push('<li><span class="one-title"><a data-pos="1" data-protype="' + info[i].proType + '" data-prono="' + info[i].proNo + '" class="' + read + '" href="ViewNoticeContentAct.do?source=0&proType=' + info[i].proType + '&proNo=' + info[i].proNo + '" target="contentFrame">' + cutProName + '</a></span><span>' + info[i].buildTime + '</span></li>');
                    else infoHTML.push('<li><span class="one-title"><a title="' + info[i].proName + '" data-pos="1" data-protype="' + info[i].proType + '" data-prono="' + info[i].proNo + '" class="' + read + '" href="ViewNoticeContentAct.do?proType=' + info[i].proType + '&proNo=' + info[i].proNo + '" target="contentFrame">' + cutProName + '</a></span><span>' + info[i].buildTime + '</span></li>');
                }
                else {
                    if (infoType == 'priInfoContent') {
                        infoHTML.push('<li><span class="one-title"><a data-pos="设置/安全工具" data-protype="' + info[i].proType + '" data-prono="' + info[i].proNo + '" class="' + read + '" href="CustomerCertUpdInitAct.do" target="contentFrame">' + info[i].proInfo + '</a></span></li>');
                    }
                    else {
                        infoHTML.push('<li><span class="one-title"><a data-pos="0" data-protype="' + info[i].proType + '" data-prono="' + info[i].proNo + '" class="' + read + '">' + info[i].proName + '</a></span><span>' + info[i].buildTime + '</span></li>');
                    }
                }
            }
            infoHTML.push('</ul>');
            var infoHTMLStr = infoHTML.join('');
            return infoHTMLStr;
        }
        return '';
    }
    function getUnReadNum(r_info) {
        if (r_info != 'undefined' && r_info.length > 0) {
            return r_info[0].num;
        }
        return "0";
    }
    var comInfo = '';
    var priInfo = '';
    $.ajax({
        url: "GetNoticeMenuAct.do",
        type: "get",
        cache: false,
        dataType: "json",
        success: function (msgInfo) {
            if (msgInfo.comMsg && msgInfo.comMsg.length > 0) {
                comInfo = msgInfoHTML(msgInfo.comMsg, "comInfoContent");
                priInfo = msgInfoHTML(msgInfo.priMsg, "priInfoContent");
                $('#en-content').html(comInfo + priInfo);
                if (priInfo == '') {
                    $('#comInfo').addClass('active');
                    $('#comInfoContent').show();
                    $('#priInfoContent').hide();
                }
                else {
                    $('#priInfo').addClass('active');
                    $('#comInfoContent').hide();
                    $('#priInfoContent').show();
                }
                unReadNum = getUnReadNum(msgInfo.readMsg);
                if (unReadNum > 0) {
                    $('.yuan-icon').removeClass('hide');
                    $('#message-num').html(unReadNum);
                }
            }
        },
        error: function () {

        }
    });
    $('#comInfo').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('#comInfoContent').show();
        $('#priInfoContent').hide();
    });
    $('#priInfo').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $('#comInfoContent').hide();
        $('#priInfoContent').show();
    });
    $('#en-content').on('click', function (event) {
        var tag = event.target.tagName.toLocaleLowerCase();
        if (tag == 'a') {
            if ($(event.target).attr('data-pos') != '0' && $(event.target).attr('data-pos') != '1')
                $.setPosInfo($(event.target).attr('data-pos'));
            if ($(event.target).hasClass('unRead')) {
                $(event.target).removeClass('unRead');
                //更新消息状态
                var protype = $(event.target).attr("data-protype");
                var prono = $(event.target).attr("data-prono");
                var status = "1";
                $.ajax({
                    type: "post",
                    url: "UpdMsgStatusAct.do",
                    data: { "proType": protype, "proNo": prono, "status": status, "source": '0' },
                    success: function () {
                        var rNum = parseInt($('#message-num').text());
                        --rNum;
                        if (rNum == 0) $('.yuan-icon').addClass('hide');
                        else $('#message-num').html(rNum);

                    }
                });
            }
            $('.box').fadeOut();
            if ($(event.target).attr('data-pos') == '1') {
                $.setPosInfo('首页/消息');
            }
        }
    });
    $('#noticeMore').on('click', function () {
        $('#contentFrame').attr('src', "GetNoticeMoreAct.ebf");
        $('.box').fadeOut();
        $.setPosInfo('首页/消息');
    });

    if ($.browser.ie && $.browser.ie < 9) {
        $('.scale-big').hide();
        $('.m-split').hide();
    }

    //字体缩放
    $(".font").on("click", function () {
        //清除可能存在的引导
        if (typeof (tour) !== 'undefined' && typeof (tour._currentStep) !== 'undefined') {
            tour.exit();
        }
        if ($(this).hasClass("scale-big")) {
            $("body").css({
                "transform": "scale(1.25)",
                "-ms-transform": "scale(1.25)",
                "-o-transform": "scale(1.25)",
                "-moz-transform": "scale(1.25)",
                "-webkit-transform": "scale(1.25)",
                "transform-origin": "center top",
                "-ms-transform-origin": "center top",
                "-o-transform-origin": "center top",
                "-moz-transform-origin": "center top",
                "-webkit-transform-origin": "center top"
            });
            $('.fixed-list').css('margin-left', '630px');
            $(this).removeClass("scale-big").addClass("scale-small");
            $('.font-icon').html('-');
        } else {
            $("body").css({
                "transform": "scale(1)",
                "-ms-transform": "scale(1)",
                "-o-transform": "scale(1)",
                "-moz-transform": "scale(1)",
                "-webkit-transform": "scale(1)"
            });
            $('.fixed-list').css('margin-left', '510px');
            $(this).removeClass("scale-small").addClass("scale-big");
            $('.font-icon').html('+');
        }
    });
    //logo跳转
    $('#logo').click(function () {
        $('.location-wrap').addClass('hide');
        $('#contentFrame').prop('src', 'index.do');
    });
    //弹窗
    //二维码
    $('#popup-wechat').popup({ closeelement: '.close-box' });
    $('.wechat').click(function () {
        $('#popup-wechat').popup('show');
    }).on('mouseover', function () {
        $('#fixed-qrcode').removeClass('hide');
    }).on('mouseleave', function () {
        $('#fixed-qrcode').addClass('hide');
    });
    $(".mask-confirm").bind("click", function () {
        $(document.body).click();
    });
    //客户经理聊天窗口
    $('.people').on('click', function () {
        if ($(this).hasClass('has-manager-tip')) {
            var mUrl = '';
            if (data.domainUrl.indexOf('95599') === -1) { //用户名版地址
                mUrl = 'https://sns.abchina.com/MyAM/Chat';
            }
            else { //证书版地址
                mUrl = 'https://www.95599.cn/cn/sns/myam/dialog';
            }
            $('#manager-frm').attr('src', mUrl);
            $('#manager-box').removeClass('hide');
            $('#manager-mask').removeClass('hide');
        }
    }).on('mouseover', function () {
        if ($(this).hasClass('has-manager-tip')) {
            $('#manager-text').html('与您的专属客户经理在线咨询');
        }
        else {
            $('#manager-text').html('您当前没有签约客户经理');
        }
        $('#fixed-no-manager').removeClass('hide');
    }).on('mouseleave', function () {
        $('#fixed-no-manager').addClass('hide');
    });
    //跳转到页顶
    function goTop(obj1) {
        $(window).scroll(show);
        obj1.bind("click", function () {
            if (window.addEventListener) {
                $("body,html").animate({ scrollTop: "0px" }, 300);
            } else {
                $("html").animate({ scrollTop: "0px" }, 300);
            }
        });
        function show() {
            var height = document.documentElement.scrollTop + document.body.scrollTop;
            if (height > 0) {
                obj1.css({ display: "block" });
                obj1.stop().animate({ opacity: "1" }, 300);
            } else if (height == 0) {
                obj1.stop().animate({ opacity: "0" }, 300, function () {
                    obj1.css({ display: "none" });
                });
            }
        }
    }
    goTop($(".gotop"));
    window.goDown = function (val, time) {
        var height1 = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        $("body,html").animate({ scrollTop: height1 + val + "px" }, time);
    };

    $("#slide-list").bind("mouseenter", moveOut);
    $("#slide-list").bind("mouseleave", moveIn);
    function moveOut() {
        $("#slide-list").stop().animate({ left: 0 + "px" }, 300);
    }
    function moveIn() {
        $("#slide-list").stop().animate({ left: -85 + "px" }, 300);
    }

    $('#manager-close').click(function () {
        $('#manager-mask').addClass('hide');
        $('#manager-box').addClass('hide');
    });
    $('#prize-close').click(function () {
        $('#prize-frm').prop('src', '');
        $('#prize-mask').addClass('hide');
        $('#prize-box').addClass('hide');
    });
    //$.getScript(data.isCrossWriteUrl+"?_="+Math.random());
}(window, $));


