package com.bank.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class Userfund implements Serializable {

    private User userfundUserObj;

    private Fund userfundIdObj;

    private BigDecimal userOrderMoney;

    //参考收益率
    private BigDecimal partCostRate;

    private Integer userfundId;

    private Integer userfundUser;

    private String userfundCard;

    private Integer userfundFund;

    private BigDecimal userfundFundunit;


}