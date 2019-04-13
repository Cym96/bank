package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import lombok.*;
@Data
public class Debitcard implements Serializable {
    private String cardNum;

    private Integer cardType;

    private String cardOrdername;

    private BigDecimal cardRestmoney;

    private Integer cardUser;

    private Integer cardState;

    private String cardPassword;

}