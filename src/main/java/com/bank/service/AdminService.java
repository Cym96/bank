package com.bank.service;

import java.util.List;

import com.bank.domain.Admin;
import com.bank.domain.User;
import org.springframework.stereotype.*;
@Service
public interface AdminService {
   //   public List<Admin> findAll();
//   public void insert(Admin admin);
   public Admin findbyId(Integer adminId);
   public List<Admin> findByCompany(Integer companyId);
//	public Admin isLogin(String adminName,String adminPassword);
}
