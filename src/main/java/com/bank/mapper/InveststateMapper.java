package com.bank.mapper;

import com.bank.domain.Investstate;
@org.apache.ibatis.annotations.Mapper
public interface InveststateMapper {
    java.util.List<Investstate> findAll();
    int deleteByPrimaryKey(Integer stateId);

    int insert(Investstate record);

    int insertSelective(Investstate record);

    Investstate selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(Investstate record);

    int updateByPrimaryKey(Investstate record);
}