package com.bank.domain;

import java.io.Serializable;
import lombok.*;
@Data
public class Companypicture implements Serializable {
    private Integer imgId;

    private String imgName;

    private Integer imgCompany;
}