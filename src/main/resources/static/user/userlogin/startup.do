
<!doctype html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>中国农业银行个人网银登录入口</title>
    <meta name="description" content="中国农业银行，个人网银，用户名登录，证书登录">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/EbankSite/favicon.ico"/>
    <link rel="apple-touch-icon" href="/EbankSite/apple-touch-icon.png">
    <link rel="stylesheet" href="/EbankSite/NetBank/static/css/normalize.css">
    <link rel="stylesheet" href="/EbankSite/NetBank/static/css/main.css">
    <link rel="stylesheet" href="/EbankSite/NetBank/static/css/login/login.css">
    <link rel="stylesheet" href="/EbankSite/NetBank/static/css/libs/jquery.qtip.css">
    <script src="/EbankSite/NetBank/static/js/ilibs/writeObjectNew.js"> </script>
    <script>
        //为tab绑定的事件
        function TabMethod() {
            if ($('#m-verification-code').hasClass('hide')) {
                document.getElementById("logo").focus();
            } else {
                document.getElementById("code").focus();
            }
        }

        //为enter绑定的事件
        function ReturnMethod() {
            $('#logo')[0].click();
        }

        function ReturnMethod1() {
            $('#m-kbbtn')[0].click();
        }
        var qr = {
            qrcodeOpen : "1",
            pathData: "/EbankSite/NetBank/static/img",
            getPlattype: function () {
                return password.GetOsType();
            },
            getMacInfo: function () {
                return password.GetMachineCode('powerpass_ie', '636603694954642099');
            }
        };
    </script>
    <script type="text/javascript" for='powerpass_ie' event='EventTab'>
        TabMethod();
    </script>
    <script type="text/javascript" for='powerpass_ie' event='EventReturn'>
        ReturnMethod();
    </script>
    <script type="text/javascript" for='powerpass_ie1' event='EventReturn'>
        ReturnMethod1();
    </script>
</head>
<body onload="$.checkCsp();">
<!--[if lt IE 8]>
    <p class="browserupgrade">您正在使用<strong>过时的</strong> 浏览器. 请点击<a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank">升级</a>您的浏览器以提高体验。<a class="warningclose">X</a></p>
<![endif]-->
<p id="favoriteTip" class="loginTip hidden"> 尊敬的客户，我行已推出新版网上银行服务。请您在此页登录使用，以享受我行全新的网上银行服务。<a class="tipClose">X</a></p>
<div class="g-box">
<div id="g-mask" class="g-mask hidden">
    <div id="m-pointer" class="m-pointer"></div>
    <div id="m-kbsize" class="m-kbsize"></div>
    <div id="m-iknow" class="m-iknow"></div>
</div>
<div class="g-top"></div>
<div class="g-search">
    <div class="m-cearchcenter">
        <ul class="m-language">
            <!-- <li>
                <a href="javascript:;">繁体</a>
            </li>
            <li class="m-line"></li>
            <li>
                <a href="javascript:;">English</a>
            </li>-->
            <li>
                <a href="http://www.abchina.com">网站首页</a>
            </li>
            <li class="m-line"></li>
            <li>
                <a href="http://app.abchina.com/branch/">网点查询</a>
            </li>
        </ul>
        <div class="m-crux">
            <form action="http://query.abchina.com/search/cn.jsp" method="post" target="_self" id="searchForm">
                <input class="m-txt" type="text" name="keyword" id="" value="" placeholder="搜索关键词"/>
                <input class="m-btn" type="button" name="SearchBtn" id="" value="&nbsp;" onclick=" searchForm.submit(); "/>
            </form>
        </div>
    </div>
</div>
<div class="g-logo">
    <div class="g-logo-center">
        <div class="m-logo">
            <a href="http://www.abchina.com">
                <img src="/EbankSite/NetBank/static/img/logo.png" width="198" alt="农业银行"/>
            </a>
        </div>
        <div class="m-logo-line"></div>
        <p class="m-logo-p">个人网上银行</p>
    </div>
