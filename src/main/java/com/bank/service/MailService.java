package com.bank.service;

import java.util.List;

import com.bank.domain.Admin;
import com.bank.domain.User;
import org.springframework.stereotype.*;
@Service
public interface MailService {
   public void sendSimplemail(String from, String to, String subject, String content);
}
