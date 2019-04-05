package com.bank.mapper;

import com.bank.domain.Productstate;

@org.apache.ibatis.annotations.Mapper
public interface ProductstateMapper {
    java.util.List<Productstate> findAll();
    int deleteByPrimaryKey(Integer stateId);

    int insert(Productstate record);

    int insertSelective(Productstate record);

    Productstate selectByPrimaryKey(Integer stateId);

    int updateByPrimaryKeySelective(Productstate record);

    int updateByPrimaryKey(Productstate record);
}