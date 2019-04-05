package com.bank.mapper;

import com.bank.domain.Business;

@org.apache.ibatis.annotations.Mapper
public interface BusinessMapper {
    int deleteByPrimaryKey(Integer businessId);

    int insert(Business record);

    int insertSelective(Business record);

    Business selectByPrimaryKey(Integer businessId);

    int updateByPrimaryKeySelective(Business record);

    int updateByPrimaryKey(Business record);
}