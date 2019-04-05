
/*
* 公共控制脚本
* */

//定投判断日期
function isValidateDate(obj, canNull) {
  var tmpDate = obj.replace(/(^\s+|\s+$)/, '');
  if (canNull && tmpDate == "") return "";
  else if (tmpDate == "") return "日期格式错误！";
  if (tmpDate.replace(/\d{8}/, '') == "") {
    var endYear = parseInt(tmpDate.substring(0, 4));
    var tmpM = tmpDate.substring(4, 6);
    tmpM = tmpM.substring(0, 1) == "0" ? tmpM.substring(1, 2) : tmpM;
    var endMonth = parseInt(tmpM) - 1;
    var endDay = parseInt(tmpDate.substring(6, 8));
    var endDate = Date.parse(endMonth + "/" + endDay + "/" + endYear);
    var tmpNow = new Date();
    var now = Date.parse(tmpNow.getMonth() + "/" + tmpNow.getDate() + "/" + tmpNow.getFullYear());
    if (Math.abs((endDate - now) / 86400000) >= 366) {
      return "";
    } else {
      return "截止日期距今须一年以上！";
    }
  }
  return "日期格式错误！";
}


/**
 * 设置表格下拉选项
 */

function setDownList(actionId, chartId, chartShowTriggerClass, optionShowTriggerClasses) {
  if (chartId != null && chartId != "") {
    var chartNode = $('#' + chartId);

    // 图表内容鼠标离开事件
    // 隐藏此图层
    chartNode.on('mouseleave', function () {
      chartNode.empty();
      chartNode.css("background-color", "transparent");
      chartNode.css("zIndex", -1);
    });

    // 图表触发项的鼠标悬浮事件
    // 获取表格数据，生成折线图
    //$("." + chartShowTriggerClass).die().live('click', function() {

    $("." + chartShowTriggerClass).on('click', function () {
      var that = this;
      chartNode.html("");
      var tempFundCode = $(that).attr("data_ctrCode");
      var tempFundName = $(that).attr("data_ctrName");
      var tempFundType = $(that).attr("data_ctrType");
      var isNetValue = "true" !== tempFundType ? true : false;
      chartNode.css("position", "absolute");
      chartNode.css("width", "320px");
      chartNode.css("height", "240px");
      chartNode.css("background-color", "white");
      chartNode.css("background-color");
      chartNode.css("font-size", "18px");
      chartNode.css("font-weight", "bold");
      $.post('GetFundHighLowInfoAct.do', { fundCode: tempFundCode }, function (resData) {
        if (resData == null) return;
        resData = $.parseJSON(resData);
        if (resData.Data == null || resData.Data.Table == undefined) {
          return;
        } else if (resData.Data.Table.length == 0) {
          return;
        }
        var fundName = tempFundName;
        var chartData = resData.Data.Table;
        showFundChart(chartId.replace("#", ""), fundName, chartData, isNetValue);
        var top = getTop(that) + that.offsetHeight;
        var left = getLeft(that);
        chartNode.css("display", "block");
        chartNode.css("left", left + "px");
        chartNode.css("top", top + "px");
        chartNode.css("zIndex", 1);
      });
    });

  }
  // 操作动作触发项
  if (actionId != null && actionId != "") {
    var actionNode = $('#' + actionId);

    // 操作动作项鼠标移出隐藏此项
    //actionNode.die().live('mouseleave', function() {
    actionNode.off().on('mouseleave', function () {
      actionNode.css("display", "none");
      actionNode.css("zIndex", -1);
    });
    // 触发操作动作下拉框的样式类，鼠标悬浮，获取ul中相应的要显示的项，进行展示
    for (var i = 0; i < optionShowTriggerClasses.length; i++) {
      $("." + optionShowTriggerClasses[i]).on('mouseleave', function (e) {
        var that = this;
        var itemHight = that.clientHeight;
        var itemWidth = that.clientWidth;
        var itemTop = getTop(that);
        var itemLeft = getLeft(that);
        var itemBottom = itemTop + itemHight - 10;
        var clientY = e.clientY;
        var clientX = e.clientX;
        if (clientY > itemBottom && clientX >= itemLeft && clientX <= itemLeft + itemWidth) {

        } else {
          if (actionId != null && actionId != "") {
            var actionNode = $('#' + actionId);
            actionNode.css("display", "none");
            actionNode.css("zIndex", -1);
          }
        }

      });
      $("." + optionShowTriggerClasses[i]).on('mouseover', function () {
        var that = this;
        var ctr = $(that).attr('ctr');
        var param = $(that).attr('param');
        if (ctr == "none" || ctr == undefined) {
          actionNode.css("display", "none");
          return;
        }
        var option = ctr.split(',');
        if (ctr == "" || option.length == 0) {
          actionNode.css("display", "none");
          return;
        }
        actionNode.find('li').each(function (j, n) {
          $(this).css("display", "none");
          var name = $(this).attr('name');
          for (var u = 0; u < option.length; u++) {
            if (option[u] == name) {
              $(this).css("display", "block");
            }
          }
        }).find("a").each(function (index, node) {
          $(node).attr('href', "javascript:void(0);");
          //$(node).die().live("click", function() {
          $(node).off().on("click", function () {

            if ($(node).attr('data-baseUrl') == "FundBonusSetAct.do") {
              subSetprofit(param);
              return false;

            }
            if ($(node).attr('data-baseUrl') == "FundCancelAIFAct.do") {
              subCancelAIF(param);
              return false;

            }

            window.location.href = $(node).attr('data-baseUrl') + "?" + param;
            //parent.toggleLeftFrameWidth(false);
            showBg("hideDiv", "loadingDiv");
            return false;
          });
        });

        var top = getTop(that) + 22;
        var left = getLeft(that) - 5;
        actionNode.css("display", "block");
        actionNode.css("left", left + "px");
        actionNode.css("top", top + "px");
        actionNode.css("zIndex", 1);
      });
    }
  }
}

