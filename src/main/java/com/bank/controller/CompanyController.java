package com.bank.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bank.domain.Admin;
import com.bank.domain.Company;
import com.bank.service.CompanyService;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/admin/company")
@Controller
public class CompanyController {

    private Logger logger = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    private CompanyService companyService;
    /**
     * 公司注册
     * @param company
     * @return
     */
    @RequestMapping("compantSave")
    public String companySave(Company company) {
        company.setCompanyCheckstate(0);
        this.companyService.save(company);
        //为公司分配账户
        Admin admin = new Admin();
        admin.setAdminCompany(this.companyService.findByName(company.getCompanyName()).getCompanyId());
        admin.setAdminRole(201);
        admin.setAdminName("888888");
        admin.setAdminPassword("888888");
        admin.setAdminRelname(company.getCompanyName());
        this.companyService.saveAdminCompany(admin);
        return "forward:companyfindAll";
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    @RequestMapping("companyfindAll")
    public String companyfindAll(Model model) {
        List<Company> companyList = this.companyService.findAll();
        for (Company company : companyList) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String str = dateFormat.format(company.getCompanyBuildtime());
            company.setTime(str);
        }
        model.addAttribute("companyList", companyList);
        return "admin/companyshow";
    }

    /**
     * 公司审核
     *
     * @param company
     * @return
     */
    @RequestMapping("updatecompany")
    public String updateCompany(Company company) {
        this.companyService.update(company);
        return "forward:companyfindAll";
    }
//
//    /**
//     * 为公司分配一个帐户
//     *
//     * @return
//     */
//    @RequestMapping("saveadmincompany")
//    public String saveAdminCompany(Admin admin) {
//        admin.setAdminRole(201);
//        this.companyService.saveAdminCompany(admin);
//        return "forward:companyfindAll";
//    }
//
//    @RequestMapping("interim")
//    public String interim(Model model, Company company) {
//        model.addAttribute("company", company);
//        return "saveadmincompany";
//    }

    /**
     * 显示申请公司页面
     * @return
     */
    @RequestMapping(value = "showCompanySign")
    public ModelAndView showcompanysign() {
        return new ModelAndView("/admin/companysign");
    }

}
