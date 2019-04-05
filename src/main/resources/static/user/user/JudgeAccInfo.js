//根据账号验证账户类型，账户名是否匹配，查找账户所在清算中心、网点号

//判断16位卡的账户类型
var oldAcctNo="";
function judgeAccType(accId) {
    //页面中区域码与账户类型必须放在form1的ACCTYP与AREACODE字段
    //钞汇标志OOFEFLAG，币种CURRENCYNO
    acctId = accId.value;
    var CARD1 = "53591";
    var CARD2 = "49102";
    var CARD3 = "601427";
    var CARD4 = "63";
    var CARD5 = "103";
    var CARD6 = "9559";

    var CARD7 = "403361";
    var CARD8 = "404117";
    var CARD9 = "404118";
    var CARD10 = "404119";
    var CARD11 = "404120";
    var CARD12 = "404121";

    var CARD13 = "519413";
    var CARD14 = "520083";
    var CARD15 = "558730";
    var CARD16 = "519412";
    var CARD17 = "520082";
    var CARD18 = "552599";
    var CARD19 = "6228";

    //lj added 20090703
    var CARD20 = "622836";       //add by zhangfeng 20061103
    var CARD21 = "622837";       //add by zhangfeng 20061103
    var CARD22 = "622838";       //add by zhangfeng 20061103
    var CARD23 = "463759";       //add by zhangfeng 20080319
    var CARD24 = "463758";       //add by zhangfeng 20080319
    var CARD25 = "545206";       //add by zhangfeng 20080319
    var CARD26 = "514027";       //add by zhangfeng 20080319
    var CARD27 = "628269";       //add by zhangfeng 20080319
    var CARD28 = "628268";       //add by zhangfeng 20080319
    var CARD29 = "622839";       //add by zhangfeng 20080319

    var CARD32 = "625996";       //add by lizhi 20101202
    var CARD33 = "625997";       //add by lizhi 20101202
    var CARD34 = "625998";       //add by lizhi 20101202

    var CARD30 = "622820";       //add by jiangshangxu 20090526
    var CARD31 = "622830";       //add by jiangshangxu 20090526
    //lj added 20090703  

    //新加入的4种欧元贷记卡 lizhi 20110126
    var CARD35 = "544243";
    var CARD36 = "548598";
    var CARD37 = "470607";
    var CARD38 = "470619";
    //新加入的4种澳元贷记卡 lizhi 20110126
    var CARD39 = "548478";
    var CARD40 = "484742";
    var CARD41 = "548710";
    var CARD42 = "484741";
    var CARD43 = "621282";//增加学生资助卡的卡bin  by lizhi 20110221
    var CARD44 = "621336";//新农保惠农卡的卡bin  by lizhi 20110221
    var CARD45 = "621671";//普通高中学生资助卡bin  by lizhi 20121030
    var CARD46 = "625336";//IC旅游贷记金卡 add by lizhi 20121115
    var CARD47 = "623018";//增加金穗天翼卡bin  by lizhi 20130722
    var CARD48 = "623052";//增加boeing卡bin  by chenwei 20140410
    var CREDITCARD = "403";
    var DEBITCARD = "401";
    var REALCREDITCARD = "404";
    //visa、master新增卡bin add by chenchunbing 20140731
    var CARD49 = "535051",
        CARD50 = "534492",
        CARD51 = "536113",
        CARD52 = "469145",
        CARD53 = "469146",
        CARD54 = "469147";
    //Boeing新增信用卡bin
    var CARD55 = "625170";
    var CARD56 = "625171";
    var CARD57 = "518802";
    var CARD58 = "470606";


    var acctType;
    var areaCode;
    var currencyno;
    var oofeflag;
    var size = acctId.length;
    switch (size) {
        case 16:
            {
                id = acctId.substring(0, 5);
                
                if (id == CARD1 || id == CARD2) {
                    acctType = CREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                id = acctId.substring(0, 6);
                
                if (id == CARD3) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD7) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "1";
                    break;
                }
                if (id == CARD8) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "1";
                    break;
                }
                if (id == CARD9) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "1";
                    break;
                }
                if (id == CARD10) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD11) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD12) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD13) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "1";
                    break;
                }
                if (id == CARD14) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "1";
                    break;
                }
                if (id == CARD15) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "1";
                    break;
                }
                if (id == CARD16) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD17) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD18) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }

                //added by lj 20090703
                if (id == CARD20) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD21) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD22) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD28) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                //钻石贷记卡 lizhi 20121011
                if (id == CARD23) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD25) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD27) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD29) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                //新加入的3种IC贷记卡 lizhi 20110126
                if (id == CARD32) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD33) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD34) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                //新加入的4种欧元贷记卡 lizhi 20110126
                if (id == CARD35) {
                    acctType = REALCREDITCARD;
                    currencyno = "978";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD36) {
                    acctType = REALCREDITCARD;
                    currencyno = "978";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD37) {
                    acctType = REALCREDITCARD;
                    currencyno = "978";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD38) {
                    acctType = REALCREDITCARD;
                    currencyno = "978";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                //新加入贷记卡 lizhi 20140618
                if (id == CARD26) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD24) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                //新加入的4种澳元贷记卡 lizhi 20110126
                if (id == CARD39) {
                    acctType = REALCREDITCARD;
                    currencyno = "036";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD40) {
                    acctType = REALCREDITCARD;
                    currencyno = "036";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD41) {
                    acctType = REALCREDITCARD;
                    currencyno = "036";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD42) {
                    acctType = REALCREDITCARD;
                    currencyno = "036";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD46) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }

                if (id == CARD30) {
                    acctType = CREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD31) {
                    acctType = CREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                //added by lj 20090703
                //visa、master新增卡bin add by chenchunbing 20140731
                if (id == CARD49) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD50) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD51) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD52) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD53) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD54) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD55) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD56) {
                    acctType = REALCREDITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD57) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD58) {
                    acctType = REALCREDITCARD;
                    currencyno = "840";
                    areaCode = acctId.substring(3, 6);
                    oofeflag = "0";
                    break;
                }
                break;
                //added by wlq for REALCREDITCARD at 20030622
            }
        case 18:
            {
                id = acctId.substring(0, 2);
                
                if (id == CARD4) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(2, 6);
                    oofeflag = "0";
                    break;
                }
                break;
            }
        case 19:
            {
                id = acctId.substring(0, 3);
                
                if (id == CARD5) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(3, 7);
                    oofeflag = "0";
                    break;
                }
                id = acctId.substring(0, 4);
                
                if (id == CARD6) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD19) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                id = acctId.substring(0, 6);
                
                if (id == CARD43) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD44) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD45) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD47) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                if (id == CARD48) {
                    acctType = DEBITCARD;
                    currencyno = "156";
                    areaCode = acctId.substring(6, 9);
                    oofeflag = "0";
                    break;
                }
                break;
            }
    }
    return acctType; //+ "|" + areaCode + "|" + currencyno + "|" + oofeflag
}

