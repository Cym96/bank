package com.bank.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

//import com.aliyuncs.exceptions.ClientException;
import com.bank.domain.Business;
import com.bank.domain.Debitcard;
import com.bank.domain.Fund;
import com.bank.domain.Message;
import com.bank.domain.Record;
import com.bank.domain.Stream;
import com.bank.domain.Transaction;
import com.bank.mapper.BusinessMapper;
import com.bank.mapper.DebitcardMapper;
import com.bank.mapper.FundMapper;
import com.bank.mapper.MessageMapper;
import com.bank.mapper.RecordMapper;
import com.bank.mapper.StreamMapper;
import com.bank.mapper.TransactionMapper;
import com.bank.service.TimerService;
//import com.bank.util.ALiSMSUtil;

@Service
@org.springframework.scheduling.annotation.EnableScheduling
@Component("TimerServiceImpl")
public class TimerServiceImpl implements TimerService {
	    private org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(TimerServiceImpl.class);

	@Autowired
	private TransactionMapper transactionMapper;
	@Autowired
	private DebitcardMapper debitcardMapper;
	@Autowired
	private MessageMapper messageMapper;
	@Autowired
	private BusinessMapper businessMapper;
	@Autowired
	private StreamMapper streamMapper;
	@Autowired
	private RecordMapper recordMapper;
	@Autowired
	private FundMapper fundMapper;

//	@Scheduled(cron = "0 12 19 * * ?")
//	public void AddFundNet11() {//随机添加一年的数据
//		String str = "";
//		Date date = new Date();
//		//
//		GregorianCalendar gc = new GregorianCalendar();
//		gc.set(Calendar.YEAR, 2019);// 设置年
//		gc.set(Calendar.MONTH, 0);// 这里0是1月..以此向后推
//		gc.set(Calendar.DAY_OF_MONTH, 1);// 设置天
//		date = gc.getTime();
//		//
//		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//		str = format.format(date);
//		System.out.println(str);
//
//		Long spi = new Date().getTime() - date.getTime();
//		Long step = spi / (24 * 60 * 60 * 1000);// 相隔天数
//
//		List<Date> dateList = new ArrayList<Date>();
//		dateList.add(date);
//		for (int i = 1; i <= step; i++) {
//			dateList.add(new Date(dateList.get(i - 1).getTime()
//					+ (24 * 60 * 60 * 1000)));// 比上一天减一
//		}
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		// 查询所有基金
//
//		List<Fund> fundList = this.fundMapper.findAll();
//		for (Date date2 : dateList) {
//			System.out.println(sdf.format(date2));
//			// 产生随机数
//			Random random = new Random();
//			Double chengemin = 0.05;
//			for (int i = 0; i < fundList.size(); i++) {
//
//				BigDecimal fundNetvalue = fundList.get(i).getFundNpv();
//				int a = 1;
//				Double min;
//				min = fundNetvalue.doubleValue() - chengemin;
//				if (fundNetvalue.compareTo(BigDecimal.valueOf(2.5)) == 1) {
//					chengemin = chengemin + random.nextDouble() * 0.004;
//				} else if (fundNetvalue.compareTo(BigDecimal.valueOf(0.5)) == -1) {
//					chengemin = chengemin - random.nextDouble() * 0.004;
//				} else {
//
//				}
//
//				Double randFundNetValue1 = random.nextDouble() * 0.1 + min;
//				System.out.print(randFundNetValue1 + " ");
//				System.out.println("===============");
//				fundList.get(i).setFundNpv(
//						BigDecimal.valueOf(randFundNetValue1));
//				Record record = new Record();
//				record.setRecordDate(date2);
//				record.setRecordFund(fundList.get(i).getFundId());
//				record.setRecordNpv(BigDecimal.valueOf(randFundNetValue1));
//				this.recordMapper.insertSelective(record);
//
//				// 修改基金的净值
//				fundList.get(i).setFundNpv(
//						BigDecimal.valueOf(randFundNetValue1));
//				this.fundMapper.updateByPrimaryKeySelective(fundList.get(i));
//			}
//		}
//
//	}


