var tableObj = {
	header: null,
	url: null,
	params: null,
	dataSource: null,
	tableClsName: null,
	tableId: null,
	headerClsName: null,
	optionShowClass: null,
	optionShowConfig: null,
	hasCheckboxColumnHeader: false,
	parent: null,
	hideIndexes: [],
	hiddenColumns: [],
	dataPageArray: [],
	pageSize: 1000,
	maxPageSize: 0,
	sortable: null,
	sorts: null,
	noAltTrColor: false,
    doTableCreation: doTableCreation,
    listener: function () {

    },
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
    },

    setDownListMenue:function() {
        var obj = this;
        if (obj.optionShowConfig != null) {
            var config = obj.optionShowConfig;
            setDownList(config.actionId, config.chartId, config.chartShowTriggerClass, config.optionShowTriggerClasses);
        }
    },

    createPageArray: function (tbody) {
        var obj = this;
        var trs = $(tbody).children();
        //  截取页数据
        obj.dataPageArray = [];
        obj.maxPageSize = Math.ceil(trs.length / obj.pageSize);
        for (var i = 0; i < obj.maxPageSize; i++) {
            var s = "";
            for (var j = i * obj.pageSize; j < (i + 1) * obj.pageSize && j < trs.length; j++) {
                s += trs[j].outerHTML;
            }
            obj.dataPageArray.push(s);
        }
    }
};
/*
 * 初始化表格
 * 参数为表格配置项
 * */
function initTableWithConfig(config) {
    var obj = $.extend(true, {}, tableObj);
    $.extend(obj, config);
    initTable(obj);
}

/*
 * 初始化表格
 * 参数为已根据config填满的tableObj对象
 * */
function initTable(obj) {
    if (obj.header == null) {
        return;
    }
    if (obj.dataSource == null) {
        // 构造数据
        $.post(obj.url, obj.params + "", function (resdata) {
            var dataAll = resdata.data == undefined ? eval('(' + resdata + ')') : resdata;
            obj.doTableCreation(obj, dataAll);
        });
    } else if (obj.dataSource.length == 0) {
        hideLoadingMask();
    }
    else {
        obj.doTableCreation(obj, obj.dataSource);
    }
}

function headerCreation(obj, headCount, widthDef, sortDef,table) {
    // 构造表头
    var headerStr = [];
    headerStr.push("<thead><tr>");
    // 如果包含复选框的列头
    if (obj.hasCheckboxColumnHeader) {
        headerStr.push("<th><input id='checkAll' class='cbInTable' type='checkbox' /></th>");
        columnCount += 1;
    }
    var firstSortId = null;
    for (var i = 0; i < headCount; i++) {
        var str = [];
        if ($.inArray(i, obj.hiddenColumns) >= 0) {
            str.push("<th style='display: none;'>");
        } else if ($.inArray(i, obj.hideIndexes) >= 0) {
            str.push("<th style='display: none;'>");
        } else {
            if (obj.attentionColumns != undefined && $.inArray(i, obj.attentionColumns)>=0) {
                str.push("<th class=\"attention\">");
            } else {
                str.push("<th>");
            }
        }
        str.push(obj.header[i]);
        if (sortDef != undefined && sortDef[i]) {
            // 排序
            var dir = obj.sortable;
            if (firstSortId == null) {
                firstSortId = i;
            }
            var parentContainer = obj.parent;
            var params = obj.params;
            var sortIcon = "<span class='sortIcon' columnCount='" + columnCount + "' rowCount='" + rowCount + "' direction='" + dir + "' sortIndex='" + i + "' parentContainer='" + parentContainer + "' params='" + params + "'></span>";
            str.push(sortIcon);
        }

        if (widthDef != undefined && widthDef[i] != "auto") {
            str[0] = "<th style='width: " + widthDef[i] + "px'>";
            if (obj.attentionColumns != undefined && $.inArray(i, obj.attentionColumns)>=0) {
                str[0] = "<th class='attention' style='width: " + widthDef[i] + "px'>";
            } else {
                str[0] = "<th style='width: " + widthDef[i] + "px'>";
            }
        }

        str.push("</th>");
        headerStr.push(str.join(''));
    }
    headerStr.push("</tr></thead>");
    $(table).html(headerStr.join(''));
}

/*
 * 根据数据创建表格
 * */
