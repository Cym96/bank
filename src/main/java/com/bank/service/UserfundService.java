package com.bank.service;

import java.util.List;

import com.bank.domain.Userfund;

public interface UserfundService {
	//查询所有
	public List<Userfund> findAll();
	//查询用户所有基金
	public List<Userfund> findByUser(Integer userId);
	//根据id查询
	public Userfund findById(Integer userfundId);
	//根据用户查询
	public Userfund findByUserAndFund(Integer userId, Integer fundId);
	//保存
	public void save(Userfund userfund);
	//更新
	public void update(Userfund userfund);
}
