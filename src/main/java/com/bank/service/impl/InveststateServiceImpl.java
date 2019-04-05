package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Investstate;
import com.bank.mapper.InveststateMapper;
import com.bank.service.InveststateService;

@Service
public class InveststateServiceImpl implements InveststateService {
    @Autowired
    private InveststateMapper investstateMapper;

    @Override
    public List<Investstate> findAll() {

        return this.investstateMapper.findAll();
    }

    public InveststateMapper getInveststateMapper() {
        return investstateMapper;
    }

    public void setInveststateMapper(InveststateMapper investstateMapper) {
        this.investstateMapper = investstateMapper;
    }

}
