package com.bank.mapper;

import com.bank.domain.Dostate;

@org.apache.ibatis.annotations.Mapper
public interface DostateMapper {
    int deleteByPrimaryKey(Integer stateId);

    int insert(Dostate record);

    int insertSelective(Dostate record);

    Dostate selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(Dostate record);

    int updateByPrimaryKey(Dostate record);
}