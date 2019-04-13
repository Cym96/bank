package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
@Data
public class Fund implements Serializable {
    private Investstate userInveststateObj;
    private Productstate userProductstateObj;
    private Checkstate checkstateObj;

    private Admin userMangerObj;

    private Company userCompanyObj;
    private Integer fundId;

    private String fundNum;

    private Integer fundInveststate;

    private String fundName;

    private Integer fundProductstate;

    private Integer fundManager;

    private Integer fundCompany;

    private BigDecimal fundMinbuymoney;

    private BigDecimal fundMinsalemoney;

    private BigDecimal fundBuyratio;

    private BigDecimal fundSaleratio;

    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date fundSalebegintime;
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date fundWorkbegintime;

    private String fundText;

    private BigDecimal fundNpv;

    private Integer fundCheckstate;
}