	/**
	 * chen增加基金净值记录表，并修改基金的净值,每天下午3点触发
	 */
	@Scheduled(cron = "0 0 15 * * ?")
	public void AddFundNet() {
		// 查询所有基金
		List<Fund> fundList = this.fundMapper.findAll();
		// 产生随机数
		Random random = new Random();
		Double chengemin = 0.05;
		for (int i = 0; i < fundList.size(); i++) {

			BigDecimal fundNetvalue = fundList.get(i).getFundNpv();
			int a = 1;
			Double min;
			min = fundNetvalue.doubleValue() - chengemin;
			if (fundNetvalue.compareTo(BigDecimal.valueOf(2.5)) == 1) {
				chengemin = chengemin + random.nextDouble() * 0.004;
			} else if (fundNetvalue.compareTo(BigDecimal.valueOf(0.5)) == -1) {
				chengemin = chengemin - random.nextDouble() * 0.004;
			} else {

			}

			Double randFundNetValue1 = random.nextDouble() * 0.1 + min;
//			System.out.print(randFundNetValue1 + " ");
//			System.out.println("===============");
			fundList.get(i).setFundNpv(BigDecimal.valueOf(randFundNetValue1));
			Record record = new Record();
			record.setRecordDate(new Date());
			record.setRecordFund(fundList.get(i).getFundId());
			record.setRecordNpv(BigDecimal.valueOf(randFundNetValue1));
			this.recordMapper.insertSelective(record);

			// 修改基金的净值
			fundList.get(i).setFundNpv(BigDecimal.valueOf(randFundNetValue1));
			this.fundMapper.updateByPrimaryKeySelective(fundList.get(i));
		}

	}

