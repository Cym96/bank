package com.bank.mapper;

import com.bank.domain.Power;
@org.apache.ibatis.annotations.Mapper
public interface PowerMapper {
    int insert(Power record);

    int insertSelective(Power record);
}