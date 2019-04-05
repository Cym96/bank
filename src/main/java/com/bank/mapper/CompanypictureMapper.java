package com.bank.mapper;

import com.bank.domain.Companypicture;

@org.apache.ibatis.annotations.Mapper
public interface CompanypictureMapper {
    int deleteByPrimaryKey(Integer imgId);

    int insert(Companypicture record);

    int insertSelective(Companypicture record);

    Companypicture selectByPrimaryKey(Integer imgId);

    int updateByPrimaryKeySelective(Companypicture record);

    int updateByPrimaryKey(Companypicture record);
}