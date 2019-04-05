<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath+"user/fundList/"%>">
    
    <title>My JSP 'main.jsp' starting page</title>
    <meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>中国农业银行个人网银首页</title>
		<meta name="description" content="个人网银">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="favicon.ico" th:href="@{/user/userlogin/favicon.ico}">
		<link rel="apple-touch-icon" href="https://perbank.abchina.com/EbankSite/apple-touch-icon.png">
		<link rel="stylesheet" href="normalize.css" th:href="@{/user/userlogin/normalize.css}">
		<link rel="stylesheet" href="main.css" th:href="@{/user/userlogin/main.css}">
		<link rel="stylesheet" href="home.css" th:href="@{/user/user/home.css}">
		<link rel="stylesheet" href="font-awesome.css" th:href="@{/user/fundquestion/question/index.css}">
		<link rel="stylesheet" href="menu.css">
		<link rel="stylesheet" href="intro.css" th:href="@{/user/user/intro.css}">
		<link rel="stylesheet" href="integrationLayer.css">
  </head>
  
  <body>
		<div style="opacity: 0; visibility: hidden; background-color: black; position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 9998;" id="popup-wechat_background" class="popup_background"></div>
		<div style="opacity: 0; visibility: hidden; position: fixed; overflow: auto; z-index: 9999; width: 100%; height: 100%; top: 0px; left: 0px; text-align: center; display: none;" id="popup-wechat_wrapper" class="popup_wrapper">
			<div role="dialog" aria-hidden="true" data-popup-initialized="true" id="popup-wechat" class="popupBox popup_content" style="display: inline-block; height: 435px; width: 475px; opacity: 0; visibility: hidden; outline: medium none; text-align: left; position: relative; vertical-align: middle;">
				<div class="close close-box"></div>
			</div>
			<div class="popup_align"></div>
		</div>
		
		<div>
			<object id="g_objClassFactory" classid="clsid:884e2049-217d-11da-b2a4-000e7bbb2b09" style="display: none; height: 0px; width: 0px;" height="0"></object>
			<object id="ABCPrintCtl4RA1" style="display: none; height: 0px; width: 0px;" data="data:application/x-oleobject;base64,WU+jXf/7ZkaZ9Vmc17mmQAADAAAAAAAAAAAAAA==" classid="clsid:5DA34F59-FBFF-4666-99F5-599CD7B9A640" height="0"></object>
		</div>
		<div class="head">
			<div class="g-container">
				<div id="intro1-1" data-step="1" data-position="relative" class="pull-left">
					<a id="back-old" href="###" class="gray enhance">返回经典版（旧版网银）</a><span class="m-split gray">|</span>
					<!--<a href="javascript:;" class="m-english gray">English</a><span class="m-split gray">|</span>-->
					<a href="javascript:;" class="font gray scale-big">字体<span class="font-icon">+</span></a>
				</div>
				<div class="pull-right">
					<div class="head-search-wrap">
						<input id="pro_search" placeholder="功能搜索">
						<b id="m-search-btn" class="m-search-btn"></b>
						<div class="search-concern hide">
							<ul>
								<li></li>
							</ul>
						</div>
					</div>
					<div class="popbox-mine m-mine">
						<b class="open-mine mine-icon"></b>
						<a class="open-mine" href="###">我的</a>
						<div class="container-mine">
							<div class="box-mine">
								<div class="arrow"></div>
								<div class="arrow-border"></div>
								<div class="my-items">
									<ul>
										<li id="myPrize" class="my-prize hide">
											<a href="https://perbank.abchina.com/EbankSite/MyPrizeListQueryInitAct.do" target="contentFrame" data-pos="我的/我的奖品">我的奖品</a>
										</li>
										<li class="my-integral">
											<a href="https://perbank.abchina.com/EbankSite/MyIntegralQryInitAct.do" target="contentFrame" data-pos="我的/我的积分">我的积分</a>
										</li>
										<li class="my-info">
											<a href="https://perbank.abchina.com/EbankSite/CustomerPersonInfoMngInitAct.do" target="contentFrame" data-pos="我的/我的信息">我的信息</a>
										</li>
										<li class="opRecord">
											<a href="https://perbank.abchina.com/EbankSite/MyOpRecordsInitAct.do" target="contentFrame" data-pos="我的/我的交易记录">我的交易记录</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="m-online-service">
						<b class="service-icon"></b>
						<a href="https://perbank.abchina.com/EbankSite/OnlineServiceAction.do" target="_blank">客服</a>
					</div>
					<div class="popbox m-messages">
						<b class="open messages-icon"></b><b class="yuan-icon"></b>
						<div id="message-num" class="messages-num">3</div>
						<a class="open" href="###">消息</a>
						<div class="envelope-collapse">
							<div class="box">
								<div class="arrow"></div>
								<div class="arrow-border"></div>
								<div class="en-container">
									<div class="en-top">
										<ul>
											<li id="priInfo">我的消息</li>
											<li class="active" id="comInfo">系统消息</li>
										</ul>
									</div>
									<div id="en-content" class="en-center">
										<ul id="comInfoContent">
											<li><span class="one-title"><a data-pos="1" data-protype="Bulletin" data-prono="0068" class="unRead" href="https://perbank.abchina.com/EbankSite/ViewNoticeContentAct.do?source=0&amp;proType=Bulletin&amp;proNo=0068" target="contentFrame">农银快e宝暂停实时转出的公告</a></span><span>20180426</span></li>
											<li><span class="one-title"><a data-pos="0" data-protype="Bulletin" data-prono="0072" class="unRead" href="http://www.abchina.com/cn/PersonalServices/SvcBulletin/201803/t20180315_1346900.htm" target="_blank">关于补充个人网上银行注册信息的重要提示</a></span><span>20180315</span></li>
											<li><span class="one-title"><a data-pos="0" data-protype="Bulletin" data-prono="0058" class="unRead" href="http://www.abchina.com/cn/PersonalServices/VIPService/" target="_blank">贵宾客户增值服务</a></span><span>20141223</span></li>
										</ul>
									</div>
									<div class="en-bottom">
										<a id="noticeMore" href="###">查看全部消息&gt;</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="m-quit">
						<b id="logout_btn" class="quit-icon"></b>
						<a id="logout_a" href="###">退出</a>
					</div>
				</div>
			</div>
		</div>
		<!-- 菜单 -->
		<div class="m-nav-wrap ">
			<div id="intro4-1" data-step="4" data-position="relative" class="g-container" style="height: 55px;">
				<div class="logo">
					<a id="logo" href="###">
						<img src="logo.png">
					</a>
				</div>
				<div id="menuNav" class="nav">
					<ul>
						<li class="index" style="width: 75px;" loc="index"><span>首页</span></li>
						<li class="sec-menu" style="width: 75px;" data-value="账户">账户
							<div class="triangle hide"></div>
							<ul style="width: 375px; margin-left: -150px;" class="sec-list hide">
								<li loc="MyAccountInitAct" data-value="账户/本行账户">本行账户</li>
								<li loc="OtherBankAcctInitAct" data-value="账户/他行账户">他行账户</li>
								<li loc="" data-value="其它账户">其它账户<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="AcctEPaymentQryInitAct" data-value="账户/其它账户/工资单"><span>工资单</span></li>
										<li loc="EAAcctInitAct" data-value="账户/其它账户/企业年金"><span>企业年金</span></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="sec-menu" style="width: 75px;" data-value="转账">转账
							<div class="triangle hide"></div>
							<ul style="width: 750px; margin-left: -337.5px;" class="sec-list hide">
								<li loc="SingleTransferInitAct" data-value="转账/单笔转账">单笔转账</li>
								<li loc="" data-value="批量转账">批量转账<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="initManualBatchXferOpAct" data-value="转账/批量转账/自选批量转账"><span>自选批量转账</span></li>
									</ul>
								</li>
								<li loc="InitPayeeManageOpAct" data-value="转账/收款方维护">收款方维护</li>
								<li loc="AutoTransferInitAct" data-value="转账/自动转账">自动转账</li>
								<li loc="" data-value="资金归集">资金归集<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="FundsCollectInnerInitAct" data-value="转账/资金归集/本行资金归集"><span>本行资金归集</span></li>
										<li loc="SuperCollectInitAct" data-value="转账/资金归集/跨行资金归集"><span>跨行资金归集</span></li>
									</ul>
								</li>
								<li loc="DonationTransferInitAct" data-value="转账/公益捐款">公益捐款</li>
							</ul>
						</li>
						<li class="sec-menu" style="width: 75px;" data-value="缴费">缴费
							<div class="triangle hide"></div>
							<ul style="width: 375px; margin-left: -150px;" class="sec-list hide">
								<li loc="EPaymentBillInitAct?openNew" data-value="缴费/网上缴费">网上缴费</li>
								<li loc="NonTaxIncomeQryInitAct" data-value="缴费/非税缴款">非税缴款</li>
								<li loc="AgentServiceSignInitAct" data-value="缴费/委托代扣">委托代扣</li>
							</ul>
						</li>
						<li class="sec-menu active clicked" style="width: 75px;" data-value="投资">投资
							<div class="triangle"></div>
							<ul style="width: 875px; margin-left: -427px;" class="sec-list">
								<li loc="" data-value="储蓄业务">储蓄业务<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="MyLongAccInitAct" data-value="投资/储蓄业务/定期存款"><span>定期存款</span></li>
										<li loc="CurrentProfitInitAct" data-value="投资/储蓄业务/活利丰"><span>活利丰</span></li>
										<li loc="MyBigDepositInitAct" data-value="投资/储蓄业务/大额存单"><span>大额存单</span></li>
										<li loc="NoticeDepositInitAct" data-value="投资/储蓄业务/通知存款"><span>通知存款</span></li>
									</ul>
								</li>
								<li class="clicked" loc="" data-value="基金">基金<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="${pageContext.request.contextPath}/user/fundList/main.jsp" data-value="投资/基金/基金购买"><span>基金购买</span></li>
										<li loc="${pageContext.request.contextPath}/user/myfund/main.jsp" data-value="投资/基金/我的基金"><span>我的基金</span></li>
										<li loc="${pageContext.request.contextPath}/user/myfundlog/main.jsp" data-value="投资/基金/交易查询"><span>交易查询</span></li>
										<li loc="FundAccountInitAct" data-value="投资/基金/账户管理"><span>账户管理</span></li>
										<li loc="KYBFundInfoInitAct" data-value="投资/基金/农银快e宝"><span>农银快e宝</span></li>
									</ul>
								</li>
								<li class="" loc="" data-value="理财产品">理财产品<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="FinanceProductListInitAct" data-value="投资/理财产品/理财产品购买"><span>理财产品购买</span></li>
										<li loc="FinanceProductHoldListInitAct" data-value="投资/理财产品/我的理财产品"><span>我的理财产品</span></li>
										<li loc="InvestmentProCircleTTInitAct" data-value="投资/理财产品/自动理财"><span>自动理财</span></li>
										<li loc="FinanceProductTDEnquiryInitAct" data-value="投资/理财产品/交易查询"><span>交易查询</span></li>
										<li loc="FinanceProductRiskTestInitAct" data-value="投资/理财产品/风险评测"><span>风险评测</span></li>
									</ul>
								</li>
								<li class="" loc="" data-value="保险产品">保险产品<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="InsInvProdBuyInitAct" data-value="投资/保险产品/保险理财产品"><span>保险理财产品</span></li>
										<li loc="InsEnsProdBuyInitAct" data-value="投资/保险产品/保险保障产品"><span>保险保障产品</span></li>
										<li loc="InsMyProdInitAct" data-value="投资/保险产品/我的保险产品"><span>我的保险产品</span></li>
										<li loc="InsMyTradeInitAct" data-value="投资/保险产品/交易查询"><span>交易查询</span></li>
									</ul>
								</li>
								<li loc="" data-value="债券">债券<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="SavingsBondsInitAct" data-value="投资/债券/储蓄国债"><span>储蓄国债</span></li>
										<li loc="OnlineBondsInitAct" data-value="投资/债券/债市宝"><span>债市宝</span></li>
									</ul>
								</li>
								<li loc="" data-value="贵金属">贵金属<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="GoldBenefitInitAct" data-value="投资/贵金属/存金通"><span>存金通</span></li>
										<li loc="PaperGoldInitAct" data-value="投资/贵金属/账户贵金属"><span>账户贵金属</span></li>
										<li loc="AgentGoldInitAct" data-value="投资/贵金属/金交所代理"><span>金交所代理</span></li>
									</ul>
								</li>
								<li loc="" data-value="证券期货">证券期货<b class="triangle-white"></b>
									<ul class="third-list hide">
										<li loc="SecuritiesInitAct" data-value="投资/证券期货/银证转账"><span>银证转账</span></li>
										<li loc="FuturesInitAct" data-value="投资/证券期货/银期转账"><span>银期转账</span></li>
										<li loc="DerivativesInitAct" data-value="投资/证券期货/银衍转账"><span>银衍转账</span></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="sec-menu" style="width: 75px;" data-value="信用卡">信用卡
							<div class="triangle hide"></div>
							<ul class="sec-list hide">
								<li loc="CreditCardQryInitAct" data-value="信用卡/查询">查询</li>
								<li loc="CreditCardRepayInitAct" data-value="信用卡/还款">还款</li>
								<li loc="CreditCardAmorInitAct" data-value="信用卡/分期">分期</li>
								<li loc="CreditEnchashInitAct" data-value="信用卡/转出">转出</li>
								<li loc="CreditCardManageInitAct" data-value="信用卡/设置">设置</li>
								<li loc="CreditCardApplyInitAct" data-value="信用卡/申办">申办</li>
							</ul>
						</li>
						<li class="sec-menu" style="width: 75px;" data-value="贷款">贷款
							<div class="triangle hide"></div>
							<ul class="sec-list hide">
								<li loc="MyLoanInitAct" data-value="贷款/我的贷款">我的贷款</li>
								<li loc="PledgeLoanInitAct" data-value="贷款/质押贷款">质押贷款</li>
								<li loc="QuickLoanInitAct" data-value="贷款/网捷贷">网捷贷</li>
							</ul>
						</li>
						<li class="sec-menu" style="width: 75px;" data-value="外汇">外汇
							<div class="triangle hide"></div>
							<ul class="sec-list hide">
								<li loc="ForexSettleInitAct" data-value="外汇/结售汇">结售汇</li>
								<li loc="ForexTelegRemitInitAct" data-value="外汇/跨境电汇">跨境电汇</li>
							</ul>
						</li>
						<li class="sec-menu" style="width: 75px;" data-value="设置">设置
							<div class="triangle hide"></div>
							<ul class="sec-list hide">
								<li loc="AccessMgInitAct" data-value="设置/安全工具">安全工具</li>
								<li loc="CustPasswordUptInitAct" data-value="设置/渠道登录">渠道登录</li>
								<li loc="PhoneMgInitAct" data-value="设置/手机号码">手机号码</li>
								<li loc="MsgSrvSignInfoMngInitAct" data-value="设置/消息服务">消息服务</li>
								<li loc="AssetMgInitAct" data-value="设置/渠道限额">渠道限额</li>
								<li loc="SecurityManagementInitAct" data-value="设置/账户限额">账户限额</li>
							</ul>
						</li>
						<li class="sec-menu last">本地
							<div class="triangle hide"></div>
							<ul class="sec-list hide">
								<li loc="ChactericBranch" data-value="本地/分行特色">分行特色</li>
								<li loc="OnlineReservationInitAct" data-value="本地/网上预约">网上预约</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="menu-wrap">
			<div class="g-container">
				<span class="pull-left hide">这是您第&nbsp;25&nbsp;次登录，<span class="hide" id="time-flag">上次</span>登录时间：2018年4月26日15时15分2秒&nbsp;&nbsp;&nbsp;&nbsp;登录IP：175.167.154.145</span>
				<span class="pull-right hide">客户号：1621518334056396</span>
			</div>
		</div>

		<!-- 当前位置提示 -->
		<div class="location-wrap">
			<div class="g-container">
				<div id="navPos" class="location"><span class="location-now">您现在的位置：投资&nbsp;&gt;&nbsp;基金&nbsp;&gt;&nbsp;基金购买</span></div>
			</div>
		</div>

		<!-- 主页内容区域 -->
		<div class="text-center">
			<iframe style="height: 829px;" class="g-iframe" id="contentFrame" name="contentFrame" src="${pageContext.request.contextPath}/user/fund/show.action" frameborder="0" width="100%"></iframe>
		</div>

		<!-- 页脚 -->
		<div style="visibility: visible;" class="foot">
			<div class="g-container">
				<span class="pull-left">客服热线：95599</span>
				<span class="pull-right">中国农业银行版权所有</span>
			</div>
		</div>

		<!-- 右侧fixed悬浮 -->
		<div id="intro1-2" data-step="1" class="fixed-list">
			<div class="fixed-box wechat"></div>
			<div class="fixed-box people no-manager-tip" data-manager="0"></div>
			<div style="display: none; opacity: 0;" class="fixed-box gotop"></div>
			<div id="fixed-no-manager" class="fixed-no-manager hide">
				<div id="manager-text" class="fixed-no-text"></div>
				<div class="fixed-no-icon"><img src="triangle-right.png"></div>
			</div>
			<div id="fixed-qrcode" class="fixed-qrcode hide">
				<div class="fixed-no-text">扫描二维码下载掌上银行</div>
				<div class="fixed-no-icon"><img src="triangle-right.png"></div>
			</div>
		</div>

		<!-- 左侧fixed悬浮  -->
		<!--<div style="height: 426px; left: -85px;" class="slide-list" id="slide-list"><ul><li><a target="contentFrame" data-pos="常用功能/本行账户" href="https://perbank.abchina.com/EbankSite/MyAccountInitAct.do"><span>本行账户</span><img src="account-my_account.png"></a></li><li><a target="contentFrame" data-pos="常用功能/单笔转账" href="https://perbank.abchina.com/EbankSite/SingleTransferInitAct.do"><span>单笔转账</span><img src="transfer-single.png"></a></li><li><a target="contentFrame" data-pos="常用功能/农银快e宝" href="https://perbank.abchina.com/EbankSite/KYBFundInfoInitAct.do"><span>农银快e宝</span><img src="invest-e.png"></a></li><li><a target="contentFrame" data-pos="常用功能/理财产品购买" href="https://perbank.abchina.com/EbankSite/FinanceProductListInitAct.do"><span>理财产品购买</span><img src="invest-financial.png"></a></li><li><a target="contentFrame" data-pos="常用功能/还款" href="https://perbank.abchina.com/EbankSite/CreditCardRepayInitAct.do"><span>还款</span><img src="credit-repayment.png"></a></li><li><a target="contentFrame" data-pos="常用功能/结售汇" href="https://perbank.abchina.com/EbankSite/ForexSettleInitAct.do"><span>结售汇</span><img src="foreign-exchange.png"></a></li><li class="last settings"><a target="contentFrame" data-pos="常用功能设置" href="https://perbank.abchina.com/EbankSite/CustomerQuickMenuSetInitAct.do"><span>设置</span><img class="btn-add" src="add-black.png"></a></li></ul></div>-->

		<form id="searchForm" name="searchForm" method="post" action="https://perbank.abchina.com/EbankSite/ProductSearch.do" target="contentFrame">
			<input name="productInfo" type="hidden">
		</form>

		<form id="amlForm" name="amlForm" method="post" action="https://perbank.abchina.com/EbankSite/CustomerPersonInfoMngInitAct.do" target="contentFrame">
			<input name="cancelHide" value="1" type="hidden">
		</form>

		<div id="manager-mask" class="manager-mask hide"></div>
		<div id="manager-box" class="manager-box hide">
			<div id="manager-close" class="manager-close">
				<a><img src="close.png"></a>
			</div>
		</div>
		<form id="PrizeForm" name="PrizeForm" method="post" target="prize-frm">
			<input name="channel" value="EBNK" type="hidden">
			<input name="transNo" value="NK000003" type="hidden">
			<input name="token" type="hidden">
		</form>
		<form id="prizeDetailForm" name="PrizeForm" method="post" target="prize-frm">
			<input name="channel" value="EBNK" type="hidden">
			<input name="rwdId" type="hidden">
		</form>
		<div id="prize-mask" class="manager-mask hide"></div>
		<div id="prize-box" class="manager-box hide">
			<div id="prize-close" class="manager-close">
				<a><img src="close.png"></a>
			</div>
		</div>

		<!-- 电子协议更新 -->
		<div id="updateProtocolPopup" class="protocol-box">
			<div class="content">
				<h4 class="text-center">协议版本更新</h4>
				<p>尊敬的客户，为了向您提供更全面、更优质的服务，我行对《电子银行个人客户服务协议》进行了更新，请您确认，感谢您的理解和支持！</p>
				<br>
				<p class="list-protocol">【新增】</p>
				<p>1、电子银行渠道限额说明。</p>
				<p class="agree-protocol" style="margin-top: 120px;">
					<input id="agree" checked="" type="checkbox">&nbsp;&nbsp;我已阅读并同意
					<a href="http://www.abchina.com/cn/PersonalServices/grzsc/zhkh/201512/t20151229_817519.htm" target="_blank">《电子银行个人客户服务协议》</a>
				</p>
			</div>
			<div class="buttons">
				<input class="btn btn-primary" id="updateConfirm" value="同意" type="button">
			</div>
		</div>
		<!-- 全渠道整合START -->
		<div class="maskLayer hide" id="maskLayer"></div>
		<div class="contentLayer hide" id="contentLayer">
			<h3></h3>
		</div>

		<script type="text/javascript" src="drag.js">
		</script>
		<!-- 全渠道整合END -->
		<script src="jquery-1.12.0.min.js" th:href="@{/user/userlogin/jquery-1.12.0.min.js}"> </script>
		<script src="placeholders.jquery.min.js" th:src="@{/user/findList/placeholders.jquery.min.js}">
		</script>
		<script src="plugins.js">
		</script>
		<script src="browerHelper.js">
		</script>
		<script src="dataObject.js" th:href="@{/user/userlogin/dataObject.js}">
		</script>
		<script src="dataHelper.js" th:href="@{/user/userlogin/dataHelper.js}">
		</script>
		<script src="jquery.popupoverlay-1.7.11.js" th:src="@{/user/user/jquery.popupoverlay-1.7.11.js}"></script>
		<script src="popbox.js">
		</script>

		<script src="json2.js">
		</script>
		<script src="config.js" th:src="@{/user/findList/config.js}">
		</script>
		<script src="jstorage.min.js">
		</script>
		<script src="intro.js">
		</script>
		<script src="jquery.popupoverlay-1.7.11.js" th:src="@{/user/user/jquery.popupoverlay-1.7.11.js}">
		</script>
		<script src="jAlert.js">
		</script>
		
		<script src="menu_index.js">
		</script>

	</body>

</html>
