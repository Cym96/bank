//公共转账用途
function getUseTypeList()
{
    var useTypeList = ["还款", "货款（运费）", "工资", "房租", "生活费", "水电煤", "购物"];
    return useTypeList;
}

//获取英文字符长度
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        if (val.substring(i, i + 1).match(/[^\x00-\xff]/ig) != null) //全角
            len += 2;
        else
            len += 1;
    };
    return len;
}

//按英文字符截取字符串
function SetSub(str, n) {
    var strReg = /[^\x00-\xff]/g;
    var _str = str.replace(strReg, "**");
    var _len = _str.length;
    if (_len > n) {
        var _newLen = Math.floor(n / 2);
        var _strLen = str.length;
        for (var i = _newLen; i < _strLen; i++) {
            var _newStr = str.substr(0, i).replace(strReg, "**");
            if (_newStr.length >= n) {
                return str.substr(0, i) + "...";
                break;
            }
        }
    } else {
        return str;
    }
}

//按照给定的字符串和最大长度截取字符串
function subStr(str, n) {
    var subStr = str;
    var nameLength = getByteLen(str);
    if (nameLength > n) {
        subStr = SetSub(str, n);
        if (undefined == subStr)
        {
            subStr = SetSub(str, n-1);
        }
    }
    return subStr;
}



