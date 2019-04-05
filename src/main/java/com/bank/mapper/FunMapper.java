package com.bank.mapper;

import com.bank.domain.Fun;

@org.apache.ibatis.annotations.Mapper
public interface FunMapper {
    int deleteByPrimaryKey(Integer funId);

    int insert(Fun record);

    int insertSelective(Fun record);

    Fun selectByPrimaryKey(Integer funId);

    int updateByPrimaryKeySelective(Fun record);

    int updateByPrimaryKey(Fun record);
}