</div>
<div class="m-land">
    <div class="m-land-center">
        <div class="m-login-dialog m-userName-logon" id="commonLogin" style="height:350px;">
            <div class="m-uesrland">
                <div class="m-login-link"><a class="m-login-userNameLink m-login-linked" id="kBaobtn">用户名登录</a></div>
                <div class="m-login-link"><a class="m-login-kbaoLink" id="userNamebtn">K宝登录</a></div>
            </div>
            <div class="m-login-linked-split"></div>
            <div class="m-login-split"></div>
            
            <div class="hidden" id="kBaoLogin">
                <div id="m-keyShow" class="m-Kbinsert">
                    <div id="m-KbinsertLogon" class="m-Kbinsertimg"></div>
                    <p id="cspName">请插入K宝</p>
                </div>
                <form id="logonForm" name="logonForm" class="m-kbform" action="https://www.95599.cn/EbankSite/login.do" method="post">
                    <div id="m-firstKeyShow" class="m-Kbinsert-first" style="display: none;">
                        <div id="m-KbinsertLogon-first" class="m-Kbinsertimg-first"></div>
                        <p id="cspName_first"></p>
                    </div>
                    <div id="PowerEnterDiv" class="m-kbborder">
                        <script>
                            password.WritePassObjectLogin('powerpass_ie1', { randomText: "6EAD1C3EAB3338E3907DEDC18A8748CC", "borderColor": "#ffffff", "width": "250", "promptText": " 请输入K宝密码" });
                        </script>
                    </div>
                    <a class="m-kbbtn" id="m-kbbtn" href="###">登&nbsp;&nbsp;录</a>
                    <input type="hidden" name="MachineCode" value=""/>
                    <input type="hidden" name="MachineInfo" value=""/>
                    <input type="hidden" name="plattype"/>
                    <input type="hidden" name="platRandom" value="6EAD1C3EAB3338E3907DEDC18A8748CC"/>
                </form>
                <div style="height: auto; padding: 0 20px;" class="logon-error" title=""></div>
                <a class="m-kba" id="checkKey" href="http://ebhelper.abchina.com/ebhelper/ebhelper.exe" title="不能登录网银？安装网银助手试试！">网银助手</a>
                <img class="mobile-scan-intro hidden" src="/EbankSite/NetBank/static/img/login/mobile-scan-intro.png" />
            </div>

            <div id="userNameLogin">
                <form class="m-uesrform" id="userNameForm" name="userNameForm" action="upLogin.do" method="post">
                    <div class="m-uesrtxtbox" id="userDiv">
                        <div class="m-uesrtxtimg"></div>
                        <input type="text" class="m-uesrtxt" placeholder="用户名/卡号/身份证号/手机号" id="username" name="username" title="只能由英文字母、数字、汉字或下划线“_”组成" style="ime-mode: inactive" autocomplete="off"/>
                    </div>
                    <div class="m-uesrpassbox">
                        <div id="PowerEnterDiv_userName" style="display: inline; margin-left: 10px;">
                            <script>
                                password.WritePassObjectOrg("powerpass_ie", { "randomText": "6EAD1C3EAB3338E3907DEDC18A8748CC", "softkbdType": 0, "maxLength": "30", "minLength": "6", "accepts": "^[A-Za-z0-9-]*$", "width": "225", "height": "36", "borderColor": "#ffffff", "promptText": "请输入登录密码" }, 'powerpass_ie_dyn_Msg');
                            </script>
                        </div>
                    </div>
                    <div class="pwdError" id="powerpass_ie_dyn_Msg"></div>
                    <div id="m-verification-code" class="m-verification-code hide">
                        <input type="text" class="m-codetxt" placeholder="验证码" id="code" name="code" maxlength="4" autocomplete="off" style="ime-mode: disabled"/>
                        <img id="vCode" src="" width="83" height="33" alt="验证码"/>
                        <span class="v-code-error" id="imgError"></span>
                    </div>

                    <input class="m-uersbtn" type="button" id="logo" value="登  录"/>
                    <div class="logon-error" style="display: none;" title=""></div>

                    <input type="hidden" name="EntranceType" value="Common"/>
                    <input type="hidden" name="abc_formId" value="7290"/>
                    <input type="hidden" id="picCode" name="picCode"/>
                    <input type="hidden" name="MachineCode" value=""/>
                    <input type="hidden" name="MachineInfo" value=""/>
                    <input type="hidden" name="token" value=""/>
                    <input type="hidden" name="plattype"/>
                    <input type="hidden" name="pwdField"/>
                    <input type="hidden" name="pwdFieldKeys"/>
                </form>

                <ul class="m-uesrforget">
                    <li>
                        <a href="SelfHelpCheckCustInfoInitAct.do">自助注册</a>
                    </li>
                    <li class="m-uesrforgetline"></li>
                    <li>
                        <a href="SelfHelpCheckCustInfoResetInitAct.do">忘记密码</a>
                    </li>
                </ul>
                <img class="mobile-scan-intro hidden" src="/EbankSite/NetBank/static/img/login/mobile-scan-intro.png" />
            </div>

        </div>
        <div class="m-login-dialog m-userName-logon hidden" id="qrcodeLogin" style="height:350px;text-align:center;overflow:hidden;">
            <div class="m-login-qrtitle">手机扫码，安全登录</div>
            <div class="m-login-qrborder">
                <img width="150" height="150" id="qrcode" data-first="1" src="" alt="加载中..." />
                <div id="qrcodeMask" class="m-login-qrmask hidden">              
                </div>
                <div id="qrcodeInfo" class="m-login-qrmask-info hidden">
                </div>
            </div>
            <div class="m-qrcode-helper">
                <img class="m-qrcode-helpimg" src="/EbankSite/NetBank/static/img/login/scan.png" width="30" height="30" />
                <span class="m-qrcode-helptext" style="line-height:1em;">打开掌上银行<br />扫描二维码</span></div>
            <div>
                <a class="scan-helper" style="text-decoration:none;">使用帮助</a>
                <span class="m-login-qrhelp-split">|</span>
                <a style="text-decoration:none;" href="http://www.abchina.com/cn/EBanking/Personal/Pocketbanking/" target="_blank">下载掌上银行</a>
            </div>
            <form id="qrForm" name="qrForm" method="post" action="qrlogin.do">
                <input name="pidReq" type="hidden" />
                <input name="ticketReq" type="hidden" />
                <input name="codeIdReq" type="hidden" />
                <input name="businessTypeReq" type="hidden" />
                <input name="MachineCode" type="hidden" value=""/>
                <input name="MachineInfo" type="hidden" value=""/>
                <input name="plattype" type="hidden"/>
            </form>
            <img class="m-mobile-scan" width="250" src="/EbankSite/NetBank/static/img/login/mobile-scan.png" alt="qrcode-help" />
        </div>
        <a id="loginChange" class="m-uesrrightcorner hidden" href="###" title="切换到二维码登录">
            <img id="corner" class="m-corner" src="/EbankSite/NetBank/static/img/login/corner.png" />
        </a>
    </div>
