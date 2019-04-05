package com.bank.domain;

import java.io.Serializable;

public class Power implements Serializable {
    private Integer powerRole;

    private Integer powerFun;

    private static final long serialVersionUID = 1L;

    public Integer getPowerRole() {
        return powerRole;
    }

    public void setPowerRole(Integer powerRole) {
        this.powerRole = powerRole;
    }

    public Integer getPowerFun() {
        return powerFun;
    }

    public void setPowerFun(Integer powerFun) {
        this.powerFun = powerFun;
    }
}