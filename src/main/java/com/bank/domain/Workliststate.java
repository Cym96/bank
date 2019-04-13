package com.bank.domain;

import java.io.Serializable;

@lombok.Data
public class Workliststate implements Serializable {
    private Integer stateId;

    private String stateName;
}