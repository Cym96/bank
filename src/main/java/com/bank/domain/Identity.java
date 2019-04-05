package com.bank.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Identity implements Serializable {
    private String identityNumber;

    private String identityName;

    private String identitySex;

    private Date identityBirthday;

    private String identityNationality;

    private String identityAddress;

    private Date identityUsefuldate;

    private String identityIssue;

    private String identityImgface;

    private String identityImgback;

    private Integer identityCheckstate;

    private String identityImgown;


}