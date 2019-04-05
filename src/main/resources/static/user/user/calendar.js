/**
 * Zabuto Calendar
 *
 * Dependencies
 * - jQuery (2.0.3)
 * - Twitter Bootstrap (3.0.2)
 */

if (typeof jQuery == 'undefined') {
    throw new Error('jQuery is not loaded');
}

/**
 * Create calendar
 *
 * @param options
 * @returns {*}
 */
$.fn.zabuto_calendar = function(options) {
    var opts = $.extend({}, $.fn.zabuto_calendar_defaults(), options);
    var languageSettings = $.fn.zabuto_calendar_language(opts.language);
    opts = $.extend({}, opts, languageSettings);

    this.each(function() {
        var $calendarElement = $(this);
        //$calendarElement.attr('id', "zabuto_calendar");

        $calendarElement.data('initYear', opts.year);
        $calendarElement.data('initMonth', opts.month);
        $calendarElement.data('monthLabels', opts.month_labels);
        $calendarElement.data('weekStartsOn', opts.weekstartson);
        $calendarElement.data('navIcons', opts.nav_icon);
        $calendarElement.data('dowLabels', opts.dow_labels);
        $calendarElement.data('showToday', opts.today);
        $calendarElement.data('showDays', opts.show_days);
        $calendarElement.data('showPrevious', opts.show_previous);
        $calendarElement.data('showNext', opts.show_next);
        $calendarElement.data('cellBorder', opts.cell_border);
        $calendarElement.data('jsonData', opts.data);
        $calendarElement.data('ajaxSettings', opts.ajax);
        $calendarElement.data('legendList', opts.legend);
        $calendarElement.data('actionFunction', opts.action);
        $calendarElement.data('actionNavFunction', opts.action_nav);
        $calendarElement.data('events', opts.events);

        var dYear = '';
        var dMonth = '';
        var dDay = '';
        var latestMonthList = new Array();


        function drawCalendar() {
            var dateInitYear = parseInt($calendarElement.data('initYear'));
            var dateInitMonth = parseInt($calendarElement.data('initMonth')) - 1;
            var dateInitObj = new Date(dateInitYear, dateInitMonth, 1, 0, 0, 0, 0);
            $calendarElement.data('initDate', dateInitObj);

            var tableClassHtml = ($calendarElement.data('cellBorder') === true) ? ' table-bordered' : '';

            $tableObj = $('<table class="table' + tableClassHtml + '"></table>'); //日历列表
            $tableObj = drawTable($calendarElement, $tableObj, dateInitObj.getFullYear(), dateInitObj.getMonth());

            var eventDiv = drawEventListDiv($calendarElement);

            var $containerHtml = $('<div class="zabuto_calendar" id="' + $calendarElement.attr('id') + '"></div>');
            var out = $('<a/>').addClass('Addout').attr("id", "Addout");
            $containerHtml.append($tableObj);
            //$containerHtml.append($legendObj);
            $containerHtml.append(eventDiv);
            $containerHtml.append(out);

            $calendarElement.append($containerHtml);
            var adDay = new Date().getDate(); //获取当前日（1-31）
            var adMonth = new Date().getMonth(); //获取当前月份（0-11,0代表1月）
            var adYear = new Date().getFullYear(); //获取完整的年份4位

            drawEventList(dateAsString(adYear, adMonth, adDay));
            setEventClass();
            setEventListSize();
            $('select').selectric();
        }

        function drawTable($calendarElement, $tableObj, year, month) {
            var iyear = new Date().getFullYear();
            if (year < iyear - opts.minyear) {
                return true;
            }
            if (year > iyear + opts.maxyear) {
                return true;
            }
            dYear = year;
            dMonth = month;
            var dateCurrObj = new Date(year, month, 1, 0, 0, 0, 0);
            $calendarElement.data('currDate', dateCurrObj);
            var startDate = dateAsString(year, month, 1);
            var endDate = dateAsString(year, month, 31);
            loadEvents(startDate, endDate);

            $tableObj.empty();
            $tableObj = appendMonthHeader($calendarElement, $tableObj, year, month);
            $tableObj = appendDayOfWeekHeader($calendarElement, $tableObj);
            $tableObj = appendDaysOfMonth($calendarElement, $tableObj, year, month);
            $('select').selectric();
            if (dayRowsCount == 6) {
                $calendarElement.css("height", 429);
            } else {
                $calendarElement.css("height", 406);
            }

            return $tableObj;
        }

        //事件列表

        function drawEventListDiv($calendarElement) {
            var eventObj = $('<div/>').addClass('eventlist').attr('id', 'eventlistContent');
            var titleDiv = $('<div/>').addClass('eventtitle');
            var titleLately = $('<div/>').addClass('addEvent').html("近一个月").on("click", loadLatestMonth);
            var titleObj = $('<h4/>').html('事件列表');
            var eventContent = $('<div />').addClass('eventcontent');
            var addEventDiv = $('<div/>').addClass('addEvent').html("添加").on('click', addEvent);
            titleLately.addClass('titleLately');
            titleDiv.append(addEventDiv);
            titleLately.addClass('titleLately');
            titleDiv.append(titleLately);
            titleDiv.append(titleObj);
            eventObj.append(titleDiv);
            eventObj.append(eventContent);

            return eventObj;
        }

        function appendMonthHeader($calendarElement, $tableObj, year, month) {
            var navIcons = $calendarElement.data('navIcons');
            var $prevMonthNavIcon = $('<span><</span>');
            var $nextMonthNavIcon = $('<span>></span>');
            if (typeof(navIcons) === 'object') {
                if ('prev' in navIcons) {
                    $prevMonthNavIcon.html(navIcons.prev);
                }
                if ('next' in navIcons) {
                    $nextMonthNavIcon.html(navIcons.next);
                }
            }

            var prevIsValid = $calendarElement.data('showPrevious');
            if (typeof(prevIsValid) === 'number' || prevIsValid === false) {
                prevIsValid = checkMonthLimit($calendarElement.data('showPrevious'), true);
            }

            var $prevMonthNav = $('<div class="calendar-month-navigation"></div>');
            $prevMonthNav.attr('id', $calendarElement.attr('id') + '_nav-prev');
            $prevMonthNav.data('navigation', 'prev');
            if (prevIsValid !== false) {
                prevMonth = (month - 1);
                prevYear = year;
                if (prevMonth == -1) {
                    prevYear = (prevYear - 1);
                    prevMonth = 11;
                }
                $prevMonthNav.data('to', { year: prevYear, month: (prevMonth + 1) });
                $prevMonthNav.append($prevMonthNavIcon);
                if (typeof($calendarElement.data('actionNavFunction')) === 'function') {
                    $prevMonthNav.click($calendarElement.data('actionNavFunction'));
                }
                $prevMonthNav.click(function(e) {
                    drawTable($calendarElement, $tableObj, prevYear, prevMonth);
                    setEventClass();
                    var adDay = new Date().getDate(); //获取当前日（1-31）
                    var adMonth = new Date().getMonth(); //获取当前月份（0-11,0代表1月）
                    var adYear = new Date().getFullYear(); //获取完整的年份4位
                    if (prevYear == adYear && prevMonth + 1 == adMonth) {
                        drawEventList(dateAsString(prevYear, prevMonth + 1, adDay));
                    } else {
                        drawEventList(dateAsString(prevYear, prevMonth + 1, 1));
                    }
                    setEventListSize();
                });
            }

            var nextIsValid = $calendarElement.data('showNext');
            if (typeof(nextIsValid) === 'number' || nextIsValid === false) {
                nextIsValid = checkMonthLimit($calendarElement.data('showNext'), false);
            }

            var $nextMonthNav = $('<div class="calendar-month-navigation"></div>');
            $nextMonthNav.attr('id', $calendarElement.attr('id') + '_nav-next');
            $nextMonthNav.data('navigation', 'next');
            if (nextIsValid !== false) {
                nextMonth = (month + 1);
                nextYear = year;
                if (nextMonth == 12) {
                    nextYear = (nextYear * 1 + 1);
                    nextMonth = 0;
                }
                $nextMonthNav.data('to', { year: nextYear, month: (nextMonth + 1) });
                $nextMonthNav.append($nextMonthNavIcon);
                if (typeof($calendarElement.data('actionNavFunction')) === 'function') {
                    $nextMonthNav.click($calendarElement.data('actionNavFunction'));
                }
                $nextMonthNav.click(function(e) {
                    drawTable($calendarElement, $tableObj, nextYear, nextMonth);
                    setEventClass();
                    var adDay = new Date().getDate(); //获取当前日（1-31）
                    var adMonth = new Date().getMonth() + 1; //获取当前月份（0-11,0代表1月）
                    var adYear = new Date().getFullYear(); //获取完整的年份4位
                    if (nextYear == adYear && nextMonth == adMonth) {
                        drawEventList(dateAsString(nextYear, nextMonth - 1, adDay));
                    } else {
                        drawEventList(dateAsString(nextYear, nextMonth - 1, 1));
                    }
                    setEventListSize();
                });
            }

            var monthLabels = $calendarElement.data('monthLabels');

            var $prevMonthCell = $('<th></th>').append($prevMonthNav);
            var $nextMonthCell = $('<th></th>').append($nextMonthNav);
            //显示当前显示的月份

            var selectedYear = $('<select />').attr('id', 'lableYear').addClass('lable-select year');
            var iYear = new Date().getFullYear();
            var totalYear = iYear + opts.maxyear;
            iYear = iYear - opts.minyear;
            for (iYear; iYear < totalYear; iYear++) {
                var selectedYearOption1 = $('<option></option>').val(iYear + "").text(iYear + "");
                if (iYear == year) {
                    selectedYearOption1.attr('selected', true);
                }
                selectedYear.append(selectedYearOption1);
            }
            selectedYear.on('change', dateOnChange);
            var selectedMonth = $('<select />').attr('id', 'lableMonth').addClass('lable-select');
            for (var iMonth = 1; iMonth < 13; iMonth++) {
                var selectedMonthOption1 = $('<option></option>').val(iMonth + "").text(iMonth + "");
                if (iMonth == (month + 1)) {
                    selectedMonthOption1.attr('selected', true);
                }
                selectedMonth.append(selectedMonthOption1);
            }
            selectedMonth.on('change', dateOnChange);
            var $currMonthLabel = $('<span>' + monthLabels[month] + ' ' + year + '</span>');
            $currMonthLabel.dblclick(function() {
                var dateInitObj = $calendarElement.data('initDate');
                drawTable($calendarElement, $tableObj, dateInitObj.getFullYear(), dateInitObj.getMonth());
                setEventClass();
                setEventListSize();
            });

            var $currMonthCell = $('<th colspan="5"></th>');
            //$currMonthCell.append($currMonthLabel);
            var selectContent = $('<div />').addClass('selectContent');
            selectContent.append(selectedYear);
            selectContent.append("<span class='font-size font-size-first'>年</span>");
            selectContent.append(selectedMonth);
            selectContent.append("<span class='font-size'>月</span>");
            //$currMonthCell.append(selectedYear);
            //$currMonthCell.append("<span class='font-size font-size-first'>年</span>");
            //$currMonthCell.append(selectedMonth);
            //$currMonthCell.append("<span class='font-size'>月</span>");
            $currMonthCell.append(selectContent);
            var $monthHeaderRow = $('<tr class="calendar-month-header"></tr>');
            $monthHeaderRow.append($prevMonthCell, $currMonthCell, $nextMonthCell);

            $tableObj.append($monthHeaderRow);
            return $tableObj;
        }

        function appendDayOfWeekHeader($calendarElement, $tableObj) {
            if ($calendarElement.data('showDays') === true) {
                var weekStartsOn = $calendarElement.data('weekStartsOn');
                var dowLabels = $calendarElement.data('dowLabels');
                if (weekStartsOn === 0) {
                    var dowFull = $.extend([], dowLabels);
                    var sunArray = new Array(dowFull.pop());
                    dowLabels = sunArray.concat(dowFull);
                }

                var $dowHeaderRow = $('<tr class="calendar-dow-header"></tr>');
                $(dowLabels).each(function(index, value) {
                    $dowHeaderRow.append('<th>' + value + '</th>');
                });
                $tableObj.append($dowHeaderRow);
            }
            return $tableObj;
        }

        var dayRowsCount = 6;

        function appendDaysOfMonth($calendarElement, $tableObj, year, month) {
            var weeksInMonth = calcWeeksInMonth(year, month);
            var lastDayinMonth = calcLastDayInMonth(year, month);
            var firstDow = calcDayOfWeek(year, month, 1); //获取当前日期是星期几，从0对应日
            var lastDow = calcDayOfWeek(year, month, lastDayinMonth); //获取月末一天是星期几
            var currDayOfMonth = 1;
            dayRowsCount = 0;
            var weekStartsOn = $calendarElement.data('weekStartsOn');
            if (weekStartsOn === 0) {
                if (lastDow == 6) {
                    weeksInMonth++;
                }
                if (firstDow == 6 && (lastDow == 0 || lastDow == 1 || lastDow == 5)) {
                    weeksInMonth--;
                }
                firstDow++;
                if (firstDow == 7) {
                    firstDow = 0;
                }
            }

            for (var wk = 0; wk < weeksInMonth; wk++) {
                var $dowRow = $('<tr class="calendar-dow"></tr>');
                dayRowsCount += 1;
                for (var dow = 0; dow < 7; dow++) {
                    if (dow < firstDow || currDayOfMonth > lastDayinMonth) {
                        $dowRow.append('<td></td>');
                    } else {
                        var dateId = $calendarElement.attr('id') + '_' + dateAsString(year, month, currDayOfMonth);
                        var dayId = dateId + '_day';

                        var $dayElement = $('<div id="' + dayId + '" >' + currDayOfMonth + '</div>');
                        $dayElement.data('day', currDayOfMonth);

                        if ($calendarElement.data('showToday') === true) {
                            //给当前天或者当月第一天添加特殊样式
                            if (isToday(year, month, currDayOfMonth)) {
                                $dayElement.addClass('calendartoday');
                            } else if ((year != new Date().getFullYear() || month != new Date().getMonth()) && currDayOfMonth == 1) {
                                $dayElement.addClass('calendartoday');
                            } else {
                                //添加普通样式
                                $dayElement.addClass('day');
                            }
                        } else {
                            //添加普通样式
                            $dayElement.addClass('day');
                        }


                        var $dowElement = $('<td id="' + dateId + '"></td>');
                        $dayElement.data('date', dateAsString(year, month, currDayOfMonth));
                        if (dateAsString(year, month, currDayOfMonth) == dDay) {
                            $dowElement.addClass('itemclick');
                        }
                        $dowElement.append($dayElement);
                        $dowElement.data('date', dateAsString(year, month, currDayOfMonth));
                        $dowElement.data('hasEvent', true);
                        $dowElement.click(mouseClickItem);
                        $dowElement.addClass('dow-clickable');
                        if (typeof($calendarElement.data('actionFunction')) === 'function') {
                            $dowElement.addClass('dow-clickable');
                            $dowElement.click(function() {
                                $calendarElement.data('selectedDate', $(this).data('date'));
                            });
                            $dowElement.click($calendarElement.data('actionFunction'));
                        }
                        if (!isDayValid(year, month, currDayOfMonth)) {
                            $dowElement.off();
                        }
                        $dowRow.append($dowElement);
                        currDayOfMonth++;
                    }
                    if (dow == 6) {
                        firstDow = 0;
                    }
                }

                $tableObj.append($dowRow);
            }

            return $tableObj;
        }

        function drawLatestEventList() {
            var eventList = $('.eventcontent');
            $('.c-event-item').remove();
            $('.addEvent').css('display', 'block');
            var events = latestMonthList;
            drawEventListDetial(events,'drawLatestEventList');
        }

        function drawEventList(date) {
            var days = date.split('-');
            var eventList = $('.eventcontent');
            var tempMonth = parseInt(days[1]);
            $('.c-event-item').remove();
            if (!isDayValid(days[0], tempMonth - 1, days[2])) {
                item = $('<div/>').addClass('c-event-item');
                title = $('<div/>').addClass('title');
                title.html("当前日期已经超出提醒范围");
                title.append(cEditEvent);

                item.append(title); //.append(description);
                eventList.append(item);
                $('.addEvent').css('display', 'none');
                return;
            }
            $('.c-event-item').remove();
            $('.addEvent').css('display', 'block');
            var events = opts.events;
            drawEventListDetial(events, 'drawEventList',date);
        }

        function drawEventListDetial(events,type,date) {
            var eventList = $('.eventcontent');
            if (events != false) {
                for (var i = 0; i < events.length; i++) {
                    var value = events[i];
                    var d = value.datetime;
                    if (type == 'drawLatestEventList' || (type == 'drawEventList' && date == d)) {
                        //字符串比对，事件日期与当前需要显示日期相同时，则构造事件显示列表
                        //var date = lpad(d.getMonth()+1, 2) + '-' + lpad(d.getDate(), 2);
                        var item = $('<div/>').addClass('c-event-item').attr('eventIdDiv', value.id);
                        var title = $('<div/>').addClass('title');
                        var cEditEvent = $('<a/>').addClass('editEvent').attr('eventIdEditA', value.id);
                        cEditEvent.html('编辑').on('click', editEvent);
                        cEditEvent.attr('href', '#');
                        var cDelEvent = $('<a/>').addClass('editEvent').attr('eventiddela', value.id);
                        cDelEvent.html('删除').on('click', delEvent);
                        cDelEvent.attr('href', '#');
                        var cActionEvent = $('<a/>').addClass('editEvent').attr('eventiddela', value.id);
                        cActionEvent.html(value.linkTitle);
                        var urlPara = getUrlPara(value.PBPARANAME, value.PBPARA, value.type, value.PBCOMPARA);
                        if (urlPara.length > 0) {
                            cActionEvent.attr('href', value.PBACTION + '.do?' + urlPara);
                        } else {
                            cActionEvent.attr('href', value.PBACTION + '.do');
                        }
                        if (value.type == "8") {
                            //针对缴费类型事件，需要跳转新的浏览器窗口
                            cActionEvent.attr("target", "_blank");
                        }
                        cActionEvent.attr('data-pos', value.DATAPOS);
                        cActionEvent.click(function () {
                            $.setPosInfo($(this).attr('data-pos'));
                        });
                        var Date = $('<span/>').addClass('Date').html(value.datetime);
                        var descriPtion = $('<span/>').addClass('DescriPtion').html(value.description);

                        var div1 = $("<div/>").addClass("left");
                        div1.append(Date);
                        div1.append(descriPtion);
                        var div2 = $("<div/>").addClass("right");
                        title.append(div1);
                        var isEdit = value.ISEDIT + "";
                        if (isEdit == "1") {
                            div2.append(cDelEvent);
                            div2.append(cEditEvent);
                        }
                        if (value.linkTitle != null && value.linkTitle != undefined && value.linkTitle.length > 1) {
                            div2.append(cActionEvent);
                        }
                        title.append(div2);
                        //var description = $('<div/>').addClass('description').html(value.description + '<br/>');
                        item.attr('data-event-day', d);
                        item.append(title); //.append(description);
                        eventList.append(item);
                    }

                }
            }
            var eventItems = $(".c-event-item");
            if (eventItems.length < 1) {
                //此时没有可提示事件，引导用户添加自定义事件
                item = $('<div/>').addClass('c-event-item');
                title = $('<div/>').addClass('title');
                /*cEditEvent = $('<a/>').addClass('editEvent');
                cEditEvent.html('添加').on('click', addEvent);*/
                /*cEditEvent.attr('href', '#');*/
                title.html("当前日期没有事件，可通过右侧按钮添加提醒");
                /*title.append(cEditEvent);*/

                item.append(title); //.append(description);
                eventList.append(item);
            }
        }

        function getUrlPara(paraName, paraValue,type,comParaValue) {
		    var paraNameList = paraName.split("|");
		    var valueList = paraValue.split("|");
		    var urlPara = "";
		    var pbComPara = "";
		    if (comParaValue != null) {
		        pbComPara = comParaValue;
		    }
		    if (valueList != null && valueList.length > 0 && paraName.length > 1 && paraNameList.length == valueList.length) {
		        urlPara = paraNameList[0] + '=' + valueList[0];
		        for (var urlIndex = 1; urlIndex < valueList.length; urlIndex++) {
		            urlPara = urlPara + "&";
		            urlPara = urlPara + paraNameList[urlIndex] + '=' + valueList[urlIndex];
		        }
		        if (pbComPara.length > 1) {
		            urlPara = urlPara + "&";
		            urlPara = urlPara + pbComPara;
		        }
            } else {
                if (pbComPara.length > 1) {
                    urlPara = urlPara + pbComPara;
                }
            }
		    switch (type) {
		        case '2':
		            urlPara = urlPara + "&ccRepayForm_bk=CcBack2";
		            break;
		        case '3':
		            urlPara = urlPara + '&sourceAction=index.ebf';
		            break;
		    }
		    return urlPara;
		}

		function setEventListSize() {
		    var tableContent = $(".zabuto_calendar>table");
		    var height = tableContent.height();
		    var eventList = $(".eventlist");
		    eventList.height(height);
		    if (height > 0) {
		        $(".eventcontent").height(height - 40);
		    } else {
		        $(".eventcontent").height(333);
		    }
		    
		}

		/*事件响应函数*/
		var delEvent = function () {
		    var eventId = $(this).attr('eventiddela');
		    dDay = $('div[eventiddiv=' + eventId + ']').attr('data-event-day');
		    //confirm('确定要删除该事件吗？');
		    var json = new Object();
		    json.eventId = eventId;
		    delEvents(json);
		}
        var editEvent = function() {

            var eventId = $(this).attr('eventIdEditA');

            var addEventFlag = $('.addClassDate');

            if (addEventFlag.length > 0) {
                return;
            }
            for (var i = 0; i < opts.events.length; i++) {
                if (opts.events[i].id == eventId) {
                    var title = opts.events[i].title;
                    var description = opts.events[i].description;
                    var eventDate = opts.events[i].datetime;
                    var eventList = $('.eventcontent');
                    var obj = opts.events[i];
                    if (eventList.length > 0) {
                        //eventList.prepend(printIputEventDialog(eventDate, title, description, eventId));
                        printIputEventDialog(eventDate, title, description, eventId, obj);
                    }
                    return;
                }
            }
        };
		
		function loadLatestMonth() {
		    //获取近一月的数据
		    var json = new Object();

		    var nowDateObj = new Date();
		    var sYear = new Date(nowDateObj.getTime()).getFullYear();
		    var sMonth = new Date(nowDateObj.getTime()).getMonth() + 1 + '';
		    var sDay = new Date(nowDateObj.getTime()).getDate() + '';
		    var eYear = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 30).getFullYear();
		    var eMonth = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 30).getMonth() + 1 + '';
		    var eDay = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 30).getDate() + '';
		    if (sMonth.length < 2) {
		        sMonth = '0' + sMonth;
		    }
		    if (eMonth.length < 2) {
		        eMonth = '0' + eMonth;
		    }
		    if (sDay.length < 2) {
		        sDay = '0' + sDay;
		    }
		    if (eDay.length < 2) {
		        eDay = '0' + eDay;
		    }
		    json.startDate = sYear + '-' + sMonth + '-' + sDay;
		    json.endDate = eYear + '-' + eMonth + '-' + eDay;
		    json.eventType = '4';
		    $.ajax({
		        type: "post",
		        url: opts.url,
		        data: json,
		        async: false,
		        dataType: 'json',
		        success: function (data) {
		            if (data.errorCode != undefined && data.errorCode.length > 0) {
		                alert(data.errorCode + ":" + data.userErrorMsg);
		                return;
		            }
		            if (data.length > 0) {
		                latestMonthList.splice(0, latestMonthList.length);
		                for (var i = 0; i < data.length; i++) {
		                    var eventObj = new Object();
		                    eventObj.custid = data[i].custid;
		                    eventObj.id = data[i].id;
		                    eventObj.datetime = data[i].datetime;
		                    eventObj.title = data[i].title;
		                    eventObj.description = data[i].description;
		                    eventObj.type = data[i].type;
		                    eventObj.PBPARA = data[i].PBPARA;
		                    eventObj.ISEDIT = data[i].ISEDIT;
		                    eventObj.ISCHOICE = data[i].ISCHOICE;
		                    eventObj.PBACTION = data[i].PBACTION;
		                    eventObj.linkTitle = data[i].linkTitle;
		                    eventObj.COMPARA = data[i].COMPARA;
		                    eventObj.PBPARANAME = data[i].PBPARANAME;
		                    eventObj.DATAPOS = data[i].DATAPOS;
		                    eventObj.PBCOMPARA = data[i].PBCOMPARA;
		                    latestMonthList.push(eventObj);
		                }
		            }
		        }
		    });
		    drawLatestEventList();
		}

		function addEvent()
		{
			var selectItem=$('.itemclick');
			var addEventFlag=$('.addClassDate');
			var nowDay=$('.calendartoday');
			var d;
			if(selectItem.length>0)
			{
				d=selectItem.data('date');
			}
			else
			{
				d=nowDay.data('date');
			}
			var ds = d.split('-');
			if (!isDayValid(ds[0], ds[1]-1, ds[2])) {
			    
			}
			if(addEventFlag.length>0)
			{
				return;
			}
			var eventList=$('.eventcontent');
			if(selectItem.length<1)
			{
				//此时添加事件到当前天
				if(eventList.length>0)
				{
				    //eventList.prepend(printIputEventDialog(d,'','',''));
				    printIputEventDialog(d, '', '', '',null);
				}
			}
			else
			{
				//此时添加日期到选中天
			    //eventList.prepend(printIputEventDialog(d,'','',''));
			    printIputEventDialog(d, '', '', '',null);
			}
		}
		function selectOnChange() {
		    var index = this.selectedIndex;
		    var value = this.options[index].value + '';
		    var text = this.options[index].text+'';
		    var cLable = $('label[data="eventcontent"]');
		    if (cLable.length > 0) {
		        
		        if (value == '3') {
		            cLable.html('还款金额');
		        }
		        else if (value == '0') {
		            cLable.html('事件内容');
		        }
		    }
		}
		function dateOnChange() {
		    var selectYearObj = $('#lableYear');
		    var selectMonthObj = $('#lableMonth');
		    var selcetYear = selectYearObj.val();
		    var selectMonth = selectMonthObj.val();
		    var tableTemp = $('.zabuto_calendar > table');
		    drawTable($calendarElement, tableTemp, selcetYear, selectMonth - 1);
		    setEventClass();
		    var adDay = new Date().getDate();//获取当前日（1-31）
		    var adMonth = new Date().getMonth();//获取当前月份（0-11,0代表1月）
		    var adYear = new Date().getFullYear();//获取完整的年份4位
		    if (selcetYear == adYear && selectMonth == adMonth) {
		        drawEventList(dateAsString(selcetYear, selectMonth-1, adDay));
		    }
		    else {
		        drawEventList(dateAsString(selcetYear, selectMonth-1, 1));
		    }
		    setEventListSize();
		}
		function isDayValid(year,month,day) {
		    var nowDateObj = new Date();
		    var endDateObj = new Date(nowDateObj.getTime() + 60 * 60 * 24 * 1000 * 365);
		    var showDateObj = new Date(year,month,day);
		    var dt1 = Date.parse(showDateObj);
		    var dt2 = Date.parse(endDateObj);
		    if (dt2>=dt1) {
		        return true;
		    } else {
		        return false;
		    }
		}
		function printIputEventDialog(date, title, content, id,eventObj) {
		    var addEventContent = $('<div />').addClass('eventlist').attr('id','addEventContent');
		    var eventListContent = $('#' + 'eventlistContent');
		    eventListContent.hide();
		    var main = $('.zabuto_calendar');
		    /*构造输入模板*/
		    var cAddBg = $('<div/>').addClass('c-new-event');
		    var cH2 = $('<h4/>').addClass('addeventtitle').html('事件提醒');
		    var cAddEventDiv=$('<div/>').addClass('addEvent').html("");
		    var titleLately = $('<div/>').addClass('addEvent').html("近一个月").on("click", loadLatestMonth);
		    titleLately.addClass('titleLately');
		    cAddEventDiv.addClass('cAddEventDiv');
		    cAddBg.append(cAddEventDiv);
			//cAddBg.append(titleLately);
		    cAddBg.append(cH2);
		    var cForm = $('<form/>');
		    var cU1 = $('<ul />').addClass('addevent-ul');//.html('<li><label>'+date+'</label><a href="#">取消</a><a href="#">完成</a></li>');
		    var cLi1 = $('<li />').addClass('addevent-li').html('<label>事件日期</label>');
		    var cLableDate = $('<label/>').addClass('addClassDate').attr('id', 'lAddEventId');
		    cLableDate.html(date);
		    cLi1.append(cLableDate);
		    var cACancel = $('<a/>').addClass('btn').on('click', addEventCancel).html('取消').attr('href', '#');
		    var cASave = $('<a/>').addClass('btn').on('click', addEventOk).html('保存').attr('href', '#');
		    
		    
		    cACancel.addClass('btn-secondary');
		    cASave.addClass('btn-primary');
		    
		    cACancel.addClass('addEventBtn');
		    cASave.addClass('addEventBtn');
		    cACancel.addClass('secondary');
		    
		    cU1.append(cLi1);
			cForm.append(cU1);
			
		    var selectIndex = 0;
		    var eventContentText = "事件内容";
		    var eventContent = content;
		    if (eventObj != null) {
		        var eventType = eventObj.type;
		        if (eventType == '3') {
		            selectIndex = 1;
		            eventContentText = "还款金额";
		            //eventContent = eventObj.PBPARA;
		            eventContent = eventObj.PBPARA;
		        } 
		    }

		    var cU11 = $('<ul />').addClass('addevent-ul');
		    var cLi11 = $('<li />').addClass('addevent-li');
		    var cUBtn = $('<ul />').addClass('addevent-ul');
		    var cLiBtn = $('<li />').addClass('addevent-li');
		    var cLable11 = $('<label/>').html('事件类型');
		    var cSelect11 = $('<select/>').attr('id','iAddEventType');
		    var cS11Option1 = $('<option></option>').val('0').text('其他');
		    var cS11Option2 = $('<option></option>').val('3').text('个贷还款');
		    cSelect11.addClass("cSelect form-control");
		    cSelect11.on('change', selectOnChange);
		    cSelect11.append(cS11Option1);
		    cSelect11.append(cS11Option2);
		    cSelect11[0].options[selectIndex].selected = true;
		    var selectSpan = $('<div/>').addClass("addEventSelectContent");
		    cLi11.append(cLable11);
		    selectSpan.append(cSelect11);
		    cLi11.append(selectSpan);
		    cLiBtn.append(cASave);
		    cLiBtn.append(cACancel);
		    cU11.append(cLi11);
		    cLiBtn.addClass("cLiBtn");
		    cUBtn.append(cLiBtn);

		    var cU2 = $('<ul style="display:none"/>').addClass('addevent-ul');
		    var cLi2 = $('<li />').addClass('addevent-li');
		    var cLable2 = $('<label/>').html('事件名称：');
		    var cInput2 = $('<input />').attr('type', 'text').val(title).attr('id', 'iAddEventTitle').attr('eventId', id);//.css("display", "none");
		    cInput2.addClass("cSelect form-control");
		    cLi2.append(cLable2);
		    cLi2.append(cInput2);
		    cU2.append(cLi2);

		    var cU3 = $('<ul />').addClass('addevent-ul').css("clear","both");
		    var cLi3 = $('<li />').addClass('addevent-li');
		    var cLable3 = $('<label data="eventcontent"/>').html(eventContentText);
		    var cInput3 = $('<input/>').attr('type', 'text').val(eventContent).attr('id', 'iAddEventContent');
		    cInput3.addClass("cSelect form-control");
		    cLi3.append(cLable3);
		    cLi3.append(cInput3);
		    cU3.append(cLi3);

		    cForm.append(cU11);
		    cForm.append(cU2);
		    cForm.append(cU3);
		    cAddBg.append(cForm);
		    addEventContent.append(cAddBg);
		    main.append(addEventContent);
		    cForm.append(cUBtn);
		    $('select').selectric();
		}
		var addEventCancel=function()
		{
			var newEvent=$('.c-new-event');
			if(newEvent.length>0)
			{
				newEvent.remove();
			}var addEventContent = $('#' + 'addEventContent');
			if (addEventContent.length > 0) {
			    addEventContent.remove();
			}
		    var eventListContent = $('#' + 'eventlistContent');
			eventListContent.show();
		}
        
		function isMoney(limit) {
		    var regMoney = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
		    if (RegExpNumber(regMoney, limit) == false) {
		        //alert("金额应为数字，请重新输入！");
		        return false;
		    }
		    return true;
		}
		function RegExpNumber(reg, str) {
		    return reg.test(str);
		}

        var addEventOk = function() {
            //保存用户设置数据，并清除编辑事件输入框
            //var newEvent = $('.c-new-event');
            var addEventContent = $('#' + 'addEventContent');
            var addEventSel = $('#' + 'iAddEventType');
            var index = addEventSel[0].selectedIndex;
            var selValue = addEventSel[0].options[index].value + '';
            if (addEventContent.length > 0) {
                var iAddEventTitle = $('#iAddEventTitle').val();
                var iAddEventContent = $('#iAddEventContent').val();
                var iAddEventDate = $('#lAddEventId').html();
                dDay = iAddEventDate;
                var eventId = $('#iAddEventTitle').attr('eventId');

                if (iAddEventContent == '') {
                    if (selValue == '0') {
                        alert('事件内容不能为空');
                        return;
                    }
                }
                if (selValue == "0") {
                    if (iAddEventContent.length > 20) {
                        alert("事件内容长度超过20！");
                        return;
                    }
                }
                if (selValue == "3" && iAddEventContent != null && iAddEventContent.length > 0) {
                    if (!isMoney(iAddEventContent)) {
                        alert("金额格式不合法！");
                        return;
                    }
                }
                var eventObject = new Object();
                eventObject.eventTitle = iAddEventTitle;
                if (selValue == '0') {
                    eventObject.eventContent = iAddEventContent;
                } else if (selValue == '3') {
                    eventObject.eventContent = "贷款还款";
                    eventObject.PBPARA = iAddEventContent;
                }

                eventObject.eventDate = iAddEventDate;
                if (eventId == '') {
                    eventObject.eventId = '';
                    eventObject.eventType = selValue;
                    addEventContent.remove();
                    saveEvents(eventObject);
                } else {
                    eventObject.eventId = eventId;
                    eventObject.eventType = selValue;
                    addEventContent.remove();
                    saveEvents(eventObject);
                }

            }
            var eventListContent = $('#' + 'eventlistContent');
            eventListContent.show();
        };
		
		function saveEvents(json) {
            if (typeof opts.saveurl != 'undefined' && opts.saveurl != '') {
                $.ajax({
                    type: "post",
                    url: opts.saveurl,
                    data: json,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        //保存数据成功后刷新整个界面
                        if (data.errorCode != undefined && data.errorCode.length>0) {
                            alert(data.errorCode + ":" + data.userErrorMsg);
                            return;
                        }
                        var tableTemp = $('.zabuto_calendar > table');
                        drawTable($calendarElement, tableTemp, dYear, dMonth);
                        setEventClass();
                        drawEventList(dDay);
                        setEventListSize();
                    },
                    error: function (XMLHttpRequst, textStatus, errorThrown) {
                        alert(textStatus + '|' + errorThrown);
                    }
                });
            }
        }
		function loadEvents(startDate, endDate) {
            if (typeof opts.url != 'undefined' && opts.url != '') {
                var json = new Object();
                json.startDate = startDate;
                json.endDate = endDate;
                json.eventType = '4';
                $.ajax({
                    type: "post",
                    url: opts.url,
                    data: json,
                    async: false,
                    dataType:'json',
                    success: function (data) {
                        if (data.errorCode != undefined && data.errorCode.length > 0) {
                            alert(data.errorCode + ":" + data.userErrorMsg);
                            return;
                        } else {
                            opts.events.splice(0, opts.events.length);
                        }
                        if (data.length > 0) {
                            
                            for (var i = 0; i < data.length; i++) {
                                var eventObj = new Object();
                                eventObj.custid = data[i].custid;
                                eventObj.id = data[i].id;
                                eventObj.datetime = data[i].datetime;
                                eventObj.title = data[i].title;
                                eventObj.description = data[i].description;
                                eventObj.type = data[i].type;
                                eventObj.PBPARA = data[i].PBPARA;
                                eventObj.ISEDIT = data[i].ISEDIT;
                                eventObj.ISCHOICE = data[i].ISCHOICE;
                                eventObj.PBACTION = data[i].PBACTION;
                                eventObj.linkTitle = data[i].linkTitle;
                                eventObj.COMPARA = data[i].COMPARA;
                                eventObj.PBPARANAME = data[i].PBPARANAME;
                                eventObj.DATAPOS = data[i].DATAPOS;
                                eventObj.PBCOMPARA = data[i].PBCOMPARA;
                                opts.events.push(eventObj);
                            }
                        }
                    }
                });
            }
        }

        function delEvents(json) {
            if (typeof opts.delurl != 'undefined' && opts.delurl != '') {
                $.ajax({
                    type: "post",
                    url: opts.delurl,
                    data: json,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        if (data.errorCode != undefined && data.errorCode.length > 0) {
                            alert(data.errorCode + ":" + data.userErrorMsg);
                            return;
                        }
                        var tableTemp = $('.zabuto_calendar > table');
                        drawTable($calendarElement, tableTemp, dYear, dMonth);
                        setEventClass();
                        drawEventList(dDay);
                        setEventListSize();
                    },
                    error: function (XMLHttpRequst, textStatus, errorThrown) {
                        alert(textStatus + '|' + errorThrown);
                    }
                });
            }
        }

		function mouseClickItem()
		{
			var d=$(this).data('date');
			$('.itemclick').removeClass('itemclick');
			$(this).addClass('itemclick');
			drawEventList(d);
			 $('.addClassDate').html(d);
			//给该标签设置当前的点击日期
			//showEventList(d);
		}
		
        /* ----- Event functions ----- */
        //获取事件日期添加样式
        function setEventClass() {
            var events = opts.events;
            if (events != false) {
                for (var i = 0; i < events.length; i++) {
                    var tempDate = events[i].datetime;
                    var dayId = '#calendar_' + tempDate + '_day';
                    var dayObj = $(dayId);
                    dayObj.addClass('eventFlag');
                    /*var dayEventId = 'eventid_' + tempDate;
                    var eventDiv = $('<div />').html('.').attr('id', dayEventId);
                    var getEventDiv = $('#' + dayEventId);
                   
                    if (getEventDiv.length < 1) {
                        //dayObj.removeClass();
                        //dayObj.addClass('eventFlag');
                        var divFlag = $('<div style="background: red;width: 5px;height: 5px;margin-left: 43%;margin-top:1px;"/>').attr('id', dayEventId);//.addClass('event-dot');
                        dayObj.append(divFlag);
                    }*/

                }
            }
        }
        /* ----- Helper functions ----- */

        function isToday(year, month, day) {
            var tempYear = new Date().getFullYear();
            var tempMonth = new Date().getMonth();
            var tempDay = new Date().getDate();
            return (year==tempYear && month==tempMonth && day==tempDay);
        }

        function dateAsString(year, month, day) {
            d = (day < 10) ? '0' + day : day;
            m = month*1 + 1;
            m = (m < 10) ? '0' + m : m;
            return year + '-' + m + '-' + d;
        }

        function calcDayOfWeek(year, month, day) {
            var dateObj = new Date(year, month, day, 0, 0, 0, 0);
            var dow = dateObj.getDay();
            /*if (dow == 0) {
                dow = 6;
            } else {
                dow--;
            }*/
            return dow;
        }

        function calcLastDayInMonth(year, month) {
            var day = 28;
            while (checkValidDate(year, month + 1, day + 1)) {
                day++;
            }
            return day;
        }

        function calcWeeksInMonth(year, month) {
            var daysInMonth = calcLastDayInMonth(year, month);
            var firstDow = calcDayOfWeek(year, month, 1);
            var lastDow = calcDayOfWeek(year, month, daysInMonth);
            var days = daysInMonth;
            var correct = (firstDow - lastDow);
            if (correct > 0) {
                days += correct;
            }
            return Math.ceil(days / 7);
        }

        function checkValidDate(y, m, d) {
            return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
        }

        function checkMonthLimit(count, invert) {
            if (count === false) {
                count = 0;
            }
            var d1 = $calendarElement.data('currDate');
            var d2 = $calendarElement.data('initDate');

            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth() + 1;
            months += d2.getMonth();

            if (invert === true) {
                if (months < (parseInt(count) - 1)) {
                    return true;
                }
            } else {
                if (months >= (0 - parseInt(count))) {
                    return true;
                }
            }
            return false;
        }

        drawCalendar();
    }); // each()

    return this;
};

