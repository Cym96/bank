package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Transaction implements Serializable {
    private Integer transactionId;

    private Date transactionDotime;

    private String transactionCard;

    private BigDecimal transactionMoney;

    private Integer transactionDostate;

    private Integer transactionBusiness;

    private Integer transactionMessage;

    private static final long serialVersionUID = 1L;

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public Date getTransactionDotime() {
        return transactionDotime;
    }

    public void setTransactionDotime(Date transactionDotime) {
        this.transactionDotime = transactionDotime;
    }

    public String getTransactionCard() {
        return transactionCard;
    }

    public void setTransactionCard(String transactionCard) {
        this.transactionCard = transactionCard == null ? null : transactionCard.trim();
    }

    public BigDecimal getTransactionMoney() {
        return transactionMoney;
    }

    public void setTransactionMoney(BigDecimal transactionMoney) {
        this.transactionMoney = transactionMoney;
    }

    public Integer getTransactionDostate() {
        return transactionDostate;
    }

    public void setTransactionDostate(Integer transactionDostate) {
        this.transactionDostate = transactionDostate;
    }

    public Integer getTransactionBusiness() {
        return transactionBusiness;
    }

    public void setTransactionBusiness(Integer transactionBusiness) {
        this.transactionBusiness = transactionBusiness;
    }

    public Integer getTransactionMessage() {
        return transactionMessage;
    }

    public void setTransactionMessage(Integer transactionMessage) {
        this.transactionMessage = transactionMessage;
    }
}