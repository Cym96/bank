/*
基金签约公共方法
*/

  //关闭
   $('#magContent').find('.signClose').on('click',function(){
       window.location = "FundBrowserInitAct.do";
        });

   $('#signCancel,#btnCancelBind').on('click', function () {
       window.location = "FundBrowserInitAct.do";
   });
   $('.signClose,.certain').on('click',function(){
       closeBg('hideDiv', 'sign');
       refreshPage();
        });
 
 