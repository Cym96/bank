package com.bank.service;

import java.util.List;

import com.bank.domain.Productstate;
import org.springframework.stereotype.Service;

@Service
public interface ProductstateService {
    public List<Productstate> findAll();
}
