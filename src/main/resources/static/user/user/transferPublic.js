
//转账方式
function transTypeToEng(zhMsg) {
    var enMsg = null;
    if (zhMsg == "实时转账") {
        enMsg = "0";
    }
    else if (zhMsg == "普通转账") {
        enMsg = "A";
    }
    else if (zhMsg == "次日转账") {
        enMsg = "B";
    }

    return enMsg;
}

function transToNull(str) {

    if (str == " ") {
        str = null;
    }

    return str;
}
function transferNull(str) {
    if (str == "" || str == null || str == undefined) {
        return false;
    }
    else
        return true;
}
function transferSpace(str) {
    str = $.trim(str);
    if (str == null || str == "null" || str == "未知网点") {
        str = "";
    }
    return str;
}
function transferData(str) {
    if (str)
        str = "1";
    else
        str = "0";
    return str;
}
function transferForUseType(str) {
    if (str == true)
        str = "Y";
    else
        str = "N";
    return str;
}

//行号转换为行名称
function transToBankName(bankCode) {
    var bankName = null;

    for (var i = 0; i < openBankJs.length; i++) {
        if (openBankJs[i].paramName == bankCode) {
            bankName = openBankJs[i].paramValue;
            break;
        }
    }
    return bankName;
}

//行名称转换为行号
function transToBankCode(bankName) {
    var bankCode = null;
    for (var i = 0; i < openBankJs.length; i++) {
        if (openBankJs[i].paramValue == bankName) {
            bankCode = openBankJs[i].paramName;
            break;
        }
    }
    return bankCode;
}

function transToBankNameLand(bankCode, bankNameIn, centCod) {
    var bankName = null;
    //落地情况
    if (bankCode == "99") {
        //存量客户维护的(流水表和收款方表都保存的仍是不带/格式的)，旧版银行必须下拉选择,  中国工商银行北京海运仓支行热热
        if (bankNameIn.split("/").length == 1) {
            bankName = transToBankName(bankCode);
        }
        //新增维护的  中国工商银行/北京海运仓支行热热
        else if (bankNameIn.split("/").length == 2) {
            bankName = bankNameIn.split("/")[0];
        }
    }
    else {
        var newBankCode = null;
        if (centCod == null || centCod == "" || centCod == "-1" || centCod.length > 3)  //大于3的情况为存量客户，保存的为城市清算码，-1为存量手工输入，新版该字段保存为三位行号
        {
            newBankCode = bankCode;
        }
        //转账新增的收款方 centCod两位或者三位长度
        else
        {
            newBankCode = centCod;
        }
        bankName = transToBankName(newBankCode);
    }

    return bankName;
}

//省名转换为省号
function transToProvCode(ProvName) {
    var provCode = null;
    if (provJs)
    {
        for (var i = 0; i < provJs.length; i++) {
            if (provJs[i].ProvName == ProvName) {
                provCode = provJs[i].ProvNo;
                break;
            }
        }
    }
    
    return provCode;
}

//省号转换为省名
function transToProvName(ProvNo) {
    var provName = null;
    if (provJs)
    {
        for (var i = 0; i < provJs.length; i++) {
            if (provJs[i].ProvNo == ProvNo) {
                provName = provJs[i].ProvName;
                break;
            }
        }
    }
    
    return provName;
}

//市名转换为市号
function transToCityCode(cityName) {
    var cityCode = null;
    if (cityJs)
    {
        for (var i = 0; i < cityJs.length; i++) {
            if (cityJs[i].cityName == cityName) {
                cityCode = cityJs[i].cityCode;
                break;
            }
        }
    }

    return cityCode;
}

//市号转换为市名
function transToCityName(cityCode) {
    var cityName = null;
    if (cityJs)
    {
        for (var i = 0; i < cityJs.length; i++) {
            if (cityJs[i].cityCode == cityCode) {
                cityName = cityJs[i].cityName;
                break;
            }
        }
    }
   
    return cityName;
}

//网点名转换为网点号
function transToNetCode(netName) {
    var netCode = null;

    if (netJs != null && netJs != "") {
        for (var i = 0; i < netJs.length; i++) {
            if (netJs[i].networkname == netName) {
                netCode = netJs[i].networkcode;
                break;
            }
        }
    }

    return netCode;
}

//网点号转换为网点名
function transToNetName(netCode) {
    var netName = null;
    if (netJs)
    {
        for (var i = 0; i < netJs.length; i++) {
            if (netJs[i].networkcode == netCode) {
                netName = netJs[i].networkname;
                break;
            }
        }
    }
    
    return netName;
}

