package com.bank.mapper;

import com.bank.domain.Transaction;
import org.apache.ibatis.annotations.*;
@Mapper
public interface TransactionMapper {
    java.util.List<Transaction> selectByBusiness(Integer businessId);

    java.util.List<Transaction> selectTransactionByDate();

    int deleteByPrimaryKey(Integer transactionId);

    int insert(Transaction record);

    int insertSelective(Transaction record);

    Transaction selectByPrimaryKey(Integer transactionId);

    int updateByPrimaryKeySelective(Transaction record);

    int updateByPrimaryKey(Transaction record);
}