package com.bank.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bank.domain.Investstate;
import com.bank.domain.User;
import com.bank.service.UserService;

@RequestMapping("/user/question")
@Controller
public class UserQuestionController {
	@Autowired
	private UserService userService;
	@RequestMapping("/userQuestion")
	public String userQuestion(HttpServletRequest request,HttpSession session){
		if(("".equals(request.getParameter("que0")) || request.getParameter("que0") == null)
				&&("".equals(request.getParameter("que1")) || request.getParameter("que1") == null)){
			//获取在线用户
//				User user = (User) session.getAttribute("user");
			User user = new User();
			user.setUserId(10);
			user.setUserInveststate(1);
			//更新用户
			this.userService.updateUser(user);

		}else{
			Integer sum = 0;
			//获取前台的数组
			String que0 = request.getParameter("que0");
			String que1 = request.getParameter("que1");
			String que2 = request.getParameter("que2");
			String que3 = request.getParameter("que3");
			String que4 = request.getParameter("que4");
			String que5 = request.getParameter("que5");
			String que6 = request.getParameter("que6");
			String que7 = request.getParameter("que7");
			String que8 = request.getParameter("que8");
			String que9 = request.getParameter("que9");
			String que10 = request.getParameter("que10");
			String que11 = request.getParameter("que11");
			String que12 = request.getParameter("que12");
			String que13 = request.getParameter("que13");
			String que14 = request.getParameter("que14");
			String que15 = request.getParameter("que15");
			String que16 = request.getParameter("que16");
			String que17 = request.getParameter("que17");


			List<Integer> queList = new ArrayList<>();

			queList.add(Integer.parseInt(que0));
			queList.add(Integer.parseInt(que1));
			queList.add(Integer.parseInt(que3));
			queList.add(Integer.parseInt(que4));
			queList.add(Integer.parseInt(que5));
			queList.add(Integer.parseInt(que6));
			queList.add(Integer.parseInt(que7));
			queList.add(Integer.parseInt(que8));
			queList.add(Integer.parseInt(que9));
			queList.add(Integer.parseInt(que10));
			queList.add(Integer.parseInt(que11));
			queList.add(Integer.parseInt(que12));
			queList.add(Integer.parseInt(que13));
			queList.add(Integer.parseInt(que14));
			queList.add(Integer.parseInt(que15));
			queList.add(Integer.parseInt(que16));
			queList.add(Integer.parseInt(que17));

			Investstate investstate = new Investstate();
			if (queList.size() == 17) {
				Object al[] = queList.toArray();
				for (int i = 0; i < al.length; i++) {
					sum += ((Integer) al[i]).intValue();
				}
				System.out.println(sum);
				if (sum <= 19) {
					investstate.setStateId(5);
				} else if (sum >= 20 && sum <= 34) {
					investstate.setStateId(4);
				} else if (sum >= 35 && sum <= 49) {
					investstate.setStateId(3);
				} else if (sum >= 50 && sum <= 64) {
					investstate.setStateId(2);
				} else if (sum >= 65) {
					investstate.setStateId(1);
				}
				//获取在线用户
//				User user = (User) session.getAttribute("user");
				User user = new User();
				user.setUserId(10);
				user.setUserInveststate(investstate.getStateId());
				//更新用户
				this.userService.updateUser(user);
		}
		}
		return "redirect:/user/fund/findAll";
		
	}
	@RequestMapping("/showQuestion")
	public String showQuestion(){
		 return "user/question";
		
	}
}
