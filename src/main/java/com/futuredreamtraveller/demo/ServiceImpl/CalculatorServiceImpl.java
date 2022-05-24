package com.futuredreamtraveller.demo.ServiceImpl;

import com.futuredreamtraveller.demo.Common.CommonUtils;
import com.futuredreamtraveller.demo.Entity.Benefit;
import com.futuredreamtraveller.demo.Entity.Emission;
import com.futuredreamtraveller.demo.Mapper.BenefitMapper;
import com.futuredreamtraveller.demo.Mapper.EmissionMapper;
import com.futuredreamtraveller.demo.Service.CalculatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;

@Slf4j
@Service
public class CalculatorServiceImpl implements CalculatorService {
    @Resource
    BenefitMapper benefitMapper;
    @Resource
    EmissionMapper emissionMapper;
    private double double1;
    private double double2;
    private double double3;
    private double double4;
    private double double5;
    private double double6;
    private double double7;

    public String[] calculatorTheBenefit(double num){
        log.debug("enter into CalculatorSerice calculate the benefits");
        StringBuilder resultSb = new StringBuilder();
       // resultSb.append("Your cost is equal to"+"\n");
        log.info("the final num is: "+num);
        double emissionNum = 0;
        double4=num;
//        try{
//            Benefit[] benefits= benefitMapper.getAllBenefit();
//            for(int i =0;i<benefits.length;i++){
//                String result = String .format("%.2f",num/benefits[i].getCO2());
//                resultSb.append("material: "+benefits[i].getMaterial()+" weight: "+result+"\n");
//            }
//        }
//        catch(Exception e){
//            log.info("can not find the database data.please check again");
//            log.info(e+"");
//            return "can not work now,please try again later";
//        }
        String[] ans = new String[3];
        String recommandType ="";
        if(num>10000){
            ans[0]="plane";
            ans[2]="driving";
            recommandType="Short-haul flight (economy)";
        }
        else if(num>100){
            ans[0]="light_rail_or_tram";
            ans[2]="driving";
            recommandType="Light rail and tram";
        }
        else if(num>50){
            ans[0]="driving";
            ans[2]="light rail or tram";
            recommandType="Small car (petrol)";
        }
        else if(num>5){
            ans[0]="Bus";
            ans[2]="Bicycle";
            recommandType="Bus";

        }
        else if(num>3){
            ans[0]="Bicycle";
            ans[2]="E-Scooter";
            recommandType="0";

        }
        else if(num>1.5){
            ans[0]="E-Scooter";
            ans[2]="Bicycle";
            recommandType="0";
        }
        else{
            ans[0]="walking";
            ans[2]="Bicycle";
            recommandType="0";

        }
        try{
            if(!recommandType.equals("0")){
                emissionNum = emissionMapper.getEmissionByName(recommandType);
            }

        }
        catch (Exception e){
            log.info(e+"");
            return  new String[]{"can not work now,please try again later","",""};
        }
        
        if( !recommandType.equals("0")) {

            num = num * emissionNum / 1000;
            log.info("emission: " + emissionNum);
            log.info("the double 4:"+num);
            double1=num;
            double2=num*1.7;
            double3=num * 0.00096;
            String num1 = String.format("%.2f", num);
            String num2 = String.format("%.2f", num * 1.7);
            String num3 = String.format("%.2f", num * 0.00096);
            resultSb.append("the CO2 cost is: " + num1 + "kg; ");
            resultSb.append("equals to use water: " + num2 + "g; ");
            resultSb.append("equals a car run on the way: " + num3 + "day; " );
            ans[1]=resultSb.toString();
        }
        else{

            num =0;
            log.info("the double 4: "+num);
            double1=0.0;
            double2=0.0;
            double3=0.0;
            resultSb.append("the CO2 cost is: " + 0 + "kg; ");
            resultSb.append("equals to use water: " + 0 + "g; ");
            resultSb.append("equals a car run on the way: " + 0 + "day; " );
            ans[1]=resultSb.toString();
        }
        return ans;
    }

    public double calculateThePrompt(String type){
       log.info("try to find the "+type+" cost");
       double ans=0;
       try{
           ans= emissionMapper.getEmissionByName(type);
       }
       catch (Exception e){
           log.info("can not find this type");
           return 0;
       }
       return ans;
    }
    public Emission[] sortEmission(){
        Emission[] ans = new Emission[39];
        try{
            ans = emissionMapper.sortEmissionByCo2();
        }
        catch (Exception e){
            log.info("can not sort emission due to: "+e);
        }
        return ans;
    }
    public Emission[] sortEmissionArrayBySpeed(){
        Emission[] ans = new Emission[39];
        try{
            ans = emissionMapper.sortEmissionBySpeed();
        }
        catch (Exception e){
            log.info("can not sort emission due to: "+e);
        }
        return ans;
    }
    public double[] visual(){
        double[] ans = new double[8];

        ans[0]=double4*155.73; //plane
        ans[1]=double4*35.08; //Light rail and tram
        ans[2]=double4*142;//Small car (petrol)
        ans[3]=double4*104.71;//Bus
        ans[4]=0;//Bike
        ans[5]=double4*120;//E-s
        ans[6]=0;//Walk
        ans[7]=double4;//distance
        log.info("the double 4: "+double4);
        return ans;

    }
    @Override
    public int record(String userID,String type){
        log.info("enter into record impl");
        double distance = double4;
        log.info("enter into record method "+userID+" "+distance+" "+type);
        String ftd_ID = CommonUtils.generateFeedbackId();
        try{
            emissionMapper.record(ftd_ID,userID,distance,type);
        }
        catch (Exception e){
            log.info(e+"");
            return 0;
        }
        return 1;
    }

}
