package com.bank.mapper;

import com.bank.domain.Record;
import java.util.*;
import org.apache.ibatis.annotations.*;
@Mapper
public interface RecordMapper {
    List<Record> findAll(Integer fundId);

    List<Record> findByDate(com.bank.domain.DateVO dateVO);

    int deleteByPrimaryKey(Integer recordId);

    int insert(Record record);

    int insertSelective(Record record);

    Record selectByPrimaryKey(Integer recordId);

    int updateByPrimaryKeySelective(Record record);

    int updateByPrimaryKey(Record record);
}