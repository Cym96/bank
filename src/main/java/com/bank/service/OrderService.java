package com.bank.service;

import java.util.List;

import com.bank.domain.Order;

public interface OrderService {
	//查询所有订单
	public List<Order> findAll();
	//保存订单
	public void save(Order order);
	//按照用户和基金查询订单
	public List<Order> findOrderByUserAndfund(Integer userId, Integer fundId);
	//查询某一用户的订单
	public List<Order> findOrderByUser(Integer userId);
}
