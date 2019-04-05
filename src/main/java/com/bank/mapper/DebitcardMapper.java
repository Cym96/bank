package com.bank.mapper;

import com.bank.domain.Debitcard;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface DebitcardMapper {

    int undateDebitcardMoney(@Param("cardNum") String cardNum, @Param("cardRestmoney") BigDecimal cardRestmoney);

    List<Debitcard> selectByUserId(Integer userId);

    int deleteByPrimaryKey(String cardNum);

    int insert(Debitcard record);

    int insertSelective(Debitcard record);

    Debitcard selectByPrimaryKey(String cardNum);

    List<Debitcard> selectNewDebitcard();

    int updateByPrimaryKeySelective(Debitcard record);

    int updateByPrimaryKey(Debitcard record);
}