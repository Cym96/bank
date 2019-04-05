//转账提交
function transferConfirm()
{
    var toBankCode = transToBankCode($("#bankKey").val());
    var fmAcctNo = $("#fromAcctNo").val();
    var toAcctNo = $("#toAcctNo").val();
    var trnAmt = $("#transAmt").val();
    var json = new Object();
    json.fmAcctNo = fmAcctNo;
    json.acctNo = toAcctNo;
    json.trnAmt = trnAmt;
    json.bankCode = toBankCode;

    //有效性检测
    if (!validator.form()) {
        //Alert("表单信息填写错误，请重新填写错误项！");
        return false;
    } else { }

    //有效性检测
    if ($("#bigTransAmt").text() == "错误金额") {
        Alert("错误金额");
        return false;
    }
    //本行非互转，判断转账限额
    if (toBankCode == "03") {
        judgeTrnPath($("#toAcctNo").val(), fromAccountJs);
        if (selfTransferPath != "Y") {
            checkLimitByCert(json,submitConfirm);
        }
        else
        {
            submitConfirm();
        }
    }
    else {
        checkLimitByCert(json,submitConfirm);
    }
}


//转账提交前确认
function submitConfirm() {

    var fromAcctId = $("#fromAcctNo").val();
    var toAcctId = $("#toAcctNo").val();
    var toAccName = trimSpecialChars($("#toAcctNameKey").val());
    var toBankCode = transToBankCode($("#bankKey").val());
    var toBankName = $("#bankKey").val();
    var trnAmt = $("#transAmt").val();
    var isSaveUseType = "N";
    var useType = $("#inputUseType").val();
    if (useType != null && useType != "") {
        isSaveUseType = "Y";
    }
    var isMessageSend = "0";
    var gMobileNo = $("#toAcctMobile").val();
    if (gMobileNo) {
        isMessageSend = "1";
    }

    //下次删除
    var LinkMan = custName.substr(0, 10);
    var LinkPhone = "11111111111";   //如果客户没有输入手机号，则默认送该值
    if (gMobileNo) {
        LinkPhone = gMobileNo;
    }
   
    var trnType = transTypeToEng($(".zz-backno1").text());

    //转账确认专用字段
    mainForm.fromAcctId.value = fromAcctId;
    mainForm.toAcctId.value = toAcctId;
    mainForm.toAccName.value = toAccName;
    mainForm.toDirectBnkNme.value = toBankName;
    mainForm.toAcctBankName.value = toBankName;
    mainForm.toCstsrlno.value = mainForm.toCstsrlno.value;
    mainForm.grpNoName.value = mainForm.grpNoName.value;
    mainForm.trnAmt.value = parseFloat(trnAmt).toFixed(2);
    mainForm.isSaveUseType.value = isSaveUseType;
    mainForm.useType.value = useType;
    mainForm.isMessageSend.value = isMessageSend;
    mainForm.gMobileNo.value = gMobileNo;  //发送短信手机号
    mainForm.LinkMan.value = LinkMan;
    mainForm.LinkPhone.value = LinkPhone;
    mainForm.trnType.value = trnType;
    //例如长沙银行走大小额，行号已经赋值
    if (mainForm.toBankCode.value == null || mainForm.toBankCode.value == "") {
        mainForm.toBankCode.value = toBankCode;
    }
    //新增收款方，需要重新获取大额行号
    if ((mainForm.networklist.value == "" || mainForm.networklist.value == null) && mainForm.isrealtime.value !="N") {
        mainForm.networklist.value = $("#netKey").attr("netId");
    }
    if (mainForm.networklist.value == "undefined" || mainForm.networklist.value == undefined) {
        mainForm.networklist.value = "";
    }

    //保存为收款方
    mainForm.cagAccIn.value = toAcctId;
    mainForm.acctNameIn.value = toAccName;
    mainForm.ProvinceName.value = transToProvCode($("#provKey").val());
    mainForm.AcctOofeFlg.value = "0";
    mainForm.AcctCurCode.value = "156";
    //mainForm.mobileIn.value = LinkPhone;
    mainForm.citylistname.value = $("#cityKey").val();
    mainForm.toBankName.value = $("#netKey").val();
    mainForm.toAcctCurCode.value = mainForm.AcctCurCode.value;
    mainForm.toAcctOofeFlg.value = mainForm.AcctOofeFlg.value;
    mainForm.toProvinceName.value = $("#provKey").val();
    mainForm.toCityName.value = $("#cityKey").val();
    //银行
    if (mainForm.BankIn.value == null || mainForm.BankIn.value == "") {
        mainForm.BankIn.value = toBankCode;
    }
    //只有新增时才会为空
    if (mainForm.grpNoName.value == "" || mainForm.grpNoName.value == null) {
        mainForm.grpNoName.value = "1001";   //计算手续费
        mainForm.grpNo.value = "1001";              //默认保存新增收款方到临时分组
    }
    else {
        mainForm.grpNo.value = mainForm.grpNoName.value;
    }
    //落地
    //if (mainForm.isrealtime.value != "Y") {
    //    //银行手工输入
    //    if (toBankCode == null || toBankCode == "") {
    //        mainForm.BankIn.value = "99";
    //        mainForm.toBankCode.value = "99";
    //    }
    //    //银行下拉选择网点手工输入
    //    else
    //    {}
    //}
    //表示跨行转账新增收款方，收款方选择和最近转账记录已经赋值
    if (mainForm.toBankCode.value != "03" && (mainForm.BankNameIn.value == null || mainForm.BankNameIn.value == "")) {
        var newPayUsrBknNm = $("#bankKey").val() + "/" + $("#netKey").val();
        mainForm.BankNameIn.value = newPayUsrBknNm;        //手工输入银行/网点名称 记收款方用
        mainForm.sUsrBnkNm.value = newPayUsrBknNm;          //用户手工录入贷方行名 发后台用
    }



    if (parseFloat(mainForm.trnAmt.value) > $("#fromAcctBalance").val()) {
        Alert("转账金额不能大于账户余额");
        return false;
    }

    //校验账号
    tempAcctNo = toAcctId;
    if (tempAcctNo != "" && tempAcctNo != null && tempAcctNo.length > 2 && tempAcctNo.substring(0, 3).toUpperCase() === "NRA") {
        Alert("暂不支持向此类账户进行转账！");
        return false;
    }

    //校验户名
    var regPatrn = "^[^:%<'>\"\{\[\\]\u0000-\u001F\u007F,&\}]*[:%<'>\"\{\[\\]\u0000-\u001F\u007F,&\}]+.*$";
    var reg = new RegExp(regPatrn);
    if (reg.test(toAccName)) {
        Alert("收款方户名中不能包含非法字符！");
        return false;
    }
    if (toAccName.replace(/[^\x00-\xff]/g, "**").length > 60) {
        Alert("账户名过长！");
        return false;
    }

    //校验省市网点
    if ($("#netDetail").css("display") != "none") {
        if (!transferNull($("#provKey").val())) {
            Alert("请输入收款银行所在省");
            return false;
        }
        if (!transferNull($("#cityKey").val())) {
            Alert("请输入收款银行所在市");
            return false;
        }
        if (!transferNull($("#netKey").val())) {
            Alert("请输入收款银行所在网点");
            return false;
        }
    }

    //校验是否同一个账户
    if ($.trim($("#toAcctNo").val()) == $.trim($("#fromAcctNo").val())) {
        Alert("转出账户与转入账户不能相同");
        return false;
    }



    //落地并且选择的转账方式为延迟转账，报错提醒
    if (interBankPath == "Y" && mainForm.drawFlag.value == "0" && $("#netKey").val() != null && $("#netKey").val() != "" && (mainForm.trnType.value == "A" || mainForm.trnType.value == "B"))
    {
        Alert("普通/次日转账方式不支持手工输入收款方网点信息，请重新维护收款方（从下拉列表中选择收款网点）再进行普通/次日转账", "温馨提示", function () { }, "trn_confirmTips");
        return false;
    }

    //本行转账
    if (toBankCode == "03") {
        //如果是存折，会过滤掉横杠并重新赋值给该字段
        var acctType = autoJudgeAcctType("toAcctNo", "暂不支持向该账户进行转账业务");  //转入账户为本行卡，根据卡号查询卡类型
        //-1表示卡类型错误
        if (acctType == "-1")  
        {
            return false;
        }
        //610表示单位结算卡和27位多级账簿不支持延迟转账
        if ((acctType == "610" || $.trim($("#toAcctNo").val()).length == 27) && (mainForm.trnType.value == "A" || mainForm.trnType.value == "B")) 
        {
            Alert("收款方账户不支持普通/次日转账方式");
            return false;
        }
        mainForm.toAcctType.value = acctType;
        mainForm.accType.value = acctType;
        //不是账户互转，不带横杠的(autoJudgeAcctType过滤掉存折横杠)，重新赋值
        if (selfTransferPath != "Y") {
            mainForm.toAcctId.value = $("#toAcctNo").val();  
        }
        //互转需要带横杠，因为会校验是否注册账户(注册账户中带横杠)
        else
        {
            if (mainForm.trnType.value == "A" || mainForm.trnType.value == "B")
            {
                Alert("收款方为本人账户不支持普通/次日转账方式");
                return false;
            }
            $("#mainForm").attr("action", "SelfAcctTransferConfirmAct.ebf");
        }
        mainForm.cagAccIn.value = $("#toAcctNo").val();
        mainForm.toCstsrlno.value = "";
        mainForm.InOneCenter.value = "0";
        mainForm.toBankCode.value = toBankCode;
        mainForm.BankIn.value = toBankCode;

        //提交前判断 账户名
        var checkNamemessage = "本人知晓资金转账用途并非购买中国农业银行自主发行的理财产品或中国农业银行代销的产品，并非经中国农业银行销售人员推荐购买，本人承担相关风险。";
        var checkToAcctName = mainForm.toAccName.value;
        if (checkToAcctName.indexOf("融资") != -1 || checkToAcctName.indexOf("基金") != -1 || checkToAcctName.indexOf("信托") != -1 || checkToAcctName.indexOf("保险") != -1 || checkToAcctName.indexOf("证券") != -1 || checkToAcctName.indexOf("财富") != -1 ||checkToAcctName.indexOf("股权") != -1 || checkToAcctName.indexOf("合伙") != -1 || checkToAcctName.indexOf("投资") != -1 || checkToAcctName.indexOf("咨询") != -1 || checkToAcctName.indexOf("理财") != -1 ||checkToAcctName.indexOf("金融") != -1 || checkToAcctName.indexOf("财务") != -1 || checkToAcctName.indexOf("黄金") != -1 || checkToAcctName.indexOf("贵金属") != -1 || checkToAcctName.indexOf("私募") != -1 || checkToAcctName.indexOf("资本") != -1 || checkToAcctName.indexOf("贷款") != -1 || checkToAcctName.indexOf("资产管理") != -1) {
            Confirm(checkNamemessage, '温馨提示', function () {
                $("#mainForm").submit();
            }, function () {
                return false;
            }, "trn_confirmTips");
        }
        else {
            $("#mainForm").submit();
        }
    }

    //跨行转账
    else {
        //对一体化转账时的用途字段作过滤，只支持数字、英文字母、中文和允许的x-字符集，输入其它的一律报错
        var sUseType = mainForm.useType.value;
        var sUseTypeArray = new Array();
        sUseTypeArray = sUseType;

        //大小额系统允许的x-字符集
        var allowCharArray = new Array(".", ",", "-", "_", "(", ")", "/", "=", "+", "?", "!", "&", "*", ";", "@", "#", " ");
        var NumberPattern = new RegExp("^[0-9]$");                                         //匹配是否为数字
        var EnglishPattern = new RegExp("^(([A-Za-z][\s\.A-Za-z]*[A-Za-z])|([A-Za-z]+))$"); //匹配是否为英文字母(大、小写均可)
        var ChinesePattern = new RegExp("^[\u0391-\uFFE5]$");                              //匹配是否为中文
        var xPattern = new RegExp("^[-.,_()/=+?!&*;@# ]$");
        //var xPattern = new RegExp("^[.,-_()/=+?!*<>;@#{}[]:%]$");
        var sFlag = false;
        for (var i = 0; i < sUseTypeArray.length; i++) {
            //将用途字符串中的字符逐一匹配数字、中文和英文字母的字符、x-字符集作比较
            if (!NumberPattern.test(sUseTypeArray[i]) && !EnglishPattern.test(sUseTypeArray[i]) && !ChinesePattern.test(sUseTypeArray[i]) && !xPattern.test(sUseTypeArray[i])) {
                sFlag = true;
                break;
            }
        }
        if (sFlag) {
            Alert("您输入的转账用途有误！");
            return false;
        }

        //付款账户为存折不支持跨行转账
        var fromAcctInfo = QryFromAcctInfo(fromAcctId, fromAccountJs);
        var fromAcctType = fromAcctInfo["acctType"];
        if (fromAcctType != "401" && fromAcctType != "403") {
            Alert("暂不支持转出方为活期账户的跨行转账业务！");
            return false;
        }

        //走大小额  节假日(放假和周末)金额小于50W走小额，大于50W走大额落地
        if (interBankPath == "Y") {
            //判断大额系统是否关闭
            if (interTransOpenFlag == "N")
            {
                Alert(errMsg);
                return false;
            }
            //增加提示信息，并提交
            QryDealFlagTrnFeeSendToHost();
        }

        //走超级网银
        else if (superBankPath == "Y") {
            mainForm.toCstsrlno.value = "";
            mainForm.InOneCenter.value = "0";
            mainForm.recbankno.value = mainForm.cInstdPty.value;
            $("#mainForm").attr("action", "SuperTransferConfirmAct.ebf");

            var checkNamemessage = "本人知晓资金转账用途并非购买中国农业银行自主发行的理财产品或中国农业银行代销的产品，并非经中国农业银行销售人员推荐购买，本人承担相关风险。";
            var checkToAcctName = mainForm.toAccName.value;
            if (checkToAcctName.indexOf("融资") != -1 || checkToAcctName.indexOf("基金") != -1 || checkToAcctName.indexOf("信托") != -1 || checkToAcctName.indexOf("保险") != -1 || checkToAcctName.indexOf("证券") != -1 || checkToAcctName.indexOf("财富") != -1 ||checkToAcctName.indexOf("股权") != -1 || checkToAcctName.indexOf("合伙") != -1 || checkToAcctName.indexOf("投资") != -1 || checkToAcctName.indexOf("咨询") != -1 || checkToAcctName.indexOf("理财") != -1 ||checkToAcctName.indexOf("金融") != -1 || checkToAcctName.indexOf("财务") != -1 || checkToAcctName.indexOf("黄金") != -1 || checkToAcctName.indexOf("贵金属") != -1 || checkToAcctName.indexOf("私募") != -1 || checkToAcctName.indexOf("资本") != -1 || checkToAcctName.indexOf("贷款") != -1 || checkToAcctName.indexOf("资产管理") != -1) {
                Confirm(checkNamemessage, '温馨提示', function () {

                    if (mainForm.toAcctId.value.length < 10)
                    {
                        Confirm("请确认收款账户位数是否准确", '温馨提示', function () {
                            $("#mainForm").submit();
                        }, function () {
                            return false;
                        });
                    }
                    else {
                        $("#mainForm").submit();
                    }
                }, function () {
                    return false;
                }, "trn_confirmTips");
            }
            else {

                if (mainForm.toAcctId.value.length < 10) {
                    Confirm("请确认收款账户位数是否准确", '温馨提示', function () {
                        $("#mainForm").submit();
                    }, function () {
                        return false;
                    });
                }
                else
                {
                    $("#mainForm").submit();
                }
            }
        }
    }
}

