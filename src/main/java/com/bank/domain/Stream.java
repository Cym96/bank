package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@lombok.Data
public class Stream implements Serializable {
    private Integer streamId;

    private Date streamTime;

    private BigDecimal streamMoney;

    private BigDecimal streamRestmoney;

    private Integer streamOwnuser;

    private String streamOwncard;

    private Integer streamOrtheruser;

    private String streamOrthercard;

    private String streamText;

 }