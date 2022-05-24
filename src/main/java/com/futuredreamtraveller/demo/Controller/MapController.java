package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Emission;
import com.futuredreamtraveller.demo.Entity.User;
import com.futuredreamtraveller.demo.Service.CalculatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Pattern;

@RequestMapping("/MapController")
@Slf4j
@RestController
public class MapController {
    @Autowired
    private CalculatorService calculatorService;

    @RequestMapping("/getMapResult")
    public void getMapResult(HttpServletRequest request, Model model){
        String num = CommonUtils.trim(request.getParameter("distance"));

        String type=(String)(request.getSession().getAttribute("session_Traffic_tools"));
        if(null==type){
            model.addAttribute("errorPrompt","you should choose a tools first!");
            return;
        }
        log.info(type);
        if(type.equals("")){
            model.addAttribute("errorPrompt","Please choose a traffic tools");

            return ;
        }
        log.info("Your input is: "+num);
        if( !Pattern.compile("^[+-]?[0-9.]+$").matcher(num).find()){
            model.addAttribute("errorPrompt","you should input a number");
            return ;
        }
        String[] ans=new String[3];
        try{
            ans=calculatorService.calculatorTheBenefit(Double.valueOf(num));
        }
        catch (Exception e){
            model.addAttribute("errorPrompt","errors, please connect us or try again latter");
            return ;
        }
        model.addAttribute("recommend",ans[0]);
        model.addAttribute("result",ans[1]);
        model.addAttribute("otherSolution",ans[2]);
        return ;
    }
    @RequestMapping ("/record")
    public void record(HttpServletRequest request){
        //String distanceS = CommonUtils.trim(request.getParameter("distance"));
       // double distance=Double.valueOf(distanceS);

        String type = CommonUtils.trim(request.getParameter("type"));

        User user = (User) request.getSession().getAttribute("session_user");
        log.info("enter into record method ");
        if(user==null){
            log.info("no exist user ");
            return;
        }
        log.info("record function "+user.getUserName()+" "+type);
        int ans =0;
        try{
            ans=calculatorService.record(user.getUserID(),type);
        }
        catch (Exception e){
            log.info(e+"");

        }
        log.info("if ans ==1 success, or failed "+ans);
    }
}
