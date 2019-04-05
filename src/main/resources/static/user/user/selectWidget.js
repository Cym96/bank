
/*
* 为“我持有的”缩略图部分走势图下方操作下拉框部分
* */
(function(){
    SelectWidget = function(data,placeId){
		this.selectTmpl = "<div class='selectContainer' style='margin-left: auto;margin-right:auto; background:#fff;z-index:100;'><a href='${url}' class='buyLink'>${text}<span></span></a><ul class=buySelectDown>${liList}</ul></div>";
		this.selectLiTmpl = "<li><a href='${url}' class='${className}'>${text}</a></li>";
		this.items = data;
		data = null;
		this.placeId = placeId;
	};
	SelectWidget.prototype.startUp = function(){
		this.render();
		this.postCreate();
	};
	SelectWidget.prototype.render = function(){
		var htmlStr = this.getTmpl();
		var childNode = this.parseDom(htmlStr);
		this.selectTop = childNode[0];
		this.placeId.appendChild(childNode[0]);
	};
	SelectWidget.prototype.postCreate = function(){
		$(this.selectTop).mouseenter(function(){
			$(this).find("ul").css("display","block");
		});
		$(this.selectTop).mouseleave(function(){
			$(this).find("ul").css("display","none");
		});
	};
	
	SelectWidget.prototype.parseDom = function(arg){
		var objE = document.createElement("div");
		objE.innerHTML = arg;
		return objE.childNodes;
	};
	SelectWidget.prototype.getTmpl = function(){
		var itemFirst = this.items.shift();
		this.selectTmpl = this.substitute(this.selectTmpl,itemFirst);
		var liList = new Array();
		var _this = this;
	    $.each(this.items, function(i, item){
	    	liList.push(_this.substitute(_this.selectLiTmpl,item));
	    });
	    return this.substitute(this.selectTmpl,{lis:liList.join("")});
	};
	SelectWidget.prototype.substitute = function(selectTmpl,item){
		return selectTmpl.replace(/\$\{[^\s\:\>]+\}/g,function(match,keyNum,obj){
			if(match == "${liList}"){
				return "${lis}";
			}
			var key = match.match(/[^\$\{\}]/g).join("");
			var res = item[key];
            if(key == 'url'){
                res = (res==undefined||res=="")?"javascript:void(0);":res;
            }
			return res;
		});
	};
})();