//根据输入账号判断卡类型  输入参数，账号的id，string错误提示，判断错误反-1
function autoJudgeAcctType(acct,errormasage) {    
        var acctNo = jQuery("#" + acct).val();    
        acctNo = jQuery.trim(acctNo);
        jQuery("#" + acct).val(acctNo);
        var toAcctType = "-1";

        if (acctNo.length == 15 || acctNo.length == 25) {
            //jQuery("#acctTipSpan").text("如果您输入的是我行存折账号或者公司账户，请在账号前输入两位省市代码！");
            //jQuery("#acctTipSpan").css("display", "block");
            Alert("如果您输入的是我行存折账号或者公司账户，请在账号前输入两位省市代码！");
           // jQuery("#accTypeIn").val(toAcctType);
            return toAcctType;
        }
        else if (acctNo.length == 16)
        {
            var accttypetemp=judgeAccType(document.getElementById(acct));
            if (accttypetemp == "404") {
                toAcctType = "404";
                return toAcctType;
               // jQuery("#accTypeIn").val(toAcctType);
            } else if (accttypetemp == "403") {
                toAcctType = "403";
                return toAcctType;
                //jQuery("#accTypeIn").val(toAcctType);
            } else if (accttypetemp == "401") {
                toAcctType = "401";
                return toAcctType;
               // jQuery("#accTypeIn").val(toAcctType);
            } 
        }
        else if (acctNo.length == 17 || acctNo.length == 18 || acctNo.length == 27 || acctNo.length == 28) {
            if ((acctNo.length == 18 || acctNo.length == 28) && acctNo.indexOf("-") > -1) {
                acctNo = acctNo.split("-").join("");
                jQuery("#" + acct).val(acctNo);
            }
            var bz = acctNo.substring(6, 8);
            var zxt = acctNo.substring(8, 10);
            if (acctNo.length == 17) {
                //03开头的17位账号都算作上海03户
                if (acctNo.substring(0, 2) == "03") {
                    toAcctType = "601";
                    return toAcctType;
                }
                if (bz == "01" && zxt == "10") {
                    toAcctType = "101";
                    return toAcctType;
                   // jQuery("#accTypeIn").val(toAcctType);
                } else if (bz == "01" && zxt == "15") {
                    toAcctType = "102";
                    return toAcctType;
                   // jQuery("#accTypeIn").val(toAcctType);
                } else if (bz == "00" && zxt == "46") {
                    toAcctType = "302";
                  //  jQuery("#accTypeIn").val(toAcctType);
                } else if (bz == "01" && zxt == "04") {                    
                    if (!isNRAcard(acctNo,errormasage))
                        toAcctType = "601";
                    return toAcctType;
                  //  jQuery("#accTypeIn").val(toAcctType);
                } else if (bz == "00" && zxt == "04") {
                    toAcctType = "602";
                    return toAcctType;
                  //  jQuery("#accTypeIn").val(toAcctType);
                }
                //else if (bz == "13" && zxt == "10") {
                //    toAcctType = "302";
                //    return toAcctType;
                //    //  jQuery("#accTypeIn").val(toAcctType);
                //}//应付测试数据专用，记得删除！！！！！！！！！
                //else if (bz == "14" && zxt == "10") {
                //    toAcctType = "302";
                //    return toAcctType;
                //    //  jQuery("#accTypeIn").val(toAcctType);
                //}//应付测试数据专用，记得删除！！！！！！！！！
            } else if (acctNo.length == 27) {
                if (!isNRAcard(acctNo,errormasage))
                    toAcctType = "601";
                return toAcctType;
              //  jQuery("#accTypeIn").val(toAcctType);
            } else if (acctNo.length == 18) {
                var accttypetemp = judgeAccType(document.getElementById(acct));
                if (accttypetemp == "401") {
                    toAcctType = "401";
                    return toAcctType;
                //    jQuery("#accTypeIn").val(toAcctType);
                }
            }
        }
        else if (acctNo.length == 19) {
            //622828为退役金卡  620059军保卡  621619武警保障卡 || acctNo.substring(0, 6) === "620059" || acctNo.substring(0, 6) === "621619"
            if (acctNo.substring(0, 6) === "622828") {
                Alert(errormasage);
                return toAcctType;
            }
            toAcctType = "401";
            if (acctNo.substring(0, 6) === "622840") {
                toAcctType = "610";                
            }
            return toAcctType;
          //  jQuery("#accTypeIn").val(toAcctType);
        }
        if (toAcctType == "-1") {
            Alert("账户"+acctNo + "非我行有效账户，请重新维护");
        }
        return toAcctType;
}

