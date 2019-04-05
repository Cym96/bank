package com.bank.service;

import java.util.List;

import com.bank.domain.Stream;

public interface StreamService {

	//根据卡号查询花费明细
	List<Stream> findByCard(String cardNum);
	
}
