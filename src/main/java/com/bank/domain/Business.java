package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Business implements Serializable {
    private Integer businessId;

    private Date businessTime;

    private BigDecimal businessMoney;

    private String businessOwncard;

    private String businessOrthercard;

    private String businessText;

    private Integer businessDostate;

    private Integer businessCheckstate;

    private static final long serialVersionUID = 1L;

    public Integer getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Integer businessId) {
        this.businessId = businessId;
    }

    public Date getBusinessTime() {
        return businessTime;
    }

    public void setBusinessTime(Date businessTime) {
        this.businessTime = businessTime;
    }

    public BigDecimal getBusinessMoney() {
        return businessMoney;
    }

    public void setBusinessMoney(BigDecimal businessMoney) {
        this.businessMoney = businessMoney;
    }

    public String getBusinessOwncard() {
        return businessOwncard;
    }

    public void setBusinessOwncard(String businessOwncard) {
        this.businessOwncard = businessOwncard == null ? null : businessOwncard.trim();
    }

    public String getBusinessOrthercard() {
        return businessOrthercard;
    }

    public void setBusinessOrthercard(String businessOrthercard) {
        this.businessOrthercard = businessOrthercard == null ? null : businessOrthercard.trim();
    }

    public String getBusinessText() {
        return businessText;
    }

    public void setBusinessText(String businessText) {
        this.businessText = businessText == null ? null : businessText.trim();
    }

    public Integer getBusinessDostate() {
        return businessDostate;
    }

    public void setBusinessDostate(Integer businessDostate) {
        this.businessDostate = businessDostate;
    }

    public Integer getBusinessCheckstate() {
        return businessCheckstate;
    }

    public void setBusinessCheckstate(Integer businessCheckstate) {
        this.businessCheckstate = businessCheckstate;
    }
}