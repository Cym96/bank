package com.bank.mapper;

import com.bank.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    User selectByIdentity(String identityNumber);

    User findByUserEmail(String username);

    User findByUserPhone(String username);

    User findByUserIdentity(String username);

    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}