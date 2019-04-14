package com.bank.controller;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bank.domain.Business;
import com.bank.domain.Debitcard;
import com.bank.domain.Identity;
import com.bank.domain.Message;
import com.bank.domain.Transaction;
import com.bank.domain.User;
import com.bank.service.UserService;
import com.bank.service.UserTransferService;

@RequestMapping("/user")
@Controller
public class UserTransferController {
    private org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(UserTransferController.class);

	@Autowired
	private UserTransferService userTransferService;
	@Autowired
	private UserService userService;

	@RequestMapping("transfer")
	public String transfer(HttpServletRequest request,HttpSession session){
		String myCardNum = request.getParameter("fromAcctNo");
		String yourCardNum = request.getParameter("toAcctNo");
		String method = request.getParameter("transfer");
		BigDecimal money = new BigDecimal(request.getParameter("transAmt"));
		Business business = new Business();
		business.setBusinessTime(new Date());
		business.setBusinessMoney(money);
		business.setBusinessOwncard(myCardNum);
		business.setBusinessOrthercard(yourCardNum);
		business.setBusinessDostate(0);
		business.setBusinessText("转账业务");
		business = userTransferService.saveBusiness(business);
		String phone = request.getParameter("phone");
		String phoneText = request.getParameter("phoneText");

		Transaction transactionOwn = new Transaction();

		transactionOwn.setTransactionDotime(new Date());
		transactionOwn.setTransactionCard(myCardNum);
		transactionOwn.setTransactionMoney(money.negate());
		transactionOwn.setTransactionDostate(0);
		transactionOwn.setTransactionBusiness(business.getBusinessId());

		this.userTransferService.saveTransaction(transactionOwn);
		Transaction transactionOther = new Transaction();
		Calendar cal = Calendar.getInstance();
		if("1".equals(method)){
			transactionOther.setTransactionDotime(new Date());
		}else if("2".equals(method)){
			cal.add(Calendar.HOUR_OF_DAY,2);
			transactionOther.setTransactionDotime(cal.getTime());
		}else if("3".equals(method)){
			cal.add(Calendar.HOUR_OF_DAY,24);
			transactionOther.setTransactionDotime(cal.getTime());
		}
		transactionOther.setTransactionCard(yourCardNum);
		transactionOther.setTransactionMoney(money);
		transactionOther.setTransactionDostate(0);
		transactionOther.setTransactionBusiness(business.getBusinessId());
		if(!"".equals(phone) && phone != null){
			Message message = new Message();
			message.setMessagePhone(phone);
			//尊敬的${myname}，${name}向您${cardnum}转了一笔钱，金额：${money}，附言：${text}
			Debitcard myDebitcard = this.userTransferService.findDebitcardMessage(myCardNum);
			User myUser = this.userService.findById(myDebitcard.getCardUser());
			Identity myIdentity = this.userService.findIdentityById(myUser.getUserIdentity());
			Debitcard yourDebitcard = this.userTransferService.findDebitcardMessage(yourCardNum);
			User yourUser = this.userService.findById(yourDebitcard.getCardUser());
			Identity yourIdentity = this.userService.findIdentityById(yourUser.getUserIdentity());
			String messageText = "{\"myname\":\""+myIdentity.getIdentityName()+"\",\"name\":\""+yourIdentity.getIdentityName()+"\",\"cardnum\":\""+yourCardNum+"\",\"money\":\""+money+"\",\"text\":\""+phoneText+"\"}";
			message.setMessageText(messageText);
			message = this.userTransferService.saveMessage(message);
			transactionOther.setTransactionMessage(message.getMessageId());
		}
		this.userTransferService.saveTransaction(transactionOther);
		return "redirect:/user/findUserDebitcard";
	}

	@RequestMapping("findcardNum")
	@ResponseBody
	public Identity findDebitcardMessage(String cardNum){
		 Debitcard debitcard = userTransferService.findDebitcardMessage(cardNum);
		 User user = userService.findById(debitcard.getCardUser());
		 Identity identity = userService.findIdentityById(user.getUserIdentity());
		return identity;
	}

	/**
	 * chen 查询卡中余额
	 * @param cardNum
	 * @return
	 */
	@RequestMapping("findcardMoney")
	@ResponseBody
	public Debitcard findDebitcardMoney(String cardNum){
		logger.error("=====cardNum======" + cardNum);
		Debitcard debitcard = userTransferService.findDebitcardMessage(cardNum);
		return debitcard;
	}
	@RequestMapping("findUserDebitcard")
	public String findUserDebitcard(org.springframework.ui.Model model,HttpSession session){
		//获取在线用户
//		User user = (User) session.getAttribute("user");
		User user = new User();
		user.setUserId(1);
		//获取用户的所有借记卡
		List<Debitcard> debitcardList = this.userService.findUserDebitcard(user.getUserId());
		model.addAttribute("debitcardList", debitcardList);
		logger.error("" + debitcardList);
		return "user/transfer";
	}
}
