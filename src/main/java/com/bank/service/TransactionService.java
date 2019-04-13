package com.bank.service;

import com.bank.domain.Transaction;


public interface TransactionService {
	//保存事物
		public void saveTransaction(Transaction transaction);
}
