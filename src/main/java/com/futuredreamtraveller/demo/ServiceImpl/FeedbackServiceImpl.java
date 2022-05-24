package com.futuredreamtraveller.demo.ServiceImpl;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Feedback;
import com.futuredreamtraveller.demo.Mapper.FeedbackMapper;
import com.futuredreamtraveller.demo.Service.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Resource
    FeedbackMapper feedbackMapper;
    @Override
    public String inputFeedback(String feedback){
        log.debug("enter into feedbackServiceImpl inputFeedback, feedback is: "+feedback);
        try{
            String fid = CommonUtils.generateFeedbackId();
            String password = CommonUtils.generatePassword();
            log.info("debug "+fid+" "+password);
            feedbackMapper.inputFeedback(fid,feedback,password);
        }
        catch (Exception e){
            log.info("meet an error, "+e);
            return "fail";
        }
        return "success";
    }

    @Override
    public Feedback checkFeedback(String fid){
        Feedback feedback = new Feedback();
        log.debug("enter into feedbackServiceImpl check feedback, fid is: "+fid);
        try{
            feedback= feedbackMapper.checkFeedback(fid);
        }
        catch (Exception e){
            log.info("meet an error, "+e);
        }
        return feedback;
    }
    @Override
    public String updateFeedback(String fid,String password,String newFeedback){
        log.debug("enter into FeedbackControllerImpl, the parameters are, "+fid+" "+password );
        Feedback feedback = new Feedback();
        try{
            feedback=feedbackMapper.checkFeedback(fid);
        }
        catch (Exception e){
            log.info("can not find this feedback, due to "+e);
            return "can not find this feedback, please check the feedback id or try again later";
        }
        if(!feedback.getPassword().equals(password)){
            return "the password is wrong, please check the Feedback id and password, and try again";
        }
        try{
            feedbackMapper.updateFeedback(fid,newFeedback);
        }
        catch (Exception e){
            log.info("can not upadate this feedback due to "+e);
            return "update failed, please try again later";
        }
        return "success";
    }

}