//应上海分行的需求，加入对跨行转账一体化采取落地处理方式时加入必要的提示信息4015query交易
function QryDealFlagTrnFeeSendToHost() {
    var json = new Object();
    json.drawFlag = mainForm.drawFlag.value;
    json.trnAmt = mainForm.trnAmt.value;
    json.fromAcctId = mainForm.fromAcctId.value;
    json.fromAcctCurCode = "156";
    var netId = null;
    for (var i = 0; i < fromAccountJs.length; i++) {
        if (mainForm.fromAcctId.value == fromAccountJs[i].acctNo) {
            netId = fromAccountJs[i].netId;
            break;
        }
    }
    json.fromNetId = netId;
    json.cRegisterBI = cRegisterBI;
    json.recbankno = mainForm.networklist.value;
    json.toAcctId = mainForm.toAcctId.value;
    json.grpNoName = mainForm.grpNoName.value;
    json.sUsrBnkNm = mainForm.sUsrBnkNm.value;
    json.toBank = mainForm.toBankCode.value;
    json.toAccName = mainForm.toAccName.value;

    $.ajax({
        type: "post",
        url: 'InterTransferQryDealFlagAndTrnFeeAct.do',
        data: json,
        async: false,
        dataType: 'json',
        success: function (data) {
            var dealFlag = data.dealFlag;
            var cLandLimit = data.cLandLimit;
            var trnAmt = mainForm.trnAmt.value;
            //加入对节假日跨行转账大额系统无法受理的客户提示  20111028
            var i = 0;
            for (i = 0; i < restDayJs.length; i++) {
                if (currentDate == (restDayJs[i].paramName)) {
                    //节假日标志
                    mainForm.RestDayFlag.value = "Y";   
                    break;
                }
            }
            var isSWorkDay = false;
            for (var workIndex = 0; workIndex < workDayJs.length; workIndex++) {
                if (currentDate == (workDayJs[workIndex].paramName)) {
                    isSWorkDay = true;
                    break;
                }
            }
            //落地(补录业务(手工输入银行或网点且未经过补录)或者500W强制落地)
            if (dealFlag == "1") {
                //如果当前日期为节假日(非周末)或者为非上班的周末(调休后的周末有上班情况)
                if (i < restDayJs.length || (!isSWorkDay && isWeekend == "true")) {
                    //节假日50W以下(含)在00：30-23：30开放，提示可以列表选择，否则直接拒绝
                    if (parseFloat(trnAmt) <= 500000 && (currTime > weekendStartTime && currTime < weekendEndTime)) {
                        var content = "节假日期间，我行暂停受理跨行转账人工处理业务，请您在工作日再次提交。或者您可重新维护收款方，通过下拉框选择收款方网点信息，维护成功后再次提交。";
                        Alert(content, "温馨提示", function () { }, "trn_confirmTips");
                    }
                    //节假日5W以下(含)在00：00-24:00开放，提示可以列表选择，否则直接拒绝
                    else if (parseFloat(trnAmt) <= 50000 && !(currTime > weekendStartTime && currTime < weekendEndTime)) {
                        var content = "节假日期间，我行暂停受理跨行转账人工处理业务，请您在工作日再次提交。或者您可重新维护收款方，通过下拉框选择收款方网点信息，维护成功后再次提交。";
                        Alert(content, "温馨提示", function () { }, "trn_confirmTips");
                    }
                    else {
                        var content = "节假日期间，我行暂停受理跨行转账人工处理业务，请您在工作日再次提交。";
                        Alert(content, "温馨提示", function () { }, "trn_confirmTips");
                    }
                    return false;
                }

                //加入长假前一天禁止跨行转账补录提交的逻辑(因为补录表5天清理一次)
                for (m = 0; m < noLDDayJs.length; m++) {
                    if (currentDate == (noLDDayJs[m].paramName)) {
                        var currentTime = currTime;
                        if (currentTime >= noLDStartTime && currentTime <= noLDEndTime) {
                            var content = "不再受理需人工处理的跨行转账请求，给您造成的不便，敬请谅解。您可以修改收款方，通过下拉框选择收款方的开户网点并再次提交转账。";
                            Alert(content, "温馨提示", function () { }, "trn_confirmTips");
                            return false;
                            break;
                        }
                    }
                }

                //0为手工输入，1为下拉选择
                var drawFlag = mainForm.drawFlag.value;
                var LDmessage = "因您未从下拉框中选择收款方网点信息，信息需要人工核实,本次转账将转人工处理，处理前不会扣款，请保持账户余额充足，并避免重复提交。人工处理时间一般为1个工作日，以最终处理时间为准。您确定提交吗？";
                if (drawFlag == "1") {
                    //cLandLimit为1表示跨行转账500W以上需要强制落地
                    if (cLandLimit == "1") {
                        if (mainForm.trnType.value == "A" || mainForm.trnType.value == "B") {
                            Alert("因您本次转账金额较大，为保障您的资金安全，本次转账将转人工处理，不支持普通/次日转账方式");
                            return false;
                        }
                        LDmessage = "因您本次转账金额较大，为保障您的资金安全，本次转账将转人工处理，处理前不会扣款，请保持账户余额充足，并避免重复提交。人工处理时间一般为1个工作日，以最终处理时间为准。您确定提交吗？";
                    }
                }

                //跨行转账需要落地处理时给用户提示 
                var checkNamemessage = "本人知晓资金转账用途并非购买中国农业银行自主发行的理财产品或中国农业银行代销的产品，并非经中国农业银行销售人员推荐购买，本人承担相关风险。";
                var checkToAcctName = mainForm.toAccName.value;
                if (checkToAcctName.indexOf("融资") != -1 || checkToAcctName.indexOf("基金") != -1 || checkToAcctName.indexOf("信托") != -1 || checkToAcctName.indexOf("保险") != -1 || checkToAcctName.indexOf("证券") != -1 || checkToAcctName.indexOf("财富") != -1 ||checkToAcctName.indexOf("股权") != -1 || checkToAcctName.indexOf("合伙") != -1 || checkToAcctName.indexOf("投资") != -1 || checkToAcctName.indexOf("咨询") != -1 || checkToAcctName.indexOf("理财") != -1 ||checkToAcctName.indexOf("金融") != -1 || checkToAcctName.indexOf("财务") != -1 || checkToAcctName.indexOf("黄金") != -1 || checkToAcctName.indexOf("贵金属") != -1 || checkToAcctName.indexOf("私募") != -1 || checkToAcctName.indexOf("资本") != -1 || checkToAcctName.indexOf("贷款") != -1 || checkToAcctName.indexOf("资产管理") != -1) {
                    Confirm(checkNamemessage, '温馨提示', function () {

                        //名称中含有金融字样的提示框中点击确认，执行如下语句
                        Confirm(LDmessage, '温馨提示', function () {

                            if (mainForm.toAcctId.value.length < 10) {
                                Confirm("请确认收款账户位数是否准确", '温馨提示', function () {

                                    if (mainForm.sUsrBnkNm.value.indexOf("农行") >= 0 || mainForm.sUsrBnkNm.value.indexOf("农业银行") >= 0) {

                                        Confirm("请确认收款银行是否为中国农业银行，如为中国农业银行，请在收款银行中直接选择", '温馨提示', function () {

                                            //提交
                                            mainForm.toCstsrlno.value = "";
                                            mainForm.InOneCenter.value = "1";
                                            mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                            mainForm.recbankno.value = mainForm.networklist.value;
                                            $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                            $("#mainForm").submit();
                                        }, function () {
                                            return false;
                                        });
                                    }
                                    else {
                                        //提交
                                        mainForm.toCstsrlno.value = "";
                                        mainForm.InOneCenter.value = "1";
                                        mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                        mainForm.recbankno.value = mainForm.networklist.value;
                                        $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                        $("#mainForm").submit();
                                    }
                                });
                            }
                            else {

                                if (mainForm.sUsrBnkNm.value.indexOf("农行") >= 0 || mainForm.sUsrBnkNm.value.indexOf("农业银行") >= 0) {

                                    Confirm("请确认收款银行是否为中国农业银行，如为中国农业银行，请在收款银行中直接选择", '温馨提示', function () {

                                        //提交
                                        mainForm.toCstsrlno.value = "";
                                        mainForm.InOneCenter.value = "1";
                                        mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                        mainForm.recbankno.value = mainForm.networklist.value;
                                        $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                        $("#mainForm").submit();
                                    }, function () {
                                        return false;
                                    });
                                }
                                else {
                                    //提交
                                    mainForm.toCstsrlno.value = "";
                                    mainForm.InOneCenter.value = "1";
                                    mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                    mainForm.recbankno.value = mainForm.networklist.value;
                                    $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                    $("#mainForm").submit();
                                }
                            }
                        }, function () {
                            //取消
                        }, "trn_confirmTips");

                    }, function () {
                        return false;
                    }, "trn_confirmTips");
                }
                else {
                    Confirm(LDmessage, '温馨提示', function () {
                        if (mainForm.toAcctId.value.length < 10) {
                            Confirm("请确认收款账户位数是否准确", '温馨提示', function () {

                                if (mainForm.sUsrBnkNm.value.indexOf("农行") >= 0 || mainForm.sUsrBnkNm.value.indexOf("农业银行") >= 0) {
                                    Confirm("请确认收款银行是否为中国农业银行，如为中国农业银行，请在收款银行中直接选择", '温馨提示', function () {
                                            //提交
                                            mainForm.toCstsrlno.value = "";
                                            mainForm.InOneCenter.value = "1";
                                            mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                            mainForm.recbankno.value = mainForm.networklist.value;
                                            $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                            $("#mainForm").submit();
                                    }, function () {
                                        return false;
                                    });
                                }
                                else
                                {
                                    //提交
                                    mainForm.toCstsrlno.value = "";
                                    mainForm.InOneCenter.value = "1";
                                    mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                    mainForm.recbankno.value = mainForm.networklist.value;
                                    $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                    $("#mainForm").submit();
                                }
                                
                            }, function () {
                                return false;
                            });
                        }
                        else
                        {
                            if (mainForm.sUsrBnkNm.value.indexOf("农行") >= 0 || mainForm.sUsrBnkNm.value.indexOf("农业银行") >= 0) {

                                Confirm("请确认收款银行是否为中国农业银行，如为中国农业银行，请在收款银行中直接选择", '温馨提示', function () {

                                    //提交
                                    mainForm.toCstsrlno.value = "";
                                    mainForm.InOneCenter.value = "1";
                                    mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                    mainForm.recbankno.value = mainForm.networklist.value;
                                    $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                    $("#mainForm").submit();
                                }, function () {
                                    return false;
                                });
                            }
                            else
                            {
                                //提交
                                mainForm.toCstsrlno.value = "";
                                mainForm.InOneCenter.value = "1";
                                mainForm.toAcctBankName.value = mainForm.sUsrBnkNm.value;
                                mainForm.recbankno.value = mainForm.networklist.value;
                                $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                $("#mainForm").submit();
                            }
                            
                       }
                    }, function () {
                        //取消
                    }, "trn_confirmTips");
                }
            }

            //大额关闭
            else if (dealFlag == "2") {
                //如果当前日期为节假日
                if (i < restDayJs.length) {
                    Alert("由于人行大额系统关闭，暂时无法受理您的转账请求。");
                    return false;
                }

                //加入长假前一天禁止跨行转账补录提交的逻辑
                for (m = 0; m < noLDDayJs.length; m++) {
                    if (currentDate == $.trim(noLDDayJs[m].paramName)) {
                        var currentTime = currTime;
                        if (currentTime >= noLDStartTime && currentTime <= noLDEndTime) {
                            Alert("非大额实时交易时间，请您在下一工作日提交。");
                            return false;
                            break;
                        }
                    }
                }

                //工作日非工作时间进行大额转账，转账方式选择延迟转账，报错提醒
                if (mainForm.trnType.value == "A" || mainForm.trnType.value == "B") {
                    Alert("非工作时间不支持大于5万（节假日50万）的跨行普通/次日转账方式");
                    return false;
                }

                //跨行转账需要落地处理时给用户提示 
                var checkNamemessage = "本人知晓资金转账用途并非购买中国农业银行自主发行的理财产品或中国农业银行代销的产品，并非经中国农业银行销售人员推荐购买，本人承担相关风险。";
                var landLimitMsg = "您的转账超过了此时段实时处理的金额限制，本次转账将转人工处理。处理前不会扣款，请保持账户余额充足，并避免重复提交。人工处理时间一般为1个工作日，以最终处理时间为准。您确定提交吗？";
                var checkToAcctName = mainForm.toAccName.value;
                if (checkToAcctName.indexOf("融资") != -1 || checkToAcctName.indexOf("基金") != -1 || checkToAcctName.indexOf("信托") != -1 || checkToAcctName.indexOf("保险") != -1 || checkToAcctName.indexOf("证券") != -1 || checkToAcctName.indexOf("财富") != -1 ||checkToAcctName.indexOf("股权") != -1 || checkToAcctName.indexOf("合伙") != -1 || checkToAcctName.indexOf("投资") != -1 || checkToAcctName.indexOf("咨询") != -1 || checkToAcctName.indexOf("理财") != -1 ||checkToAcctName.indexOf("金融") != -1 || checkToAcctName.indexOf("财务") != -1 || checkToAcctName.indexOf("黄金") != -1 || checkToAcctName.indexOf("贵金属") != -1 || checkToAcctName.indexOf("私募") != -1 || checkToAcctName.indexOf("资本") != -1 || checkToAcctName.indexOf("贷款") != -1 || checkToAcctName.indexOf("资产管理") != -1) {
                    Confirm(checkNamemessage, '温馨提示', function () {

                        Confirm(landLimitMsg, '温馨提示', function () {

                            if (mainForm.toAcctId.value.length < 10) {
                                Confirm("请确认收款账户位数是否准确", '温馨提示', function () {

                                    //提交
                                    mainForm.toCstsrlno.value = "";
                                    mainForm.InOneCenter.value = "1";
                                    mainForm.recbankno.value = mainForm.networklist.value;
                                    $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                    $("#mainForm").submit();
                                }, function () {
                                    return false;
                                });
                            }
                            else
                            {
                                //提交
                                mainForm.toCstsrlno.value = "";
                                mainForm.InOneCenter.value = "1";
                                mainForm.recbankno.value = mainForm.networklist.value;
                                $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                $("#mainForm").submit();
                            }

                        }, function () {
                            //取消
                        }, "trn_confirmTips");

                    }, function () {
                        return false;
                    }, "trn_confirmTips");
                }
                else {
                    Confirm(landLimitMsg, '温馨提示', function () {

                        if (mainForm.toAcctId.value.length < 10) {
                            Confirm("请确认收款账户位数是否准确", '温馨提示', function () {

                                //提交
                                mainForm.toCstsrlno.value = "";
                                mainForm.InOneCenter.value = "1";
                                mainForm.recbankno.value = mainForm.networklist.value;
                                $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                                $("#mainForm").submit();
                            }, function () {
                                return false;
                            });
                        }
                        else
                        {
                            //提交
                            mainForm.toCstsrlno.value = "";
                            mainForm.InOneCenter.value = "1";
                            mainForm.recbankno.value = mainForm.networklist.value;
                            $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");
                            $("#mainForm").submit();
                        }
                    }, function () {
                        //取消
                    }, "trn_confirmTips");
                }
            }

            //dealFlag为3(大额)或者4(小额)，实时转账
            else {
                //节假日5-50W的延迟转账走小额，可能延迟结束后到了工作日，这时候人行不能受理大于5W的小额转账请求
                if (dealFlag == "4" && (i < restDayJs.length || (!isSWorkDay && isWeekend == "true")) && parseFloat(trnAmt) > 50000 && (mainForm.trnType.value == "A"  || mainForm.trnType.value == "B" )) {
                    Alert("非工作时间不支持大于5万的跨行普通/次日转账方式");
                    return false;
                }
                //工作时间普通延迟转账关闭(后台15:00之后的普通延迟转账交易都实时处理)
                if (parseFloat(trnAmt) > 50000 && mainForm.trnType.value == "A" && (parseFloat(currTime) > parseFloat(comTrnLimitTime)))
                {
                    var tipMsg = "工作时间" + comTrnLimitTime.substr(0, 2) + ":" + comTrnLimitTime.substr(2, 2) + "以后不支持大于5万的跨行普通转账方式";
                    Alert(tipMsg);
                    return false;
                }
                mainForm.toCstsrlno.value = "";
                mainForm.InOneCenter.value = "0";
                mainForm.recbankno.value = mainForm.networklist.value;
                $("#mainForm").attr("action", "InterTransferConfirmAct.ebf");

                var checkNamemessage = "本人知晓资金转账用途并非购买中国农业银行自主发行的理财产品或中国农业银行代销的产品，并非经中国农业银行销售人员推荐购买，本人承担相关风险。";
                var checkToAcctName = mainForm.toAccName.value;
                if (checkToAcctName.indexOf("融资") != -1 || checkToAcctName.indexOf("基金") != -1 || checkToAcctName.indexOf("信托") != -1 || checkToAcctName.indexOf("保险") != -1 || checkToAcctName.indexOf("证券") != -1 || checkToAcctName.indexOf("财富") != -1 ||checkToAcctName.indexOf("股权") != -1 || checkToAcctName.indexOf("合伙") != -1 || checkToAcctName.indexOf("投资") != -1 || checkToAcctName.indexOf("咨询") != -1 || checkToAcctName.indexOf("理财") != -1 ||checkToAcctName.indexOf("金融") != -1 || checkToAcctName.indexOf("财务") != -1 || checkToAcctName.indexOf("黄金") != -1 || checkToAcctName.indexOf("贵金属") != -1 || checkToAcctName.indexOf("私募") != -1 || checkToAcctName.indexOf("资本") != -1 || checkToAcctName.indexOf("贷款") != -1 || checkToAcctName.indexOf("资产管理") != -1) {
                    Confirm(checkNamemessage, '温馨提示', function () {

                        if (mainForm.toAcctId.value.length < 10) {
                            Confirm("请确认收款账户位数是否准确", '温馨提示', function () {
                                $("#mainForm").submit();
                            }, function () {
                                return false;
                            });
                        }
                        else {
                            $("#mainForm").submit();
                        }    
                    }, function () {
                        return false;
                    }, "trn_confirmTips");
                }
                else {
                    if (mainForm.toAcctId.value.length < 10) {
                        Confirm("请确认收款账户位数是否准确", '温馨提示', function () {
                            $("#mainForm").submit();
                        }, function () {
                            return false;
                        });
                    }
                    else
                    {
                        $("#mainForm").submit();
                    }
                }
            }
        },
        error: function () {Alert("数据查询失败");}
    });
};

//提交
$(".btn-primary").on("click", function () {
    transferConfirm();
});


