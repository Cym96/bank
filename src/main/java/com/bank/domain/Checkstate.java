package com.bank.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
public class Checkstate implements Serializable {
    private Integer stateId;

    private String stateName;
 }