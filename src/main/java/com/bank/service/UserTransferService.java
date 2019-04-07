package com.bank.service;

import com.bank.domain.Business;
import com.bank.domain.Debitcard;
import com.bank.domain.Message;
import com.bank.domain.Stream;
import com.bank.domain.Transaction;
@org.springframework.stereotype.Service
public interface UserTransferService {
	//根据借记卡号查询借记卡信息 
	Debitcard findDebitcardMessage(String DebitcardNum);
	//向系统业务表business插入数据
	public Business saveBusiness(Business business); 
	//系统事物表添加数据
	public void saveTransaction(Transaction transaction); 
	//向账户明细表stream中插入数据
	public void saveStream(Stream stream); 
	//向message中插入数据
	public Message saveMessage(Message message); 
	
}
