package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.*;

@Data
public class Creditcard implements Serializable {
    private String cardNum;

    private BigDecimal cardLendmoney;

    private BigDecimal cardMaxmoney;

    private Integer cardUser;

    private Date cardReturntime;

    private Integer cardState;
}