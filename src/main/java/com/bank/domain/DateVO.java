package com.bank.domain;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;


@lombok.Data
public class DateVO implements Serializable{

	private Integer fundId;
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date minDate;
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date maxDate;

}
