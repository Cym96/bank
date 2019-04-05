package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bank.domain.Stream;
import com.bank.mapper.BusinessMapper;
import com.bank.mapper.StreamMapper;
import com.bank.service.StreamService;
@Service
public class StreamServiceImpl implements StreamService {
	@Autowired
	private StreamMapper streamMapper;
	@Override
	public List<Stream> findByCard(String cardNum) {
		return this.streamMapper.selectByStreamOwncard(cardNum);
	}
	public StreamMapper getStreamMapper() {
		return streamMapper;
	}
	public void setStreamMapper(StreamMapper streamMapper) {
		this.streamMapper = streamMapper;
	}
	
	

}
