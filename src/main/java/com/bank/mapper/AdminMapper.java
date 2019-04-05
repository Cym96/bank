package com.bank.mapper;

import com.bank.domain.Admin;

@org.apache.ibatis.annotations.Mapper
public interface AdminMapper {
    java.util.List<Admin> companyAll(Integer adminCompany);
    Admin findByName(String  adminName);
    java.util.List<Admin> findAll();

    int deleteByPrimaryKey(Integer adminId);

    int insert(Admin record);

    int insertSelective(Admin record);

    Admin selectByPrimaryKey(Integer adminId);

    int updateByPrimaryKeySelective(Admin record);

    int updateByPrimaryKey(Admin record);
}