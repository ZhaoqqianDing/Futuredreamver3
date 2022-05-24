package com.futuredreamtraveller.demo.ServiceImpl;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Record;
import com.futuredreamtraveller.demo.Entity.User;
import com.futuredreamtraveller.demo.Mapper.UserMapper;
import com.futuredreamtraveller.demo.Service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserMapper userMapper;
    @Override
    public String register(String userName,String password){
        log.info("enter into userServiceImpl, "+userName+" "+password);
        User user = new User();
        try{
            user = userMapper.selectUserByUserName(userName);

        }
        catch (Exception e){
            log.info("error1: "+e);
            return "prompt4";//unknown error
        }
        if(user!=null){
            return "prompt3";//the username exist
        }

        String userID = CommonUtils.generateFeedbackId();

        try{
            userMapper.register(userID,userName,password);
        }
        catch (Exception e){
            log.info("error2: "+e);
            return "prompt6";//unknown error
        }
        return "success";
    }

    @Override
    public int checkUserNameUnique(String userName){
        log.debug("enter into userController check username unique method "+userName);
        int ans =0;
        User user =new User();
        try{
            user = userMapper.selectUserByUserName(userName);

        }
        catch (Exception e){
            log.info("error can not find the user by user name "+e);
            return 2;
        }
        if(user!=null){
            return 0;
        }
        return 1;
    }

    @Override
    public User login(String userName,String password){
        User user = new User();
        try{
            user= userMapper.logIn(userName,password);
        }
        catch (Exception e){
            log.info(""+e);
            return user;
        }
        if(user!=null){
            return user;
        }
        return user;
    }

    @Override
    public Record[] reportData(int num, String userID){
        Record[] ans = new Record[num];
        try{
            ans=userMapper.reportData(num,userID);
        }
        catch (Exception e){
            log.info(e+"");
            return new Record[]{null};
        }

        return  ans;
    }
}
