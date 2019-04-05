package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Order implements Serializable {
    private Integer orderId;

    private Integer orderUser;

    private Integer orderFund;

    private Integer orderState;

    private BigDecimal orderMoney;

    private BigDecimal orderReduceratio;

    private BigDecimal orderReducemoney;

    private BigDecimal orderNpv;

    private BigDecimal orderFundunit;

    private Date orderTime;

    private String orderCard;

    private static final long serialVersionUID = 1L;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getOrderUser() {
        return orderUser;
    }

    public void setOrderUser(Integer orderUser) {
        this.orderUser = orderUser;
    }

    public Integer getOrderFund() {
        return orderFund;
    }

    public void setOrderFund(Integer orderFund) {
        this.orderFund = orderFund;
    }

    public Integer getOrderState() {
        return orderState;
    }

    public void setOrderState(Integer orderState) {
        this.orderState = orderState;
    }

    public BigDecimal getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(BigDecimal orderMoney) {
        this.orderMoney = orderMoney;
    }

    public BigDecimal getOrderReduceratio() {
        return orderReduceratio;
    }

    public void setOrderReduceratio(BigDecimal orderReduceratio) {
        this.orderReduceratio = orderReduceratio;
    }

    public BigDecimal getOrderReducemoney() {
        return orderReducemoney;
    }

    public void setOrderReducemoney(BigDecimal orderReducemoney) {
        this.orderReducemoney = orderReducemoney;
    }

    public BigDecimal getOrderNpv() {
        return orderNpv;
    }

    public void setOrderNpv(BigDecimal orderNpv) {
        this.orderNpv = orderNpv;
    }

    public BigDecimal getOrderFundunit() {
        return orderFundunit;
    }

    public void setOrderFundunit(BigDecimal orderFundunit) {
        this.orderFundunit = orderFundunit;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public String getOrderCard() {
        return orderCard;
    }

    public void setOrderCard(String orderCard) {
        this.orderCard = orderCard == null ? null : orderCard.trim();
    }
}