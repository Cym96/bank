package com.bank.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class FundSearchVO {

    //基金类型
    private int produceType;
    //基金公司
    private int companyId;
    //基金名称
    private String fundName;


}