//检测是否自动输入
function checkInputData(inputId, allDataJs) {
    var autoInputFlag = "N";
    var searchKeyVal = $("#" + inputId + "").val();
    if (searchKeyVal == "")
    {
        return "Y";
    }
    if (allDataJs != null && allDataJs != "") {
        for (var i = 0; i < allDataJs.length; i++) {
            for (var key in allDataJs[i]) {
                if (allDataJs[i][key] == searchKeyVal) {
                    autoInputFlag = "Y";
                    break;
                }
            }
        }
    }

    return autoInputFlag;
}

//判断是否显示省市网点并清空
function JudgeTrnTypeAndClearProv() {
    JudgeTrnType();

    //清空省市网点
    $("#provKey").val("");
    $("#netKey").val("");
    $("#cityKey").val("");
}

//搜索结果并展示
function searchRst(searchKeyId, resultId, allDataJs, callBack) {
    var searchKey = $("#" + searchKeyId + "").val();
    if ("" == searchKey || null == searchKey || allDataJs == "" || allDataJs == null) {
        $("#" + resultId + "").hide();
    }
    else {
        //检索符合搜索条件的数据
        var selOptionVal = "";
        var searchKeyVal = $("#" + searchKeyId + "").val();
        for (var i = 0; i < allDataJs.length; i++) {
            for (var key in allDataJs[i]) {
                if (allDataJs[i][key].indexOf(searchKeyVal) >= 0) {
                    selOptionVal += allDataJs[i][key] + "|";
                }
            }
        }

        //如果搜索结果为空，则不显示结果框
        if (selOptionVal) {
            //展示搜索内容
            var html = "<table>";
            for (var i = 0; i < selOptionVal.split("|").length - 1; i++) {
                html += "<tr><td>" + selOptionVal.split("|")[i] + "</td></tr>";
            }
            html += "</table>";

            $("#" + resultId + "").empty();
            $("#" + resultId + "").show();
            $("#" + resultId + "").html(html);
            $("#" + resultId + " tr td").click(function () {
                $("#" + searchKeyId + "").val($(this).html());
                $("#" + resultId + "").hide();
                if (callBack != "")
                    callBack();
            });
        }
        else
        {
            $("#" + resultId + "").hide();
        }
    }
}