//获取卡bin
function QryUnionPayBankCode2(toAcctNo) {
    try {
        $.ajax({
            type: "post",
            url: "GetBankTypeByAcctNoAct.do",
            data: { cardNo: toAcctNo},
            success: function (data) {
                if (!data.errorCode) {
                   // alert(data.bankCode);
                    if ("" != data.bankCode) {
                        var unionPayBnkCode = data.bankCode;//alert("unionPayBnkCode:" + unionPayBnkCode);
                        GetMapBankCode2(unionPayBnkCode);
                    }
                    else {
                        $("#BankIninputText").val("");
                        $("#BankIn option:eq(0)").attr("selected", true); 
                        bankold = "-1";
                        $("#BankIn").selectric();//alert("判行"+$("#BankIn").val());
                        TrShow(0);
                    }
                }
                else {
                    $("#BankIninputText").val("");
                    $("#BankIn option:eq(0)").attr("selected", true);
                    bankold = "-1";
                    $("#BankIn").selectric();
                    TrShow(0);
                }
            },
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8"
        });
    } catch (e) {
    }
}
//根据8位银联行号，查找映射表，查找到两位或三位行号
function GetMapBankCode2(unionPayBnkCode) {
    try {
        var json = new Object();
        json.unionPayBnkCode = unionPayBnkCode;
        $.ajax({
            type: "post",
            url: "GetMapBankCodeAct.do",
            data: json,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (data) {
                if (data.innerBankCode != null) {
                    var bankCode = data.innerBankCode; //alert("bankCode" + bankCode + "      BankCode2" + data.BankCode2);                   
                    if (bankCode.length == 3) {//3位行号转成2位行号
                        bankCode = data.parentBankCode;
                    }
                    if (bankCode != null && bankCode != "99") {
                        //比中他行账户 
                        if (bankold != bankCode) {//账号属于可判定银行且不是当前显示银行
                            $("#BankIn").children("option").each(function () {//银行反显
                                var temp_value = $(this).val();
                                if (temp_value == bankCode) {
                                    $(this).attr("selected", true);
                                    $("#BankIninputText").val($(this).text());
                                    bankold = bankCode;
                                }
                            })
                            $("#BankIn").selectric();
                            if (bankCode == "03") {//本行 
                                TrHide();
                            }
                            else {
                                TrShow(0);
                            }
                        }
                    }
                    
                    else {//没有比中，其他金融机构
                        //$("#BankIninputText").val("其他金融机构");
                        //$("#BankIn option:eq(48)").attr("selected", true); alert($("#BankIn").val());

                        //$("#BankIn").children("option").each(function () {
                        //    if ($(this).val() == "99") {
                        //        $(this).attr("selected", true);
                        //        $("#BankIninputText").val($(this).text());
                        //    }
                        //})
                        //$("#BankIn").selectric();
                        //bankold = "99";
                        //isrealtime = "N";
                        $("#BankIninputText").val("");
                        $("#BankIn option:eq(0)").attr("selected", true);
                        bankold = "-1";
                        $("#BankIn").selectric();
                        TrShow(0);
                    }
                }
                else {
                    $("#BankIninputText").val("");
                    $("#BankIn option:eq(0)").attr("selected", true);
                    bankold = "-1";
                    $("#BankIn").selectric();
                    TrShow(0);
                }
            },
            error: function () {

            }
        });
    } catch (e) {
    }
}





