package com.bank.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/aa")
@Controller
public class TextHomeController {
	@RequestMapping(value = "/question", method = RequestMethod.GET)
	public String showUserHead(Locale locale, Model model) {
		return "user/question";
	}
}
