package com.bank.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
public class Userfund implements Serializable {

    private User userfundUserObj;

    private Fund userfundIdObj;

    private BigDecimal userOrderMoney;

    private BigDecimal partCostRate;

    private Integer userfundId;

    private Integer userfundUser;

    private String userfundCard;

    private Integer userfundFund;

    private BigDecimal userfundFundunit;


}