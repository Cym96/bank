package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Admin;
import com.bank.domain.Checkstate;
import com.bank.domain.Company;
import com.bank.mapper.AdminMapper;
import com.bank.mapper.CompanyMapper;
import com.bank.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private AdminMapper adminMapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void save(Company company) {
        this.companyMapper.insert(company);
    }

    @Override
    public List<Company> findAll() {
        return companyMapper.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void update(Company company) {
        this.companyMapper.updateByPrimaryKeySelective(company);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void saveAdminCompany(Admin admin) {
        this.adminMapper.insertSelective(admin);

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Company findById(Integer companyId) {
        return this.companyMapper.selectByPrimaryKey(companyId);
    }

    @Override
    public Company findByName(String companyName) {
        return this.companyMapper.findByName(companyName);
    }


    //	@Override
//	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
//	public Long allSum() {
//		return this.companyMapper.allSum();
//	}
}
