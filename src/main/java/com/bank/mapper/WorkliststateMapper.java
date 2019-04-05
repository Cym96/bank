package com.bank.mapper;

import com.bank.domain.Workliststate;
@org.apache.ibatis.annotations.Mapper
public interface WorkliststateMapper {
    int deleteByPrimaryKey(Integer stateId);

    int insert(Workliststate record);

    int insertSelective(Workliststate record);

    Workliststate selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(Workliststate record);

    int updateByPrimaryKey(Workliststate record);
}