function canInsertAcc(relAcctCnt, AcctsLimit) {//实际现有收款方数量，数据库中的收款方上限
    var maxLimit = restrictInsertRelAcct(relAcctCnt);
    maxLimit = maxLimit > AcctsLimit ? maxLimit : AcctsLimit;
    if (relAcctCnt < maxLimit)
        return true;
    else
        return false;
}
//根据客户维护的收款方条数所在区间，限制新增收款方的条数
//分区间判断客户维护的收款方条数是否超过了该区间的上限
function restrictInsertRelAcct(relAcctCnt) {
    var relAcctCnt = parseInt(relAcctCnt);
    var limitAcct = 300;
    if (relAcctCnt >= 0 && relAcctCnt <= 300) {
        limitAcct = 300;
    }
    else if (relAcctCnt >= 301 && relAcctCnt <= 500) {
        limitAcct = 500;
    }
    else if (relAcctCnt >= 501 && relAcctCnt <= 1000) {
        limitAcct = 1000;
    }
    else if (relAcctCnt >= 1001 && relAcctCnt <= 1500) {
        limitAcct = 1500;
    }
    else if (relAcctCnt >= 1501 && relAcctCnt <= 2000) {
        limitAcct = 2000;
    }
    else if (relAcctCnt >= 2001 && relAcctCnt <= 2500) {
        limitAcct = 2500;
    }
    else if (relAcctCnt >= 2501 && relAcctCnt <= 3000) {
        limitAcct = 3000;
    }
    else if (relAcctCnt >= 3001 && relAcctCnt <= 3500) {
        limitAcct = 3500;
    }
    else if (relAcctCnt >= 3501 && relAcctCnt <= 4000) {
        limitAcct = 4000;
    }
    else if (relAcctCnt >= 4001 && relAcctCnt <= 4500) {
        limitAcct = 4500;
    }
    else if (relAcctCnt >= 4501 && relAcctCnt <= 5000) {
        limitAcct=5000;
    }
    else if (relAcctCnt >= 5001 && relAcctCnt <= 5500) {
        limitAcct = 5500;
    }
    else if (relAcctCnt >= 5501 && relAcctCnt <= 6000) {
        limitAcct = 6000;
    }
    else if (relAcctCnt >= 6001 && relAcctCnt <= 6500) {
        limitAcct = 6500;
    }
    else if (relAcctCnt >= 6501 && relAcctCnt <= 7000) {
        limitAcct = 7000;
    }
    else if (relAcctCnt >= 7001 && relAcctCnt <= 7500) {
        limitAcct = 7500;
    }
    else if (relAcctCnt >= 7501 && relAcctCnt <= 8000) {
        limitAcct = 8000;
    }
    else if (relAcctCnt >= 8001 && relAcctCnt <= 8500) {
        limitAcct = 8500;
    }
    else if (relAcctCnt >= 8501 && relAcctCnt <= 9000) {
        limitAcct = 9000;
    }
    else if (relAcctCnt >= 9001 && relAcctCnt <= 9500) {
        limitAcct = 9500;
    }
    else if (relAcctCnt >= 9501 && relAcctCnt <= 10000) {
        limitAcct = 10000;
    }
    else if (relAcctCnt >= 10001 && relAcctCnt <= 11000) {
        limitAcct = 11000;
    }
    else if (relAcctCnt >= 11001 && relAcctCnt <= 12000) {
        limitAcct = 12000;
    }
    else if (relAcctCnt >= 12001 && relAcctCnt <= 13000) {
        limitAcct = 13000;
    }
    else if (relAcctCnt >= 13001 && relAcctCnt <= 14000) {
        limitAcct = 14000;
    }
    else if (relAcctCnt >= 14001 && relAcctCnt <= 15000) {
        limitAcct = 15000;
    }
    else if (relAcctCnt >= 15001 && relAcctCnt <= 16000) {
        limitAcct = 16000;
    }
    else if (relAcctCnt >= 16001 && relAcctCnt <= 17000) {
        limitAcct = 17000;
    }
    else if (relAcctCnt >= 17001 && relAcctCnt <= 18000) {
        limitAcct = 18000;
    }
    return limitAcct;

}
//判断是否为外贸账号卡，或别的什么卡，不清楚ORZ···反正这里放着不能存收款方的所有卡bin
function isNRAcard(acctNo, errormasage) {
    var seveight = acctNo.substring(6, 8);
    var nineTen = acctNo.substring(8, 10);
    var elevenTwelve = acctNo.substring(10, 12);
    if (acctNo.substring(6, 12) === "010484") {
        Alert(errormasage);
        return true;
    }
    else if (seveight === "00" && (nineTen === "96" || nineTen === "97")) {
        Alert(errormasage);
        return true;
    }
    else if (seveight === "00" && nineTen === "04" && (elevenTwelve === "83" || elevenTwelve === "85" || elevenTwelve === "87")) {
        Alert(errormasage);
        return true;
    }
    else
        return false;
}

