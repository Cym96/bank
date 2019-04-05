package com.bank.domain;

import java.io.Serializable;

public class Admin implements Serializable {
    private Integer adminId;

    private Integer adminCompany;

    private String adminName;

    private String adminPassword;

    private Integer adminRole;

    private String adminRelname;

    private static final long serialVersionUID = 1L;

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getAdminCompany() {
        return adminCompany;
    }

    public void setAdminCompany(Integer adminCompany) {
        this.adminCompany = adminCompany;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName == null ? null : adminName.trim();
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword == null ? null : adminPassword.trim();
    }

    public Integer getAdminRole() {
        return adminRole;
    }

    public void setAdminRole(Integer adminRole) {
        this.adminRole = adminRole;
    }

    public String getAdminRelname() {
        return adminRelname;
    }

    public void setAdminRelname(String adminRelname) {
        this.adminRelname = adminRelname == null ? null : adminRelname.trim();
    }
}