	/**
	 * 每60分钟触发一次
	 */
	@Scheduled(cron = "0/60 * * * * ?")
	public void transferOfAccount() {
		List<Transaction> TransactionList = this.transactionMapper.selectTransactionByDate();
//		System.out.println("transferOfAccount start....");
//		System.out.println(TransactionList.size()+ " of transaction will been done");
		// System.out.println(TransactionList);
		for (Transaction transactionthis : TransactionList) {
//			System.out.println(transactionthis.getTransactionDostate());
//			System.out.println("=============================");
//			System.out.println("Card Number : "+ transactionthis.getTransactionCard());
//			System.out.println("Change Money : "+ transactionthis.getTransactionMoney());
			Debitcard debitcard = debitcardMapper.selectByPrimaryKey(transactionthis.getTransactionCard());
			// 查询卡的状态是否是2 成功处理
			// 判断卡余额与执行额度相加结果是否》=0
			// 查询事物所在业务的所有事物
			Business business = businessMapper.selectByPrimaryKey(transactionthis.getTransactionBusiness());
			List<Transaction> transactionListBusiness = this.transactionMapper.selectByBusiness(business.getBusinessId());
			if (debitcard.getCardState().equals(2) && transactionthis.getTransactionMoney().add(debitcard.getCardRestmoney()).compareTo(new BigDecimal(0)) >= 0) {
//				System.out.println("Successful");
				// 成功
				// 创建一个stream实体
				Stream stream = new Stream();
				// 1.按照事物要求执行操作（对卡的钱加）(状态改为成功1)（向明细表stream实体set除对方账户，对方卡号以外的所有数据）
				this.debitcardMapper.undateDebitcardMoney(transactionthis.getTransactionCard(), debitcard.getCardRestmoney().add(transactionthis.getTransactionMoney()));
				transactionthis.setTransactionDostate(1);
				this.transactionMapper.updateByPrimaryKeySelective(transactionthis);
				stream.setStreamTime(new Date());
				stream.setStreamMoney(transactionthis.getTransactionMoney());
				stream.setStreamRestmoney(debitcard.getCardRestmoney().add(transactionthis.getTransactionMoney()));
				stream.setStreamOwnuser(debitcard.getCardUser());
				stream.setStreamOwncard(debitcard.getCardNum());
				stream.setStreamText(business.getBusinessText());
//				System.out.println(stream.getStreamMoney()+ "TimerServiceImpl.xia    + + ++++++++++++++");
				// 2.判断事物的message是否为空，如果不为空，查询到信息并发送
				if (transactionthis.getTransactionMessage() != null) {
					Message message = this.messageMapper.selectByPrimaryKey(transactionthis.getTransactionMessage());
//					try {
////						System.out.println("Send Message："+ message.getMessagePhone());
////						System.out.println(message.getMessageText());
//						ALiSMSUtil.sendMessageTransfer(message.getMessagePhone(),message.getMessageText());
//					} catch (ClientException e) {
//						e.printStackTrace();
//					}
				}
				// 3.查询事物所在业务的所有事物(按照tran_bus进行查询list)transactionListBusiness
				// 4.判断list中所有的 事物状态是否都为成功 ，如果是都是成功修改所在bus的状态为成功
				boolean isSuccess = true;
				for (Transaction transactionOther : transactionListBusiness) {
					if (!transactionthis.getTransactionId().equals(transactionOther.getTransactionId())) {
						Debitcard debitcardOther = debitcardMapper.selectByPrimaryKey(transactionOther.getTransactionCard());
						stream.setStreamOrtheruser(debitcardOther.getCardUser());
						stream.setStreamOrthercard(debitcardOther.getCardNum());
						if (!transactionOther.getTransactionDostate().equals(1)) {
							isSuccess = false;
						}
					}
				}
				if (isSuccess) {
//					System.out.println("Business:" + business.getBusinessId()+ "." + business.getBusinessText() + " Successful");
					business.setBusinessDostate(1);
					businessMapper.updateByPrimaryKeySelective(business);
				}
				// 并且判断list里的事物id与transactionthis事物id是否相等，若不相等（向明细表stream实体set对方账户，对方卡号）
				// 5.保存stream实体
//				System.out.println(stream.getStreamMoney()+ "TimerServiceImpl++++++++++++++");
				this.streamMapper.insertSelective(stream);

			} else {
				// 失败
				// 1.事物状态改为失败
//				System.err.println("Error");
				/*
				 * transactionthis.setTransactionDostate(2);
				 * this.transactionMapper
				 * .updateByPrimaryKeySelective(transactionthis);
				 */
				// 2.查询事物所在业务的所有事物(按照tran_bus进行查询list)transactionListBusiness
				// 3.遍历list中所有的 事物状态，
				for (Transaction transactionOther : transactionListBusiness) {
					if (transactionOther.getTransactionDostate().equals(1)) {
//						System.err.println("Rollback：");
//						System.err.println("Card Number : "+ transactionOther.getTransactionCard());
//						System.err.println("Change Money : "+ transactionOther.getTransactionMoney());
						Debitcard debitcard2 = debitcardMapper.selectByPrimaryKey(transactionOther.getTransactionCard());
						this.debitcardMapper.undateDebitcardMoney(transactionOther.getTransactionCard(), debitcard2.getCardRestmoney().subtract(transactionOther.getTransactionMoney()));
						Stream stream = new Stream();
						stream.setStreamTime(new Date());
						stream.setStreamMoney(transactionOther.getTransactionMoney());
						stream.setStreamRestmoney(debitcard2.getCardRestmoney().subtract(transactionOther.getTransactionMoney()));
						stream.setStreamOwnuser(debitcard2.getCardUser());
						stream.setStreamOwncard(debitcard2.getCardNum());
						stream.setStreamText(business.getBusinessText() + "失败回退");
						stream.setStreamOrtheruser(debitcard.getCardUser());
						stream.setStreamOrthercard(debitcard.getCardNum());
						this.streamMapper.insertSelective(stream);
					}
					transactionOther.setTransactionDostate(2);
					this.transactionMapper.updateByPrimaryKeySelective(transactionOther);
				}
				// 如果有状态为成功的事物，按照事物要求执行回滚操作（对卡的钱减操作的钱）(状态改为失败)
				// （向明细表stream插入数据）
				// 3.1.创建一个stream实体
				// 3.2（向明细表stream实体set除对方账户，对方卡号以外的所有数据，这些数据是list中，执行回滚操作的人的数据）
				// 3.3向明细表stream实体set对方账户，对方卡号，这些数据是transactionthis的数据
				// 3.4保存stream实体
				// 4.修改所在bus的状态为失败
//				System.err.println("Business:" + business.getBusinessId() + "."
//						+ business.getBusinessText() + " Error");
				business.setBusinessDostate(2);
				businessMapper.updateByPrimaryKeySelective(business);
			}

		}
	}

}
