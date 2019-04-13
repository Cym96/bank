package com.bank.domain;

import java.io.Serializable;
import lombok.*;

@lombok.Data
public class Admin implements Serializable {
    private Integer adminId;

    private Integer adminCompany;

    private String adminName;

    private String adminPassword;

    private Integer adminRole;

    private String adminRelname;
}