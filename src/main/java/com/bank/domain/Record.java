package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Record implements Serializable {
    private Integer recordId;

    private Integer recordFund;

    private Date recordDate;

    private BigDecimal recordNpv;

    private static final long serialVersionUID = 1L;

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public Integer getRecordFund() {
        return recordFund;
    }

    public void setRecordFund(Integer recordFund) {
        this.recordFund = recordFund;
    }

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    public BigDecimal getRecordNpv() {
        return recordNpv;
    }

    public void setRecordNpv(BigDecimal recordNpv) {
        this.recordNpv = recordNpv;
    }
}