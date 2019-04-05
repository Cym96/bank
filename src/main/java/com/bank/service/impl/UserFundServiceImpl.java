package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Userfund;
import com.bank.mapper.UserfundMapper;
import com.bank.service.UserfundService;

@Service
public class UserFundServiceImpl implements UserfundService {

    @Autowired
    private UserfundMapper userFundMapper;

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<Userfund> findAll() {

        List<Userfund> userfundList = this.userFundMapper.findAll();
        return userfundList;
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Userfund findById(Integer userfundId) {
        return userFundMapper.selectByPrimaryKey(userfundId);
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Userfund findByUserAndFund(Integer userId, Integer fundId) {

        Userfund userfundList = this.userFundMapper.findAllByUserAndFund(userId, fundId);
        return userfundList;
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void save(Userfund userfund) {
        this.userFundMapper.insert2(userfund);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void update(Userfund userfund) {
        this.userFundMapper.updateByPrimaryKey(userfund);
    }

    @Override
    public List<Userfund> findByUser(Integer userId) {

        return userFundMapper.findAllUserFund(userId);
    }
}
