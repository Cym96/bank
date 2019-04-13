package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
@lombok.Data
public class Transaction implements Serializable {
    private Integer transactionId;

    private Date transactionDotime;

    private String transactionCard;

    private BigDecimal transactionMoney;

    private Integer transactionDostate;

    private Integer transactionBusiness;

    private Integer transactionMessage;

  }