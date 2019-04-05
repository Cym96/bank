package com.bank.controller;

import com.bank.domain.Company;
import com.bank.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/user/company")
@Controller
public class UserCompanyController {
    @Autowired
    private CompanyService companyService;

    @RequestMapping("findKey")
    public String findKey(Model model, Integer companyId) {
        Company compan = this.companyService.findById(companyId);
        model.addAttribute("compan", compan);
//        Long sum = this.companyService.allSum();
//        model.addAttribute("sum", sum);
        return "user/companymessage";
    }

}
