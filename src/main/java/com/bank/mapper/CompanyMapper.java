package com.bank.mapper;

import com.bank.domain.Company;

import java.util.List;

@org.apache.ibatis.annotations.Mapper
public interface CompanyMapper {
    List<Company> findAll();

    int deleteByPrimaryKey(Integer companyId);

    int insert(Company record);

    int insertSelective(Company record);

    Company selectByPrimaryKey(Integer companyId);

    int updateByPrimaryKeySelective(Company record);

    int updateByPrimaryKey(Company record);

    Company findByName(String name);
}