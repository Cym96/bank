package com.bank.domain;

import java.io.Serializable;
import java.util.Date;

public class Worklist implements Serializable {
    private Integer wordlistId;

    private Integer wordlistNum;

    private String worklistText;

    private Date worklistTime;

    private Integer worklistState;

    private Integer worklistFund;

    private Integer wordlistUser;

    private static final long serialVersionUID = 1L;

    public Integer getWordlistId() {
        return wordlistId;
    }

    public void setWordlistId(Integer wordlistId) {
        this.wordlistId = wordlistId;
    }

    public Integer getWordlistNum() {
        return wordlistNum;
    }

    public void setWordlistNum(Integer wordlistNum) {
        this.wordlistNum = wordlistNum;
    }

    public String getWorklistText() {
        return worklistText;
    }

    public void setWorklistText(String worklistText) {
        this.worklistText = worklistText == null ? null : worklistText.trim();
    }

    public Date getWorklistTime() {
        return worklistTime;
    }

    public void setWorklistTime(Date worklistTime) {
        this.worklistTime = worklistTime;
    }

    public Integer getWorklistState() {
        return worklistState;
    }

    public void setWorklistState(Integer worklistState) {
        this.worklistState = worklistState;
    }

    public Integer getWorklistFund() {
        return worklistFund;
    }

    public void setWorklistFund(Integer worklistFund) {
        this.worklistFund = worklistFund;
    }

    public Integer getWordlistUser() {
        return wordlistUser;
    }

    public void setWordlistUser(Integer wordlistUser) {
        this.wordlistUser = wordlistUser;
    }
}