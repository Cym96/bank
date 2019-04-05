package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Order;
import com.bank.mapper.OrderMapper;
import com.bank.service.OrderService;

/**
 * chen
 *
 * @author meihao
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<Order> findOrderByUser(Integer userId) {
        List<Order> orderList = this.orderMapper.findOrderByUser(userId);
        return orderList;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<Order> findAll() {
        List<Order> orderList = this.orderMapper.findAll();
        return orderList;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void save(Order order) {
        this.orderMapper.insert2(order);
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<Order> findOrderByUserAndfund(Integer orderUser, Integer orderFund) {
        List<Order> orderList = this.orderMapper.findOrderByUserAndfund(orderUser, orderFund);
        return orderList;
    }


}
