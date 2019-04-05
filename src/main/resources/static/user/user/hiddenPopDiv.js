//显示灰色JS遮罩层
function showBg(hideDivClass, dialogClass,isScroll) {
    var bH = Math.max($("body").height(), $('.' + dialogClass).height()) + 90;
    bH = Math.max(bH, parent.getFrameHeight());
    //var bH = $("body").height();
    var bW = $("body").width() + 16;

    var objWH = getObjWh(dialogClass);
    $("." + hideDivClass).css({width: bW, height: bH, display: "block"});
    var tbT = objWH.split("|")[0];
    if ($('.' + dialogClass).height() > 500) {
        tbT = "20";
    }
    var tbL = objWH.split("|")[1];

    $("." + dialogClass).css({ top: tbT + 'px', left: tbL + 'px', display: "block" });
  if (isScroll) {
    $(parent.window).scrollTop(tbT);
  }
  $(window).resize(function () {
	    resetBg(hideDivClass, dialogClass);
    });
}
/*
* 获取对象的宽高
* */
function getObjWh(obj) {
    var st = document.documentElement.scrollTop;//滚动条距顶部的距离
    var sl = document.documentElement.scrollLeft;//滚动条距左边的距离
    var ch = document.documentElement.clientHeight;//屏幕的高度
    var cw = document.documentElement.clientWidth;//屏幕的宽度
    var objH = $("." + obj).height();//浮动对象的高度
    var objW = $("." + obj).width();//浮动对象的宽度
    var objT = Number(st) + (Number(ch) - Number(objH)) / 2;
    var objL = Number(sl) + (Number(cw) - Number(objW)) / 2;
    return objT + "|" + objL;
}
/*
* 重置遮罩层
* */
function resetBg(hideDivClass, dialogClass) {
    var fullbg = $("." + hideDivClass).css("display");
    if (fullbg == "block") {
        var bH2 = $("body").height();
	    bH2 = Math.max(bH2, parent.getFrameHeight());
	   // bH2 =  parent.getFrameHeight();
        var bW2 = $("body").width() + 16;
        $("." + hideDivClass).css({width: bW2, height: bH2});
        var objV = getObjWh(dialogClass);
        var tbT = objV.split("|")[0] + "px";
        var tbL = objV.split("|")[1] + "px";
        $("." + dialogClass).css({top: tbT, left: tbL});
    }
}

//关闭灰色JS遮罩层和操作窗口
function closeBg(hideDivClass, dialogClass) {
    $("." + hideDivClass).css("display", "none");
    $("." + dialogClass).css("display", "none");
}
