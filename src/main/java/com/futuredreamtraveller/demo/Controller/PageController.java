package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.User;
import com.futuredreamtraveller.demo.Service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.jws.WebParam;
import javax.servlet.http.HttpServletRequest;

@RequestMapping("/PageController")
@Slf4j
@Controller
public class PageController {
    @Autowired
    UserService userService;
    // comment: this controller used to navigate to different pages
    // author: Zhongyuan Liu
    @RequestMapping("/toIndex")
    public String index() {
        log.info("enter into index");
        return "index";
    }
    // @RequestMapping("/toGame")
    // public String game(){
    // log.info("enter into game");
    // return "game";
    // }

    // @RequestMapping("/toBlog")
    // public String blog(){
    // log.info("enter into blog");
    // return "blog";
    // }

    @RequestMapping("/toCalculator")
    public String calculator() {
        log.info("enter into calculator");
        return "calculator";
    }

    @RequestMapping("/toHomePage")
    public String toHomePage(HttpServletRequest request, Model model) {
        User user= (User) request.getSession().getAttribute("session_user");
        if(user!=null){
            model.addAttribute("userName", user.getUserName());

            return "homePageAfterLogin";
        }
        return "homePage";
    }

    @RequestMapping("/toBicycle")
    public String toBike() {
        return "Bicycle";
    }

    @RequestMapping("/toBus")
    public String toBus() {
        return "PublicTransport";
    }

    @RequestMapping("/toE-Scooter")
    public String toEscooter() {
        return "Escooter";
    }

    @RequestMapping("/tolight_rail_or_tram")
    public String tolight_rail_or_tram() {
        return "PublicTransport";
    }

    @RequestMapping("/todriving")
    public String todriving() {
        return "driving";
    }

    @RequestMapping("/toplane")
    public String toplane() {
        return "plane";
    }

    @RequestMapping("/towalking")
    public String toWalking() {
        return "walking";
    }

    @RequestMapping("/toMap")
    public String toMap(Model model) {
        log.info("enter into calculator");
        model.addAttribute("prompt", "Calculate and there will show the result");
        return "Map";
    }

    @RequestMapping("/logIn")
    public String logIn(HttpServletRequest request, Model model){
        String userName = CommonUtils.trim(request.getParameter("userName"));
        String password = CommonUtils.trim(request.getParameter("password"));

        User user = new User();
        try{
            user=userService.login(userName,password);
        }
        catch (Exception e){
            log.info(e+"");

            model.addAttribute("message", "Unknown error, please try again later");
            return  "logIn";
        }
        if(user==null || user== new User()){

            model.addAttribute("message", "UserName or password is wrong, please check and try again");

            return  "logIn";
        }
        request.getSession().setAttribute("session_user",user);
        model.addAttribute("userName", user.getUserName());
        log.info(user.getUserID());
        return "homePageAfterLogin";

    }

    @RequestMapping("/register")
    public String register(HttpServletRequest request){
        log.debug("enter into userController register method");
        String ans="failed, please try again later";
        String password = CommonUtils.trim(request.getParameter("password"));
        String userName = CommonUtils.trim(request.getParameter("userName"));
        log.info(password+" "+userName);
        if("".equals(userName)){
            log.info("userName null");

            return "register";
        }
        if(!CommonUtils.verifyInput(userName)){
            log.info("userName illegal");

            return "register";
        }
        if("".equals(password)){
            log.info("password null");

            return "register";
        }
        if(!CommonUtils.verifyInput(password)){
            log.info("password illegal");

            return "register";
        }
        try{
            ans=userService.register(userName,password);
        }
        catch (Exception e){
            log.info("error: "+e);
            return "register";//unknown error
        }
        if(!ans.equals("success")){
            return "register";
        }
        return "logIn";
    }
    @RequestMapping("/toLogIn")
    public String toLogIn(){
        return "logIn";
    }

    @RequestMapping("/toRegister")
    public String toRegister(){
        return "register";
    }

    @RequestMapping("/toReport")
    public String toReport(HttpServletRequest request,Model model){

        User user= (User) request.getSession().getAttribute("session_user");
        model.addAttribute("userName", user.getUserName());
        return "report";
    }

    @RequestMapping("/toMapCalculator")
    public String toMapCalculator(HttpServletRequest request,Model model){
        User user= (User) request.getSession().getAttribute("session_user");
        model.addAttribute("userName", user.getUserName());
        return "mapCalculator";
    }

    @RequestMapping("/logOut")
    public String logOut(HttpServletRequest request){
        request.getSession().removeAttribute("session_user");
        return "homePage";
    }
}
