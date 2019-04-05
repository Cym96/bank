//绘制月历体——————————————————————————————————————————
$.fn.set_time=function(){
	 var  $container = $("<div/>").addClass("month-container"),
			$head = $("<div/>").addClass("month-head"),
			$monthbody = $("<ul/>").addClass("month-body"),
			$monthcellseven = $("<div/>").addClass("month-cell"),
			$monthcellone = $("<div/>").addClass("month-cell"),
			$monthcelltwo = $("<div/>").addClass("month-cell"),
			$monthcellthree = $("<div/>").addClass("month-cell"),
			$monthcellfour = $("<div/>").addClass("month-cell"),
			$monthcellfive = $("<div/>").addClass("month-cell"),
			$monthcellsix = $("<div/>").addClass("month-cell"),
			$spanseven = $("<span/>").html("日"),
			$spanone = $("<span/>").html("一"),
			$spantwo = $("<span/>").html("二"),
			$spanthree = $("<span/>").html("三"),
			$spanfour = $("<span/>").html("四"),
			$spanfive = $("<span/>").html("五"),
			$spansix = $("<span/>").html("六"),
			$position = $("<div/>").addClass("position"),
			$add = $("<a/>").addClass("add"),
			$span = $("<span/>");
			$monthcellseven.append($spanseven);
			$monthcellone.append($spanone);
			$monthcelltwo.append($spantwo);
			$monthcellthree.append($spanthree);
			$monthcellfour.append($spanfour);
			$monthcellfive.append($spanfive);
			$monthcellsix.append($spansix);
			$monthbody.append($position);
			$position.append($monthcellseven);
			$position.append($monthcellone);
			$position.append($monthcelltwo);
			$position.append($monthcellthree);
			$position.append($monthcellfour);
			$position.append($monthcellfive);
			$position.append($monthcellsix);
			$head.append($span);
			$container.append($head);
			$container.append($add);
			$container.append($monthbody);
			$(this).append($container);

			$add.on("click", function () {
			    if (window.calendarPrintState != '1') {
			        $("#calendar").zabuto_calendar({ language: "zh-cn" });
			        window.calendarPrintState = "1";
			        $("#Addout").on("click", function () {
			            window.printEventList();
			            $('#calendar').popup('hide');
			        });
			    }
			    $('#calendar').popup({ closeelement: '#Addout' });
			    $('#calendar').popup('show');
    });

  var today=new Date()  
  
  var FullYear = today.getFullYear(); //获取年份
  var m = today.getMonth();           //获取月号
  var month = today.getMonth()+1;     //获取月份
  if(month<10){
	 month="0"+month; 
  }
  var date = today.getDate();	      //获取日期
  var day = today.getDay();           //获取星期
  var len=35;
  var monthsNum=[31,28,31,30,31,30,31,31,30,31,30,31];
  var isleapyear = FullYear%4;        //判断闰年
	  if(isleapyear==0){
		  monthsNum[1]=29;
	  }
  
      if(day==0){
		  day = 7;
	  }
	  var firstDay = day-(date%7-1);       //!important 计算月初星期数
	
  if(firstDay==7){                     //如果月初为七，归零
	  firstDay =0;
  }
  if(firstDay<0){                       //如果月初为负，加七循环
	  firstDay +=7;
  }
  if( firstDay == 5&& monthsNum[m] == 31){
  	len=36;
  	$(".month-container").css("height","200px");
  }else if( firstDay == 6 && monthsNum[m] == 31){
  		len=37;
  		$(".month-container").css("height","200px");
  	}
  
  for(var i=0;i<len;i++){
		$("<li><span></span></li>").appendTo(".month-body").addClass("month-cell"); 
	}
  var f = firstDay;
  for(var j=1;j<=monthsNum[m];j++){
	  $("li.month-cell span").eq(f).text(j).parent().addClass("pink");
	  f++; 
  }
  $("li.month-cell span").eq(firstDay-1+date).parent().addClass("red");
  $(".month-head span").text(FullYear+"年"+month+"月");
} 