/*
* 获取所在行坐标
* */
function getRowIndex(node) {
  if (node.parentNode.tagName.toLowerCase() == "tr") {
    var index = node.parentNode.rowIndex;
    return index;
  }
  else {
    return getRowIndex(node.parentNode);
  }
}

function judgeDefinitionForSign() {
  if (window.screen.availWidth > 1366) {
    $('#magContent').width(720);
    $('.subscribeAlertWra .closeAlertButton span').css('margin-left', '310px');
  } else {
    $('#magContent').width(580);
    $('.subscribeAlertWra .closeAlertButton span').css('margin-left', '254px');
  }
  if (window.screen.availHeight > 768) {
    $('#magContent,.subscribeAlertWra').height(420);
    $('.agesBox').addClass('h290').removeClass('h200').removeClass('h240');
  }
}

/*
 * 获得元素停靠的右位置
 */
function getTop(e) {
  var offset = e.offsetTop;
  if (e.offsetParent != null) {
    offset += getTop(e.offsetParent);
  }
  return offset;
}

/*
 * 获得元素停靠的左位置
 */
function getLeft(e) {
  var offset = e.offsetLeft;
  if (e.offsetParent != null) {
    offset += getLeft(e.offsetParent);
  }
  return offset;
}

function checkAcctAmt(fromAcctAmt) {
  //*金额有效性检查. 判断数值,可以有小数*
  if (fromAcctAmt.length == 0) {
    return "金额必需输入！";
  }
  if (fromAcctAmt.charAt(0) == "0") {
    if (fromAcctAmt.length == 1) {
      return "金额不能为0，请重新填写！";
    }
    else {
      if (!(fromAcctAmt.charAt(1) == ".")) {
        return "金额首位不能为0，请重新填写！";
      }
    }
  }
  var pointQty = 0;
  var amtIntPartLength = 0;
  var amtPointPartLength = 0;
  //对每位数字进行判断
  for (var i = 0 ; i < fromAcctAmt.length ; i++) {
    if (isNaN(parseInt(fromAcctAmt.charAt(i)))) {
      if (fromAcctAmt.charAt(i) != ".") {
        return "请输入数值型数据！";
      }
      else {
        if (pointQty == 0) {
          pointQty++;
        }
        else {
          return "小数点只能有一个!";
        }
      }
    }
    else {
      if (pointQty == 0) {
        amtIntPartLength++;
        if (amtIntPartLength >= 13) {
          return "金额整数部分应小于13位！";
        }
      }
      else {
        amtPointPartLength++;
        if (amtPointPartLength > 2) {
          return "金额小数部分应小于等于2位！";
        }
      }
    }
  }
  return "";
}

function checkIsNumber(limit) {
  var regMoney = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
  if (!regMoney.test(limit)) {
    //alert("金额应为数字，请重新输入！");
    return false;
  }
  return true;
}

/*
      结果风险等级
      */
function paramRiskLevel(risklevel) {

  if (risklevel == "05") {
    return "高";
  }
  else if (risklevel == "04") {
    return "中高";
  }
  else if (risklevel == "03") {
    return "中";
  }
  else if (risklevel == "02") {
    return "中低";
  }
  else if (risklevel == "01") {
    return "低";
  }
  return "";
}

/*可撤单判断 */
function checkRetray(state, tradecode) {
  if ((state == "01" || state == "02") &&
          (((tradecode == "0106") && (state == "01")) ||
          (tradecode == "0107") ||
          ((tradecode == "0108") && (state == "01")) ||
          (tradecode == "0109") ||
          (tradecode == "0110") ||
          (tradecode == "0204") ||
          (tradecode == "0205") ||
          (tradecode == "0206") ||
          (tradecode == "0303") ||
          (tradecode == "0905") ||
          (tradecode == "0906") ||
          (tradecode == "0907") ||
          (tradecode == "0908") ||
          (tradecode == "0011") ||
          (tradecode == "0012") ||
          (tradecode == "0013") ||
          (tradecode == "0051") ||
          (tradecode == "0052") ||
          (tradecode == "0053") ||
          (tradecode == "0901") ||
          (tradecode == "0902") ||
          (tradecode == "0903") ||
          (tradecode == "0904") ||
          (tradecode == "0909") ||
          (tradecode == "0910") ||
          (tradecode == "0911") ||
          (tradecode == "0912") ||
          (tradecode == "0913") ||
          (tradecode == "0914") ||
          (tradecode == "0915") ||
          (tradecode == "0916") ||
          (tradecode == "0917") ||
          (tradecode == "0918") ||
          (tradecode == "0919"))
          ) {
    return true;
  } else {
    return false;
  }
}
