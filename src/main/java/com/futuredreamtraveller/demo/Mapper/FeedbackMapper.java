package com.futuredreamtraveller.demo.Mapper;

import com.futuredreamtraveller.demo.Entity.Feedback;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

@Repository
@Mapper
public interface FeedbackMapper {

    void inputFeedback(String fid,String feedback,String password);
    Feedback checkFeedback(String fid);
    void updateFeedback(String fid,String feedback);
}
