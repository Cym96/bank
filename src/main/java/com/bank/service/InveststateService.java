package com.bank.service;

import java.util.List;

import com.bank.domain.Investstate;

@org.springframework.stereotype.Service
public interface InveststateService {
    public List<Investstate> findAll();
}
