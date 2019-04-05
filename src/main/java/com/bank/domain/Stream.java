package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

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

    private static final long serialVersionUID = 1L;

    public Integer getStreamId() {
        return streamId;
    }

    public void setStreamId(Integer streamId) {
        this.streamId = streamId;
    }

    public Date getStreamTime() {
        return streamTime;
    }

    public void setStreamTime(Date streamTime) {
        this.streamTime = streamTime;
    }

    public BigDecimal getStreamMoney() {
        return streamMoney;
    }

    public void setStreamMoney(BigDecimal streamMoney) {
        this.streamMoney = streamMoney;
    }

    public BigDecimal getStreamRestmoney() {
        return streamRestmoney;
    }

    public void setStreamRestmoney(BigDecimal streamRestmoney) {
        this.streamRestmoney = streamRestmoney;
    }

    public Integer getStreamOwnuser() {
        return streamOwnuser;
    }

    public void setStreamOwnuser(Integer streamOwnuser) {
        this.streamOwnuser = streamOwnuser;
    }

    public String getStreamOwncard() {
        return streamOwncard;
    }

    public void setStreamOwncard(String streamOwncard) {
        this.streamOwncard = streamOwncard == null ? null : streamOwncard.trim();
    }

    public Integer getStreamOrtheruser() {
        return streamOrtheruser;
    }

    public void setStreamOrtheruser(Integer streamOrtheruser) {
        this.streamOrtheruser = streamOrtheruser;
    }

    public String getStreamOrthercard() {
        return streamOrthercard;
    }

    public void setStreamOrthercard(String streamOrthercard) {
        this.streamOrthercard = streamOrthercard == null ? null : streamOrthercard.trim();
    }

    public String getStreamText() {
        return streamText;
    }

    public void setStreamText(String streamText) {
        this.streamText = streamText == null ? null : streamText.trim();
    }
}