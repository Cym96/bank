$(function () {
    var navMenu = [];
    var subMenus = [];
    var thirdMenus = [];
    var fourthMenus = [];
    var iTime = null;
    generateMenuData(function () {
        var url = "";
        var menuContent = [];
        menuContent.push('<ul>');
        var wlen = parseInt((730 - 54) / (navMenu.length - 1));
        for (var i = 0, navLen = navMenu.length; i < navLen; i++) {
            url = navMenu[i].actionName;
            var navName = navMenu[i].menuName;
            if (url === 'index') { //首页
                menuContent.push('<li class="active index" style="width:' + wlen + 'px;" loc="' + url + '"><span>' + navName + '</span></li>');
            }
            else {
                if (i == navLen - 1) menuContent.push('<li class="sec-menu last">' + navName);
                else menuContent.push('<li class="sec-menu" style="width:' + wlen + 'px;" data-value="' + navName + '">' + navName);
                menuContent.push('<div class="triangle hide"></div>');
                menuContent.push('<ul class="sec-list hide">');
                var subList = getSubList(navName);
                if (subList != null && subList.length > 0) {
                    for (var j = 0, subLen = subList.length; j < subLen; j++) {
                        var name = subList[j].name;
                        url = subList[j].url;
                        if (subList[j].childList.length > 0) { //有三级菜单
                            menuContent.push('<li loc="" data-value="' + name + '">' + name + '<b class="triangle-white"></b>');
                            menuContent.push('<ul class="third-list hide">');
                            var trdList = getThirdList(navName, name);
                            for (var k = 0, trdLen = trdList.length; k < trdLen; k++) {
                                var trdname = trdList[k].childName;
                                url = trdList[k].url;
                                var trdLevel = navName + '/' + name + '/' + trdname;
                                menuContent.push('<li loc="' + url + '" data-value="' + trdLevel + '"><span>' + trdname + '</span></li>');
                            }
                            menuContent.push('</ul></li>');
                        }
                        else { //无三级菜单
                            var sndLevel = navName + '/' + name;
                            menuContent.push('<li loc="' + url + '" data-value="' + sndLevel + '">' + name + '</li>');
                        }
                    }
                }
                menuContent.push('</ul></li>');
            }
        }
        menuContent.push('</ul>');
        $('#menuNav').html(menuContent.join(''));
    });

    //    菜单
    //    index
    $(".index").bind("click", function () {
        $(".nav .sec-menu").removeClass("active");
        $(".menu-wrap span").removeClass("hide");
        $(".clicked").removeClass("clicked");
        $(".nav .sec-menu .sec-list").addClass("hide");
        $(".nav .sec-menu .triangle").addClass("hide");
        $(this).addClass("active");
        $(".location-wrap").addClass("hide");
        $('#contentFrame').prop('src', 'index.do')
    })
    //    一级
    $(".nav .sec-menu").bind("click", function () {
        $(".nav .sec-menu .sec-list").addClass("hide");
        $(".nav .sec-menu .triangle").addClass("hide");
        $(this).children(".sec-list").removeClass("hide");
        $(this).children(".triangle").removeClass("hide");
        $(".menu-wrap span").addClass("hide");
    })
    //    二级
    $(".nav .sec-list>li").bind("mouseover", function () {
        $(".nav .sec-list>li").removeClass("active");
        $(".third-list").addClass("hide");
        $(this).addClass("active");
        $(this).children(".third-list").removeClass("hide");
    }).bind("mouseleave", function () {
        $(this).removeClass("active");
        $(this).children('.third-list').addClass('hide');
    });
    $(".nav .sec-menu").bind("mouseenter", function () {
        setLocation(this);
    });
    $(".nav .third-list>li").bind("mouseover", function () {
        $(this).parent().removeClass("hide");
    }).bind("mouseleave", function () {
        $(this).parent().addClass("hide");
    });
    function setLocation(obj) {
        var num = $(obj).children(".sec-list").children("li").length;
        var index = $(obj).index();
        var width1 = $(obj).width();
        var width2 = $(obj).children(".sec-list").children("li").width();
        var checkWidth = ($(".nav .sec-menu").length - 1 - index) * width1 + 54;
        var needWidth = num * width2;
        $(obj).children(".sec-list").css("width", num * width2 + "px");
        if (checkWidth > needWidth / 2) {
            $(obj).children(".sec-list").css("marginLeft", -needWidth / 2 + width1 / 2 + "px");
        } else {
            $(obj).children(".sec-list").css("marginLeft", -needWidth + checkWidth + width2 - 31 + "px");
        }
    }
    //    二级点击
    $(".nav .sec-list>li").bind("click", function () {
        $(".nav>ul>li").removeClass("clicked");
        $(".nav>ul>li").removeClass("active");
        $(".sec-list>.clicked").removeClass("clicked");
        $(this).parent().parent().addClass("active");
        $(this).parent().parent().addClass("clicked");
        $(this).addClass("active");
        $(this).addClass("clicked");      
        $(".third-list .clicked").removeClass("clicked");
        //清除可能存在的引导
        if (typeof (tour) !== 'undefined' && typeof (tour._currentStep) !== 'undefined') {
            tour.exit();
        }
        var loc = $(this).attr('loc');
        if (loc != undefined && loc != '') {
            var locArr = loc.split('?');
            if (locArr.length == 2 && locArr[1] == 'openNew') {
                window.open(locArr[0] + '.do', locArr[0] + '');
            }
            else {
            $.setPosInfo($(this).attr('data-value'));
                $('#contentFrame').attr('src', loc+'.do');
            }
        }
    })
    //    位置
    $(".nav .third-list>li").bind("click", function () {
        $(this).addClass("clicked");
        $(this).parent().addClass("hide");
        //清除可能存在的引导
        if (typeof (tour) !== 'undefined' && typeof (tour._currentStep) !== 'undefined') {
            tour.exit();
        }
        var loc = $(this).attr('loc');
        if (loc != undefined && loc != '') {
            var locArr = loc.split('?');
            if (locArr.length == 2 && locArr[1] == 'openNew') {
                window.open(locArr[0] + '.do', locArr[0] + '');
            }
            else {
            $.setPosInfo($(this).attr('data-value'));
                $('#contentFrame').attr('src', loc + '.do');
            }
        }
    })

    function generateMenuData(callback) {
        var menuData = data.menuList;
        for (var i = 0, len = menuData.length; i < len; i++) {
            navMenu.push({ "menuName": menuData[i].menuName, "actionName": menuData[i].actionName });
            var temp = [];
            subMenus.push({ "parentName": menuData[i].menuName, "childList": getMenuList(menuData[i].subMenu, temp) })
            for (var j = 0; j < temp.length; j++) {
                var temp1 = [];
                thirdMenus.push({ "parentName": menuData[i].menuName + '-' + temp[j].parentName, "childList": getMenuList(temp[j].childList, temp1) });
                for (var k = 0; k < temp1.length; k++) {
                    fourthMenus.push({ "parentName": temp1[k].parentName, "childList": getMenuList(temp1[k].childList, []) });
                }
            }
        }
        callback();
    }
    function getMenuList(menuList, container) {
        var childList = [];
        for (var i = 0; i < menuList.length; i++) {
            container.push({ "childList": menuList[i].subMenu, "parentName": menuList[i].menuName });
            childList.push({
                "childName": menuList[i].menuName,
                "url": menuList[i].actionList.length > 0 ? menuList[i].actionList[0].actionName : ""
            })
        }
        return childList;
    }
    function getSubList(navName) {
        var subList = [];
        var temp = [];
        for (var i = 0; i < subMenus.length; i++) {
            if (subMenus[i].parentName == navName) {
                temp = subMenus[i].childList;
                break;
            }
        }
        for (var i = 0; i < temp.length; i++) {
            subList.push({
                "name": temp[i].childName,
                "url": temp[i].url,
                "childList": getThirdList(navName, temp[i].childName)
            });
        }
        return subList;
    }
    function getThirdList(navName, subName) {
        for (var i = 0; i < thirdMenus.length; i++) {
            if (thirdMenus[i].parentName == navName + '-' + subName) {
                return thirdMenus[i].childList;
                break;
            }
        }
    }
    function getFourthList(thirdName) {
        for (var i = 0; i < fourthMenus.length; i++) {
            if (fourthMenus[i].parentName == thirdName) {
                return fourthMenus[i].childList;
                break;
            }
        }
        return [];
    }
    function getMenuListByName(menuName) {
        var result = [];
        for (var i = 0; i < subMenus.length; i++) {
                for (var j = 0; j < subMenus[i].childList.length; j++) {
                    if (subMenus[i].childList[j].childName.indexOf(menuName) != -1) {
                    result.push({ "parentName": subMenus[i].parentName, "menuName": subMenus[i].childList[j].childName, "menuUrl": subMenus[i].childList[j].url });
                    }
                }
        }
        return result;
    }
    function strFormat(pattern, params) {
        var result = pattern;
        for (var i = 0; i < params.length; i++) {
            result = result.replace('{' + i + '}', params[i]);
        }
        return result;
    }

    //产品搜索
    $('#m-search-btn').on('click', function () {
        var searchContent = $('#pro_search').val();
        if (searchContent != '') {
            var proInfo = { "searchText": searchContent }
            searchForm.productInfo.value = JSON.stringify(proInfo);
            searchForm.submit();
        }
    });
    $('#pro_search').on('keydown', function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            var searchContent = $('#pro_search').val();
            if (searchContent != '') {
                var proInfo = { "searchText": searchContent }
                searchForm.productInfo.value = JSON.stringify(proInfo);
                searchForm.submit();
            }
        }
    });

});