//转换成大写金额
function ChangeToBig(value) {
    if (value == null || value == "") {
        //return "错误金额";
        return "";
    }

    value = "" + value;

    var intFen, i;
    var strArr, strCheck, nstrCheck, strFen, strDW, strNum, strBig, strNow;

    var v = -1;
    try {
        v = parseFloat(value);
    }
    catch (ex) {
    }

    if (isNaN(v) || v <= 0 || v > 999999999999.99) {
        return "错误金额";
    }
    else if (v >= 1 && value.charAt(0) == '0') {
        return "错误金额";
    }
    else if (value.charAt(0) == '+') {
        return "错误金额";
    }

    if (value.indexOf("e") >= 0 || value.indexOf("E") >= 0) {
        return "错误金额";
    }

    var strArray = value.split(".");
    if ((strArray.length == 2 && strArray[0] == "") || (strArray[1] && strArray[1].length > 2)) {     //小数点后面超过两位提示
        return "错误金额";
    }

    try {
        i = 0;
        strBig = "";
        intFen = parseInt(value * 100 + 0.00099999999);          //转换为以分为单位的数值
        strFen = intFen.toString();
        strArr = strFen.split(".");
        strFen = strArr[0];
        intFen = strFen.length;      //获取长度
        strArr = strFen.split("");   //将各个数值分解到数组内                
        while (intFen != 0)             //分解并转换
        {
            i = i + 1;
            switch (i)           //选择单位
            {
                case 1: strDW = "分"; break;
                case 2: strDW = "角"; break;
                case 3: strDW = "元"; break;
                case 4: strDW = "拾"; break;
                case 5: strDW = "佰"; break;
                case 6: strDW = "仟"; break;
                case 7: strDW = "万"; break;
                case 8: strDW = "拾"; break;
                case 9: strDW = "佰"; break;
                case 10: strDW = "仟"; break;
                case 11: strDW = "亿"; break;
                case 12: strDW = "拾"; break;
                case 13: strDW = "佰"; break;
                case 14: strDW = "仟"; break;
            }

            switch (strArr[intFen - 1])  //选择数字
            {
                case "1": strNum = "壹"; break;
                case "2": strNum = "贰"; break;
                case "3": strNum = "叁"; break;
                case "4": strNum = "肆"; break;
                case "5": strNum = "伍"; break;
                case "6": strNum = "陆"; break;
                case "7": strNum = "柒"; break;
                case "8": strNum = "捌"; break;
                case "9": strNum = "玖"; break;
                case "0": strNum = "零"; break;
            }

            //处理特殊情况
            strNow = strBig.split("");
            //分为零时的情况
            if ((i == 1) && (strArr[intFen - 1] == "0")) {
                strBig = "整";
            }
                //角为零时的情况
            else if ((i == 2) && (strArr[intFen - 1] == "0")) {    //角分同时为零时的情况
                if (strBig != "整")
                    strBig = "零" + strBig;
            }
                //元为零的情况
            else if ((i == 3) && (strArr[intFen - 1] == "0")) {
                strBig = "元" + strBig;
            }
                //拾－仟中一位为零且其前一位（元以上）不为零的情况时补零
            else if ((i < 7) && (i > 3) && (strArr[intFen - 1] == "0") && (strNow[0] != "零") && (strNow[0] != "元")) {
                strBig = "零" + strBig;
            }
                //拾－仟中一位为零且其前一位（元以上）也为零的情况时跨过
            else if ((i < 7) && (i > 3) && (strArr[intFen - 1] == "0") && (strNow[0] == "零")) { }
                //拾－仟中一位为零且其前一位是元且为零的情况时跨过
            else if ((i < 7) && (i > 3) && (strArr[intFen - 1] == "0") && (strNow[0] == "元")) { }
                //当万为零时必须补上万字
            else if ((i == 7) && (strArr[intFen - 1] == "0")) {
                strBig = "万" + strBig;
            }
                //拾万－仟万中一位为零且其前一位（万以上）不为零的情况时补零
            else if ((i < 11) && (i > 7) && (strArr[intFen - 1] == "0") && (strNow[0] != "零") && (strNow[0] != "万")) {
                strBig = "零" + strBig;
            }
                //拾万－仟万中一位为零且其前一位（万以上）也为零的情况时跨过
            else if ((i < 11) && (i > 7) && (strArr[intFen - 1] == "0") && (strNow[0] == "万")) { }
                //拾万－仟万中一位为零且其前一位为万位且为零的情况时跨过
            else if ((i < 11) && (i > 7) && (strArr[intFen - 1] == "0") && (strNow[0] == "零")) { }
                //万位为零且存在仟位和十万以上时，在万仟间补零
            else if ((i < 11) && (i > 8) && (strArr[intFen - 1] != "0") && (strNow[0] == "万") && (strNow[2] == "仟")) {
                strBig = strNum + strDW + "万零" + strBig.substring(1, strBig.length);
            }
                //单独处理亿位
            else if (i == 11) {
                //亿位为零且万全为零存在仟位时，去掉万补为零
                if ((strArr[intFen - 1] == "0") && (strNow[0] == "万") && (strNow[2] == "仟")) {
                    strBig = "亿" + "零" + strBig.substring(1, strBig.length);
                }
                    //亿位为零且万全为零不存在仟位时，去掉万
                else if ((strArr[intFen - 1] == "0") && (strNow[0] == "万") && (strNow[2] != "仟")) {
                    strBig = "亿" + strBig.substring(1, strBig.length);
                }
                    //亿位不为零且万全为零存在仟位时，去掉万补为零
                else if ((strNow[0] == "万") && (strNow[2] == "仟")) {
                    strBig = strNum + strDW + "零" + strBig.substring(1, strBig.length);
                }
                    //亿位不为零且万全为零不存在仟位时，去掉万        
                else if ((strNow[0] == "万") && (strNow[2] != "仟")) {
                    strBig = strNum + strDW + strBig.substring(1, strBig.length);
                }
                    //其他正常情况
                else {
                    strBig = strNum + strDW + strBig;
                }
            }
                //拾亿－仟亿中一位为零且其前一位（亿以上）不为零的情况时补零
            else if ((i < 15) && (i > 11) && (strArr[intFen - 1] == "0") && (strNow[0] != "零") && (strNow[0] != "亿")) {
                strBig = "零" + strBig;
            }
                //拾亿－仟亿中一位为零且其前一位（亿以上）也为零的情况时跨过
            else if ((i < 15) && (i > 11) && (strArr[intFen - 1] == "0") && (strNow[0] == "亿")) { }
                //拾亿－仟亿中一位为零且其前一位为亿位且为零的情况时跨过
            else if ((i < 15) && (i > 11) && (strArr[intFen - 1] == "0") && (strNow[0] == "零")) { }
                //亿位为零且不存在仟万位和十亿以上时去掉上次写入的零
            else if ((i < 15) && (i > 11) && (strArr[intFen - 1] != "0") && (strNow[0] == "零") && (strNow[1] == "亿") && (strNow[3] != "仟")) {
                strBig = strNum + strDW + strBig.substring(1, strBig.length);
            }
                //亿位为零且存在仟万位和十亿以上时，在亿仟万间补零
            else if ((i < 15) && (i > 11) && (strArr[intFen - 1] != "0") && (strNow[0] == "零") && (strNow[1] == "亿") && (strNow[3] == "仟")) {
                strBig = strNum + strDW + "亿零" + strBig.substring(2, strBig.length);
            }
            else {
                strBig = strNum + strDW + strBig;
            }

            strFen = strFen.substring(0, intFen - 1);
            intFen = strFen.length;
            strArr = strFen.split("");
        }
        if (strBig.indexOf("undefined") != -1) {
            return "错误金额";
        }
        return strBig;
    }
    catch (err) {
        return "";      //若失败则返回原值
    }
}