//搜索结果并展示_账户名
function searchAcctNameRst(searchKeyId, resultId, allDataJs, callBack) {
    var searchKey = $("#" + searchKeyId + "").val();
    if ("" == searchKey || null == searchKey) {
        $("#" + resultId + "").hide()
    }
    else {

        //检索符合搜索条件的数据
        var selOptionVal = "";
        var selOptionText = "";
        var searchKeyVal = $("#" + searchKeyId + "").val();
        for (var i = 0; i < allDataJs.length; i++) {
            if (allDataJs[i].acctName.indexOf(searchKeyVal) >= 0) {
                selOptionVal += allDataJs[i].acctName + "^" + allDataJs[i].acctNo + "^" +
                                allDataJs[i].bankCode + "^" + (allDataJs[i].provCode) + "^" + (allDataJs[i].provCode_Name) + "^" +
                                allDataJs[i].networklist + "^" + allDataJs[i].networklist_Name + "^" + allDataJs[i].groupNo + "^" +
                                allDataJs[i].serialNo + "^" + allDataJs[i].centCod + "^" + allDataJs[i].isrealtime + "^" +
                                allDataJs[i].cityName + "^" + allDataJs[i].branchNum + "^" +
                                "|";
                selOptionText += subStr(allDataJs[i].acctName, 8) + "/" + subStr(allDataJs[i].acctNo,19) + "/" +
                                allDataJs[i].bankCode_Name + "|";
            }
        }

        //展示搜索内容
        var html = "<div id='searchName'>";
        for (var i = 0; i < selOptionVal.split("|").length - 1; i++) {

            //如果账户名或者账号过长，则省略
            if (getByteLen(selOptionText.split("|")[i].split("/")[0]) > 8 || getByteLen(selOptionText.split("|")[i].split("/")[1]) > 19) {
                var selOptionTitle = selOptionVal.split("|")[i].split("^")[0] + "/" + selOptionVal.split("|")[i].split("^")[1] + "/" + transToBankNameLand(selOptionVal.split("|")[i].split("^")[2], selOptionVal.split("|")[i].split("^")[12], selOptionVal.split("|")[i].split("^")[9]);
                html += "<div title='" + selOptionTitle + "' value='" + selOptionVal.split("|")[i] + "'>";
            }
            else {
                html += "<div value='" + selOptionVal.split("|")[i] + "'>";
            }
            html += selOptionText.split("|")[i] + "</div>";
        }
        html += "</div>";

        $("#" + resultId + "").empty();
        $("#" + resultId + "").show();
        $("#" + resultId + "").html(html);
        $("#" + resultId + " div div").click(function () {
            $("#" + searchKeyId + "").val(transferSpace($(this).attr("value").split("^")[0]));
            $("#toAcctNo").val(transferSpace($(this).attr("value").split("^")[1]).replace(/\s+/g, ''));
            var bankCode = transferSpace($(this).attr("value").split("^")[2]);
            var provCode = transferSpace($(this).attr("value").split("^")[3]);
            var provCodeName = transferSpace($(this).attr("value").split("^")[4]);
            var networklist = transferSpace($(this).attr("value").split("^")[5]);
            var networklistName = transferSpace($(this).attr("value").split("^")[6]);
            var toAcctGrpNo = transferSpace($(this).attr("value").split("^")[7]);
            var toCstsrlno = transferSpace($(this).attr("value").split("^")[8]);
            var centCod = transferSpace($(this).attr("value").split("^")[9]);
            var isrealtime = transferSpace($(this).attr("value").split("^")[10]);
            var cityName = transferSpace($(this).attr("value").split("^")[11]);
            var bankNameIn = transferSpace($(this).attr("value").split("^")[12]);

            //置实时或落地标识
            mainForm.isrealtime.value = isrealtime;
            if (bankCode == "03" || isrealtime == "Y") {  //本行存量客户isrealtime字段保存的为null
                isrealtime = "Y";
                mainForm.isrealtime.value = isrealtime;
                mainForm.drawFlag.value = "1";
            }
            else       //N,null,""都有可能是落地
            {
                isrealtime = "N";
                mainForm.isrealtime.value = isrealtime;
                mainForm.drawFlag.value = "0";
            }

            //填充银行
            var newBankCode = null;
            //如果不是超级网银，则显示大类，否则显示小类(收款方维护他行记录时该字段为空)
            if (centCod == null || centCod == "" || centCod == "-1" || centCod.length > 3)  //大于3的情况为存量客户，保存的为城市清算码，-1为存量手工输入
            {
                newBankCode = bankCode;
            }
            //转账新增的收款方 centCod两位或者三位长度
            else {
                newBankCode = centCod;
            }
            //落地处理
            if (isrealtime != "Y") {
                //存量客户维护的  中国工商银行北京海运仓支行热热
                if (bankNameIn.split("/").length == 1) {
                    $("#bankKey").val(transToBankName(newBankCode));
                }
                //新增维护的  中国工商银行/北京海运仓支行热热
                else if (bankNameIn.split("/").length == 2) {
                    $("#bankKey").val(bankNameIn.split("/")[0]);
                }
            }
            //正常显示
            else {
                $("#bankKey").val(transToBankName(newBankCode));
            }
            $("#toAcctNo-error").hide();
            $("#toAcctNo").addClass("error").removeClass("error");

            $("#toAcctNameKey-error").hide();
            $("#toAcctNameKey").addClass("error").removeClass("error");

            $("#bankKey-error").hide();
            $("#bankKey").addClass("error").removeClass("error");

            //是否显示省市网点
            JudgeTrnTypeAndClearProv();
            //大小额
            if (interBankPath == "Y") {
                //反填省
                $("#provKey").val(provCodeName);

                //反填市
                $("#cityKey").val(cityName);

                //反填网点(落地处理)
                if (isrealtime != "Y") {
                    //存量数据
                    if (bankNameIn.split("/").length == 1) {
                        $("#netKey").val(bankNameIn.split("/")[0]);
                    }
                        //新版数据
                    else if (bankNameIn.split("/").length == 2) {
                        $("#netKey").val(bankNameIn.split("/")[1]);
                    }

                    //直接用收款方中RAI_ACCBNK列进行赋值，如果是存量收款方，还是赋值成不带/的
                    mainForm.BankNameIn.value = bankNameIn;
                    mainForm.sUsrBnkNm.value = bankNameIn;
                }
                //反填网点(实时处理)
                else {
                    $("#netKey").val(networklistName);
                }
            }
            //超级网银或者本行，例如银行下拉选择，网点手工输入，超级网银转账(落地需要改为实时)
            else {
                mainForm.isrealtime.value = "Y";
                mainForm.drawFlag.value = "1";
            }

            //填充组号、序列号、大额行号
            mainForm.grpNoName.value = toAcctGrpNo;
            mainForm.toCstsrlno.value = toCstsrlno;
            mainForm.networklist.value = networklist;

            //回调函数
            $("#" + resultId + "").hide();
            if (callBack != "")
                callBack();
        });
    }
}

