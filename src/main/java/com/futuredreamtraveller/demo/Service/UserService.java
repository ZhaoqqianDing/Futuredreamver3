package com.futuredreamtraveller.demo.Service;

import com.futuredreamtraveller.demo.Entity.Record;
import com.futuredreamtraveller.demo.Entity.User;

public interface UserService {
    String register(String userName,String password);
    int checkUserNameUnique(String userName);
    User login(String userName, String password);
    Record[] reportData(int num, String userID);
}