</div>
<div class="m-servicecentre">
    <div class="m-servicecentre-center">
        <div class="m-servicecentre-title">
            <div class="m-leftspot"></div>
            <div class="m-core">服务中心</div>
            <div class="m-rightspot"></div>
        </div>
        <div class="m-important-link">
            <dl class="m-certificate-download">
                <dt>
                    <a href="http://www.abchina.com/cn/wydl/grwydl/zsgx/ckzsyxq/"></a>
                </dt>
                <dd>
                    <a href="http://www.abchina.com/cn/wydl/grwydl/zsgx/ckzsyxq/">证书下载</a>
                </dd>
            </dl>
            <dl class="m-toopen">
                <dt>
                    <a href="http://www.abchina.com/cn/EBanking/Personal/Personalonlinebanking/"></a>
                </dt>
                <dd>
                    <a href="http://www.abchina.com/cn/EBanking/Personal/Personalonlinebanking/">如何开通网银</a>
                </dd>
            </dl>
            <dl class="m-kbfirst-landing">
                <dt>
                    <a href="http://www.abchina.com/cn/wydl/grwydl/kbzs/kbdlzsdyb/#step1"></a>
                </dt>
                <dd>
                    <a href="http://www.abchina.com/cn/wydl/grwydl/kbzs/kbdlzsdyb/#step1">K宝首次登录</a>
                </dd>
            </dl>
            <dl class="m-klfirst-landing">
                <dt>
                    <a href="http://www.abchina.com/cn/wydl/grwydl/klzs/klzsdyb/"></a>
                </dt>
                <dd>
                    <a href="http://www.abchina.com/cn/wydl/grwydl/klzs/klzsdyb/">K令首次登录</a>
                </dd>
            </dl>
            
            <dl class="m-problem">
                <dt>
                    <a href="http://app.abchina.com/Kb/Category/19/2?pn=1&m=1"></a>
                </dt>
                <dd>
                    <a href="http://app.abchina.com/Kb/Category/19/2?pn=1&m=1">常见问题</a>
                </dd>
            </dl>
        </div>
    </div>
