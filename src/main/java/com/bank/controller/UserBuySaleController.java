package com.bank.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bank.domain.Business;
import com.bank.domain.Debitcard;
import com.bank.domain.Fund;
import com.bank.domain.Order;
import com.bank.domain.Transaction;
import com.bank.domain.User;
import com.bank.domain.Userfund;
import com.bank.service.BusinessService;
import com.bank.service.FundService;
import com.bank.service.OrderService;
import com.bank.service.TransactionService;
import com.bank.service.UserService;
import com.bank.service.UserTransferService;
import com.bank.service.UserfundService;

@Controller
@RequestMapping("/user/buysale")
public class UserBuySaleController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private FundService fundService;
    @Autowired
    private UserfundService userfundService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private BusinessService businessService;

    @Autowired
    private UserService userService;
    @Autowired
    private UserTransferService userTransferService;

    @RequestMapping("/UserLoadSaleFund")
    public String UserLoadSaleFund(HttpServletRequest request, HttpSession session) {
        // 获取购买基金的id
        Integer fundId = Integer.parseInt(request.getParameter("fundId"));
        // 获取在线用户
//        User user = (User) session.getAttribute("user");
        //模拟用户
        User user = new User();
        user.setUserId(1);
        Fund fund = this.fundService.findById(fundId);
        Userfund userfund = this.userfundService.findByUserAndFund(user.getUserId(), fundId);
        request.setAttribute("userfund", userfund);
        return "user/fundsale";
    }

    @RequestMapping("/UserSaleFund")
    public String UserSaleFund(HttpServletRequest request, HttpSession session) {
        // 获取在线用户
//        User user = (User) session.getAttribute("user");
        //模拟用户
        User user = new User();
        user.setUserId(1);
        // 获取购买基金的id
        Integer fundId = Integer.parseInt(request.getParameter("fundId"));
        // 获取卖的份额
        BigDecimal saleNum = new BigDecimal(request.getParameter("saleNum"));
        // 根据基金的id查找到基金和用户id查询基金
        Userfund userfund = this.userfundService.findByUserAndFund(
                user.getUserId(), fundId);
        // 根据基金id获取基金的赎回费率
        Fund fund = this.fundService.findById(userfund.getUserfundIdObj()
                .getFundId());
        BigDecimal redeemRate = fund.getFundSaleratio();
        // 最低赎回份额
        BigDecimal minRedeemNumber = fund.getFundMinbuymoney();
        // 净值
        BigDecimal saleNetvalue = fund.getFundNpv();
        // 赎回总额＝赎回份额×T日基金份额净值＝8210.18×1.4000≈11494.25(元)
        BigDecimal redeemPrice = saleNum.multiply(saleNetvalue);
        // 赎回费用＝赎回总额×赎回费率＝11494.25×0.5％≈57.47(元)
        BigDecimal redeemFee = redeemPrice.multiply(redeemRate);
        // 赎回净额＝赎回总额－赎回费用＝11494.25－57.47＝11436.78(元)
        BigDecimal netRedeemPrice = redeemPrice.subtract(redeemFee);

        Order order = new Order();
        order.setOrderUser(user.getUserId());
        order.setOrderFund(fundId);
        order.setOrderState(1);
        order.setOrderMoney(netRedeemPrice);
        order.setOrderReduceratio(redeemRate);
        order.setOrderReducemoney(redeemFee);
        order.setOrderNpv(userfund.getUserfundIdObj().getFundNpv());
        order.setOrderFundunit(saleNum);
        order.setOrderTime(new Date());
        order.setOrderCard(userfund.getUserfundCard());
        // 保存订单
        this.orderService.save(order);

        //用户基金表中的基金数量减

        userfund.setUserfundFundunit(userfund.getUserfundFundunit().subtract(saleNum));
        this.userfundService.update(userfund);
        //用户借记卡中的钱加

        Debitcard debitcard = this.userTransferService
                .findDebitcardMessage(userfund.getUserfundCard());

        this.userService.undateDebitcardMoney(userfund.getUserfundCard(), debitcard
                .getCardRestmoney().add(netRedeemPrice));

        //添加业务
        Business business = new Business();
        business.setBusinessTime(new Date());
        business.setBusinessMoney(netRedeemPrice);
        business.setBusinessOwncard(userfund.getUserfundCard());
        business.setBusinessDostate(0);
        business.setBusinessText("基金买卖");

        business = this.businessService.saveBusiness(business);
        //添加事物
        Transaction transaction = new Transaction();
        transaction.setTransactionBusiness(business.getBusinessId());
        transaction.setTransactionCard(userfund.getUserfundCard());
        transaction.setTransactionDostate(0);
        transaction.setTransactionDotime(new Date());
        transaction.setTransactionMoney(netRedeemPrice);

        this.transactionService.saveTransaction(transaction);


        return "redirect:/user/fund/showUserAllFund";
    }

    @RequestMapping("/UserBuyFund")
    public String UserBuyFund(HttpServletRequest request, HttpSession session) {
        // 获取在线用户
//        User user = (User) session.getAttribute("user");
        User user = new User();
        user.setUserId(1);
        // 获取购买基金的id
        Integer fundId = Integer.parseInt(request.getParameter("fundId"));
        // 获取订单卡号
        String orderCard = request.getParameter("fromAcctNo");
        // 根据基金的id查找基金
        Fund fund = this.fundService.findById(fundId);
        // 获取基金的净值
        BigDecimal buyNetvalue = fund.getFundNpv();
        // 获取基金的申购费率
        BigDecimal SubscriptionRale = fund.getFundBuyratio();
        // 假定用1万元申购某只基金，申购费率是1.5％，当日净值是1.2000。
        // （1＋申购费率）
        BigDecimal rale1 = SubscriptionRale.add(new BigDecimal(1));
        // 获取用户投资的资金
        BigDecimal trnAmt = new BigDecimal(request.getParameter("trnAmt"));
        // 净申购金额＝申购金额÷（1＋申购费率）＝10000.00÷（1＋1.5％）≈9852.22(元)
        trnAmt.setScale(2);
        BigDecimal NetPurchaseAmount = trnAmt.divide(rale1, 4,
                RoundingMode.HALF_UP);
        // 申购费用＝申购金额－净申购金额＝10000.00－9852.22＝147.78(元)
        BigDecimal SubscriptionFees = trnAmt.subtract(NetPurchaseAmount);
        // 　申购份额＝净申购金额÷T日基金份额净值＝9852.22÷1.2000≈8210.18(份)
        BigDecimal buyNumber = NetPurchaseAmount.divide(buyNetvalue, 2);

        Order order = new Order();
        order.setOrderCard(orderCard);
        order.setOrderFund(fundId);
        order.setOrderFundunit(buyNumber);
        order.setOrderMoney(NetPurchaseAmount);
        order.setOrderNpv(fund.getFundNpv());
        order.setOrderReducemoney(SubscriptionFees);
        order.setOrderReduceratio(fund.getFundBuyratio());
        order.setOrderState(0);
        order.setOrderTime(new Date());
        order.setOrderUser(user.getUserId());

        // 保存订单
        this.orderService.save(order);

        // 判断用户是否购买了此基金
        Userfund userfund = this.userfundService.findByUserAndFund(
                user.getUserId(), fundId);
        if (userfund == null) {
            // 用户没有购买过此基金
            userfund = new Userfund();
            userfund.setUserfundCard(orderCard);
            userfund.setUserfundFund(fundId);
            userfund.setUserfundFundunit(buyNumber);
            userfund.setUserfundUser(user.getUserId());
            this.userfundService.save(userfund);

        } else {
            // 用户购买过此基金

//			userfund.setUserfundFundunit(userfund.getUserfundFundunit().add(
//					buyNumber));

            this.userfundService.update(userfund);
        }


        //添加业务
        Business business = new Business();
        business.setBusinessTime(new Date());
        business.setBusinessMoney(NetPurchaseAmount);
        business.setBusinessOwncard(userfund.getUserfundCard());
        business.setBusinessDostate(0);
        business.setBusinessText("基金买卖");

        business = this.businessService.saveBusiness(business);
        //添加事物
        Transaction transaction = new Transaction();
        transaction.setTransactionBusiness(business.getBusinessId());
        transaction.setTransactionCard(userfund.getUserfundCard());
        transaction.setTransactionDostate(0);
        transaction.setTransactionDotime(new Date());
        transaction.setTransactionMoney(NetPurchaseAmount);

        this.transactionService.saveTransaction(transaction);


        // 根据卡号查询卡信息
        Debitcard debitcard = this.userTransferService
                .findDebitcardMessage(orderCard);

//		this.userService.undateDebitcardMoney(orderCard, debitcard
//				.getCardRestmoney().subtract(trnAmt));
        return "redirect:/user/fund/showUserAllFund";
    }


}
