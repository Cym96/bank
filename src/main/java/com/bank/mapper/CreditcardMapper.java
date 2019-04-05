package com.bank.mapper;

import com.bank.domain.Creditcard;

@org.apache.ibatis.annotations.Mapper
public interface CreditcardMapper {
    int deleteByPrimaryKey(String cardNum);

    int insert(Creditcard record);

    int insertSelective(Creditcard record);

    Creditcard selectByPrimaryKey(String cardNum);

    int updateByPrimaryKeySelective(Creditcard record);

    int updateByPrimaryKey(Creditcard record);
}