/**
 * Default settings
 *
 * @returns object
 *   language:          string,
 *   year:              integer,
 *   month:             integer,
 *   show_previous:     boolean|integer,
 *   show_next:         boolean|integer,
 *   cell_border:       boolean,
 *   today:             boolean,
 *   show_days:         boolean,
 *   weekstartson:      integer (0 = Sunday, 1 = Monday),
 *   nav_icon:          object: prev: string, next: string
 *   ajax:              object: url: string, modal: boolean,
 *   legend:            object array, [{type: string, label: string, classname: string}]
 *   action:            function
 *   action_nav:        function
 */
$.fn.zabuto_calendar_defaults = function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var settings = {
        language: false,
        year: year,
        month: month,
        show_previous: true,
        show_next: true,
        cell_border: false,
        today: true,
        show_days: true,
        weekstartson: 1,
        nav_icon: false,
        data: false,
        ajax: false,
        legend: [{ 'type': 'text', 'label': 'adsfasdf', 'classname': 'aaaaaa' }],
        action: false,
        action_nav: false,
        minyear: 2,
        maxyear: 10,
        url: 'GetCalendarEvents.do',
        onClose: null,
        saveurl: 'SaveCalendarEvent.do',
        delurl: 'DeleteCalendarEvent.do',
		events:[/*{title: '信用卡', description: '信用卡还款', datetime: '2016-04-01',type:'',id:'00001',url:''},
            {title: '信用卡', description: '信用卡还款', datetime: '2016-02-01',type:'',id:'00002',url:''},
            {title: '信用卡', description: '信用卡还款', datetime: '2016-03-07',type:'',id:'00003',url:''},
			{title: '信用卡', description: '信用卡还款', datetime: '2016-03-07',type:'',id:'00004',url:''}*/]
    };
    return settings;
};

/**
 * Language settings
 *
 * @param lang
 * @returns {{month_labels: Array, dow_labels: Array}}
 */
$.fn.zabuto_calendar_language = function (lang) {
    if (typeof(lang) == 'undefined' || lang === false) {
        lang = 'en';
    }

    switch (lang.toLowerCase()) {
        case 'en':
            return {
                month_labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                dow_labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            };
            break;

		case 'zh-cn':
            return {
                month_labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                dow_labels: ["日","一", "二", "三", "四", "五", "六"]
            };
            break;

    }

};
