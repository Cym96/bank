package com.bank.domain;

import java.io.Serializable;

@lombok.Data
public class Investstate implements Serializable {
    private Integer stateId;

    private String stateName;

    private String stateLevel;

  }