package com.bank.service;

import com.bank.domain.Business;

@org.springframework.stereotype.Service
public interface BusinessService {
    //保存业务
    public Business saveBusiness(Business business);

    //根据id查询业务
    Business findById(Integer id);
}
