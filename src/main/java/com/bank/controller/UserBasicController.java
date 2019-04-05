package com.bank.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import com.bank.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bank.service.UserService;

@RequestMapping("/user")
@Controller
public class UserBasicController {

    private Logger logger = LoggerFactory.getLogger(UserBasicController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String showUserHead(Locale locale, Model model) {
        return "user/main";
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String showUserIndex(Locale locale, Model model, HttpSession session) {
//        User user = (User) session.getAttribute("user");
        User user = new User();
        user.setUserId(1);
        user.setUserIdentity("370783199511163797");
        Identity identity = userService.findIdentityById(user.getUserIdentity());
        model.addAttribute("name", identity.getIdentityName());
        List<Debitcard> debitcardList = userService.findUserDebitcard(user.getUserId());
        model.addAttribute("debitcardList", debitcardList);
        int dbCardNum = debitcardList.size();
        model.addAttribute("dbCardNum", debitcardList.size());
        logger.info("=======" + debitcardList.size());
        BigDecimal money = new BigDecimal(0);
        for (Debitcard debitcard : debitcardList) {
            money = money.add(debitcard.getCardRestmoney());
        }
        model.addAttribute("dbCardMoney", money);
//        List<Creditcard> creditcardList = userService.findUserCreditcard(user.getUserId());
//        model.addAttribute("CrCardNum", creditcardList.size());
//        BigDecimal money2 = new BigDecimal(0);
//        for (Creditcard creditcard : creditcardList) {
//            money2 = money2.add(creditcard.getCardLendmoney());
//        }
//        model.addAttribute("CrCardMoney", money2);
        return "user/index";
    }

    @RequestMapping(value = "/transfer", method = RequestMethod.GET)
    public String showUserTransfer(Locale locale, Model model) {
        return "user/transfer";
    }

    @RequestMapping(value = "/debitcard", method = RequestMethod.GET)
    public String showUserDebitCard(HttpSession session, Model model) {

//        User user = (User) session.getAttribute("user");
        User user = new User();
        user.setUserId(1);
//        int userId = user.getUserId();

        List<Debitcard> debitcardList = this.userService.findUserDebitcard(user.getUserId());
        logger.info("---------" + debitcardList);
        model.addAttribute("debitcardList", debitcardList);

        return "user/debitcard";
    }

//    @RequestMapping(value = "/creditcard", method = RequestMethod.GET)
//    public String showUserCreditCard(HttpSession session, Model model) {
//
//        User user = (User) session.getAttribute("user");
//
//        int userId = user.getUserId();
//
//        List<Creditcard> creditcardList = this.userService.findUserCreditcard(userId);
//
//        model.addAttribute("creditcardList", creditcardList);
//
//        return "user/creditcard";
//    }
}
