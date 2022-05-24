package com.futuredreamtraveller.demo.Controller;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Feedback;
import com.futuredreamtraveller.demo.Service.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/FeedbackController")
@Slf4j
@RestController
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;
    @RequestMapping("/inputFeedback")
    public String inputFeedback(HttpServletRequest request){
        String feedback = CommonUtils.trim(request.getParameter("feedback"));
        if("".equals(feedback)){
            return "prompt1";
        }
        if(!CommonUtils.verifyInput(feedback)){
            return "prompt2";
        }
        String ans="success";
        try{
             ans = feedbackService.inputFeedback(feedback);
        }
        catch (Exception e){
            log.info("input feedback occurs an error, due to "+e);
            return "prompt3";
        }
        return ans;
    }

    @RequestMapping("/checkFeedback")
    public Feedback checkFeedback(HttpServletRequest request){
        Feedback feedback = new Feedback();
        String fid = CommonUtils.trim(request.getParameter("fid"));
        String password = CommonUtils.trim(request.getParameter("password"));

        if("".equals(feedback)){
            return feedback;
        }
        if(!CommonUtils.verifyInput(fid)){
            return feedback;
        }
        if("".equals(password)){
            return feedback;
        }
        if(!CommonUtils.verifyInput(password)){
            return feedback;
        }
        try{
            feedback = feedbackService.checkFeedback(fid);
        }
        catch (Exception e){
            log.info("input feedback occurs an error, due to "+e);
            return feedback;
        }
        if(feedback.getPassword()!=null && feedback.getPassword().equals(password)){
            return feedback;
        }
       return new Feedback();
    }

    @RequestMapping("/updateFeedback")
    public String updateFeedback(HttpServletRequest request){
        String fid = CommonUtils.trim(request.getParameter("fid"));
        String password = CommonUtils.trim(request.getParameter("password"));
        String newFeedback = CommonUtils.trim(request.getParameter("newFeedback"));
        log.debug("enter into FeedbackController updateFeedback method, parameters are: "+fid+" "+password  );
        log.debug(newFeedback);
        if("".equals(fid)||"".equals(password)||"".equals(newFeedback)){
            return "empty";
        }
        if(!CommonUtils.verifyInput(fid)||!CommonUtils.verifyInput(password)||!CommonUtils.verifyInput(newFeedback)){
            return "<> is not allowed";
        }
        String result="failed";
        try{
            result = feedbackService.updateFeedback(fid,password,newFeedback);
        }
        catch (Exception e){
            log.info("");
        }
        return "success";

    }
}
