package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bank.domain.DateVO;
import com.bank.domain.Record;
import com.bank.mapper.RecordMapper;
import com.bank.service.RecordService;
@Service
public class RecordServiceImpl implements RecordService {
	@Autowired
	private RecordMapper recordMapper;
	@Override
	public void saveRecore(Record record) {
		this.recordMapper.insertSelective(record);
		
	}
	@Override
	public List<Record> findAll(Integer fundId) {
		return this.recordMapper.findAll(fundId);
	}

	@Override
	public List<Record> findByDate(DateVO dateVO) {
		
		return recordMapper.findByDate(dateVO);
	}


}