/*	网银二期公用script校验函数
**	建立日期：2001－12－20
*/


var numIndex = 0;

function checkClick() {

    if (numIndex != 0) {
        return true;
    }

    numIndex = 1;

    return false;
}

//**************公共客户系统关闭，取消按钮实现************
function pageClose_Common(path) {

    window.location.href = path + "DefaultPerson.aspx";
}

//**************个人客户系统关闭，取消按钮实现************
function pageClose_Person(path) {

    window.location.href = path + "DefaultPerson.aspx";
}

//**************企业关闭，取消按钮实现************
function pageClose_Enterprise(path) {

    window.location.href = path + "DefaultPerson.aspx";
}

//**************CIF系统关闭，取消按钮实现************
function pageClose_Cif(path) {

    window.location.href = path + "DefaultPerson.aspx";
}


//去掉空格
function javaTrim(string) {
    var length1, i, j;
    var string1 = "";

    length1 = string.length;
    for (i = 0 ; i < length1 ; i++) {  //除去左边空格
        if (string.charAt(i) != " ") {//除去左边空格后
            for (j = i ; j < length1 ; j++)
                string1 = string1 + string.charAt(j);
            break;
        }
    }
    length1 = string1.length;
    string = string1;
    string1 = "";
    for (i = length1 - 1 ; i >= 0 ; i--) {  //除去右边空格
        if (string.charAt(i) != " ") {//除去右边空格后
            for (j = 0 ; j <= i ; j++)
                string1 = string1 + string.charAt(j);
            break;
        }
    }
    string = string1;
    return (string)
}

// 检查Email是否合法
// 返回true为正确
function isEmail(string) {
    var string1 = "";
    var len = 0;
    len = string1.length;

    string1 = javaTrim(string);
    if (string1.length != 0) {
        if (string1.indexOf("@", 1) == -1 || string1.indexOf(".", 1) == -1 || string1.length < 7) {
            alert("电子邮箱的格式不对，请重新填写！");
            return false;
        }

        if (string1.charAt(len - 1) == "." || string1.charAt(len - 1) == "@") {
            alert("电子邮箱的格式不对，请重新填写！");
            return false;
        }
    }
    else {
        alert("电子邮箱不能为空，请填写！");
        return false;
    }
    return true;
}

//验证邮政编码
function isPostCode(str) {
    if (str.length != 6) {
        alert("邮编输入长度错误");
        return false;
    }
    if (!isNumber(str)) {
        alert("邮编只能为数字");
        return false;
    }
    return true;
}

// 检查是否闰年
function isLeapYear(year) {
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) return true;
    return false;
}

// 判断日期是否合法	格式 yyyymmdd
function isDate(strDate) {

    if (strDate.length != 8) {
        alert("日期长度错误");
        return false;
    }

    if (!isNumber(strDate)) {
        alert("日期输入错误");
        return false;
    }

    var year = parseInt(strDate.substring(0, 4), 10);
    var mm = parseInt(strDate.substring(4, 6), 10);
    var dd = parseInt(strDate.substring(6, 8), 10);

    var monthDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeapYear(strDate)) monthDates[1] = 29;

    if (mm > 12 || mm < 1) {
        alert("月份应在1－12之间");
        return false;
    }

    if (dd > monthDates[mm - 1] || dd < 1) {
        alert("日期输入错误");
        return false;
    }

    return true;
}

