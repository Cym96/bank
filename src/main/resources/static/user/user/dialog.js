var dialogObj = {
    triggerEle: null,
    dialogHolder: null,
    errorMsgHolder: null,
    errorMsgStr: null,
    submitId: null,
    closeIds: [],
    show: function (nodeStr) {
        $(nodeStr).show();
    },
    hide: function (nodeStr) {
        $(nodeStr).hide();
    },
    valid: function () {
        //overwrite
        // 数据验证
    }
};
/*
* 初始化对话框
* 参数为根据config创建的dialogObj
* */
function initDialog(obj) {
    $(obj.triggerEle).on("click", function () {
        obj.hide(obj.errorMsgHolder);
        obj.show(obj.dialogHolder);
    });
    // 在所有界面元素都呈现后，设置错误信息
    $(function () {
        if (obj.errorMsgHolder != null) {
            $(obj.errorMsgHolder).css("color", "red").html(obj.errorMsgStr).hide();
        }
    });
    //  添加事件
    $(obj.dialogHolder).on("click", function (event) {
        var id = event.target.id;
        if (id == obj.submitId) {
            obj.valid();
        } else if ($.inArray(id,obj.closeIds) != -1) {
            obj.hide(obj.dialogHolder);
        }
    });
}
/*
* 创建弹出对话框组
* */
(function (args) {
    var dialogListObj = {
        dialogConfigs: null
    };

    function init() {
        for (var i = 0; i < dialogListObj.dialogConfigs.length; i++) {
            var obj = $.extend(true, {}, dialogObj);
            $.extend(obj, dialogListObj.dialogConfigs[i]);
            initDialog(obj);
        }
    }
    $.extend(dialogListObj, args);
    init();
})(dialogListConfigArg);

