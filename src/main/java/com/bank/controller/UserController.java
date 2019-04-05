package com.bank.controller;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


/**
 * User 控制器.
 *
 * @author <a href="https://waylau.com">Way Lau</a>
 * @since 1.0.0 2017年4月29日
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


//    /**
//     * 查询所有用户
//     *
//     * @param model
//     * @return
//     */
//    @GetMapping
//    public ModelAndView list(Model model) {
//        PageHelper.startPage(2, 4);
//        PageInfo<User> userPageInfo = new PageInfo<>(userRepository.getUserList());
//        model.addAttribute("userList", userPageInfo);
//        model.addAttribute("title", "用户管理");
//        return new ModelAndView("users/list", "userModel", model);
//    }
//
//    @PostMapping
//    public ModelAndView addUser(User user) {
//        logger.info("--------------" + user.getUsername());
//        logger.info("--------------" + user.getPassword());
//        this.userRepository.addUser(user);
//        return new ModelAndView("redirect:/users");
//    }

//    @GetMapping("/form")
//    public ModelAndView createForm(Model model) {
//        model.addAttribute("user", new User());
//        model.addAttribute("title", "创建用户");
//        logger.info("---------进入创建表单页面----");
//        return new ModelAndView("users/form", "userModel", model);
//    }
//
//    @GetMapping("{id}")
//    public ModelAndView getUserByID(@PathVariable("id") Integer id, Model model1) {
//        logger.info("---------进入查询用户页面----");
//        logger.info("*************查询用户id********" + id);
//       User user = this.userRepository.getUserByID(id);
//        model1.addAttribute("user", user);
//        return new ModelAndView("users/view", "userModel", model1);
//    }
//    @GetMapping("/modify/{id}")
//    public ModelAndView modify(@PathVariable("id") Integer id, Model model) {
//        User user = userRepository.getUserByID(id);
//        this.userRepository.updateUser(user);
//        model.addAttribute("user", user);
//        model.addAttribute("title", "修改用户");
//        return new ModelAndView("users/form","userModel",model);
//    }
    @GetMapping("/aa")
    public ModelAndView aa(Model model) {
        return new ModelAndView("user/main");
    }


}
