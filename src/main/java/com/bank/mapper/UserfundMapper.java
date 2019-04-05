package com.bank.mapper;

import com.bank.domain.Userfund;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserfundMapper {
    Userfund findAllByUserAndFund(@Param("userfundUser") Integer userfundUser, @Param("userfundId") Integer userfundId);

    int insert2(Userfund userfund);

    List<Userfund> findAllUserFund(@Param("userfundUser") Integer userfundUser);

    List<Userfund> findAll();

    int deleteByPrimaryKey(Integer userfundId);

    int insert(Userfund record);

    int insertSelective(Userfund record);

    Userfund selectByPrimaryKey(Integer userfundId);

    int updateByPrimaryKeySelective(Userfund record);

    int updateByPrimaryKey(Userfund record);
}