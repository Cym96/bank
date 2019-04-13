package com.bank.domain;

import java.io.Serializable;
import java.util.Date;

@lombok.Data
public class Worklist implements Serializable {
    private Integer wordlistId;

    private Integer wordlistNum;

    private String worklistText;

    private Date worklistTime;

    private Integer worklistState;

    private Integer worklistFund;

    private Integer wordlistUser;

   }