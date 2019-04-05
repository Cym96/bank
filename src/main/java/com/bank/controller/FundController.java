package com.bank.controller;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.bank.domain.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.*;

import javax.annotation.*;

import com.bank.service.*;
import com.bank.domain.*;

@RequestMapping("/admin")
@Controller
public class FundController {
    private Logger logger = LoggerFactory.getLogger(FundController.class);
    @Resource
    private FundService fundService;
    @Resource
    private AdminService adminService;

    @Resource
    private CheckstateService checkstateService;
    @Resource
    private InveststateService investstateService;
    @Resource
    private CompanyService companyService;
    @Resource
    private ProductstateService productstateService;

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    @RequestMapping("/findbymangerid")
    public String findByMangerId(Model model, HttpSession httpSession) {
//		Admin admin  =  (Admin) httpSession.getAttribute("admin");
        Admin admin = new Admin();
        admin.setAdminId(1);
        List<Fund> listFundsByAdmin = fundService.findBymangerId(admin.getAdminId());
        logger.info("----------------" + listFundsByAdmin);
        //List<Fund> fundList = fundService.findBymangerId(1);
        model.addAttribute("listFundsByAdmin", listFundsByAdmin);
        return "/admin/fundmanger";
    }


    /**
     * 保存基金
     *
     * @param req
     * @param fund
     * @return
     */
    @RequestMapping("/save")
    public String saveFund(HttpServletRequest req, Fund fund) {
        logger.info("========" + fund);
        try {
//			Admin admin=(Admin) req.getSession().getAttribute("admin");
            Admin admin = new Admin();
            admin.setAdminId(1);
            admin.setAdminCompany(2);
            fund.setFundManager(admin.getAdminId());
            fund.setFundNpv(new BigDecimal(1));
            fund.setFundCheckstate(1);
            fund.setFundCompany(admin.getAdminCompany());
            //Admin admin=adminService.findbyId(fund.getFundManager());
            //fund.setFundCompany(admin.getAdminCompany());
            this.fundService.saveNewFund(fund);
            return "redirect:tosave";
        } catch (Exception e) {
            e.printStackTrace();
            req.setAttribute("errorInfo", e.getMessage());
            return "forward:tosave";
        }
    }

    /**
     * 初始化基金保存页面
     *
     * @param session
     * @param model
     * @return
     */
    @RequestMapping("tosave")
    public ModelAndView tosaveFund(HttpSession session, Model model) {
//		Admin admin = (Admin) session.getAttribute("admin");
        //首先获取当前登录用户，之后根据登录用户的公司查询用户下的所有基金经理
        Admin admin = new Admin();
        admin.setAdminId(1);
        admin.setAdminCompany(2);
        List<Admin> adminList = adminService.findByCompany(admin.getAdminCompany());
        model.addAttribute("adminList", adminList);
        List<Checkstate> checkList = this.checkstateService.findAll();
        model.addAttribute("checkList", checkList);
        List<Investstate> investstateList = this.investstateService.findAll();
        model.addAttribute("investstateList", investstateList);
        List<Productstate> productstateList = this.productstateService.findAll();
        model.addAttribute("productstateList", productstateList);
        return new ModelAndView("admin/savefund");
    }


    /**
     * 修改基金
     */
    @RequestMapping("update")
    public String updateFund(HttpServletRequest req, Fund fund) {
        try {
            logger.error("----***************-----updateFund---------");
            //模拟用户登录
            Admin admin = new Admin();
            admin.setAdminId(1);
//			Admin admin=(Admin) req.getSession().getAttribute("admin");
//			fund.setFundManager(admin.getAdminId());
//			fund.setFundCompany(admin.getAdminCompany());
//			Admin admin=adminService.findbyId(fund.getFundManager());
//			fund.setFundCompany(admin.getAdminCompany());
            this.fundService.updateFund(fund);
            return "admin/updatefund";
        } catch (Exception e) {
            e.printStackTrace();
            return "admin/updatefund";
        }
    }

    @RequestMapping("toupdate")
    public ModelAndView toupdatefund(Model model, Integer fundId) {

        List<Checkstate> checkList = this.checkstateService.findAll();
        model.addAttribute("checkList", checkList);
        List<Investstate> invesList = this.investstateService.findAll();
        model.addAttribute("invesList", invesList);
        List<Productstate> produList = this.productstateService.findAll();
        model.addAttribute("produList", produList);
        Fund fund = fundService.findById(fundId);

        logger.info("----------" + fund.getFundProductstate());
        model.addAttribute("fund", fund);
        List<Admin> adminList = adminService.findByCompany(fund.getFundCompany());
        model.addAttribute("adminList", adminList);
        return new ModelAndView("admin/updatefund");

    }


}