//仅允许大小写字母、数字和‘-’输入收款方账号
function getRightAcct(acctInputId) {//输入为账号输入框id
    var AcctNo = $("#" + acctInputId).val();
    if (AcctNo.length > oldAcctNo.length) {
        if (oldAcctNo.indexOf("-") >= 0 && AcctNo.split("-").length > 2)
            $("#" + acctInputId).val(oldAcctNo);
        else {
            AcctNo = AcctNo.replace(/[^A-Za-z0-9-]/g, '')
            $("#" + acctInputId).val(AcctNo);
            oldAcctNo = AcctNo;
        }
    }
    else if (AcctNo.length < oldAcctNo.length) {
        oldAcctNo = AcctNo;
    }
}

//仅允许数字-自动转账取整单位
function getRightUniint(InputId, oldInputString) {//输入为账号输入框id    
    if (oldInputString == "0")//预防后台反的默认初始值影响第一位输入控制
        oldInputString = "";
    var InputString = $("#" + InputId).val();
    if (InputString.length > oldInputString.length) {        
            InputString = InputString.replace(/[^0-9]/g, '')
            $("#" + InputId).val(InputString);
            oldInputString = InputString;       
    }
    else if (InputString.length < oldInputString.length) {
        oldInputString = InputString;
    }
}
//仅允许数字和.输入---自动转账转账金额
function getRightAmt(InputId, oldInputString) {//输入为账号输入框id
    var InputString = $("#" + InputId).val();
    if (InputString.length > oldInputString.length) {
        if (oldInputString.indexOf(".") >= 0 && AcctNo.split(".").length > 2)
            $("#" + InputId).val(oldInputString);
        else {
            InputString = InputString.replace(/[^0-9.]/g, '')
            $("#" + InputId).val(InputString);
            oldInputString = InputString;
        }
    }
    else if (InputString.length < oldInputString.length) {
        oldInputString = InputString;
    }
}

