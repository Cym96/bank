package com.bank.mapper;

import com.bank.domain.Identity;
@org.apache.ibatis.annotations.Mapper
public interface IdentityMapper {
    int deleteByPrimaryKey(String identityNumber);

    int insert(Identity record);

    int insertSelective(Identity record);

    Identity selectByPrimaryKey(String identityNumber);

    int updateByPrimaryKeySelective(Identity record);

    int updateByPrimaryKey(Identity record);
}