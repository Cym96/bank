package com.bank.domain;

import java.io.Serializable;

public class Investstate implements Serializable {
    private Integer stateId;

    private String stateName;

    private String stateLevel;

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

    public String getStateLevel() {
        return stateLevel;
    }

    public void setStateLevel(String stateLevel) {
        this.stateLevel = stateLevel == null ? null : stateLevel.trim();
    }
}