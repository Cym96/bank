package com.bank.domain;

import java.io.Serializable;

public class Companypicture implements Serializable {
    private Integer imgId;

    private String imgName;

    private Integer imgCompany;

    private static final long serialVersionUID = 1L;

    public Integer getImgId() {
        return imgId;
    }

    public void setImgId(Integer imgId) {
        this.imgId = imgId;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName == null ? null : imgName.trim();
    }

    public Integer getImgCompany() {
        return imgCompany;
    }

    public void setImgCompany(Integer imgCompany) {
        this.imgCompany = imgCompany;
    }
}