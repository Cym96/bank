package com.bank.domain;

import java.io.Serializable;

public class Fun implements Serializable {
    private Integer funId;

    private String funName;

    private String funLink;

    private static final long serialVersionUID = 1L;

    public Integer getFunId() {
        return funId;
    }

    public void setFunId(Integer funId) {
        this.funId = funId;
    }

    public String getFunName() {
        return funName;
    }

    public void setFunName(String funName) {
        this.funName = funName == null ? null : funName.trim();
    }

    public String getFunLink() {
        return funLink;
    }

    public void setFunLink(String funLink) {
        this.funLink = funLink == null ? null : funLink.trim();
    }
}