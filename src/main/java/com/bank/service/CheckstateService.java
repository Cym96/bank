package com.bank.service;

import java.util.List;

import com.bank.domain.Checkstate;
import org.springframework.stereotype.*;

@Service
public interface CheckstateService {
    public List<Checkstate> findAll();
}
