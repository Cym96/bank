(function (window, $) {

  var fundTypeNameList = { "01": "股票型", "02": "债券型", "03": "货币型", "04": "保本型", "05": "混合型" };
    var tableObj = {
        header: ["关注", "基金代码", "产品信息", "单位净值", "累计净值", "月涨幅", "季涨幅", "年涨幅", "费率优惠", "基金公司", "基金类型","是否支持快赎", "操作"],
        dataSource: jsonData,
        params: "",
        optionShowConfig: { actionId: "action", chartId: "chartFundDetails", chartShowTriggerClass: "benefitIcon", optionShowTriggerClasses: ["options"], optionsShowParent: "optionBox" },
        tableClsName: "resultList",
        tableId: "resultList",
        parent: "#resultDiv",
        sortable: "desc",
        pageSize: 10,
        hideIndexes: [1,4, 6, 7],
        hiddenColumns: [9, 10,11],
        sorts: [false, false, false, false, false, true, true, true, false, false, false,false, false],
        widths: ["80", "auto", "220", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto","5", "250"],
        render: function () {
            var obj = this;
            if (!obj.noAltTrColor) {
                setTableTriggerColor(obj.parent);
            }
            if (obj.headerClsName != null && obj.headerClsName != "") {
                var head = $(obj.parent).find("thead")[0];
                head.style.backgroundColor = "";
                head.className = obj.headerClsName;
            }
            if (obj.optionShowConfig != null) {
                var config = obj.optionShowConfig;
                setDownList(config.actionId, config.chartId, config.chartShowTriggerClass, config.optionShowTriggerClasses);
            }
            $("a.options,a.m-btn-table").on("click", function () {
                var targetUrl = $(this).attr("toLink");
                if (targetUrl.indexOf('?') == -1) {
                    targetUrl += '?';
                } else {
                    targetUrl += '&';
                }
                targetUrl += 'r=' + Math.random();
                window.location.href = targetUrl;
              showBg("hideDiv", "loadingDiv");
              return false;
            });
          parent.changeFrameHeight();
        },
        createPageArray: function () {
            var trs = tableRowCache;
            tableObj.dataPageArray = [];
            tableObj.maxPageSize = Math.ceil(trs.length / tableObj.pageSize);
            for (var i = 0; i < tableObj.maxPageSize; i++) {
                var s = "";
                for (var j = i * tableObj.pageSize; j < (i + 1) * tableObj.pageSize && j < trs.length; j++) {
                    s += trs[j];
                }
                tableObj.dataPageArray.push(s);
            }
        },
        listener: function () {
            // 设定分页初始内容
            $('#pageTotalCount').text(tableObj.maxPageSize == 0 ? "1" : tableObj.maxPageSize);
            $('.inputPage').val('1');
            $('.pageUp').attr('currPage', 0);
            $('.pageNext').attr('currPage', 0);
            $('.pageNext').attr('maxPage', tableObj.maxPageSize);
            // 关注操作
            $('.attentionIcon').on('click', function () {
                var that = this;
                var fundCode = $(that).parent().next().text();
                if ($(that).hasClass("cancelAtte")) {
                    $.get("ConcernOneFundAct.do", { fundCode: fundCode, concern: "true", r: Math.random() }, function (data) {
                        if (data === "0") {
                            alert("关注基金失败！");
                            return;
                        } else if (data === "1") {
                            myFocusFund[fundCode] = "";
                            $(that).toggleClass('cancelAtte');
                            concernUpdateData(getRowIndex(that), fundCode);
                        } else if (data === "2") {
                            alert("基金已关注！");
                            return;
                        } else if (data === "3") {
                            alert("关注基金的数量已超限！");
                            return;
                        } else {
                            alert("关注基金异常，可能已超时，请重新登录尝试！");
                        }

                    });
                } else {
                    $.get("ConcernOneFundAct.do", { fundCode: fundCode, concern: "false", r: Math.random() }, function (data) {
                        if (data === "0" && alert("取消关注基金失败！")) {
                            return;
                        } else if (data === "1") {
                            delete myFocusFund[fundCode];
                            $(that).toggleClass('cancelAtte');
                            concernUpdateData(getRowIndex(that), fundCode);
                        } else {
                            alert("关注基金异常，可能已超时，请重新登录尝试！");
                        }

                    });
                }
            });

        }
    };
    var isSearch = false;
    var tableRowCache = [];
    var tableSourceCache = [];

    /*
	* 关注或取消关注更新表内容
	*/
    function concernUpdateData(rowIndexInPage, fundCode) {
        // 根据当前页码获得当前页索引
        var curPageIndex = parseInt($('.inputPage').val()) - 1;
        // 获得在数据源中所在行数
        var currRow = curPageIndex * tableObj.pageSize + rowIndexInPage -1;
        // 获取数据源数据
        var data = tableSourceCache;
        // 获得当前数据行
        var row = data[currRow];
        // 要更改的数据
        var v = row[0] == "0" ? "1" : "0";
        row[0] = v;
        // 获得当前数据页
        var page = tableObj.dataPageArray[curPageIndex];
        // 通过页面元素来解析数据页中的字符串，创建tbody
        var body = document.createElement('tbody');
        $(body).html(page);
        var attention = v == "1" ? "<a class='attentionIcon'></a>" : "<a class='attentionIcon cancelAtte'></a>";
        // 找到当前行位置，把第一个td的内容替换为相应的数据值
        $(body).find('tr').eq(rowIndexInPage - 1).children('td:first').html(attention);
        // 将页面修改的字符串重新赋值回分页数据中
        tableObj.dataPageArray[curPageIndex] = body.innerHTML;
        $.each(tableObj.dataSource.data, function (i, n) {
            if (n[1] == fundCode) n[0] = v;
        });
    }
    /*
	* 筛选表格，三种方法筛选
	* */
    function doTableFilter(selector) {
        var columnCount = tableObj.header.length;
        var data = tableObj.dataSource.data;
        var result = { "data": [] };
        $(data).each(function (i, n) {
            // 公司
            var boolCompany = false;
            if (selector.company == "" || selector.company == n[9]) {
                boolCompany = true;
            }
            // 基金类型
            var boolFundType = false;
            if (selector.fundType == "" || selector.fundType == n[10]) {
                boolFundType = true;
            }
            // 销售状态
            var boolFundStt = false;
            if (selector.state != "") {
                var temp = n[columnCount - 1];
                if (selector.state == "1" && (temp.substring(1, 2) == "1")) {
                    boolFundStt = true;
                } else if (selector.state == "2" && (temp.substring(0, 1) == "1")) {
                    boolFundStt = true;
                } else if (selector.state == "3" && temp.substring(2, 3) == "1") {
                    boolFundStt = true;
                } else if (selector.state == "4" && temp.substring(3, 4) == "1") {
                    boolFundStt = true;
                }
            } else {
                boolFundStt = true;
            }
            if (boolCompany && boolFundType && boolFundStt) {
                result.data.push(n);
            }
        });
        // 最终数据源
        tableSourceCache = result.data;
        // 最终数据条数
        var rowCount = tableSourceCache.length;
        var count = 0;
        if (selector.month != "") {// 月涨幅 colIndex = 5
            count = parseInt(selector.month);
            tableSourceCache = sortData(tableSourceCache, 5, "desc", count);
            rowCount = Math.min(rowCount,count);
        }
        else if (selector.quarter != "") {// 季涨幅 colIndex = 6
            count = parseInt(selector.quarter);
            tableSourceCache = sortData(tableSourceCache, 6, "desc", count);
            rowCount = Math.min(rowCount, count);
        }
        else if (selector.year != "") { // 年涨幅 colIndex = 7
            count = parseInt(selector.year);
            tableSourceCache = sortData(tableSourceCache, 7, "desc", count);
            rowCount = Math.min(rowCount, count);
        }
        //else {tableSourceCache = sortData(tableSourceCache, 5, "desc", rowCount);}
        joinData(rowCount, columnCount, tableSourceCache);
        tableObj.render();
        tableObj.listener();
        return rowCount;
    }

    window.doTableFilter = doTableFilter;
    //基金名称，持有基金等筛选
    function doTableFilter2(selector) {
        var columnCount = tableObj.header.length;
        var data = tableObj.dataSource.data;
        var result = { "data": [] };
        var pattern = /^1\d/;
        if (selector.type) {
            var type = selector.type;
            if (pattern.test(type)) {
                $(data).each(function (i, n) {
                    if (type + "-" + n[1] in recommendFund) {
                        result.data.push(n);
                    }
                });
            } else if (selector.type == "x1") {
                $(data).each(function (i, n) {
                    if (n[1] in myFocusFund) {
                        result.data.push(n);
                    }
                });
            } else if (selector.type == "x2") {
                if ($.isEmptyObject(myHoldFund)) {
                    showBg("hideDiv", "loadingDiv");
                    $.get("MyHoldFundListAct.do", { r: Math.random() }, function (ldata) {
                        if (ldata == "[]") {
                            closeBg("hideDiv", "loadingDiv");
                            return;
                        }
                        try {
                            var jsonList = $.parseJSON(ldata);
                            for (var i = 0, len = jsonList.length; i < len; i++) {
                                var concern = jsonList[i];
                                myHoldFund[concern] = "";
                            }
                            $(data).each(function (j, n) {
                                if (n[1] in myHoldFund) {
                                    result.data.push(n);
                                }
                            });
                            tableSourceCache = result.data;
                            var rowCount1 = tableSourceCache.length;
                            joinData(rowCount1, columnCount, tableSourceCache);
                            tableObj.render();
                            tableObj.listener();
                            closeBg("hideDiv", "loadingDiv");
                        } catch(e) {
                            alert("获取持有基金异常，可能已超时，请重新登录尝试！");
                        }

                    });
                } else {
                    $(data).each(function (i, n) {
                        if (n[1] in myHoldFund) {
                            result.data.push(n);
                        }
                    });
                }
            }

        } else {
            var fundName = selector.fundName;
            $(data).each(function (i, n) {
                if (fundName == "" || n[2].indexOf(fundName) >= 0 || n[1].indexOf(fundName) >= 0) {
                    result.data.push(n);
                }
            });
        }
        tableSourceCache = result.data;
        var rowCount = tableSourceCache.length;
        tableSourceCache = sortData(tableSourceCache, 5, "desc", rowCount);
        joinData(rowCount, columnCount, tableSourceCache);
        tableObj.render();
        tableObj.listener();
    }

  window.doTableFilter2 = doTableFilter2;

    function firstJoinData(rowCount, columnCount) {
        var container = $("#" + tableObj.tableId + " > tbody");
        container.html("");
        var dataEle = tableObj.dataSource.data;
        if (dataEle== "[]") {
            container.html("<tr><td colspan='" + columnCount + "'>没有相关基金记录！</td></tr>");
        }
        var str = [];
        tableRowCache = [];
        var addRowCount = 0;
        for (var i = 0; i < rowCount; i++) {
            var fundCode = dataEle[i][1], fundName = dataEle[i][2];
            var fundType = dataEle[i][10];
            var fastSell = dataEle[i][11];
            var stype = "03" === fundType ? true : false;
            var row = [];
            if ((recommendFund["active"] + "-" + fundCode) in recommendFund) {
                row.push('<tr>');
                for (var j = 0; j < columnCount; j++) {
                    var td;
                    var display = "";
                    if ($.inArray(j, tableObj.hiddenColumns) >= 0 || $.inArray(j, tableObj.hideIndexes) >= 0) {
                        display = " style='display: none;' ";
                    }
                    if (j == 0) {
                        var aLink = (fundCode in myFocusFund) ? "<a class='attentionIcon'></a>" : "<a class='attentionIcon cancelAtte'></a>";
                        td = "<td " + display + ">" + aLink + "</td>";
                        if (fundCode in recommendFund) {
                          td = "<td class='recommend' " + display + " title='" + recommendFund[fundCode] + "'>" + aLink + "</td>";
                        }
                    } else if (j == 2) {
                      td = "<td class='fundNameBox' " + display + ">";
                      td += '<span class="fundName"><a target="_blank" href="http://ewealth.abchina.com/fund/' + fundCode + '.htm">' + dataEle[i][j] + '</a></span>';
                      td += "<span class='benefitIcon' data_ctrCode='" + fundCode + "' data_ctrName='" + fundName + "' data_ctrType='" + stype + "'></span>";
                      if (fastSell == '1') {
                        td += '<span class="fast-sell" title="支持快速赎回">&nbsp;</span>';
                      }
                      td += "<span class='fund-code-type'>" + fundCode + "|" + fundTypeNameList[fundType] + "</span>";
                      td += "</td>";
                    } else if (j == 3) {
                      td = "<td " + display + ">" + (stype ? dataEle[i][j] + "<span class='td-content-comment'>（万份收益）</span>" : dataEle[i][j]) + "</td>";
                    } else if (j == 5) {
                        var percent1 = Math.round(parseFloat(dataEle[i][j]) * 10000) / 100;
                        var sty1 = percent1 > 0 ? "style='color:red;'" : "";
                        td = "<td " + display + " " + sty1 + ">" + (stype ? percent1 + "%" + "<span class='td-content-comment'>（七日年化收益率）</span>" : percent1 + "%") + "</td>";
                    } else if (j == 6) {
                        var percent2 = Math.round(parseFloat(dataEle[i][j]) * 10000) / 100;
                        var sty2 = percent2 > 0 ? "style='color:red;'" : "";
                        td = "<td " + display + " " + sty2 + ">" + percent2 + "%</td>";
                    } else if (j == 7) {
                        var percent3 = Math.round(parseFloat(dataEle[i][j]) * 10000) / 100;
                        var sty3 = percent3 > 0 ? "style='color:red;'" : "";
                        td = "<td " + display + " " + sty3 + ">" + percent3 + "%</td>";
                    } else if (j == columnCount - 1) {
                        var v = dataEle[i][j];
                        td = "<td class='optionBox' " + display + ">";
                        var tArr = [];
                        for (var u = 0, leng = v.length; u < leng; u++) {
                          if (v.substring(u, u + 1) == "1") tArr.push(u);
                        }
                        var content;

                        var a = document.createElement("a");
                        a.className = "m-btn-table";
                        a.href = "javascript:void(0);";
                        $(a).attr("toLink", sttOperLink[tArr[0]] + "?fundCode=" + fundCode);
                        a.innerHTML = sttOper[tArr[0]];
                        content = a.outerHTML;
                      if (tArr.length > 1) {
                        var b = document.createElement("a");
                        b.className = "options";
                        b.href = "javascript:void(0);";
                        $(b).attr("toLink", sttOperLink[tArr[1]] + "?fundCode=" + fundCode);
                        b.innerHTML = sttOper[tArr[1]];
                        if (tArr.length > 2) {
                          b.innerHTML = sttOper[tArr[1]] + "<span class='arrowMore'></span>";
                          var tArrt = tArr.slice(2, tArr.length);
                          $(b).attr('ctr', tArrt).attr("param", "fundCode=" + fundCode);
                        }
                        content =content+ b.outerHTML;
                      }

                      td += content + "</td>";
                    } else {
                        td = "<td " + display + ">" + dataEle[i][j] + "</td>";
                    }
                    row.push(td);
                }
                row.push('</tr>');
                str[addRowCount] = row.join("");
                tableSourceCache.push(dataEle[i]);
                tableRowCache[addRowCount++] = row.join("");
            }
        }
        // 创建分页内容
        tableObj.createPageArray(container);
        var firstPage = tableObj.dataPageArray[0];
        container.html(firstPage);
        if (addRowCount == 0) {
            $(container).html("<tr><td colspan='" + columnCount + "'>没有相关基金记录！</td></tr>");
            return container;
        }
    }
    /*
	 * 为表格插入数据项
	 * */
    function joinData(rowCount, columnCount, dataAll) {
        var container = $("#" + tableObj.tableId + " >tbody");
        container.html("");
        refreshHeader();
        if (rowCount == 0) {
            container.html("<tr><td colspan='" + columnCount + "'>没有相关基金记录！</td></tr>");
        }
        var detail = $("#fullScreen em.active").text() == "精简";
        var dataEle = dataAll;
        var str = [];
        tableRowCache = [];
        for (var i = 0; i < rowCount; i++) {
            var row = [];
            row.push('<tr>');
            var fundCode = dataEle[i][1], fundName = dataEle[i][2];
            var fundType = dataEle[i][10];
            var fastSell = dataEle[i][11];
            var stype = "03" === fundType ? true : false;
            for (var j = 0; j < columnCount; j++) {
                var td;
                var display = "";
                if ((detail && $.inArray(j, tableObj.hideIndexes) >= 0) || $.inArray(j, tableObj.hiddenColumns) >= 0) {
                    display = " style='display: none;' ";
                }
                if (j == 0) {
                    var aLink = (fundCode in myFocusFund) ? "<a class='attentionIcon'></a>" : "<a class='attentionIcon cancelAtte'></a>";
                    td = "<td " + display + ">" + aLink + "</td>";
                    if (fundCode in recommendFund) {
                      td = "<td class='recommend' " + display + " title='" + recommendFund[fundCode] + "'>" + aLink + "</td>";
                    }
                }
                else if (j == 2) {
                    td = "<td class='fundNameBox' " + display + ">";
                    td += '<span class="fundName"><a target="_blank" href="http://ewealth.abchina.com/fund/' + fundCode + '.htm">' + dataEle[i][j] + '</a></span>';
                    td += "<span class='benefitIcon' data_ctrCode='" + fundCode + "' data_ctrName='" + fundName + "' data_ctrType='" + stype + "'></span>";
                    if (fastSell == '1') {
                      td += '<span class="fast-sell" title="支持快速赎回">&nbsp;</span>';
                    }
                    td += "<span class='fund-code-type'>" + fundCode + "|" + fundTypeNameList[fundType] + "</span>";
                    td += "</td>";
                } else if (j == 3) {
                  td = "<td " + display + ">" + (stype ? dataEle[i][j] + "<span class='td-content-comment'>（万份收益）</span>" : dataEle[i][j]) + "</td>";
                } else if (j == 5) {
                  var percent1 = Math.round(parseFloat(dataEle[i][j]) * 10000) / 100;
                  var sty1 = percent1 > 0 ? "style='color:red;'" : "";
                  td = "<td " + display + " " + sty1 + ">" + (stype ? percent1 + "%" + "<span class='td-content-comment'>（七日年化收益率）</span>" : percent1 + "%") + "</td>";
                } else if (j == 6) {
                    var percent2 = Math.round(parseFloat(dataEle[i][j]) * 10000) / 100;
                    var sty2 = percent2 > 0 ? "style='color:red;'" : "";
                    td = "<td " + display + " " + sty2 + ">" + percent2 + "%</td>";
                } else if (j == 7) {
                    var percent3 = Math.round(parseFloat(dataEle[i][j]) * 10000) / 100;
                    var sty3 = percent3 > 0 ? "style='color:red;'" : "";
                    td = "<td " + display + " " + sty3 + ">" + percent3 + "%</td>";
                } else if (j == columnCount - 1) {
                    var v = dataEle[i][j];
                    td = "<td class='optionBox' " + display + ">";
                    var tArr = [];
                    for (var u = 0, leng = v.length; u < leng; u++) {
                        if (v.substring(u, u + 1) == "1") tArr.push(u);
                    }
                    var content;

                    var a = document.createElement("a");
                    a.className = "m-btn-table";
                    a.href = "javascript:void(0);";
                    $(a).attr("toLink", sttOperLink[tArr[0]] + "?fundCode=" + fundCode);
                    a.innerHTML = sttOper[tArr[0]];
                    content = a.outerHTML;
                    if (tArr.length > 1) {
                      var b = document.createElement("a");
                      b.className = "options";
                      b.href = "javascript:void(0);";
                      $(b).attr("toLink", sttOperLink[tArr[1]] + "?fundCode=" + fundCode);
                      b.innerHTML = sttOper[tArr[1]];
                      if (tArr.length > 2) {
                        b.innerHTML = sttOper[tArr[1]] + "<span class='arrowMore'></span>";
                        var tArrt = tArr.slice(2, tArr.length);
                        $(b).attr('ctr', tArrt).attr("param", "fundCode=" + fundCode);
                      }
                      content = content + b.outerHTML;
                    }
                    td += content+ "</td>";
                } else {
                    td = "<td " + display + ">" + dataEle[i][j] + "</td>";
                }
                row.push(td);
            }
            row.push('</tr>');
            str[i] = row.join("");
            tableRowCache[i] = row.join("");
        }
        // 创建分页内容
        tableObj.createPageArray();
        var firstPage = tableObj.dataPageArray[0];
        container.html(firstPage);
    }
    //刷新表头
    function refreshHeader() {
      var detail = $("#fullScreen em.active").text() == "精简";
        if (detail) {
          $("#" + tableObj.tableId + " > thead > tr > th").each(function (ins) {
                if ($.inArray(ins, tableObj.hiddenColumns) >= 0 || $.inArray(ins, tableObj.hideIndexes) >= 0) {
                    $(this).css("display", "none");
                }
            });
        }
        else {
            $("#" + tableObj.tableId + " > thead > tr > th").each(function (ins) {
                if ($.inArray(ins, tableObj.hiddenColumns) >= 0) {
                    $(this).css("display", "none");
                }
            });
        }
    }
    //刷新tbody
    function refreshBody() {
        var detail = $("#fullScreen em.active").text() == "精简";
        if (detail) {
            $("#" + tableObj.tableId + " > tbody > tr").each(function (i, n) {
                $(n).find('td').each(function (index, node) {
                    if ($.inArray(index, tableObj.hideIndexes) >= 0) {
                        $(node).css("display", "none");
                    }
                    if ($.inArray(index, tableObj.hiddenColumns) >= 0) {
                      $(node).css("display", "none");
                    }
                });
            });
        }
        else {
            $("#" + tableObj.tableId + " > tbody > tr").each(function (i, n) {
                $(n).find('td').each(function (index, node) {
                    if ($.inArray(index, tableObj.hideIndexes) >= 0) {
                        $(node).css("display", "");
                    }
                    if ($.inArray(index, tableObj.hiddenColumns) >= 0) {
                        $(node).hide();
                    }
                });
            });
        }
    }
    /*
	 * 初始化表格
	 * 参数为已根据config填满的tableObj对象
	 * */
    function initTable() {
        if (tableObj.dataSource.length == 0) {
            hideLoadingMask();
            return;
        }
        var dataAll = tableObj.dataSource;
        var dataEle = dataAll.data;

        var sortDef = tableObj.sorts;
        var widthDef = tableObj.widths;
        var headCount = tableObj.header.length;
        var rowCount = dataEle.length;
        var columnCount = Math.min(dataEle[0].length, headCount);

        var tableStr = [];
        tableStr.push("<table id='" + tableObj.tableId + "' class='" + tableObj.tableClsName + "'>");
        // 构造表头
        tableStr.push("<thead><tr>");
        for (var i = 0; i < headCount; i++) {
          var str = [];
          var dispStype = '';
            if ($.inArray(i, tableObj.hiddenColumns) >= 0 || $.inArray(i, tableObj.hideIndexes) >= 0) {
              str.push("<th style='display: none;'>");
              dispStype = 'display: none;';
            } else {
                str.push("<th>");
            }
            str.push("<span>" + tableObj.header[i] + "</span>");
            if (sortDef != undefined && sortDef != null && sortDef[i]) {
                // 排序
                var dir = tableObj.sortable;
                var parentContainer = tableObj.parent;
                var params = tableObj.params;
                var sortIcon = "<span class='sortIcon' columnCount='" + columnCount + "' direction='" + dir + "' sortIndex='" + i + "' parentContainer='" + parentContainer + "' params='" + params + "'>&nbsp;</span>";
                str.push(sortIcon);
            }
            if (widthDef != undefined && widthDef[i] != "auto") {
                str[0] = "<th style='width: " + widthDef[i] + "px;"+dispStype+"'>";
            }
            str.push("</th>");
            tableStr.push(str.join(''));
        }
        tableStr.push("</tr></thead>");
        tableStr.push("<tbody></tbody></table>");
        $(tableObj.parent).html(tableStr.join(""));

        // 填充数据
        tableObj.maxPageSize = Math.ceil(dataEle.length / tableObj.pageSize);
      if (selectedTab == "1" || selectedTab == '') {
        firstJoinData(rowCount, columnCount);
      } else {
        joinData(rowCount, columnCount, dataAll.data);
      }

      // 渲染
        tableObj.render();
        tableObj.listener();
        //  排序
        $('.sortIcon').on('click', function () {
            var that = this;
            var direction = $(that).attr('direction');
            $('.sortIcon').removeClass('asc').removeClass('desc').attr('direction',tableObj.sortable);
            showBg("hideDiv", "loadingDiv");
            var sortIndex = $(that).attr('sortIndex');
            var scolumnCount = $(that).attr('columnCount');
            var sdir = direction == "asc" ? "desc" : "asc";
            $(that).attr("direction", sdir).addClass(sdir);
            var srowCount = tableSourceCache.length;
            tableSourceCache = sortData(tableSourceCache, sortIndex, direction, srowCount);
            joinData(srowCount, scolumnCount, tableSourceCache);
            tableObj.render();
            tableObj.listener();
            closeBg("hideDiv", "loadingDiv");
        });

        // 筛选按钮事件
        $('#SelectFundType').bind('change', btnFilter);
        $('#companyFilter').bind('change', btnFilter);

        $('#recomDt > span,.my-fund').bind('click', function () {
          $('.sortIcon').removeClass('asc').removeClass('desc').attr("direction", tableObj.sortable);
          $(this).addClass('active').siblings().removeClass('active');
          var type = $(this).attr("data-code");
          var selector = { type: type };
          doTableFilter2(selector);
        });

        // 查询按钮事件
        $('#searchButton').bind("click", function () {
            var fundName = $('#searchInput').val();
            if ((fundName == "" || fundName == "基金代码/基金名称") && !isSearch) {
            } else {
                $('.sortIcon').removeClass('asc').removeClass('desc').attr("direction", tableObj.sortable);
                (fundName == "基金代码/基金名称") && (fundName = "");
                var selector = { fundName: fundName };
                doTableFilter2(selector);
                if (fundName == "") {
                    isSearch = false;
                } else {
                    isSearch = true;
                }
            }
        });

        $("#searchInput").bind("keyup", function (e) {
            if (e.keyCode == "13") {
                var fundName = $('#searchInput').val();
                if ((fundName == "" || fundName == "基金代码/基金名称") && !isSearch) {
                } else {
                    $('.sortIcon').removeClass('asc').removeClass('desc').attr("direction", tableObj.sortable);
                    (fundName == "基金代码/基金名称") && (fundName = "");
                    var selector = { fundName: fundName };
                    doTableFilter2(selector);
                    if (fundName == "") {
                        isSearch = false;
                    } else {
                        isSearch = true;
                    }
                }
            }
        });

        // 精简/详细事件
        $('#fullScreen > em').bind('click', function () {
            if (!$(this).hasClass("active")) {
                var em = this;
                $(em).addClass('active').siblings('em').removeClass();
                $("#" + tableObj.tableId + " thead th").each(function(index, node) {
                    if ($.inArray(index, tableObj.hideIndexes) >= 0) {
                        $(node).toggle();
                    }
                    if ($.inArray(index, tableObj.hiddenColumns) >= 0) {
                        $(node).hide();
                    }
                });
                $("#" + tableObj.tableId + " > tbody > tr").each(function(i, n) {
                    $(n).find('td').each(function(index, node) {
                        if ($.inArray(index, tableObj.hideIndexes) >= 0) {
                            $(node).toggle();
                        }
                        if ($.inArray(index, tableObj.hiddenColumns) >= 0) {
                            $(node).hide();
                        }
                    });
                });
            }
        });

        //绑定分页事件
        //上一页
        $('.pageUp').bind('click', function () {
            var myBody = $("#" + tableObj.tableId + " > tbody");
            var pageData = tableObj.dataPageArray;
            var that = this;
            var curPage = $(that).attr("currPage");
            if (curPage == 0) {
                return;
            } else {
                var newPage = parseInt(curPage) - 1;
                myBody.html(pageData[newPage]);
                refreshBody();
                $(that).attr('currPage', newPage);
                $('.pageNext').attr('currPage', newPage);
                $('.inputPage').val(newPage + 1);
                tableObj.render();
            }
        });
        // 下一页
        $('.pageNext').bind('click', function () {
            var myBody = $("#" + tableObj.tableId + " > tbody");
            var pageData = tableObj.dataPageArray;
            var that = this;
            var curPage = $(that).attr("currPage");
            var maxPage = $(that).attr('maxPage');
            if (curPage >= maxPage - 1) {
                return;
            } else {
                var newPage = parseInt(curPage) + 1;
                myBody.html(pageData[newPage]);
                refreshBody();
                $(that).attr('currPage', newPage);
                $('.pageUp').attr('currPage', newPage);
                $('.inputPage').val(newPage + 1);
                tableObj.render();
            }
        });
        // Go特定一页
        $('#btnGoPage').bind('click', function () {
            var myBody = $("#" + tableObj.tableId + " > tbody");
            var pageData = tableObj.dataPageArray;
            var page = parseInt($('.inputPage').val());
            if (page > tableObj.maxPageSize || page < 1) {
                return;
            } else {
                var newPage = page - 1;
                myBody.html(pageData[newPage]);
                refreshBody();
                $('.pageUp').attr('currPage', newPage);
                $('.pageNext').attr('currPage', newPage);
                tableObj.render();
            }
        });

        //$(".sortIcon[sortIndex='5']").trigger("click");
       // btnFilter();
    }
    function btnFilter() {
            $('.sortIcon').removeClass('asc').removeClass('desc').attr("direction", tableObj.sortable);

                var fundType = $('#SelectFundType').val();
                var company = $('#companyFilter').val();
//                var month = $('#monthFilter').val();
//                var quarter = $('#quarterFilter').val();
              //  var year = $('#yearFilter').val();
              // 拼接筛选条件
                var selector = { fundType: fundType, company: company, state: "", month: "", quarter: "", year: "" };
                var rowCount = doTableFilter(selector);
        }
    /*
	 * 设置表格交叉项颜色，鼠标悬停颜色变化事件
	 * */
    function setTableTriggerColor(containerId) {
        var ths = $(containerId).find("th");
        ths.css('background-color', '#EFEFEF');
        var trs = $(containerId).find("tbody")[0].children;
        for (var i = 0; i < trs.length; i++) {
            trs[i].style.backgroundColor = trs[i].rowIndex % 2 == 0 ? "#f9f9f9" : "#fff";
            trs[i].onmouseover = function () {
                this.sColor = this.style.backgroundColor;
                this.style.backgroundColor = "#fbf4e4";
            };
            trs[i].onmouseout = function () {
                this.style.backgroundColor = this.sColor;
            };
        }
    }
    /*
	 * 数据排序，取得前n项
	 */
    function sortData(dataContainer, sortIndex, direction, n) {
        if (n < 1) {
            dataContainer = [];
            return dataContainer;
        }
        var sortDat = [];
        var realN = dataContainer.length;
        n = Math.min(n, realN);
        for (var i = 0; i < realN; i++) {
            var row = dataContainer[i];
            var cell = row[sortIndex];
            sortDat.push({ "dataRow": row, "value": parseFloat(cell) });
        }
        var result = sortDat.sort(function (a, b) {
            // 倒序
            if (direction == "asc") {
                if (a.value < b.value) return -1;
                if (a.value > b.value) return 1;
            }
            //正序
            else {
                if (a.value < b.value) return 1;
                if (a.value > b.value) return -1;
            }
            return 0;
        });
        dataContainer = [];
        for (var j = 0; j < n; j++) {
            dataContainer.push(result[j].dataRow);
        }
        return dataContainer;
    }

    /*
	* 为回调函数添加loading用户体验
	* */
    function setLoadingMask(callback) {
        $('#loading').show("slow", function () {
            callback();
            hideLoadingMask();
            parent.changeFrameHeight();
        });
    }
    /*
	* 隐藏loading遮罩
	* */
    function hideLoadingMask() {
        $('#loading').hide();
        $('#pageBox').show();
    }

    function init() {
      initTable(tableObj);
    }
    setLoadingMask(init);
})(window, jQuery);

$(function () {
    $("#benifitFilter").find("select").change(function() {
        $(this).parent().siblings().each(function () {
            $(this).find("select").val("");
        });
    });
});

