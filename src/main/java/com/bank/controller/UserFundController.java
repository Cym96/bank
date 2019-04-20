package com.bank.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.bank.domain.*;
import com.bank.service.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author meihao
 */
@Controller
@RequestMapping("/user/fund")
public class UserFundController {
    private Logger logger = LoggerFactory.getLogger(UserFundController.class);

    @Autowired
    private FundService fundService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserfundService userfundService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private CompanyService companyService;
    /**
     * 查询所有存在基金
     *
     * @param request
     * @return
     */
    @RequestMapping("/findAll")
    public String findAllFund(HttpServletRequest request,org.springframework.ui.Model model) {
        // 默认第一页
        Integer startPage;
        if (request.getParameter("startPage") == null) {
            startPage = 1;
        } else {
            startPage = Integer.parseInt(request.getParameter("startPage"));
        }

        Integer pageSize = 8;
        List<Fund> fund = new ArrayList<>();
        Integer startPage1 = startPage * pageSize;
        Integer endPage = (startPage * pageSize) - pageSize;
        fund = fundService.findAll(endPage, startPage1);

        //查询到的记录数
        Integer fundCount = this.fundService.findFundCount();
        //总页数
        Integer findFundCount;
        if (fundCount % pageSize == 0) {
            findFundCount = fundCount / pageSize;
        } else {
            findFundCount = fundCount / pageSize + 1;
        }
        model.addAttribute("fund", fund);
        model.addAttribute("findFundCount", findFundCount);
        model.addAttribute("startPage", startPage);

        return "user/fundlist";
    }

    @RequestMapping("/showUserAllFund")
    public String showUserAllFund(HttpServletRequest request) {
        HttpSession session = request.getSession();
//        User user = (User) session.getAttribute("user");
        User user = new User();
        user.setUserId(1);
        List<Userfund> userfundlist = this.userfundService.findByUser(user.getUserId());

        if (userfundlist != null) {
            //查询用户的某个基金的订单
            for (Userfund userfund : userfundlist) {
                //累计参与成本，
                BigDecimal orderMoney = new BigDecimal(0);
                //参考收益率
                BigDecimal partCostRate = new BigDecimal(0);
                //购买分数*基金净值=基金价值
                BigDecimal t1 = userfund.getUserfundFundunit().multiply(userfund.getUserfundIdObj().getFundNpv());
                List<Order> orderList = this.orderService.findOrderByUserAndfund(userfund.getUserfundUser(), userfund.getUserfundFund());
                for (Order order : orderList) {
                    if (0 == order.getOrderState()) {
                        //买入基金
                        orderMoney = orderMoney.add(order.getOrderMoney());
                    } else {
                        //卖出基金
                        orderMoney = orderMoney.subtract(order.getOrderMoney());
                    }
                    //基金价值-
                    BigDecimal partCostRate1 = t1.subtract(orderMoney);
                    partCostRate = partCostRate1.divide(orderMoney, 4);
                    userfund.setUserOrderMoney(orderMoney);
                    userfund.setPartCostRate(partCostRate);
                }
            }
        }

        request.setAttribute("userfundlist", userfundlist);
        return "user/myfundlist";
    }

    @RequestMapping("/showUserAllFundLog")
    public String showUserAllFundLog(HttpServletRequest request,
                                     HttpSession session) {
        User user = (User) session.getAttribute("user");
        List<Order> orderList = this.orderService.findOrderByUser(user.getUserId());

        request.setAttribute("orderList", orderList);
        return "user/myfundlog";
    }

    /**
     * 查询单个基金的信息
     *
     * @param request
     * @param session
     * @return
     */
    @RequestMapping("/showOneFund")
    public String showOneFund(HttpServletRequest request, HttpSession session,org.springframework.ui.Model model) {
        Integer fundId = Integer.parseInt(request.getParameter("fundId"));
        Fund fund = this.fundService.findById(fundId);
        request.setAttribute("fund", fund);

        //获取在线用户
//        User user = (User) session.getAttribute("user");
        //模拟用户
        User user = new User();
        user.setUserId(1);
        //获取用户的所有借记卡
        List<Debitcard> debitcardList = this.userService.findUserDebitcard(user.getUserId());
        model.addAttribute("debitcardList", debitcardList);
        return "user/fundbuy";
    }

    @RequestMapping("/fundById")
    public String fundById(Model model, Integer fundId) {
        Fund fund = fundService.findById(fundId);
        Admin admin = adminService.findbyId(fund.getFundManager());
        Company compan = this.companyService.findById(fund.getFundCompany());
        fund.setUserMangerObj(admin);
        model.addAttribute("fund", fund);
        model.addAttribute("compan", compan);
        return "user/companymessage";
    }

    @RequestMapping("/aa")
    public String aa(){
        return "user/index";

    }

}
