package com.bank.mapper;

import org.springframework.stereotype.Repository;

import com.bank.domain.Message;
@org.apache.ibatis.annotations.Mapper
public interface MessageMapper {

    int deleteByPrimaryKey(Integer messageId);

    int insert(Message record);

    int insertSelective(Message record);

    Message selectByPrimaryKey(Integer messageId);

    int updateByPrimaryKeySelective(Message record);

    int updateByPrimaryKey(Message record);
}