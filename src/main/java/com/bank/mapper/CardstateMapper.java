package com.bank.mapper;

import com.bank.domain.Cardstate;

@org.apache.ibatis.annotations.Mapper
public interface CardstateMapper {
    int deleteByPrimaryKey(Integer stateId);

    int insert(Cardstate record);

    int insertSelective(Cardstate record);

    Cardstate selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(Cardstate record);

    int updateByPrimaryKey(Cardstate record);
}