//搜索结果并展示_最近转账记录
function searchAcctNameLatestRst(searchKeyId, resultId, allDataJs, callBack) {

    //检索符合搜索条件的数据
    var selOptionVal = "";
    var selOptionText = "";
    //最近一笔显示在最上端
    for (var o in allDataJs) {
        //0-账号  1-账户名  2-银行代码  3-省代码  4-省名称  5-12位大额行号 6-网点名称  7-收款方组别  8-收款方序列号  9-实时交易标识  10-城市中文名称  11-手工输入的银行/网点名称
        selOptionVal += transToNull(o.split(",")[1]) + "^" + transToNull(o.split(",")[0]) + "^" +
                        transToNull(o.split(",")[2]) + "^" + transToNull(o.split(",")[3]) + "^" +
                        transToNull(o.split(",")[4]) + "^" + transToNull(o.split(",")[5]) + "^" +
                        transToNull(o.split(",")[6]) + "^" + transToNull(o.split(",")[7]) + "^" +
                        transToNull(o.split(",")[8]) + "^" + transToNull(o.split(",")[9]) + "^" +
                        transToNull(o.split(",")[10]) + "^" + transToNull(o.split(",")[11]) + "^" +
                        "|";
        selOptionText += subStr(o.split(",")[1], 8) + "/" + subStr(o.split(",")[0], 19) + "/" +
                        transToBankName(o.split(",")[2]) + "|";
    }

    //展示搜索内容
    var html = "<div class='trn_lastestPayeeMng'>最近使用收款方</div><div id='searchName'>";
    for (var i = 0; i < selOptionVal.split("|").length - 1; i++) {
        //如果账户名或者账号过长，则省略
        if (getByteLen(selOptionText.split("|")[i].split("/")[0]) > 8 || getByteLen(selOptionText.split("|")[i].split("/")[1]) > 19) {
            var selOptionTitle = selOptionVal.split("|")[i].split("^")[0] + "/" + selOptionVal.split("|")[i].split("^")[1] + "/" + transToBankNameLand(selOptionVal.split("|")[i].split("^")[2], selOptionVal.split("|")[i].split("^")[11], "");
            html += "<div title='" + selOptionTitle + "' value='" + selOptionVal.split("|")[i] + "'>";
        }
        else
        {
        html += "<div value='" + selOptionVal.split("|")[i] + "'>";
        }
        html += selOptionText.split("|")[i] + "</div>";
    }
    html += "</div>";

    $("#" + resultId + "").empty();
    $("#" + resultId + "").show();
    $("#" + resultId + "").html(html);
    $("#" + resultId + " div div").click(function () {

        //填充账户名、账号
        $("#" + searchKeyId + "").val(transferSpace($(this).attr("value").split("^")[0]));
        $("#toAcctNo").val(transferSpace($(this).attr("value").split("^")[1]).replace(/\s+/g, ''));
         
        var bankCode = transferSpace($(this).attr("value").split("^")[2]);
        var provCode = transferSpace($(this).attr("value").split("^")[3]);
        var provName = transferSpace($(this).attr("value").split("^")[4]);
        var networklist = transferSpace($(this).attr("value").split("^")[5]);
        var networklistName  = transferSpace($(this).attr("value").split("^")[6]);
        var toAcctGrpNo = transferSpace($(this).attr("value").split("^")[7]);
        var toCstsrlno = transferSpace($(this).attr("value").split("^")[8]);
        var isrealtime = transferSpace($(this).attr("value").split("^")[9]);
        var cityName = transferSpace($(this).attr("value").split("^")[10]);
        var bankNameIn = transferSpace($(this).attr("value").split("^")[11]);

        //置实时或落地标识
        mainForm.isrealtime.value = isrealtime;
        if (bankCode == "03" || isrealtime == "Y") {
            isrealtime = "Y";
            mainForm.isrealtime.value = isrealtime;
            mainForm.drawFlag.value = "1";
        }
        else       //N,null,""都有可能是落地
        {
            isrealtime = "N";
            mainForm.isrealtime.value = isrealtime;
            mainForm.drawFlag.value = "0";
        }

        //填充银行
        if (isrealtime != "Y")
        {
            //存量客户维护的(流水表和收款方表都保存的仍是不带/格式的)，旧版银行必须下拉选择,  中国工商银行北京海运仓支行热热
            if (bankNameIn.split("/").length == 1) {
                $("#bankKey").val(transToBankName(bankCode));
            }
            //新增维护的  中国工商银行/北京海运仓支行热热
            else if (bankNameIn.split("/").length == 2) {
                $("#bankKey").val(bankNameIn.split("/")[0]);
            }
        }
        else
        {
            $("#bankKey").val(transToBankName(bankCode));
        }

        //判断是否需要显示省市网点
        JudgeTrnTypeAndClearProv();
        //大小额
        if (interBankPath == "Y") {
            //反填省
            $("#provKey").val(provName);

            //反填市
            $("#cityKey").val(cityName);

            //反填网点(落地处理)
            if (isrealtime != "Y") {
                //存量数据
                if (bankNameIn.split("/").length == 1) {
                    $("#netKey").val(bankNameIn.split("/")[0]);
                }
                //新版数据
                else if (bankNameIn.split("/").length == 2) {
                    $("#netKey").val(bankNameIn.split("/")[1]);
                }

                //直接用收款方中RAI_ACCBNK列进行赋值，如果是存量收款方，还是赋值成不带/的
                mainForm.BankNameIn.value = bankNameIn;
                mainForm.sUsrBnkNm.value = bankNameIn;
            }
            //反填网点(实时处理)
            else {
                $("#netKey").val(networklistName);
            }
        }
        //超级网银或者本行，例如银行下拉选择，网点手工输入，超级网银转账(落地需要改为实时)
        else {
            mainForm.isrealtime.value = "Y";
            mainForm.drawFlag.value = "1";
        }

        //填充组号、序列号、大额行号
        mainForm.grpNoName.value = toAcctGrpNo;
        mainForm.toCstsrlno.value = toCstsrlno;
        mainForm.networklist.value = networklist;

        //回调函数
        $("#" + resultId + "").hide();
        if (callBack != "")
            callBack();
    });
}

