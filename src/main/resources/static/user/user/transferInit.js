
//跳转到转账带入的卡号
$(function () {

    //返回按钮
    if (sourceAction != null && sourceAction != "") {
        $("#skipShow").css("display", "");
        $("#trnButton").css("display", "none");

        var href = "javascript: window.location.href = '" + sourceAction + "';";
        $("#goBack").attr("onclick", href);
    }

    if (skipAcctNo != null && skipAcctNo != "") {
        var selectedIndex = null;
        for (var i = 0; i < fromAccountJs.length; i++)
        {
            if (skipAcctNo == fromAccountJs[i].acctNo)//设置select默认选择传递过来的卡号
                selectedIndex = i;
        }
        $("#fromAcctNo").get(0).selectedIndex = selectedIndex;
        $('#fromAcctNo').selectric();
    }

    if (skipAmt != null && skipAmt != "") {
        $("#transAmt").val(skipAmt);
        $("#bigTransAmt").text(ChangeToBig(skipAmt));
    }

    //查询余额
    fromAcctChange();
});

$.validator.addMethod("isNormalMobile", function (value, element) {
    if (value.length == 0) return true;
    return /^[1][0-9]{10}$/.test(value) && value > 0;
}, "请正确填写您的手机号码");

//有效性检测
var validator = null;
$(function () {
    validator = $("#mainForm").validate({
        rules: {
            transAmt:{
                required:true
            },
            toAcctNameKey: {
                required: true
            },
            toAcctNo: {
                required: true,
                isNormalCardNo: true
            },
            bankKey: {
                required: true
            },
            toAcctMobile: {
                isNormalMobile:true
            }
        },
        messages: {
            transAmt:{
                required:"转账金额不能为空"
            },
            toAcctNameKey: {
                required: "收款户名不能为空"
            },
            toAcctNo: {
                required: "收款账户不能为空",
                isNormalCardNo:"请输入正确的收款账户"
            },
            bankKey: {
                required:"收款银行不能为空"
            }
        }
    });

    //校验手机号
    //$("#toAcctMobile").blur(function () {
    //    if ($("#toAcctMobile").val().length > 0) {
    //        var mobile = /^[0-9]{11}$/;
    //        if (!mobile.test($("#toAcctMobile").val()))
    //        {
    //            $("#toAcctMobile").showErrorMsg("请正确填写您的手机号码");
    //            return false;
    //        }
    //        var reg0 = /^(12[0-9]|13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    //        if (!reg0.test($("#toAcctMobile").val()))
    //        {
    //            $("#toAcctMobile").showErrorMsg("请输入有效的手机号码");
    //            return false;
    //        }
    //    }
    //    else if ($("#toAcctMobile").val().length == 0) {
    //        $("#toAcctMobile").showErrorMsg("");
    //    }
    //});
});
$("#toAcctMobile")[0].oninput = function () {
    this.value = this.value.replace(/\D/g, "");
};
$("#toAcctMobile")[0].onkeyup = function () {
    this.value = this.value.replace(/\D/g, "");
};


//隐藏检验报错信息
function error_hide() {    
    $("#toAcctNo-error").hide();
    $("#toAcctNo").addClass("error").removeClass("error");

    $("#toAcctNameKey-error").hide();
    $("#toAcctNameKey").addClass("error").removeClass("error");

    $("#bankKey-error").hide();
    $("#bankKey").addClass("error").removeClass("error");
}   

//转出账户
var fromAcctOptions = "";
for (var i = 0; i < fromAccountJs.length; i++) {
    if (fromAccountJs[i].defaultAcctFlag == "1")
    {
        fromAcctOptions += "<option selected value=" + fromAccountJs[i].acctNo + ">" + fromAccountJs[i].alias + "|" + fromAccountJs[i].acctNo + "|" + fromAccountJs[i].branchName + "</option>";
    }
    else
    {
    fromAcctOptions += "<option value=" + fromAccountJs[i].acctNo + ">" + fromAccountJs[i].alias + "|" + fromAccountJs[i].acctNo + "|" + fromAccountJs[i].branchName + "</option>";
    }
}
$("#fromAcctNo").append(fromAcctOptions);
$("#fromAcctNo").unbind("change").change(fromAcctChange);
$("#fromAcctNo").selectric("refresh");

//查找单个组别数据
function findOptionsByGroupId(groupId) {
    var result2 = new Array();
    for (var i = 0; i < toAccountJs.length; i++) {
        if (toAccountJs[i].groupNo == groupId) {
            result2[result2.length] = toAccountJs[i];
        }
    }
    return result2;
}

