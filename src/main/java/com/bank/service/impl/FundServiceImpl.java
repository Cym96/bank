package com.bank.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.github.pagehelper.PageInfo;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Fund;
import com.bank.mapper.FundMapper;
import com.bank.service.FundService;
import com.github.pagehelper.PageHelper;

@Service
public class FundServiceImpl implements FundService {
    @Autowired
    private FundMapper fundMapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void saveNewFund(Fund fund) {
        try {
            if (fundMapper.findByName(fund.getFundName()) != null) {
                throw new RuntimeException("基金名称已存在！");
            }
            fundMapper.insertSelective(fund);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void updateFund(Fund fund) {
        try {
            fundMapper.updateByPrimaryKeySelective(fund);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<Fund> findAll(Integer startPage, Integer endPage) {
        List<Fund> fundList = fundMapper.findAllByPage(startPage,endPage);
        return fundList;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Fund findById(Integer fundId) {
        return fundMapper.findById(fundId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Integer findFundCount() {
        return this.fundMapper.countAll();
    }


    @Override
    public List<Fund> findBymangerId(Integer id) {
        return this.fundMapper.findBymangerId(id);
    }

}
