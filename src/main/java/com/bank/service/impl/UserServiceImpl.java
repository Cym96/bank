package com.bank.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bank.domain.Creditcard;
import com.bank.domain.Debitcard;
import com.bank.domain.Identity;
import com.bank.domain.User;
import com.bank.mapper.CreditcardMapper;
import com.bank.mapper.DebitcardMapper;
import com.bank.mapper.IdentityMapper;
import com.bank.mapper.UserMapper;
import com.bank.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private DebitcardMapper debitcardMapper;
    @Autowired
    private CreditcardMapper creditcardMapper;
    @Autowired
    private IdentityMapper identityMapper;


    /**
     * 根据用户id查找用户名
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public User findById(Integer userId) {
        User user = userMapper.selectByPrimaryKey(userId);
        return user;
    }

    //chen start

    @Override
    public void updateUser(User user) {
        this.userMapper.updateByPrimaryKeySelective(user);

    }

    /**
     * 用户登录
     */
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public User isLogin(String username, String password) {
        User user = null;
        if (username.contains("@")) {
            // 邮箱登陆
            user = this.userMapper.findByUserEmail(username);
            if (user == null) {
                throw new RuntimeException("用户名不存在！");
            } else {
                if (user.getUserPassword().equals(password)) {
                    return user;
                } else {
                    throw new RuntimeException("密码错误！");
                }
            }

        } else if (username.length() == 11) {
            // 电话号登陆
            user = this.userMapper.findByUserPhone(username);
            if (user == null) {
                throw new RuntimeException("用户名不存在！");
            } else {
                if (user.getUserPassword().equals(password)) {
                    return user;
                } else {
                    throw new RuntimeException("密码错误！");
                }
            }

        } else if (username.length() == 18) {
            // 身份证号登陆
            user = this.userMapper.findByUserIdentity(username);
            if (user == null) {
                throw new RuntimeException("用户名不存在！");
            } else {
                if (user.getUserPassword().equals(password)) {
                    return user;
                } else {
                    throw new RuntimeException("密码错误！");
                }
            }
        } else {
            throw new RuntimeException("用户名不存在！");
        }

    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
    public void undateDebitcardMoney(String card, BigDecimal money) {
        this.debitcardMapper.undateDebitcardMoney(card, money);

    }

    //chen end
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<Debitcard> findUserDebitcard(Integer userId) {

        return this.debitcardMapper.selectByUserId(userId);
    }

//    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
//    public List<Creditcard> findUserCreditcard(Integer userId) {
//
//        return this.creditcardMapper.selectByUserId(userId);
//    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public Identity findIdentityById(String identityId) {

        return userMapper.selectByIdentity(identityId).getUserIdentityObj();
    }


    @Override
    public User saveUser(User user) {
        userMapper.insertSelective(user);
        return user;
    }

    @Override
    public void saveIdentity(Identity identity) {
        this.identityMapper.insertSelective(identity);

    }

    @Override
    public void saveDebitcard(Debitcard debitcard) {
        // TODO Auto-generated method stub

    }

    @Override
    public void updateDebitcard(Debitcard debitcard) {
        debitcardMapper.updateByPrimaryKeySelective(debitcard);

    }

    @Override
    public List<Debitcard> findNewDebitcard() {
        return debitcardMapper.selectNewDebitcard();
    }

    @Override
    public Debitcard findDebitcardByNum(String cardNum) {
        return debitcardMapper.selectByPrimaryKey(cardNum);
    }


}
