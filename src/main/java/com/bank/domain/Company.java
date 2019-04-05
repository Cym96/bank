package com.bank.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

//@Data
@Getter
@Setter
public class Company implements Serializable {
    private String time;

    private Integer companyId;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date companyBuildtime;

    private BigDecimal companySignmoney;

    private String companyName;

    private String companyLegalperson;

    private String companyLineperson;

    private String companyWebsite;

    private String companyPhone;

    private String companyIntroduce;

    private String companyAddress;

    private Integer companyCheckstate;

    private  Checkstate checkstate;

   }