//点击其他位置，隐藏收款方的下拉列表控件
$(document).click(function (e) {
    var obj = $(e.srcElement || e.target);
    if ($(obj).is("#toAcctNameKey*, #toAcctNameKey*"))  //if (obj.attr("id") == 'toAcctNameKey')
    {
        //alert("内部区域");
    }
    else {
        $(".trn_result").hide();
        $("#latestTitle").hide();
    }
});

//点击其他位置，隐藏收款方银行的下拉列表控件
$(document).click(function (e) {
    var obj = $(e.srcElement || e.target);
    if ($(obj).is("#bankKey*"))  //if (obj.attr("id") == 'toAcctNameKey')
    {
        //alert("内部区域");
    }
    else {
        $(".trn_bnkRst").hide();
    }
});

//点击其他位置，隐藏省市的下拉列表控件
$(document).click(function (e) {
    var obj = $(e.srcElement || e.target);
    if ($(obj).is("#provKey,#cityKey"))  //if (obj.attr("id") == 'toAcctNameKey')
    {
        //alert("内部区域");
    }
    else {
        $(".trn_prvRst").hide();
    }
});

//点击银行输入框
$('#bankKey').click(function (event) {
    $('.m-hotbankbox').show();
    if ($("#provRst").css("display") != "none" || $("#cityRst").css("display") != "none" || $("#netRst").css("display") != "none") {
        $("#provRst").css("display", "none");
        $("#cityRst").css("display", "none");
        $("#netRst").css("display", "none");
    }
    event.stopPropagation();
})
$('.m-hotbankbox').click(function (event) {
    event.stopPropagation();
});

//点击空白处，隐藏银行框和收款方框
$('body').click(function (e) {
    var obj = $(e.srcElement || e.target);
    if ($(obj).is("#m-pp"))  //if (obj.attr("id") == 'toAcctNameKey')
    {
        //alert("内部区域 " + obj.attr("id"));
    }
    else {
        $('.m-groupingbox').css('display', 'none');
    }
    $('.m-hotbankbox').css('display', 'none');
});

//转账用途，7条固定用途
var useTypeList = getUseTypeList();
for (var i = 0; i < useTypeList.length; i++) {
    $("#transUse").append("<option value=" + useTypeList[i] + ">" + useTypeList[i] + "</option>");
}

