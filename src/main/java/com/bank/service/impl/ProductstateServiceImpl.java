package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Productstate;
import com.bank.mapper.ProductstateMapper;
import com.bank.service.ProductstateService;

@Service
public class ProductstateServiceImpl implements ProductstateService {
    @Autowired
    private ProductstateMapper productstateMapper;

    @Override
    public List<Productstate> findAll() {

        return this.productstateMapper.findAll();
    }

}