</div>
<div class="g-end">
    <div class="m-end" id="footer">
        <ul class="m-endnav">
            <li class="m-endnavli">
                <a href="https://www.95599.cn/cn/PublicPlate/documents/200911/t20091130_16583.htm" target="_blank">网站声明</a>
            </li>
            <li class="m-endline"></li>
            <li class="m-endnavli">
                <a href="https://www.95599.cn/cn/PublicPlate/WebLink/websitemap/" target="_blank">网站地图</a>
            </li>
            <li class="m-endline"></li>
            <li class="m-endnavli">
                <a href="https://www.95599.cn/cn/AboutABC/ContactUs/" target="_blank">联系我们</a>
            </li>
            <li class="m-endline"></li>
            <li class="m-endnavli">
                <a href="https://www.95599.cn/cn/EBanking/CustomerServiceCenter/CustomerServiceCenter/default.htm">客服热线：<span>95599</span></a>
            </li>
        </ul>
        <div class="m-sincerity">
            <a id='A1' href='https://credit.cecdc.com/CX20120927001787002018.html' target='_blank'>
                <img src="/EbankSite/NetBank/static/img/SelfHelp/index_V3_cxwz.jpg" width="90" height="32"/>
            </a>
        </div>
        <ul class="m-copyright">
            <li>中国农业银行版权所有</li>
            <li class="m-overline"></li>
            <li>
                <a href="https://www.miibeian.gov.cn/" target="_blank">京ICP备05049539</a>
            </li>
        </ul>
    </div>
