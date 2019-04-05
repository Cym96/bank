package com.bank.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
@Setter
@Getter
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

//    private static final long serialVersionUID = 1L;
//
//    public Integer getFundId() {
//        return fundId;
//    }
//
//    public void setFundId(Integer fundId) {
//        this.fundId = fundId;
//    }
//
//    public String getFundNum() {
//        return fundNum;
//    }
//
//    public void setFundNum(String fundNum) {
//        this.fundNum = fundNum == null ? null : fundNum.trim();
//    }
//
//    public Integer getFundInveststate() {
//        return fundInveststate;
//    }
//
//    public void setFundInveststate(Integer fundInveststate) {
//        this.fundInveststate = fundInveststate;
//    }
//
//    public String getFundName() {
//        return fundName;
//    }
//
//    public void setFundName(String fundName) {
//        this.fundName = fundName == null ? null : fundName.trim();
//    }
//
//    public Integer getFundProductstate() {
//        return fundProductstate;
//    }
//
//    public void setFundProductstate(Integer fundProductstate) {
//        this.fundProductstate = fundProductstate;
//    }
//
//    public Integer getFundManager() {
//        return fundManager;
//    }
//
//    public void setFundManager(Integer fundManager) {
//        this.fundManager = fundManager;
//    }
//
//    public Integer getFundCompany() {
//        return fundCompany;
//    }
//
//    public void setFundCompany(Integer fundCompany) {
//        this.fundCompany = fundCompany;
//    }
//
//    public BigDecimal getFundMinbuymoney() {
//        return fundMinbuymoney;
//    }
//
//    public void setFundMinbuymoney(BigDecimal fundMinbuymoney) {
//        this.fundMinbuymoney = fundMinbuymoney;
//    }
//
//    public BigDecimal getFundMinsalemoney() {
//        return fundMinsalemoney;
//    }
//
//    public void setFundMinsalemoney(BigDecimal fundMinsalemoney) {
//        this.fundMinsalemoney = fundMinsalemoney;
//    }
//
//    public BigDecimal getFundBuyratio() {
//        return fundBuyratio;
//    }
//
//    public void setFundBuyratio(BigDecimal fundBuyratio) {
//        this.fundBuyratio = fundBuyratio;
//    }
//
//    public BigDecimal getFundSaleratio() {
//        return fundSaleratio;
//    }
//
//    public void setFundSaleratio(BigDecimal fundSaleratio) {
//        this.fundSaleratio = fundSaleratio;
//    }
//
//    public Date getFundSalebegintime() {
//        return fundSalebegintime;
//    }
//
//    public void setFundSalebegintime(Date fundSalebegintime) {
//        this.fundSalebegintime = fundSalebegintime;
//    }
//
//    public Date getFundWorkbegintime() {
//        return fundWorkbegintime;
//    }
//
//    public void setFundWorkbegintime(Date fundWorkbegintime) {
//        this.fundWorkbegintime = fundWorkbegintime;
//    }
//
//    public String getFundText() {
//        return fundText;
//    }
//
//    public void setFundText(String fundText) {
//        this.fundText = fundText == null ? null : fundText.trim();
//    }
//
//    public BigDecimal getFundNpv() {
//        return fundNpv;
//    }
//
//    public void setFundNpv(BigDecimal fundNpv) {
//        this.fundNpv = fundNpv;
//    }
//
//    public Integer getFundCheckstate() {
//        return fundCheckstate;
//    }
//
//    public void setFundCheckstate(Integer fundCheckstate) {
//        this.fundCheckstate = fundCheckstate;
//    }
//    public Investstate getUserInveststateObj() {
//        return userInveststateObj;
//    }
//
//    public void setUserInveststateObj(Investstate userInveststateObj) {
//        this.userInveststateObj = userInveststateObj;
//    }
//
//    public Productstate getUserProductstateObj() {
//        return userProductstateObj;
//    }
//
//    public void setUserProductstateObj(Productstate userProductstateObj) {
//        this.userProductstateObj = userProductstateObj;
//    }
//
//    public Company getUserCompanyObj() {
//        return userCompanyObj;
//    }
//
//    public Admin getUserMangerObj() {
//        return userMangerObj;
//    }
//
//    public void setUserMangerObj(Admin userMangerObj) {
//        this.userMangerObj = userMangerObj;
//    }
//
//    public void setUserCompanyObj(Company userCompanyObj) {
//        this.userCompanyObj = userCompanyObj;
//    }
}