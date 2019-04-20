package com.bank.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.*;


@Service
public class MailServiceImpl implements com.bank.service.MailService{
    private static final Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);


    @Value("${spring.mail.username}")
    private String from;

//    @Autowired
//    JavaMailSender mailSender;
    public void sendSimplemail(String to, String subject, String content){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(content);
//        message.setFrom(from);
//        logger.info("邮件发送方" + from + "=====邮件接收方 " + to );
//        mailSender.send(message);
    }
}