//填充转账用途，新增
//if (shortUseTypeJs != null && shortUseTypeJs != "" && shortUseTypeJs.length > 0) {
//  for (var i = 0; i < shortUseTypeJs.length; i++) {
//      if (shortUseTypeJs[i].useTypeName != " " && shortUseTypeJs[i].useTypeName != null) {
//          $("#transUse").append("<option value=" + shortUseTypeJs[i].useTypeName + ">" + shortUseTypeJs[i].useTypeName + "</option>");
//      }
//  }
//}
//$("#transUse").unbind("change").change(useTypeChange);
//$("#transUse").selectric("refresh");

//监听转账用途发生变化
function useTypeChange() {
    var useTypeSel = $(this).val();
    $("#inputUseType").val(useTypeSel);
}

//检查转入账户是否为农行账户
function checkInnerBankTrn(bankCode) {
    if (bankCode != "" && bankCode != null && bankCode != "03" && bankCode !="99") {
        return "N";
    }
    if (bankCode == "" || bankCode == null || bankCode == "99") {
        return null;
    }
    if (bankCode != "" && bankCode != null && bankCode == "03") {
        return "Y";
    }
}

//获取银联行号
function QryUnionPayBankCode(toAcctNo, bankId) {
    try {
        $.ajax({
            type: "post",
            url: "GetBankTypeByAcctNoAct.do",
            data: { cardNo: toAcctNo, custId: custId },
            success: function (data) {  
                if (!data.errorCode) {
                    if ("" != data.bankCode) {
                        var unionPayBnkCode = data.bankCode;
                        //alert("unionPayBnkCode " + unionPayBnkCode);
                        GetMapBankCode(unionPayBnkCode, bankId);
                    }
                    else {
                        $("#" + bankId).attr("disabled", false);
                        $("#" + bankId).val("");
                        JudgeTrnTypeAndClearProv();
                    }
                }
                else {
                    $("#" + bankId).attr("disabled", false);
                    $("#" + bankId).val("");
                    JudgeTrnTypeAndClearProv();
                }
            },
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8"
        });
    } catch (e) {
    }
}

//根据8位银联行号，查找映射表，查找到两位或三位行号
function GetMapBankCode(unionPayBnkCode, bankId) {
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
                    var bankCode = data.innerBankCode;
                    //如果行号是99，则不能匹配
                    if (bankCode == "99") {       
                        $("#" + bankId).val("");
                    }
                    else {
                        $("#" + bankId).val(transToBankName(bankCode));
                        $("#" + bankId).attr("disabled", true);
                        JudgeTrnTypeAndClearProv();
                    }
                }
                else {
                    $("#" + bankId).attr("disabled", false);
                }
            },
            error: function () {
            }
        });
    } catch (e) {
    }
}

//判断转入账号是否是自己的卡
function checkSelfAcctInfo(toAcctNo, selfAccts) {
    var isSelfAcctNo = false;
    for (var i = 0; i < selfAccts.length; i++) {
        if (toAcctNo == selfAccts[i].acctNo) {
            isSelfAcctNo = true;
            break;
        }
    }
    return isSelfAcctNo;
}

//判断转入账号是否是自己的卡
function checkSelfAcctInfo(toAcctNo, selfAccts)
{
    var isSelfAcctNo = false;
    for (var i = 0; i < selfAccts.length; i++)
    {
        if (toAcctNo == selfAccts[i].acctNo)
        {
            isSelfAcctNo = true;
            break;
        }
    }
    return isSelfAcctNo;
}

//判断转账路径
function judgeTrnPath(toAcctNo, selfAccts)
{
    var isSelfAcctNo = false;
    isSelfAcctNo = checkSelfAcctInfo(toAcctNo, selfAccts);

    if (isSelfAcctNo)
    {
        selfTransferPath = "Y";
    }
}

//判断转账路径
function judgeTrnPath(toAcctNo, selfAccts) {
    var isSelfAcctNo = false;
    isSelfAcctNo = checkSelfAcctInfo(toAcctNo, selfAccts);

    if (isSelfAcctNo) {
        selfTransferPath = "Y";
    }
    else
    {
        selfTransferPath = "N";
    }
}

//根据付款卡号，查询该条付款方数据
function QryFromAcctInfo(fromAcctNo, selfAccts) {
    var fromAcctInfo = null;
    for (var i = 0; i < selfAccts.length; i++) {
        if (fromAcctNo == selfAccts[i].acctNo) {
            fromAcctInfo = selfAccts[i];
            break;
        }
    }
    return fromAcctInfo;
}

