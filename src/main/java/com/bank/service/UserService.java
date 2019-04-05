package com.bank.service;

import java.math.BigDecimal;
import java.util.List;

import com.bank.domain.Creditcard;
import com.bank.domain.Debitcard;
import com.bank.domain.Identity;
import com.bank.domain.Investstate;
import com.bank.domain.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
	//保存用户基金风险指数
	public void updateUser(User user);
	//根据用户id查询用户信息
	public User findById(Integer userId);
	//用户登录
	public User isLogin(String username, String password);
	//根据用户id查询全部借记卡
	public List<Debitcard> findUserDebitcard(Integer userId);
	//根据用户id查询全部信用卡
//	public List<Creditcard> findUserCreditcard(Integer userId);
	//根据身份证号查询身份信息
	public Identity findIdentityById(String identityId);
	 
	//修改用户卡中钱
	public void undateDebitcardMoney(String card, BigDecimal money);
	//保存新用户
	public User saveUser(User user);
	//保存新身份证信息
	public void saveIdentity(Identity identity);
	//保存新借记卡信息
	public void saveDebitcard(Debitcard debitcard);
	//更新借记卡信息
	public void updateDebitcard(Debitcard debitcard);
	//获得全部未启用的借记卡
	public List<Debitcard> findNewDebitcard();
	//根据借记卡号获取借记卡信息
	public Debitcard findDebitcardByNum(String cardNum);

}
