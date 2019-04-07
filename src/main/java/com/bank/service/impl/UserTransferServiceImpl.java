package com.bank.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Business;
import com.bank.domain.Debitcard;
import com.bank.domain.Message;
import com.bank.domain.Stream;
import com.bank.domain.Transaction;
import com.bank.mapper.BusinessMapper;
import com.bank.mapper.DebitcardMapper;
import com.bank.mapper.MessageMapper;
import com.bank.mapper.TransactionMapper;
import com.bank.service.UserTransferService;
@Service
public class UserTransferServiceImpl implements UserTransferService{

	@Autowired
	private DebitcardMapper debitcardMapper;
	@Autowired
	private BusinessMapper businessMapper;
	@Autowired
	private TransactionMapper transactionMapper;
	@Autowired
	private MessageMapper messageMapper;

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Debitcard findDebitcardMessage(String DebitcardNum) {
		
		return debitcardMapper.selectByPrimaryKey(DebitcardNum);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public Business saveBusiness(Business business) {
		this.businessMapper.insertSelective(business);
		return business;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public void saveTransaction(Transaction transaction) {
		this.transactionMapper.insertSelective(transaction);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public void saveStream(Stream stream) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Message saveMessage(Message message) {
		this.messageMapper.insertSelective(message);
		return message;
	}

}
