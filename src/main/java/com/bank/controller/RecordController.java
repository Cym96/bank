package com.bank.controller;

import java.util.Date;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bank.domain.DateVO;
import com.bank.domain.Record;
import com.bank.service.RecordService;
import com.fasterxml.jackson.annotation.JsonFormat;

@RequestMapping("/user")
@Controller
public class RecordController {
	@Autowired
	private RecordService recordService;
	
	@RequestMapping(value = "/findRecord")
	@ResponseBody
	public List<Record> findAll(int fundId,@DateTimeFormat(pattern="yyyy-MM-dd")Date minDate,
			@DateTimeFormat(pattern="yyyy-MM-dd")Date maxDate){
		DateVO dateVO=new DateVO();
		dateVO.setFundId(fundId);
		dateVO.setMinDate(minDate);
		dateVO.setMaxDate(maxDate);
		List<Record> recordList = this.recordService.findByDate(dateVO);
		return recordList;
	}

	public RecordService getRecordService() {
		return recordService;
	}

	public void setRecordService(RecordService recordService) {
		this.recordService = recordService;
	}

}
