
var tab = {
    tabMenu:null,
    curTabContent:null,
    tabContent:null,
    curClass:null,
    direct:null,//是否按直接子节点的结构进行操作
    setCurTab: function(node){
        $(this.tabMenu + " ." + this.curClass).removeClass(this.curClass);
        $(node).addClass(this.curClass);
        return this.setContent(node);
    },
    setContent: function(node){
        if(!this.direct){
            node = node.parentNode;
        }
        var num=0;
        while($(node).prev()[0]){
            num++;
            node = $(node).prev();
        }
        return num;
    }
};
/*
* 创建选项卡组
* */
(function(args){
    var tabListObj = {
        tabConfigs : null
    }
    function init(){
        for(var i = 0;i<tabListObj.tabConfigs.length;i++){
            var obj = $.extend(true,{},tab);
            $.extend(obj,tabListObj.tabConfigs[i]);
            $(function(){
                obj.curTabContent = $(obj.tabContent).children().eq(0);
                $(obj.tabMenu).on("click",function(event){
                    var target = event.target;
                    if(target.tagName.toLowerCase() == "a"){
                        var num = obj.setCurTab(target);
                        var node = $(obj.tabContent).children().eq(num);

                        if(obj.curTabContent){
                            if(obj.curTabContent != node){
                                node.toggle();
                                obj.curTabContent.toggle();
                                obj.curTabContent = node;
                            }
                        }
                    }
                });
            });
        }
    }
    $.extend(tabListObj,args);
    init();
})(tabListConfigArgs);

