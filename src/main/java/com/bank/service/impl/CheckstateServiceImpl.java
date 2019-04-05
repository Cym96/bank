package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Checkstate;
import com.bank.mapper.CheckstateMapper;
import com.bank.service.CheckstateService;


@Service
public class CheckstateServiceImpl implements CheckstateService {
    @Autowired
    private CheckstateMapper checkstateMapper;

    @Override
    public List<Checkstate> findAll() {
        return this.checkstateMapper.findAll();
    }

}