</div>
</div>
<script src="/EbankSite/NetBank/static/js/libs/jquery-1.12.0.min.js"> </script>
<script src="/EbankSite/NetBank/static/js/libs/placeholders.jquery.min.js"> </script>
<script src="/EbankSite/NetBank/static/js/libs/jquery.validate.min.js"> </script>
<script src="/EbankSite/NetBank/static/js/libs/messages_zh.js"> </script>
<script src="/EbankSite/NetBank/static/js/libs/json2.js"> </script>
<script src="/EbankSite/NetBank/static/js/ilibs/browerHelper.js"> </script>
<script src="/EbankSite/NetBank/static/js/libs/jstorage.min.js"> </script>
<script src="/EbankSite/NetBank/static/js/ilibs/dataHelper.js"> </script>
<script src="/EbankSite/NetBank/static/js/ilibs/imageCodeVerify.js"> </script>
<script src="/EbankSite/NetBank/static/js/ilibs/preRepeSubmit.js"> </script>
<script src="/EbankSite/NetBank/static/js/ilibs/config.js"> </script>
<script src="/EbankSite/NetBank/static/js/libs/jquery.qtip.min.js"> </script>
<script src="/EbankSite/NetBank/static/js/ilibs/qrcode.js"> </script> 
<script>

    function resizeWindow() {
        //userNamebtn  kBaobtn
        var target = '#userNamebtn';
        if ($('userNamebtn').hasClass('hidden')) {
            target = '#kBaobtn';
        }
        var left;
        try {
            left = $(target).offset().left;
            if (left < 400) {
                var element = $(target).get(0);
                var x = 0;
                while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
                    x += element.offsetLeft;
                    element = element.offsetParent;
                }
                left = x;
            }
        } catch (e) {
            left = 900;
        }
        $('#m-iknow').css('left', left - 370);
        $('#m-pointer').css('left', left - 140);
        $('#m-kbsize').css('left', left - 380);
    }

    $(function () {
        if (qr.qrcodeOpen !== '0') {
            $('#loginChange').removeClass('hidden');
            $('.mobile-scan-intro').removeClass('hidden');
        $('.scan-helper').on('mouseover', function () {
                $('.m-mobile-scan').css('display', 'block').animate({ 'right': '32px' }, 200, 'linear');
        }).on('mouseout', function () {
            $('.m-mobile-scan').animate({ 'right': '-200px' }, 200, 'linear', function () { $(this).css('display', 'none'); });
        });
            var scanIntroTimer = setTimeout(function () {
                $('.mobile-scan-intro').fadeOut();
            }, 10000);
        }
        var loginMacType = '';
        if (loginMacType === '0') {
            $('#favoriteTip').removeClass('hidden');
            $('#favoriteTip a.tipClose').on('click', function() {
                $('#favoriteTip').addClass("hide");
            });
        }
        $('#loginChange').click(function () {
            if ($('#corner').hasClass('qr')) {
                //切换到用户名K宝登录
                $('#corner').animate({ 'left': '-70px', 'top': '0' }, 200, 'linear');
                $('#corner').removeClass('qr');
                $('#qrcodeLogin').addClass('hidden');
                if ($.os === "macintosh") {
                    $('#PowerEnterDiv_userName').css('height', '38px');
                    $('#PowerEnterDiv').css('height', '38px');
                }
                else {
                    $('#commonLogin').removeClass('hidden');
                }            
                $('#loginChange').attr('title', '切换到二维码登录');
            }
            else {
                //屏蔽Chrome和未安装控件的Browser
                if (typeof ($.browser.chrome) !== 'undefined' && $.browser.chrome) {
                    alert('暂不支持该版本浏览器！');
                }
                else if (typeof (password) !== 'undefined' && typeof (password.IsInstalled) !== 'undefined' && password.IsInstalled === true) {
                    //切换到二维码登录
                    $('#corner').animate({ 'left': '0', 'top': '-70px' }, 200, 'linear');
                    $('#corner').addClass('qr');
                    if ($.os === "macintosh" || $.browser.firefox > 0) {
                        $('#PowerEnterDiv_userName').css('height', '0');
                        $('#PowerEnterDiv').css('height', '0');
                    }
                    else {
                        $('#commonLogin').addClass('hidden');
                    }
                    $('#qrcodeLogin').removeClass('hidden');
                    $('#loginChange').attr('title', '切换到用户名或K宝登录');
                    if ($('#qrcode').attr('data-first') === '1') {
                        var qrObj = { channel: 'MobileBank', businessType: 'scanlogin', interval: 3000 };
                        var qrOptions = { width: 200, height: 200, logo: 'NetBank\\static\\img\\ABClogo_white.png' };
                        var QRLogin = new qrCode(qrObj);
                        QRLogin.setOptions(qrOptions);
                        QRLogin.start();
                        $('#qrcode').attr('data-first', '0');
                    }               
                }
                else {
                    alert('请下载最新的安全控件！');
                }    
            }
        });
        $(document).bind('contextmenu', function(event) {
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
        });
        resizeWindow();
        $(window).resize(function() {
            resizeWindow();
        });
        //$.jStorage.deleteKey('abc_tipShielKnown');
        var isKnown = '1'; // $.jStorage.get('abc_tipShielKnown');
        if (isKnown !== '1') {
            $('#PowerEnterDiv_userName').addClass('invisible');
            $('#PowerEnterDiv').addClass('invisible');
            $('#g-mask').removeClass('hidden');
            $('#m-iknow').on('click', function() {
                $('#g-mask').addClass('hidden');
                $('#PowerEnterDiv_userName').removeClass('invisible');
                $('#PowerEnterDiv').removeClass('invisible');
                $.jStorage.set('abc_tipShielKnown', '1', { TTL: 31536000000 });
                if ($.os === "macintosh") {
                    $("#userNamebtn").qtip({
                        content: {
                            text: '苹果电脑不支持K宝使用'
                        },
                        show: 'click',
                        hide: 'unfocus'
                    });
                } else {
                    $("#userNamebtn").on("click", function() {
                        $("#kBaoLogin").removeClass("hidden");
                        $("#userNameLogin").addClass("hidden");
                        $(this).addClass("m-login-linked");
                        $('.m-login-linked-split').animate({ 'margin-left': '154px' }, 200);
                        $("#kBaobtn").removeClass("m-login-linked");
                    });
                }
            });
        }
        if ($('.logon-error').text() !== '') {
            $('.logon-error').css('display', '');
        }
        $("#kBaobtn").on("click", function () {
            $("#userNameLogin").removeClass("hidden");
            $("#kBaoLogin").addClass("hidden");
            $(this).addClass("m-login-linked");
            $('.m-login-linked-split').animate({ 'margin-left': '24px' }, 200);
            $("#userNamebtn").removeClass("m-login-linked");
        });
        if ('false' === 'false' && isKnown === '1') {
            if ($.os === "macintosh") {
                $("#userNamebtn").qtip({
                    content: {
                        text: '苹果电脑不支持K宝使用'
                    },
                    show: 'click',
                    hide: 'unfocus'
                });
            } else {
                $("#userNamebtn").on("click", function() {
                    $("#kBaoLogin").removeClass("hidden");
                    $("#userNameLogin").addClass("hidden");
                    $(this).addClass("m-login-linked");
                    $('.m-login-linked-split').animate({ 'margin-left': '154px' },200);
                    $("#kBaobtn").removeClass("m-login-linked");
                });
            }
        }
        var isFirst = 'false';
        if (isFirst !== "true") {
            $('#vCode').attr('src', 'LogonImageCodeAct.do?r=' + $.random());
            $('#m-verification-code').removeClass('hide');
            //$('.m-userName-logon').css('top', '10px');
        }
        $('#vCode').click(function() {
            $('#vCode').attr('src', 'LogonImageCodeAct.do?r=' + $.random());
        });

        $('#code').checkPicCode({ infoShow: "imgError", target: "picCode" });
        var validator = $('#userNameForm').validate({
            rules: {
                username: {
                    required: true,
                    stringCheck: true,
                    lengthRange: [1, 60],
                    looseValidId18: true
                },
                code: { required: false }
            },
            messages: {
                username: {
                    required: "请输入用户名",
                    stringCheck: "用户名包含不合法字符",
                    lengthRange: "用户名长度不合法",
                    looseValidId18: "请输入正确的18位身份证号"
                }
            },
            onfocusout: function(e) {
                $(e).valid();
            },
            onsubmit: false,
            errorClass: 'error-block',
            invalidHandler: function(form) {
                $('#logo').preRepeSubmit("recover");
            }
        });

        $('#code').keydown(function(e) {
            if (e.keyCode === 13 && $('#code').checkPicCode('isPassed') === 'true') {
                $('#logo')[0].click();
            }
        });
        $('#logo').preRepeSubmit({ "beingText": "正在登录...", "recoverText": "登  录" });
        $('#logo').click(function() {
            setTimeout(function() {
                var macInfo = password.GetMachineCode('powerpass_ie', '636603694954642099');
                $('#userNameForm input[name="MachineCode"]').val(macInfo.machineCode);
                $('#userNameForm input[name="MachineInfo"]').val(macInfo.machineInfo);
                if (!validator.form()) return false;
                if (isFirst !== "true" && $('#code').checkPicCode('isPassed') !== 'true') {
                    $('#code').checkPicCode('showError');
                    $('#logo').preRepeSubmit("recover");
                    return false;
                }
                if (!password.DealWithPwd("userNameForm", '636603694954642099', 'powerpass_ie_dyn_Msg')) {
                    document.getElementById("powerpass_ie").focus();
                    $('#logo').preRepeSubmit("recover");
                    return false;
                }
                $('#userNameForm').submit();
            }, 10);
        });

        $.directLogon = function ()
        {
            document.getElementById("m-kbbtn").innerHTML = "正在登录...";
            setTimeout(function () {
                try {
                    var macInfo = password.GetMachineCode('powerpass_ie', '636603694954642099');
                    $('#logonForm input[name="MachineCode"]').val(macInfo.machineCode);
                    $('#logonForm input[name="MachineInfo"]').val(macInfo.machineInfo);
                    $('#logonForm input[name="plattype"]').val(password.GetOsType);
                } catch (e) {
                }
                $("#logonForm").submit();
            }, 10);
        }

        $.logon = function() {
            document.getElementById("m-kbbtn").innerHTML = "正在登录...";
            setTimeout(function() {
                try {
                    var macInfo = password.GetMachineCode('powerpass_ie', '636603694954642099');
                    $('#logonForm input[name="MachineCode"]').val(macInfo.machineCode);
                    $('#logonForm input[name="MachineInfo"]').val(macInfo.machineInfo);
                    $('#logonForm input[name="plattype"]').val(password.GetOsType);
                } catch (e) {
                }
                if (!password.VerifyCSPPin()) {
                    document.getElementById("m-kbbtn").innerHTML = "登&nbsp;&nbsp;录";
                    return false;
                }
                $("#logonForm").submit();
            }, 10);
        };
        $('#m-kbbtn').on('click', $.logon);

        var haveChanged = false;
        $.checkCsp = function() {
            password.GetCSPListLogin(function() {
                function change() {
                    if (!haveChanged) {
                        haveChanged = true;
                        $("#kBaoLogin").removeClass("hidden");
                        $("#userNameLogin").addClass("hidden");
                        $("#userNamebtn").addClass("m-login-linked");
                        $('.m-login-linked-split').animate({ 'margin-left': '154px' }, 200);
                        $("#kBaobtn").removeClass("m-login-linked");
                    }
                }
                return change; 
            }());
            setTimeout($.checkCsp, 3000, null);
        };

    });
</script>


<script>
//    function bhCallback() {
//        var action_id = "login";   //current page action id
//        var elementID = document.getElementById("logo");
//        addClickListenerToButtonById(elementID, "username", site_id, action_id, true);
//        var elementID = document.getElementById("m-kbbtn");
//        addClickListenerToButtonById(elementID, "username", site_id, action_id, true);
//    }
//    try {
//        loadScript(bhCallback);
//    } catch (e) {
    //    }
</script> 
</body>
</html>