//根据获取的超级分类列表，得到银行大类代码
function QryTrnBankType(bankCode) {
    var parentBankCode = superBnkCodeAndTypeJs[0].parentBnkCode;
    return parentBankCode;
}

//根据银行代码查询超级网银分类表(171家)
function QryTrnMapSuperBankCode(bankCode) {
    var superBankCode = null;

    //查超级网银及分类
    var json = new Object();
    json.toBankCode = bankCode;
    $.ajax({
        type: "post",
        url: 'InnerTransferSuperBnkCodeAndTypeListAct.do',
        data: json,
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                superBnkCodeAndTypeJs = data;
                superBankCode = superBnkCodeAndTypeJs[0].superBnkCode;
            }
            else {
                //alert("查询失败");
            }
        }
    });

    return superBankCode;
}

//查询他行是否从人行签退
function QryOtherBankStatus(bankCode)
{
    var otherBankStatus = "N";
    var json = new Object();
    json.toBankCode = bankCode;
    $.ajax({
        type: "post",
        url: 'SuperTransferBnkQryOtherBankStatusAct.do',
        data: json,
        async: false,
        dataType: 'json',
        success: function (data) {
            //alert(JSON.stringify(data));
            if (data.bgRespCode =="0000") {
                if (data.sSysStatus == "00")
                {
                    otherBankStatus = "Y";
                }
            }
            else {
                //alert("查询失败");
            }
        },
        error: function () {
        }
    });
    return otherBankStatus;
}

//清空mainForm中网点值
function clearNetFormVal()
{
    mainForm.networklist.value = "";
    mainForm.BankNameIn.value = "";        //手工输入银行/网点名称 记收款方用
    mainForm.sUsrBnkNm.value = "";          //用户手工录入贷方行名 发后台用
}

//清空省市网点数据
function clearProvCityNet() {
    $("#provKey").val("");
    clearCityNet();
}

//清空市网点数据
function clearCityNet() {
    $("#cityKey").val("");
    $("#netKey").val("");
    $("#toAcctCity").empty();
    $("#toAcctNet").empty();
    var myCity = $("#toAcctCity").parent().siblings(".selectric").find("p");
    var selCity = $("#toAcctCity").parent().siblings(".selectric-items").css("height", "40px").find("div ul");
    var myNet = $("#toAcctNet").parent().siblings(".selectric").find("p");
    var selNet = $("#toAcctNet").parent().siblings(".selectric-items").css("height", "40px").find("div ul");
    myCity.empty();
    selCity.empty().append("<li class='selected last' data-index='0' value=''>请选择---</li>");
    myNet.empty();
    selNet.empty().append("<li class='selected last' data-index='0' value=''>请选择---</li>");
    cityJs = null;
    netJs = null;
}

//清空网点数据
function clearNet() {
    $("#netKey").val("");
    $("#toAcctNet").empty();
    var myNet = $("#toAcctNet").parent().siblings(".selectric").find("p");
    var selNet = $("#toAcctNet").parent().siblings(".selectric-items").css("height", "40px").find("div ul");
    myNet.empty();
    selNet.empty().append("<li class='selected last' data-index='0' value=''>请选择---</li>");
    netJs = null;
}

