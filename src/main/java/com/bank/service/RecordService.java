package com.bank.service;

import java.util.List;

import com.bank.domain.DateVO;
import com.bank.domain.Record;
import org.springframework.stereotype.*;
@Service
public interface RecordService {
	//查询净值记录
	public List<Record> findAll(Integer fundId);
	//按日期查询净值
	public List<Record> findByDate(DateVO dateVO);
	//保存净值
	public void saveRecore(Record record);

}