//选中某个数据域
function makeFocus(txtObject) {
    txtObject.focus();
    txtObject.select();
}

//判断数值,必须为纯数字
function isNumber(string) {
    var length1, i, j;
    var string1 = javaTrim(string);
    length1 = string1.length;

    if (length1 == 0) {
        return (false);
    }

    for (i = 0 ; i < length1 ; i++) {  //判断每位数字
        if (isNaN(parseInt(string.charAt(i), 10))) {
            return (false);
        }
    }

    return (true);
}

//判断数值,是否为浮点数
function isMoney(string) {
    var length1, i, j, k, flag = 0;
    var string1 = "";

    string1 = javaTrim(string);
    k = length1 = string1.length;

    if ((string1 == "0.00") || (string1 == "0.0") || (string1 == "0.") || (string1 == "0")) {
        alert("错误！金额不能为0，请重新填写。");
        return (false);
    }
    if (length1 == 0) {
        alert("不能输入空字符");
        return (false);
    }
    if (string1.charAt(0) == "0") {
        if (length1 == 1) {
            alert("金额不能为0，请重新填写！");
            return (false);
        }
        else {
            if (!(string1.charAt(1) == ".")) {
                alert("金额首位不能为0，请重新填写！");
                return (false);
            }
        }
    }
    j = 0;
    for (i = 0 ; i < length1 ; i++) {  //判断每位数字
        if (isNaN(parseInt(string1.charAt(i), 10))) {
            if (string1.charAt(i) != ".") {
                alert("请输入数值型数据！");
                return (false);
            }
            else {
                j++;
                if (length1 - i > 3) {
                    alert("小数点后只能有两位！");
                    return (false);
                }
            }
            if (flag == 0) {
                k = i; flag = 1;
            }

        }
    }

    if (k > 12) {
        alert("金额长度超过限额");
        return false;
    }

    if (j > 1) {
        alert("小数点只能有一个!");
        return false;
    }

    return true;
}

function isPassword(passwd) {
    if (passwd.length < 4) {
        alert("密码长度至少为四位");
        return false;
    }

    if (passwd.length > 6) {
        alert("密码长度不能大于六位");
        return false;
    }

    if (!isNumber(passwd)) {
        alert("密码只能为数字");
        return false;
    }

    return true;
}
function disable_Button(name) {
    name.disabled = 1
}

function reload(name1) {
    name1.reset();
}
//hyh020109从groutpublic中拷贝过来
function selectAll() {
    setAllChecked(document, true);
}

function resetAll() {
    setAllChecked(document, false);
}

function setAllChecked(element, chk) {
    var chks = element.getElementsByTagName("input");

    for (var i = 0; i < chks.length; i++) {
        if (chks(i).type == "checkbox") {
            chks(i).checked = chk;
        }
    }
}
//hyh020109

function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
}

function MM_findObj(n, d) { //v4.0
    var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && document.getElementById) x = document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2) ; i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}

function trimSpecialChars(str) {
    var reg = /[\u0000-\u001F\u007F]*/g;
    str = ($.trim (str)).replace(reg, "");
    return str;
}

//转账限额控制
function checkLimitByCert(json, callBack) {
    var length = arguments.length;
    var index = arguments[length-1];
    $.ajax({
        type: "post",
        url: 'TransferModelCheckLimitByCertAct.do',
        data: json,
        async: false,
        dataType: 'json',
        success: function (data) {
            //alert(JSON.stringify(data));
            if (data.respCode == "0000") {
                if (length > 2)
                    callBack(index);
                else
                    callBack();
                }
            else {
                Alert(data.errMsg);
            }
        },
        error: function () {
            if (length > 2)
                callBack(index);
            else
                callBack();
        }
    });
}