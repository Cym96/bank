package com.bank.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class User implements Serializable {

    private Identity userIdentityObj;

    private List<Order> orderObjList;

    private List<Userfund> UserfundObjList;

    private Integer userId;

    private String userPassword;

    private String userIdentity;

    private String userPhone;

    private String userAddress;

    private String userEmail;

    private Integer userInveststate;

    private Integer userSignstate;

}