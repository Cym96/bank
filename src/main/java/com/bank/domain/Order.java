package com.bank.domain;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class Order implements Serializable {
    private Fund orderFundObj;

    private User orderUserObj;

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


}