package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.*;

@Data
public class Business implements Serializable {
    private Integer businessId;

    private Date businessTime;

    private BigDecimal businessMoney;

    private String businessOwncard;

    private String businessOrthercard;

    private String businessText;

    private Integer businessDostate;

    private Integer businessCheckstate;

 }