function doTableCreation(obj, dataAll) {
    var dataEle = dataAll.data;
    var table = document.createElement("table");
    table.id = obj.tableId == null ? "" : obj.tableId;
    table.className = obj.tableClsName == null ? "" : obj.tableClsName;
    var sortDef = obj.sorts;
    var widthDef = obj.widths;
    var headCount = obj.header.length;
    var rowCount = dataEle.length;
    headerCreation(obj, headCount, widthDef, sortDef, table);
    if (dataEle.length != 0) {
        var columnCount = Math.min(dataEle[0].length, headCount);
        // 数据审核
        if (headCount != columnCount) {
            alert("表头项与数据列数不相同");
            return;
        }
        // 填充数据
        var myBody = document.createElement("tbody");
        obj.maxPageSize = Math.ceil(dataAll.data.length / obj.pageSize);

        obj.dataSource = dataAll;
        myBody = joinData(rowCount, columnCount, dataAll, myBody, obj);
        obj.createPageArray(myBody);
        var firstPage = obj.dataPageArray[0];
        $(myBody).html(firstPage);
        table.appendChild(myBody);
    } else {
        $(function () {
            $(obj.parent).html(table.outerHTML);
            $(obj.parent).append('<p style="text-align:center;font-size:16px;font-family:\'Microsoft YaHei\';">查询无记录。</p>')
        });
        return;
    }

    // 当页面加载时进行渲染绑定
	$(function() {
		// 渲染
		if (table != null) {
			$(obj.parent).html(table.outerHTML);
		}
		obj.render();
		obj.listener();
	    obj.setDownListMenue();
		//  排序
		$('.sortIcon').on('click', function() {
			showBg("hideDiv", ".loading");
			$('.sortIcon').removeClass('asc').removeClass('desc');
			var that = this;
			var direction = $(that).attr('direction');
			var sortIndex = $(that).attr('sortIndex');
			var sparams = $(that).attr('params');
			var srowCount = $(that).attr('rowCount');
			var scolumnCount = $(that).attr('columnCount');
			var sparentContainer = $(that).attr('parentContainer');
			var body = $(sparentContainer).find("tbody");
			body.html("");
			var sdir = direction == "desc" ? "asc" : "desc";
			$(that).attr("direction", sdir).addClass(sdir);

			obj.dataSource = sortData(obj.dataSource, sortIndex, direction, srowCount);
			var myBodyContent = joinData(srowCount, scolumnCount, obj.dataSource, body.get(0), obj);
			obj.createPageArray(myBodyContent);
			var firstPageStr = obj.dataPageArray[0];
			$(myBodyContent).html(firstPageStr);
			obj.render();
			obj.listener();
			obj.setDownListMenue();

			closeBg("hideDiv", ".loading");
		});
	});
}
/*
 * 为表格插入数据项
 * */
function joinData(rowCount, columnCount, dataAll, container, obj) {
    $(container).html("");
    var dataEle = dataAll.data;
    var dataExtra = dataAll.extraData;
    // 填数据
    var str = [];
    for (var i = 0; i < rowCount; i++) {
        var hasExData = dataExtra != null && dataExtra != undefined && dataExtra.data.length > i;
        str.push('<tr hasexdata="' + hasExData + '">');
        if (obj.hasCheckboxColumnHeader) {
            str.push("<td><input type='checkbox' class='cbInTable' /></td>");
        }
        for (var j = 0; j < columnCount; j++) {
            if ($.inArray(j, obj.hiddenColumns) >= 0 || $.inArray(j, obj.hideIndexes) >= 0) {
	            str.push("<td style='display: none;'>" + dataEle[i][j] + "</td>");
            }else{
                str.push("<td>" + dataEle[i][j] + "</td>");
            }
        }
        str.push('</tr>');
        if (hasExData) {
            var dataLength = dataExtra.data[i].length;
            if (dataLength == 0) {
                continue;
            }
            var innTable = [];
            innTable.push("<table style='width:100%'>");
            var headInner = [];
            headInner.push("<thead>");
            for (var k = 0; k < dataExtra.header.length; k++) {
                headInner.push("<th>" + dataExtra.header[k] + "</th>");
            }
            headInner.push("</thead>");
            innTable.push(headInner.join(''));

            var bodyInner = [];
            bodyInner.push("<tbody>");
            var trInner = [];
            for (var k = 0; k < dataLength; k++) {
                trInner.push("<tr>");
                var rowInner = dataExtra.data[i][k];
                for (var l = 0; l < rowInner.length; l++) {
                    trInner.push("<td>" + rowInner[l] + "</td>")
                }
                trInner.push("</tr>");
            }
            bodyInner.push(trInner.join(''));
            bodyInner.push("</tbody>");

            innTable.push(bodyInner.join(''));
            innTable.push("</table>");
            var content = "<tr style='display:none;'><td></td><td colspan='" + (columnCount - 2) + "'>" + innTable.join('') + "</td><td></td></tr>";
            str.push(content);
        }
    }
    $(container).html(str.join(''));
    return container;
}

/*
 * 设置表格交叉项颜色，鼠标悬停颜色变化事件
 * */
function setTableTriggerColor(containerId) {
    var ths = $(containerId).find("th");
    ths.css('background-color', '#EFEFEF');
    var tbody = $(containerId).find("tbody");
    if (tbody.length > 0) {
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
}
/*
 * 数据排序，取得前n项
 */
function sortData(dataContainer, sortIndex, direction,n) {
    if(n < 1) {
	    dataContainer.data = [];
        return dataContainer;
    }
    var sortData = [];
    for (var i = 0; i < dataContainer.data.length; i++) {
        var row = dataContainer.data[i];
        var cell = row[sortIndex];
        sortData.push({"dataRow": row, "value": cell});
    }
	var result = sortData.sort(function(a, b) {
		// 正序
		if (direction == "asc") {
			if (a.value < b.value) return -1;
			if (a.value > b.value) return 1;
		}
			//倒序
		else {
			if (a.value < b.value) return 1;
			if (a.value > b.value) return -1;
		}
		return 0;
	});
    dataContainer.data = [];
    for (var j = 0; j < n; j++) {
        dataContainer.data.push(result[j].dataRow);
    }
    return dataContainer;
}

/*
* 为回调函数添加loading用户体验
* */
function setLoadingMask(callback) {
    $('.loading').show("slow",function() {
	    callback();
	    hideLoadingMask();
    });
}
/*
* 隐藏loading遮罩
* */
function hideLoadingMask(){
    $('.loading').hide();
	$('.pageBox').show();
}

/*
 * 即时创建表格组
 * */
(function (args) {
    var tableListObj = {
        tableConfigs: null
    };

    function init() {
        for (var i = 0; i < tableListObj.tableConfigs.length; i++) {
            initTableWithConfig(tableListObj.tableConfigs[i]);
        }
    }

    $.extend(tableListObj, args);
	setLoadingMask(init);
})(tableListConfigArg)
