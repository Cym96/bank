package com.bank.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bank.domain.Business;
import com.bank.mapper.BusinessMapper;
import com.bank.service.BusinessService;

@Service
public class BusinessServiceImpl implements BusinessService {
    @Autowired
    private BusinessMapper businessMapper;

    @Override
    public Business saveBusiness(Business business) {
       this.businessMapper.insertSelective(business);
       return business;
    }

    @Override
    public Business findById(Integer id) {
        return this.businessMapper.selectByPrimaryKey(id);
    }

}
