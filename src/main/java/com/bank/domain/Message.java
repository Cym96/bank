package com.bank.domain;

import java.io.Serializable;

@lombok.Setter
@lombok.Getter
public class Message implements Serializable {

    private Integer messageId;

    private String messageText;

    private String messagePhone;

}