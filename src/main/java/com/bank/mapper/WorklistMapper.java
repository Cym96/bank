package com.bank.mapper;

import com.bank.domain.Worklist;
@org.apache.ibatis.annotations.Mapper
public interface WorklistMapper {
    int deleteByPrimaryKey(Integer wordlistId);

    int insert(Worklist record);

    int insertSelective(Worklist record);

    Worklist selectByPrimaryKey(Integer wordlistId);

    int updateByPrimaryKeySelective(Worklist record);

    int updateByPrimaryKey(Worklist record);
}