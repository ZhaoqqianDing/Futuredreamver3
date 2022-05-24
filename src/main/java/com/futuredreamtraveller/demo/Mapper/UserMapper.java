package com.futuredreamtraveller.demo.Mapper;

import com.futuredreamtraveller.demo.Entity.Record;
import com.futuredreamtraveller.demo.Entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {
    User selectUser(String id);
    User logIn(String userName,String password);
    void register(String userID,String userName,String password);
    User selectUserByUserName(String userName);
    Record[] reportData(int num, String userID);
}
