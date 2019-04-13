package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
@lombok.Data
public class Record implements Serializable {
    private Integer recordId;

    private Integer recordFund;

    private Date recordDate;

    private BigDecimal recordNpv;

}