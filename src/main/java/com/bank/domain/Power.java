package com.bank.domain;

import java.io.Serializable;

@lombok.Data
public class Power implements Serializable {
    private Integer powerRole;

    private Integer powerFun;
}