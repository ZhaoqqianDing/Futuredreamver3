package com.futuredreamtraveller.demo.Mapper;

import com.futuredreamtraveller.demo.Entity.Emission;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface EmissionMapper {
    double getEmissionByName(String type);
    Emission[] sortEmissionByCo2();
    Emission[] sortEmissionBySpeed();
    void record(String ftd_ID,String userID,double distance,String type);
}