//查询掌银分组数据
function QryMobileAcctList() {
    return $.ajax({
        url: "TransferModelGetMobAccListAct.do",
        method: "post",
        datatype: "json",
        success: function (data) {
            //alert(data);
            try {
                mobileAcctListJs = $.parseJSON(data);
            }
            catch (e) {
            }
        },
        error: function () {
            //Alert("获取掌银分组信息错误！")
        }
    });
}

//查询出掌银分组数据后执行，收款方数据填充
QryMobileAcctList().then(function () {

    var maxLength = 10;       //分组名称最长显示10字符
    var mobileFlag = "N";
    var selfAcctFlag = "N";
    var maxAcctNmeLength = "8";           //某一个收款方记录账户名最长显示8字符
    var maxAcctNoLength = "19";            //某一个收款方记录账号最长显示19字符
    for (var j = 0; j < groupListJs.length; j++) {

        //我的注册账户分组
        if (selfAcctFlag == "N") {
            $(".m-groupgo").append("<li><a id='selfAcct' class='trn_mygroup'>" + "本人注册账户" + "</a></li>");
        }

        //掌银分组
        if (mobileFlag == "N") {
            $(".m-groupgo").append("<li><a id='mobile' class='trn_mygroup'>" + "掌银收款方" + "</a></li>");
        }

        //正常分组组别
        var groupId = "group_" + j;
        $(".m-groupgo").append("<li><a id='" + groupId + "' class='trn_mygroup'>" + subStr(groupListJs[j].RCG_GRPNME, maxLength) + "</a></li>");
        $("#" + groupId + "").attr("title", groupListJs[j].RCG_GRPNME);
        var options = findOptionsByGroupId(groupListJs[j].RCG_GRPNO);
        $("#" + groupId + "").attr("value", groupListJs[j].RCG_GRPNO);



        //我的注册账户分组数据填充
        if (selfAcctFlag == "N") {
            var ul = "<ul id='" + "selfList" + "' class='m-information'>";
            for (var i = 0; i < fromAccountJs.length; i++) {
                ul += "<li value=" +
                        fromAccountJs[i].acctName + "|" + fromAccountJs[i].acctNo + "|" +
                        fromAccountJs[i].bankCode +"|"+
                        "+ title='" + fromAccountJs[i].acctName + "|" + fromAccountJs[i].acctNo + "|" + fromAccountJs[i].bankName + "'>" +
                        subStr(fromAccountJs[i].acctName, maxAcctNmeLength) + "|" + subStr(fromAccountJs[i].acctNo, maxAcctNoLength) + "|" +
                        fromAccountJs[i].bankName + "</li>";
            }
            selfAcctFlag = "Y";
            ul += "</ul>";
            $(".m-tabcollect").append(ul);
        }

        //掌银分组数据填充
        if (mobileFlag == "N") {
            var ul = "<ul id='" + "mobileList" + "' class='m-information'>";
            if (mobileAcctListJs != null && mobileAcctListJs != "" && mobileAcctListJs.length > 0)
            {
                //跟掌银保持一致，倒序排列
                for (var i = mobileAcctListJs.length - 1; i >= 0; i--) {
                    ul += "<li val=" +
                            transToNull(mobileAcctListJs[i].acctName) + "|" + transToNull(mobileAcctListJs[i].acctNo) + "|" +
                            transToNull(mobileAcctListJs[i].bankCode) + "|" + transToNull(mobileAcctListJs[i].serialNo) + "|" +
                            transToNull(mobileAcctListJs[i].provCode) + "|" + transToNull(mobileAcctListJs[i].provCodeName) + "|" + transToNull(mobileAcctListJs[i].excNo) + "|" +
                            transToNull(mobileAcctListJs[i].networklist) + "|" + transToNull(mobileAcctListJs[i].networklistName) + "|" + transToNull(mobileAcctListJs[i].superBankCode) + "|" +
                            transToNull(mobileAcctListJs[i].cityName) + "|" + transToNull(mobileAcctListJs[i].isrealtime) + "|" +
                            transToNull(mobileAcctListJs[i].branchNum) + "|" +
                           "+ title='" + transToNull(mobileAcctListJs[i].acctName) + "|" + transToNull(mobileAcctListJs[i].acctNo) + "|" + transToBankName(mobileAcctListJs[i].bankCode) + "'>" +
                            subStr(mobileAcctListJs[i].acctName, maxAcctNmeLength) + "|" + subStr(mobileAcctListJs[i].acctNo, maxAcctNoLength) + "|" +
                            transToBankName(mobileAcctListJs[i].bankCode) + "</li>";
                }
            }
            mobileFlag = "Y";
            ul += "</ul>";
            $(".m-tabcollect").append(ul);
        }

        //正常收款方分组数据填充
        var listId = "list_" + j;
        var ul = "<ul id='" + listId + "' class='m-information'>";
        for (var i = 0; i < options.length; i++) {
            var bankName = transToBankName(options[i].centCod);
            if (bankName == "" || bankName == null) {
                bankName = transToBankName(options[i].bankCode);
            }
            ul += "<li val='" +
                    transToNull(options[i].acctName) + "|" + transToNull(options[i].acctNo) + "|" +
                    transToNull(options[i].bankCode) + "|" + transToNull(options[i].serialNo) + "|" +
                    transToNull(options[i].provCode) + "|" + transToNull(options[i].provCode_Name)  + "|" + transToNull(options[i].excNo) + "|" +
                    transToNull(options[i].groupNo) + "|" + transToNull(options[i].networklist) + "|" + transToNull(options[i].networklist_Name) + "|" +
                    transToNull(options[i].centCod) + "|" + transToNull(options[i].cityName) + "|" +
                    transToNull(options[i].isrealtime) + "|" + transToNull(options[i].branchNum) + "|" +                                                                                    //branchNum举例：中国工商银行/中国工商银行北京海运仓支行热热
                    "'  title='" + transToNull(options[i].acctName) + "|" + transToNull(options[i].acctNo) + "|" + transToNull(bankName) + "'>" +
                    subStr(options[i].acctName, maxAcctNmeLength) + "|" + subStr(options[i].acctNo, maxAcctNoLength) + "|" + transToNull(bankName) + "</li>";
        }
        ul += "</ul>";
        $(".m-tabcollect").append(ul);
    }

    //分组如果大于2+6个，则纵向使用滚动条，横向不使用滚动条
    if (groupListJs.length > 6) {
        $(".m-groupgo").css({ "overflow-y": "auto", "overflow-x": "hidden" });
    }

    //点击收款方图像(隐藏/显示)
    $('#m-pp').on("click", function (event) {
        if ($('#groupbox').css("display") == "none") {
            $('#groupbox').css("display", "inline-block");
            //默认显示临时分组内容
            $('.m-groupgo > li').eq(2).show().addClass('m-changetab').siblings().removeClass('m-changetab');
            $('.m-tabcollect > ul').eq(2).show().addClass('m-tabcollectli').siblings().removeClass('m-tabcollectli').hide();
        }
        else {
            $('#groupbox').css("display", "none");
        }
    });
    $(".m-groupingbox").click(function (event) {
        event.stopPropagation();
    });

    //点击收款方分组
    $('.m-groupgo li').click(function () {
        var index = $(this).index();
        $('.m-groupgo > li').eq(index).show().addClass('m-changetab').siblings().removeClass('m-changetab');
        $('.m-tabcollect > ul').eq(index).show().addClass('m-tabcollectli').siblings().removeClass('m-tabcollectli').hide();
    });

    //点击某一个收款方
    $(".m-tabcollect li").click(function () {
        //大小额实时|6565688885888|02|1004|13|河北省|99902|1001|102144114713|中国工商银行泊头交河支行|02|泊头市|Y||+
        //大小额落地|6266668888899|99|1007|13|河北省|99999|1001||未知网点|99|沧州市|N|中国工商银行测试/沧州市A支行|+
        //大小额落地|6322277777777|02|1008|13|河北省|99902|1001||未知网点|02|沧州市|N|中国工商银行/银行下拉选择落地网点|+   
        var grouptype = $(this).parent().attr("id");
        //我的注册账户走账户互转交易
        if (grouptype == "selfList") {
            selfTransferPath = "Y";
            var toAcctName = transferSpace($(this).attr("value").split("|")[0]);
            var toAcctNo = transferSpace($(this).attr("value").split("|")[1]);
            var toBankCode = transferSpace($(this).attr("value").split("|")[2]);

            $("#toAcctNo").val(toAcctNo);
            $("#toAcctNameKey").val(toAcctName);
            $("#bankKey").val(transToBankName(toBankCode));

            error_hide();
            $("#bankKey").addClass("error").removeClass("error");
            $(".m-groupingbox").css("display", "none");
            JudgeTrnType();
        }
        //掌银分组
        else if (grouptype == "mobileList") {
            var toAcctName = transferSpace($(this).attr("val").split("|")[0]);
            var toAcctNo = transferSpace($(this).attr("val").split("|")[1]);
            var toBankCode = transferSpace($(this).attr("val").split("|")[2]);
            var toCstsrlno = "";//$(this).attr("value").split("|")[3];
            var toProv = transferSpace($(this).attr("val").split("|")[4]);
            var toProvName = transferSpace($(this).attr("val").split("|")[5]);
            var toBranchNo = transferSpace($(this).attr("val").split("|")[6]);
            var toGrpNo = "1001";
            var networklist = transferSpace($(this).attr("val").split("|")[7]);                 //12位大额行号
            var networklistName = transferSpace($(this).attr("val").split("|")[8]);     //中文网点号
            var superBankCode = transferSpace($(this).attr("val").split("|")[9]);    //超级网银行号
            var cityName = transferSpace($(this).attr("val").split("|")[10]);         //城市中文名称
            var isrealtime = transferSpace($(this).attr("val").split("|")[11]);        //是否手工输入
            var bankNameIn = transferSpace($(this).attr("val").split("|")[12]);  //手工输入的银行和网点  中国工商银行测试中国工商银行北京海运仓支行热热

            //填充收款方户名和账号
            $("#toAcctNameKey").val(toAcctName);
            $("#toAcctNo").val(toAcctNo);

            //置实时或落地标识
            mainForm.isrealtime.value = isrealtime;
            if (toBankCode == "03" || isrealtime == "Y") {     //本行存量客户isrealtime字段保存的为null
                isrealtime = "Y";
                mainForm.isrealtime.value = isrealtime;
                mainForm.drawFlag.value = "1";
            }
            else       //N,null,""都有可能是落地
            {
                mainForm.drawFlag.value = "0";
            }

            //填充银行
            var newBankCode = null;
            //如果不是超级网银，则显示大类，否则显示小类(收款方维护他行记录时该字段为空)
            if (superBankCode == null || superBankCode == "" || superBankCode == "-1" || superBankCode == undefined || superBankCode.length > 3)  //大于3的情况为存量客户
            {
                newBankCode = toBankCode;
            }
            //转账新增的收款方 superBankCode三位长度
            else {
                newBankCode = superBankCode;
            }
            //掌银银行不能手工输入，只能下拉选择
            $("#bankKey").val(transToBankName(newBankCode));
            error_hide();

            //是否显示省市网点
            JudgeTrnTypeAndClearProv();
            //大小额
            if (interBankPath == "Y") {
                //反填省
                $("#provKey").val(toProvName);

                //反填市
                $("#cityKey").val(cityName);

                //反填网点(落地处理)
                if (isrealtime != "Y") {
                    $("#netKey").val(bankNameIn);

                    //直接用收款方中RAI_ACCBNK列进行赋值，如果是存量收款方，还是赋值成不带/的
                    mainForm.BankNameIn.value = bankNameIn;
                    mainForm.sUsrBnkNm.value = bankNameIn;
                }
                //反填网点(实时处理)
                else {
                    $("#netKey").val(networklistName);
                }
            }
            //超级网银或者本行，例如银行下拉选择，网点手工输入，超级网银转账，实时
            else {
                mainForm.isrealtime.value = "Y";
                mainForm.drawFlag.value = "1";
            }

            $(".m-groupingbox").css("display", "none");
            mainForm.grpNoName.value = toGrpNo;
            mainForm.toCstsrlno.value = toCstsrlno;
            mainForm.networklist.value = networklist;
        }
        //正常分组
        else {
            var toAcctName = transferSpace($(this).attr("val").split("|")[0]);
            var toAcctNo = transferSpace($(this).attr("val").split("|")[1]).replace(/\s+/g, '');  //过滤掉卡号中间空格
            var toBankCode = transferSpace($(this).attr("val").split("|")[2]);
            var toCstsrlno = transferSpace($(this).attr("val").split("|")[3]);
            var toProv = transferSpace($(this).attr("val").split("|")[4]);
            var toProvName = transferSpace($(this).attr("val").split("|")[5]);
            var toBranchNo = transferSpace($(this).attr("val").split("|")[6]);
            var toGrpNo = transferSpace($(this).attr("val").split("|")[7]);
            var networklist = transferSpace($(this).attr("val").split("|")[8]);            //12位大额行号
            var networklistName = transferSpace($(this).attr("val").split("|")[9]);    //中文网点号
            var centCod = transferSpace($(this).attr("val").split("|")[10]);          //当做超级网银行号(3位)
            var cityName = transferSpace($(this).attr("val").split("|")[11]);       //城市中文名称
            var isrealtime = transferSpace($(this).attr("val").split("|")[12]);      //是否手工输入
            var bankNameIn = transferSpace($(this).attr("val").split("|")[13]);  //手工输入的银行和网点  中国工商银行测试/中国工商银行北京海运仓支行热热

            //填充收款方户名和账号
            $("#toAcctNameKey").val(toAcctName);
            $("#toAcctNo").val(toAcctNo);
            
            //置实时或落地标识
            mainForm.isrealtime.value = isrealtime;
            if (toBankCode == "03" || isrealtime == "Y") {  //本行存量客户isrealtime字段保存的为null
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
            if (centCod == null || centCod == "" || centCod =="-1" || centCod.length > 3)  //大于3的情况为存量客户，保存的为城市清算码，-1为存量手工输入
            {
                newBankCode = toBankCode;
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
            error_hide();
        
            //是否显示省市网点
            JudgeTrnTypeAndClearProv();
            //大小额
            if (interBankPath == "Y")
            {
                //反填省
                $("#provKey").val(toProvName);

                //反填市
                $("#cityKey").val(cityName);

                //反填网点(落地处理)
                if (isrealtime != "Y")
                {
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
                else
                {
                    $("#netKey").val(networklistName);
                }
            }
            //超级网银或者本行，例如银行下拉选择，网点手工输入，超级网银转账(落地需要改为实时)
            else
            {
                mainForm.isrealtime.value = "Y";
                mainForm.drawFlag.value = "1";
            }

            $(".m-groupingbox").css("display", "none");
            mainForm.grpNoName.value = toGrpNo;
            mainForm.toCstsrlno.value = toCstsrlno;
            mainForm.networklist.value = networklist;
        }
    });
});

//省代码
function getProvinceList() {
    $.ajax({
        type: "post",
        url: 'TransferModelGetProvinceListAct.do',  //获取省代码
        data: '',
        async: true,
        dataType: 'json',
        success: function (data) {
            provJs = data;
            $("#toAcctProvince").empty();
            var toProvOpts = "<option value=''>" + "请选择---" + "</option>";
            if (data.length > 0) {
                //$("#toAcctProvince").append("<option value=''>" + "请选择---" + "</option>");
                for (var i = 0; i < data.length; i++) {
                    toProvOpts += "<option value=" + data[i].ProvNo + ">" + data[i].ProvName + "</option>";
                    //$("#toAcctProvince").append("<option value=" + data[i].ProvNo + ">" + data[i].ProvName + "</option>");
                }
                $("#toAcctProvince").append(toProvOpts);
                $("#toAcctProvince").unbind("change").change(provinceChange);
                $('#toAcctProvince').selectric("refresh");
            }
            else {
                $("#toAcctProvince").append(toProvOpts);
            }
        }
    });
}
getProvinceList();

//监听省发生变化
function provinceChange() {
    var provName = null;
    try {
        if($(this).val() != null && $(this).val() != "")
        {
            provName = $("#toAcctProvince option:selected").text();
        }
        else  //请选择
        {
            clearProvCityNet();
            return false;
        }
    }
    //搜索结果，会catch
    catch (e) {
        provName = $("#provKey").val();  //下拉选择省
    }
    clearProvCityNet();
    $("#provKey").val(provName);

    var json = new Object();
    json.ProvNo = transToProvCode(provName);
    $.ajax({
        type: "post",
        url: 'TransferModelGetCityListAct.do',  //获取市代码
        data: json,
        async: false,
        dataType: 'json',
        success: function (data) {
            cityJs = data;
            $("#toAcctCity").empty();
            if (data.length > 0) {
                $("#toAcctCity").append("<option value=''>" + "请选择---" + "</option>");
                for (var i = 0; i < data.length; i++) {
                    $("#toAcctCity").append("<option value=" + data[i].cityCode + ">" + data[i].cityName + "</option>");
                }
                $("#toAcctCity").unbind("change").change(cityChange);
                $('#toAcctCity').selectric("refresh");
            }
            else {
                $("#toAcctCity").append("<option value=''>" + "请选择---" + "</option>");
            }
        }
    });
};

//监听市发生变化
function cityChange() {
    JudgeTrnType();
    var bank = transToBankCode($("#bankKey").val());

    var cityName = null;
    try {
        if ($(this).val() != null && $(this).val() != "") {
            cityName = $("#toAcctCity option:selected").text();
        }
        else
        {
            $("#cityKey").val("");
            clearNet();
            return false;
        }  
    }
    //搜索结果，会catch
    catch (e) {
        cityName = $("#cityKey").val();
    }
    $("#cityKey").val(cityName);
    clearNet();

    //如果行号不存在或者为其他金融机构，则不查询网点，也不显示网点
    if(bank==null || bank=="" || bank=="99")
    {
        return;
    }

    //如果长度大于2，则选择的银行大类内银行(例如杭州银行)
    if (bank.length > 2) {
        bank = keyBankCode;
    }

    var json = new Object();
    json.Bank = bank;
    json.cityCode = transToCityCode(cityName);
    json.keyBankName = keyBankName;                     //如果keyBankName不为空，则需要过滤网点(根据小类银行中文名称，从所有大类中选择出小类银行)
    $.ajax({
        type: "post",
        url: 'TransferModelGetNetListAct.do',             //获取网点数据
        data: json,
        async: false,
        dataType: 'json',
        success: function (data) {
            netJs = data;
            $("#toAcctNet").empty();
            if (data.length > 0) {
                $("#toAcctNet").append("<option value=''>" + "请选择---" + "</option>");
                for (var i = 0; i < data.length; i++) {
                    $("#toAcctNet").append("<option value=" + data[i].networkcode + ">" + data[i].networkname + "</option>");
                }
                $('#toAcctNet').selectric("refresh");
                $("#toAcctNet").unbind("change").change(netChange);
            }
            else {
                $("#toAcctNet").append("<option value=''>" + "请选择---" + "</option>");
            }
        }
    });
};

//监听网点发生变化
function netChange() {
    var netName = null;
    var netId = null;
    try {
        if ($(this).val() != null && $(this).val() != "") {
            netName = $("#toAcctNet option:selected").text();
            netId = $("#toAcctNet option:selected").val();
        }
        else {           //点击请选择
            $("#netKey").val("");
            return false;
        }
    }
    //搜索结果，会catch
    catch (e) {
        netName = $("#netKey").val();
        netId = transToNetCode(netName);
    }
    $("#netKey").val(netName);
    $("#netKey").attr("netId", netId);

    //反复进行网点搜索
    mainForm.drawFlag.value = "1";               
    mainForm.isrealtime.value = "Y";
    mainForm.networklist.value = netId;

    //重新选择网点，判断转账方式按钮是否置灰
    JudgeTrnType();
}

//监听转账金额发生变化
$("#transAmt").on("blur", function () {
    var trnAmt = $(this).val();
    if (trnAmt != "" && trnAmt != null) {
        var showAmt = parseFloat(trnAmt).toFixed(2);
        if (showAmt != "NaN")
        {
            $(this).val(parseFloat(trnAmt).toFixed(2));
        }
        else
        {
            $(this).val(trnAmt);
        }
        $("#bigTransAmt").text(ChangeToBig(trnAmt));
    }
    else {
        $("#bigTransAmt").text("");
    }

    //金额发生变化，判断是否需要显示省市网点
    JudgeTrnType();
    //if ($("#netDetail").css("display") == "none")
    //{
    //    //清空省市网点
    //    $("#provKey").val("");
    //    $("#cityKey").val("");
    //    $("#netKey").val("");
    //}
});

//查询余额
function QryAcctBalance(fromAcctNo) {
    $("#fromAcctBalance").css("display", "");
    $("#amtunit").css("display", "");
    $("#amtnote").css("display", "");
    $.getBalance({
        'acct': fromAcctNo,
        'type': 'one',
        'element': '',
        'callback': function (data) {
            if (data) {
                $("#fromAcctBalance").html($.fmtMoney(data[0]["currUseBalance"]));
                $("#fromAcctBalance").val(data[0]["currUseBalance"]);
            }
        }
    });
}

//监听转出账户发生变化
function fromAcctChange() {
    var fromAcctNo = $("#fromAcctNo").val();

    if (!fromAcctNo) {
        $("#fromAcctBalance").css("display", "none");
        $("#amtunit").css("display", "none");
        $("#amtnote").css("display", "none");
        return false;
    }
    else {
        QryAcctBalance(fromAcctNo);
    }
}

//监听转入账号编辑
$("#toAcctNo").keyup(function () {
    getRightAcct("toAcctNo");
    QryUnionPayBankCode($("#toAcctNo").val(), "bankKey");
});

//账户名搜索
$("#toAcctNameKey").keyup(function () {
    $("#latestTitle").hide();
    searchAcctNameRst("toAcctNameKey", "toAcctNameRst", toAccountJs, "");
    $(".trn_result").css("top", "100%");
});

//过滤重复转账记录
function filterLatestRst(data) {
    var arrData = data;
    var hash = {};
    for (var i = 0; i < arrData.length; i++) {
        (hash[arrData[i]] == undefined) && (hash[arrData[i]["toAcctNo"] + "," + arrData[i]["toAcctName"] + "," + arrData[i]["toBankCode"] + "," + arrData[i]["toProv"] + "," + arrData[i]["toProvName"] + "," + arrData[i]["toRcvBnkNo"] + "," + arrData[i]["toRcvBnkName"] + "," + arrData[i]["toGrpNo"] + "," + arrData[i]["toSrlNo"] + "," + arrData[i]["isrealtime"] + "," + arrData[i]["toCityName"] + "," + arrData[i]["toBankNameIn"]] =
        arrData[i]["toAcctNo"] + "," + arrData[i]["toAcctName"] + "," + arrData[i]["toBankCode"] + "," + arrData[i]["toProv"] + "," + arrData[i]["toProvName"] + "," + arrData[i]["toRcvBnkNo"] + "," + arrData[i]["toRcvBnkName"] + "," + arrData[i]["toGrpNo"] + "," + arrData[i]["toSrlNo"] + "," + arrData[i]["isrealtime"] + "," + arrData[i]["toCityName"] + "," + arrData[i]["toBankNameIn"]);
    }
    return hash;
}

function filterLatestRst50(data) {
    var arrData = data;
    var filterArrData = {};
    var j = 0;
    for (var i = 0; i < arrData.length; i++) {
        if (arrData[i]["toAcctNo"] == arrData[i+1]["toAcctNo"])
        {
            //本行可以直接合并
            if (arrData[i]["toBankCode"] == "03")
            {
                continue;
            }
            //跨行需要整合
            else
            {
                if (arrData[i]["isrealtime"] == "Y")
                {
                    //长度相等，正常银行，例如工行
                    if (arrData[i]["toBankCode"].length == arrData[i+1]["toBankCode"].length)
                    {
                        //可以直接合并
                        if (arrData[i]["toRcvBnkNo"] == arrData[i+1]["toRcvBnkNo"])
                        {
                            continue;
                        }
                        //需要整合，肯定是一个超级网银，一个大额
                        else
                        {
                            //只显示大额的记录
                            if (arrData[i]["toRcvBnkNo"] != null && arrData[i]["toRcvBnkNo"] != "")
                            {
                                filterArrData[j++] = arrData[i];
                            }
                            else
                            {
                                filterArrData[j++] = arrData[i+1];
                            }
                        }
                    }
                    //长度不相等，肯定是一个超级网银，一个大额，并且属于大类银行，例如杭州银行
                    else
                    {
                        //算作两条记录，不合并
                        filterArrData[j++] = arrData[i];
                        filterArrData[j++] = arrData[i+1];
                    }
                }
                //落地不需要合并
                else
                {
                    continue;
                }
            }
        }
        else
        {
            filterArrData[j++] = arrData[i];
        }
    }
    return filterArrData;
}

//账户名搜索_最近转账记录
$("#toAcctNameKey").on("focus", function () {
    var keyVal = $("#toAcctNameKey").val();
    if (keyVal == null || keyVal == "") {
        $.ajax({
            type: "post",
            url: 'InnerTransferGetLatestTrnFlwListAct.do',  //查转账流水表，获取最近五笔流水
            data: '',
            async: true,
            dataType: 'json',
            success: function (data) {
                //alert("最近转账记录  "+JSON.stringify(data));
                if (data.length > 0) {
                    var hash = filterLatestRst(data);
                    searchAcctNameLatestRst("toAcctNameKey", "toAcctNameRst", hash, "");
                    $(".trn_result").css("top", "101%");
                }
                else {
                    //alert("暂无最近转账记录");
                }
            }
        });
    }
});

//银行回调函数(兼容点击结果框或热门银行框后触发blur)
function bankKeyup()
{
    clearNetFormVal();
    clearProvCityNet();
    
    var autoInputFlag = checkInputData("bankKey", openBankJs);
    //手工输入
    if (autoInputFlag == "N") {
        mainForm.drawFlag.value = "0";                            //手工输入
        mainForm.isrealtime.value = "N";                          //非实时
        JudgeTrnType();                                                           //没有在银行搜索结果里面选择某一个银行，则需要再次判断
    }
    else {
        mainForm.drawFlag.value = "1";                           //下拉选择
        mainForm.isrealtime.value = "Y";                          //实时
        JudgeTrnTypeAndClearProv();
    }
    JudgeTrnTypeAndClearProv();
}

//银行搜索
$("#bankKey").keyup(function () {
    searchRst("bankKey", "bankRst", openBankJs, bankKeyup);
    $(".m-hotbankbox").hide();
});
//手工输入完银行后，点击空白处(输入完，点击空白处，点击热门银行框(热门银行点击动作后执行)，点击结果下拉框(点击结果下拉框后执行)都会触发该动作)
$("#bankKey").on("blur", function () {
    clearNetFormVal();
    clearProvCityNet();
    var autoInputFlag = checkInputData("bankKey", openBankJs);
    //手工输入
    if (autoInputFlag == "N") {
        mainForm.drawFlag.value = "0";                            //手工输入
        mainForm.isrealtime.value = "N";                          //非实时
        JudgeTrnType();                                                           //没有在银行搜索结果里面选择某一个银行，则需要再次判断
    }
    else {
        mainForm.drawFlag.value = "1";                           //下拉选择
        mainForm.isrealtime.value = "Y";                          //实时
        JudgeTrnTypeAndClearProv();
    }
});

//点击弹出框中某一个银行分组事件
$('.m-hotbank li').click(function () {
    var index = $(this).index();
    $('.m-hotbank li').eq(index).show().addClass('m-hotbankgo').siblings().removeClass('m-hotbankgo');
    $('.m-bankarray li').eq(index).show().addClass('m-hotbanktab').siblings().removeClass('m-hotbanktab').hide();
});

//点击弹出框的某一个银行事件
$('.m-hotbankbox a').on("focus", function () {
    $('#bankKey').val($(this).text());
    $('.m-hotbankbox').css('display', 'none');

    //重新选择银行，落地标识改为实时
    if($(this).text() == "其他金融机构")
    {
        mainForm.drawFlag.value = "0";
        mainForm.isrealtime.value = "N";
    }
    else
    {
        mainForm.drawFlag.value = "1";
        mainForm.isrealtime.value = "Y";
    }
    JudgeTrnTypeAndClearProv();

    //清空省市网点数据
    clearNetFormVal();
    clearProvCityNet();
});

//省搜索
$("#provKey").keyup(function () {
    searchRst("provKey", "provRst", provJs, provinceChange);
    clearNetFormVal();
    clearCityNet();
});
$("#provKey").on("blur", function () {
    clearNetFormVal();
    clearCityNet();
    var autoInputFlag = checkInputData("provKey", provJs);
    if (autoInputFlag == "N") {
        $("#provKey").val("");
    }
    else {
        provinceChange();
    }
});

//市搜索
$("#cityKey").keyup(function () {
    searchRst("cityKey", "cityRst", cityJs, cityChange);
    clearNet();
    clearNetFormVal();
});
$("#cityKey").on("blur", function () {
    clearNet();
    clearNetFormVal();
    //最近转账记录或者收款方中选择的直接用中文城市名赋值了，为了支持对该字段的编辑，需要重新获取cityJs
    if (cityJs == null || cityJs == "") {
        //provinceChange中会清空city，所以获取cityJs后需要重新赋值
        var cityKey = $("#cityKey").val();
        provinceChange();
        $("#cityKey").val(cityKey);
    }
    var autoInputFlag = checkInputData("cityKey", cityJs);
    if (autoInputFlag == "N")
        $("#cityKey").val("");
    else {
        cityChange();
    }
});

//网点搜索
$("#netKey").keyup(function () {
    searchRst("netKey", "netRst", netJs, netChange);
    clearNetFormVal();
});
//手工输入完网点内容，鼠标点击空白处
$("#netKey").on("blur", function () {
    clearNetFormVal();
    //最近转账记录或者收款方中选择的直接用中文网点名赋值了，为了支持对该字段的编辑，需要重新获取cityJs
    if (netJs == null || netJs == "") {
        //查询网点需要将城市中文名称转账成城市代码
        if (cityJs == null || cityJs == "") {
            //provinceChange中会清空city，所以获取cityJs后需要重新赋值
            var cityKey = $("#cityKey").val();
            provinceChange();
            $("#cityKey").val(cityKey);
        }

        //cityChange中会清空net，所以获取netJs后需要重新赋值
        var netKey = $("#netKey").val();
        cityChange();
        $("#netKey").val(netKey);
    }
    var autoInputFlag = checkInputData("netKey", netJs);
    //手工输入
    if (autoInputFlag == "N") {
        mainForm.drawFlag.value = "0";                            //手工输入
        mainForm.isrealtime.value = "N";                          //非实时
        JudgeTrnType();
    }
    else {
        mainForm.drawFlag.value = "1";                            //下拉选择
        mainForm.isrealtime.value = "Y";                          //实时
        netChange();
    }
});

//更多
$("#morecli").on("click", function () {
    showOrHideMoreInfo();
});
$(".trn_moreicon").on("click", function () {
    showOrHideMoreInfo();
});
function showOrHideMoreInfo()
{
    if ($("#moreInfoTable").css("display") != "none") {
        $("#moreHeadLine").slideToggle("slow");
        $("#moreInfoTable").slideToggle("slow");
        $("#moreInfo span").text("更多");
        $("#moreInfo > div").attr("class", "trn_moreicon");
    }
    else {
        $("#moreHeadLine").slideToggle("slow");
        $("#moreInfoTable").slideToggle("slow");

        $("#moreInfo span").text("收起");
        $("#moreInfo > div").attr("class", "trn_moreiconless");
    }
}





 


