package com.bank.domain;

import java.io.Serializable;

public class Role implements Serializable {
    private Integer roleId;

    private String roleString;

    private static final long serialVersionUID = 1L;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleString() {
        return roleString;
    }

    public void setRoleString(String roleString) {
        this.roleString = roleString == null ? null : roleString.trim();
    }
}