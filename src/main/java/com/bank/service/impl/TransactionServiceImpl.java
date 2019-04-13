package com.bank.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bank.domain.Transaction;
import com.bank.mapper.TransactionMapper;
import com.bank.service.TransactionService;

@Service("TransactionServiceImpl")
public class TransactionServiceImpl implements TransactionService {
	@Autowired
	private TransactionMapper transactionMapper;
	@Override
	public void saveTransaction(Transaction transaction) {
		this.transactionMapper.insertSelective(transaction);
		
	}

}
