package com.bank.domain;

import java.io.Serializable;
import lombok.*;

@Data
public class Fun implements Serializable {
    private Integer funId;

    private String funName;

    private String funLink;

}