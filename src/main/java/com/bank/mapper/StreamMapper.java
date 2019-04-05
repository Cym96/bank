package com.bank.mapper;

import com.bank.domain.Stream;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StreamMapper {

    List<Stream> selectByStreamOwncard(@Param("cardNum") String cardNum);

    int deleteByPrimaryKey(Integer streamId);

    int insert(Stream record);

    int insertSelective(Stream record);

    Stream selectByPrimaryKey(Integer streamId);

    int updateByPrimaryKeySelective(Stream record);

    int updateByPrimaryKey(Stream record);
}