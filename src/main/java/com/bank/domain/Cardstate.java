package com.bank.domain;

import java.io.Serializable;

public class Cardstate implements Serializable {
    private Integer stateId;

    private String stateName;

    private static final long serialVersionUID = 1L;

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName == null ? null : stateName.trim();
    }
}