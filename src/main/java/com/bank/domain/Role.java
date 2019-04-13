package com.bank.domain;

import java.io.Serializable;

@lombok.Data
public class Role implements Serializable {
    private Integer roleId;

    private String roleString;

   }