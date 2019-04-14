package com.bank.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bank.service.*;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    JavaMailSender mailSender;
    public void sendSimplemail(String from, String to, String subject, String content){

    }


}