//判断转账分支
function JudgeTrnType() {
    var bankName = $("#bankKey").val();
    var bankCode = transToBankCode(bankName);
    var trnAmt = $("#transAmt").val();
    //跨行转账
    if ("N" == checkInnerBankTrn(bankCode)) {
        var superBankCode = null;
        superBankCode = QryTrnMapSuperBankCode(bankCode);
        //判断是否在超级网银银行列表中(171家)，如果不在说明是23家银行，则必须走大小额(例如国民银行,城市商业银行)
        if (superBankCode == null || superBankCode == "") {
            //走大小额，显示省市网点
            $("#netDetail").show();
            interBankPath = "Y";
            superBankPath = "N";
            mainForm.BankIn.value = bankCode;
            mainForm.toBankCode.value = bankCode;
        }
        //在171家银行中，则继续判断
        else {
            //如果超级网银系统状态关闭，或者客户所在省没有开通超级网银，或者金额大于5W并且非农行，或者他行从人行签退，则必须走大小额
            var trnType = transTypeToEng($(".zz-backno1").text());
            if (superBnkStatus == "N" || custProvInSuperList == "N" || parseFloat(trnAmt) > 50000 || QryOtherBankStatus(superBankCode) == "N" || trnType == "A" || trnType == "B") {
                interBankPath = "Y";
                superBankPath = "N";
                //显示省市网点
                $("#netDetail").show();

                //如果行号为2位长度(25家)，不属于大类银行(例如中国工商银行)
                if (bankCode.length < 3) {
                    keyBankName = null;                                          //重新初始化
                    keyBankCode = null;                                            //重新初始化
                    mainForm.BankIn.value = bankCode;
                    mainForm.toBankCode.value = bankCode;
                }
                //如果行号长度为3位(146家)，则属于大类银行，检查分类列表(例如杭州银行)
                else {
                    //获取大类行号
                    var parentBankCode = QryTrnBankType(bankCode);
                    //如果在大类中(146家)，例如杭州银行，则根据银行名称为索引，过滤网点
                    if (parentBankCode != null && parentBankCode != "") {
                        keyBankName = bankName;                                          //小类银行名称，用于查询网点数据
                        keyBankCode = parentBankCode;                                //大类银行行号，用于查询网点数据
                        mainForm.BankIn.value = parentBankCode;             //用于保存收款方
                        mainForm.toBankCode.value = parentBankCode;    //用于转账
                    }
                }
            }
            //超级网银系统状态开放，并且客户所在省开通超级网银，并且金额小于5W，则必须走超级网银
            else {
                superBankPath = "Y";
                interBankPath = "N";
                //隐藏省市网点
                $("#netDetail").hide();
                var parentBankCode = QryTrnBankType(bankCode);
                if (parentBankCode == null || parentBankCode == "") {
                    mainForm.BankIn.value = bankCode;             //用于保存收款方
                    mainForm.toBankCode.value = bankCode;    //用于转账
                }
                else {
                    mainForm.BankIn.value = parentBankCode;                   //用于保存收款方
                    mainForm.toBankCode.value = bankCode;                      //用于转账
                }
                mainForm.toSuperBankCode.value = superBankCode;    //用于转账
                mainForm.cInstdPty.value = superBankCode;                    //用于转账
            }
        }
    }
    //本行转账
    else if ("Y" == checkInnerBankTrn(bankCode)) {
        $("#netDetail").hide();
        mainForm.BankIn.value = bankCode;
        mainForm.toBankCode.value = bankCode;
    }
    //还没有选择银行，银行选择其他金融机构，银行手工输入 
    else {
        //客户还没选银行
        if (bankName == null || bankName == "")
        {}
        //bankCode为99-其他金融机构 bankCode为null-银行手工输入
        else
        {
            $("#netDetail").show();
            interBankPath = "Y";
            superBankPath = "N";
            var bankCodeTmp = "99";
            mainForm.BankIn.value = bankCodeTmp;
            mainForm.toBankCode.value = bankCodeTmp;
        }
    }

    //走大小额并且落地，如果现在选择的为实时，则灰显延时转账
    if (interBankPath == "Y" && mainForm.drawFlag.value == "0" && transTypeToEng($(".zz-backno1").text()) == "0") {
        $("#commntrn").removeClass('zz-backno1').removeClass('zz-backno2').addClass('zz-grayshow');
        $("#nextdaytrn").removeClass('zz-backno1').removeClass('zz-backno2').addClass('zz-grayshow');
        $(".zz-grayshow").attr("title", "该交易需转人工处理，不支持普通/次日转账方式");
    }
    else {
        $('.zz-backno1').siblings().removeClass('zz-backno1').removeClass('zz-grayshow').addClass('zz-backno2').removeAttr("title");
        $("#ontimetrn").attr("title", "交易受理立即转出（需人工处理的除外）");
        $("#commntrn").attr("title", "交易受理2小时后转出");
        $("#nextdaytrn").attr("title", "交易受理24小时后转出");
    }
}

//转账方式切换
$('.zz-div').click(function () {
	/*alert($(this).attr("typeId"));*/
	$("#transfer").attr({"value":$(this).attr("typeId")})
    if ($(this).css("background-color") != "rgb(237, 237, 237)")
    {
        $(this).removeClass('zz-backno2').addClass('zz-backno1');
        $(this).siblings().removeClass('zz-backno1').addClass('zz-backno2');
    }
    JudgeTrnType();
});

//转账方式提示
$(".jia").on("mouseover", function () {
    $(".oder_i_bu").show();
});
$(".jia").on("mouseout", function () {
    $(".oder_i_bu").hide();
});

//网点提示
$(".tip_net").on("mouseover", function () {
    $(".oder_i_net").show();
});
$(".tip_net").on("mouseout", function () {
    $(".oder_i_net").hide();
});
