package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Creditcard implements Serializable {
    private String cardNum;

    private BigDecimal cardLendmoney;

    private BigDecimal cardMaxmoney;

    private Integer cardUser;

    private Date cardReturntime;

    private Integer cardState;

    private static final long serialVersionUID = 1L;

    public String getCardNum() {
        return cardNum;
    }

    public void setCardNum(String cardNum) {
        this.cardNum = cardNum == null ? null : cardNum.trim();
    }

    public BigDecimal getCardLendmoney() {
        return cardLendmoney;
    }

    public void setCardLendmoney(BigDecimal cardLendmoney) {
        this.cardLendmoney = cardLendmoney;
    }

    public BigDecimal getCardMaxmoney() {
        return cardMaxmoney;
    }

    public void setCardMaxmoney(BigDecimal cardMaxmoney) {
        this.cardMaxmoney = cardMaxmoney;
    }

    public Integer getCardUser() {
        return cardUser;
    }

    public void setCardUser(Integer cardUser) {
        this.cardUser = cardUser;
    }

    public Date getCardReturntime() {
        return cardReturntime;
    }

    public void setCardReturntime(Date cardReturntime) {
        this.cardReturntime = cardReturntime;
    }

    public Integer getCardState() {
        return cardState;
    }

    public void setCardState(Integer cardState) {
        this.cardState = cardState;
    }
}