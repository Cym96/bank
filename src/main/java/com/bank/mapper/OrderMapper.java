package com.bank.mapper;

import com.bank.domain.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    List<Order> findAll();

    int insert2(Order order);

    List<Order> findOrderByUserAndfund(@Param("orderUser") Integer orderUser, @Param("orderFund") Integer orderFund);

    List<Order> findOrderByUser(@Param("orderUser") Integer orderUser);

    int deleteByPrimaryKey(Integer orderId);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer orderId);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}