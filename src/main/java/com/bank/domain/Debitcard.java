package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;

public class Debitcard implements Serializable {
    private String cardNum;

    private Integer cardType;

    private String cardOrdername;

    private BigDecimal cardRestmoney;

    private Integer cardUser;

    private Integer cardState;

    private String cardPassword;

    private static final long serialVersionUID = 1L;

    public String getCardNum() {
        return cardNum;
    }

    public void setCardNum(String cardNum) {
        this.cardNum = cardNum == null ? null : cardNum.trim();
    }

    public Integer getCardType() {
        return cardType;
    }

    public void setCardType(Integer cardType) {
        this.cardType = cardType;
    }

    public String getCardOrdername() {
        return cardOrdername;
    }

    public void setCardOrdername(String cardOrdername) {
        this.cardOrdername = cardOrdername == null ? null : cardOrdername.trim();
    }

    public BigDecimal getCardRestmoney() {
        return cardRestmoney;
    }

    public void setCardRestmoney(BigDecimal cardRestmoney) {
        this.cardRestmoney = cardRestmoney;
    }

    public Integer getCardUser() {
        return cardUser;
    }

    public void setCardUser(Integer cardUser) {
        this.cardUser = cardUser;
    }

    public Integer getCardState() {
        return cardState;
    }

    public void setCardState(Integer cardState) {
        this.cardState = cardState;
    }

    public String getCardPassword() {
        return cardPassword;
    }

    public void setCardPassword(String cardPassword) {
        this.cardPassword = cardPassword == null ? null : cardPassword.trim();
    }
}