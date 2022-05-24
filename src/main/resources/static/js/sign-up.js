$(function () {
    var $password = $("#password");
    var $confirmPassword = $("#ConfirmPassword");
    var $passwordAlert = $(".password-alert");
    var $confirmPasswordAlert = $(".confirm-password-alert");
    var $requirements = $(".requirements");
    var leng, bigLetter, num, specialChar;
    var $leng = $(".leng");
    var $bigLetter = $(".big-letter");
    var $smallLetter = $(".small-letter");
    var $num = $(".num");
    var $specialChar = $(".special-char");
    var $same= $(".same");
    var specialChars = "!@#$%^&*()-_=+[{]}\\|;:'\",./?`~";
    var numbers = "0123456789";

    $requirements.addClass("wrong");
    $password.on("focus", function(){$passwordAlert.show();});
    $confirmPassword.on("focus", function(){$confirmPasswordAlert.show();});
    $password.on("input blur", function (e) {
        var el = $(this);
        var val = el.val();
        $passwordAlert.show();

        if (val.length < 8) {
            leng = false;
        }
        else if (val.length > 7) {
            leng=true;
        }
        

        if(val.toLowerCase()==val){
            bigLetter = false;
        }
        else{bigLetter=true;}


        if(val.toUpperCase()==val){
            smallLetter = false;
        }else{smallLetter=true;}
        
        num = false;
        for(var i=0; i<val.length;i++){
            for(var j=0; j<numbers.length; j++){
                if(val[i]==numbers[j]){
                    num = true;
                }
            }
        }
        
        specialChar=false;
        for(var i=0; i<val.length;i++){
            for(var j=0; j<specialChars.length; j++){
                if(val[i]==specialChars[j]){
                    specialChar = true;
                }
            }
        }

        console.log(leng, bigLetter, smallLetter, num, specialChar);
        
        if(leng==true&&bigLetter==true&&smallLetter==true&&num==true&&specialChar==true){
            $(this).addClass("valid").removeClass("invalid");
            $requirements.removeClass("wrong").addClass("good");
            $passwordAlert.removeClass("alert-warning").addClass("alert-success");
        }
        else
        {
            $(this).addClass("invalid").removeClass("valid");
            $passwordAlert.removeClass("alert-success").addClass("alert-warning");

            if(leng==false){$leng.addClass("wrong").removeClass("good");}
            else{$leng.addClass("good").removeClass("wrong");}

            if(bigLetter==false){$bigLetter.addClass("wrong").removeClass("good");}
            else{$bigLetter.addClass("good").removeClass("wrong");}

            if(smallLetter==false){$smallLetter.addClass("wrong").removeClass("good");}
            else{$smallLetter.addClass("good").removeClass("wrong");}

            if(num==false){$num.addClass("wrong").removeClass("good");}
            else{$num.addClass("good").removeClass("wrong");}

            if(specialChar==false){$specialChar.addClass("wrong").removeClass("good");}
            else{$specialChar.addClass("good").removeClass("wrong");}
        }
        
        
        if(e.type == "blur"){
                $passwordAlert.hide();
            }
    });
    $confirmPassword.on("input blur", function (e) {
        var el = $(this);
        var val = el.val();
        $confirmPasswordAlert.show();

        if (val == $password.val()) {
            $(this).addClass("valid").removeClass("invalid");
            $same.addClass("good").removeClass("wrong");
            $confirmPasswordAlert.removeClass("alert-warning").addClass("alert-success");
        }
        else {
            $(this).addClass("invalid").removeClass("valid");
            $same.addClass("wrong").removeClass("good");
            $confirmPasswordAlert.removeClass("alert-success").addClass("alert-warning");
        }

        if(e.type == "blur"){
            $confirmPasswordAlert.hide();
        }
    });
});