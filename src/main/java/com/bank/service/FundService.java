package com.bank.service;

import java.util.List;

import com.bank.domain.Fund;
import com.bank.domain.Worklist;
import org.springframework.stereotype.*;

@Service
public interface FundService {
    //保存基金商品
    public void saveNewFund(Fund fund);
    //修改基金商品
    public void updateFund(Fund fund);
    //查询商品
    public List<Fund> findAll(Integer startPage, Integer pageSize);
    //根据id查询商品详细信息
    public Fund findById(Integer fundId);
    //查询到的基金数量
    public Integer findFundCount();
    //根据基金管理者进行查询
    public List<Fund> findBymangerId(Integer id);

}
