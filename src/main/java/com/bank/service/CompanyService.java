package com.bank.service;

import java.util.List;

import com.bank.domain.Admin;
import com.bank.domain.Company;
import org.springframework.stereotype.Service;

@Service
public interface CompanyService {
    //保存一个公司
    public void save(Company company);

    //查询全部公司
    public List<Company> findAll();

    //更新公司
    public void update(Company company);

    //分配公司帐户
    public void saveAdminCompany(Admin admin);

    //根据名称查询公司
    public Company findByName(String companyName);

    public Company findById(Integer companyId);

//	public Long allSum();
}
