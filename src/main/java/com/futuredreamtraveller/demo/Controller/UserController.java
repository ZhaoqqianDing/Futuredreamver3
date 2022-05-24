package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Record;
import com.futuredreamtraveller.demo.Entity.User;
import com.futuredreamtraveller.demo.Service.UserService;
import io.swagger.models.auth.In;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.HashMap;

@RequestMapping("/UserController")
@Slf4j
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @RequestMapping("/register")
    public String register(HttpServletRequest request){
        log.debug("enter into userController register method");
        String ans="failed, please try again later";
        String password = CommonUtils.trim(request.getParameter("password"));
        String userName = CommonUtils.trim(request.getParameter("userName"));
        log.info(password+" "+userName);
        if("".equals(userName)){
            return "prompt1";
        }
        if(!CommonUtils.verifyInput(userName)){
            return "prompt2";
        }
        if("".equals(password)){
            return "prompt1";
        }
        if(!CommonUtils.verifyInput(password)){
            return "prompt2";
        }
        try{
            ans=userService.register(userName,password);
        }
        catch (Exception e){
            log.info("error: "+e);
            return "prompt5";//unknown error
        }
        return ans;
    }

    @RequestMapping("/checkUserNameUnique")
    public String checkUserNameUnique(HttpServletRequest request){
        String userName = CommonUtils.trim(request.getParameter("userName"));
        if("".equals(userName)){
            log.info("userName null");
            return "user name should not be null";
        }
        if(!CommonUtils.verifyInput(userName)){
            return "user name should not contains < or >";
        }
        int ans =0;
        try{
            ans=userService.checkUserNameUnique(userName);
        }
        catch ( Exception e){
            log.info("find userName occurs error "+e);
            return "unknown error please try again later";
        }
        if(ans ==0){
            return "unknown error please try again later";

        }
        else{
            return "this user name is ok";
        }
    }

    @RequestMapping("/logIn")
    public int logIn(HttpServletRequest request){
        String userName = CommonUtils.trim(request.getParameter("userName"));
        String password = CommonUtils.trim(request.getParameter("password"));

        User user = new User();
        try{
           user=userService.login(userName,password);
        }
        catch (Exception e){
            log.info(e+"");
            return  0;
        }
        if(user==null){
            return 0;
        }
        request.getSession().setAttribute("session_user",user);
        return 1;

    }
    @RequestMapping("/testing")
    public String testing(HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("session_user");
        return user.getUserName();
    }

    @RequestMapping("/reportData")
    public Record[] reportData(HttpServletRequest request){
        String dayNum = CommonUtils.trim(request.getParameter("dayNum"));
        int num = Integer.valueOf(dayNum);
        User user = (User) request.getSession().getAttribute("session_user");
        HashMap<String, Double> hashMap = new HashMap<>();
        hashMap.put("Bicycle",0.0);
        hashMap.put("Walk",0.0);
        hashMap.put("Bus",104.71);
        hashMap.put("E-Scooter",150.72);
        hashMap.put("Light rail and tram",35.08);
        hashMap.put("plane",233.6);
        hashMap.put("Small car (hybrid)",153.71);

        if(dayNum==null || user==null){
            return new Record[]{null};
        }
        Record[] ans = new Record[num];
        try{
            ans=userService.reportData(num,user.getUserID());
        }
        catch (Exception e){
            log.info(e+"");
            return new Record[]{null};
        }
        for(int i=0;i<ans.length;i++){
            double Co2Em = ans[i].getDistance()*hashMap.get(ans[i].getType());
            BigDecimal b   =   new   BigDecimal(Co2Em);
            double   f1   =   b.setScale(2,   BigDecimal.ROUND_HALF_UP).doubleValue();
            ans[i].setCo2Emission(f1);
            double distance = ans[i].getDistance();
            BigDecimal d = new BigDecimal(distance);
            double d1 = d.setScale(2,   BigDecimal.ROUND_HALF_UP).doubleValue();
            ans[i].setDistance(d1);
        }
        return ans;
    }
}
