package com.bank.mapper;

import com.bank.domain.Checkstate;

import java.util.List;

@org.apache.ibatis.annotations.Mapper
public interface CheckstateMapper {
    List<Checkstate> findAll();
    int deleteByPrimaryKey(Integer stateId);

    int insert(Checkstate record);

    int insertSelective(Checkstate record);

    Checkstate selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(Checkstate record);

    int updateByPrimaryKey(Checkstate record);
}