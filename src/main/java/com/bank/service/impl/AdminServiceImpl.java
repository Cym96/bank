package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Admin;
import com.bank.domain.Company;
import com.bank.mapper.AdminMapper;
import com.bank.mapper.CompanyMapper;
import com.bank.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminMapper adminMapper;
//	@Override
//	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
//	public void insert(Admin admin) {
//		this.adminMapper.insertSelective(admin);
//	}

    //  @Transactional(propagation=Propagation.REQUIRED,readOnly=true)
//	@Override
//	public List<Admin> findAll() {
//	  List<Admin> adminList=this.adminMapper.findAll();
//
//		return adminList;
//	}
    @Override
    public List<Admin> findByCompany(Integer companyId) {

        return this.adminMapper.companyAll(companyId);
    }

//  @Override
//  @Transactional(propagation=Propagation.REQUIRED,readOnly=true)
//	public Admin findbyId(Integer adminId) {
//		return adminMapper.selectByPrimaryKey(adminId);
//	}
//
//
//  @Transactional(propagation=Propagation.REQUIRED,rollbackFor={Exception.class})
//	@Override
//	public Admin isLogin(String adminName, String adminPassword) {
//		Admin  admin=this.adminMapper.findByName(adminName);
//				if (admin == null) {
//					throw new RuntimeException("用户名不存在！");
//				} else {
//					if (admin.getAdminPassword().equals(adminPassword)) {
//						return admin;
//					} else {
//						throw new RuntimeException("密码错误！");
//					}
//
//				}
//	}

}
