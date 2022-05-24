package com.futuredreamtraveller.demo.Service;

import com.futuredreamtraveller.demo.Entity.Feedback;

public interface FeedbackService {
    String inputFeedback(String feedback);
    Feedback checkFeedback(String fid);
    String updateFeedback(String fid,String password,String newFeedback);
}
