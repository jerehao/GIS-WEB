$(document).ready(function(){
	var old_user_name=$(".form-newuser #inputUserName").val();
	var old_passwd=$(".form-newuser #inputPasswd").val();
	var old_user_phone=$(".form-newuser #inputPhone").val();
	var old_is_send=$(".form-newuser #selectIsSend").val();
	var old_user_email=$(".form-newuser #inputEmail").val();
	$('.form-newuser').submit(function(e){
		e.preventDefault();
		var user_name=$(".form-newuser #inputUserName").val();
		var oldpasswd=$(".form-newuser #inputOldPasswd").val();
		var passwd=$(".form-newuser #inputPasswd").val();
		var passwd2=$(".form-newuser #inputPasswd2").val();
		var user_phone=$.trim($(".form-newuser #inputPhone").val());
		var is_send=$(".form-newuser #selectIsSend").val();
		var user_email=$.trim($(".form-newuser #inputEmail").val());
		var reg_phone = /^0?1[3-9]\d{9}$/;
		var hasError=0;
		var user_id=0;
		$('.form-newuser span.error').html("").hide();
		var btn=$('.form-newuser button.btn');
		btn.attr("disabled","disabled");
		user_id=$(".form-newuser #inputUID").val();
		if(old_user_name==user_name&&old_passwd==passwd&&old_user_phone==user_phone&&old_is_send==is_send&&old_user_email==user_email){
			$('.form-newuser .error-msg').html("未做任何修改").show();
			btn.attr('disabled',false);
			return;
		}
		if(user_name.indexOf(" ")>0){
			$('.form-newuser .error-username').html('用户名不能含空格');
			hasError++;
		}
		else if(user_name.length>30||user_name.length<1){
			$('.form-newuser .error-username').html('用户名长度错误');
			hasError++;
		}
		if(oldpasswd.length<1){
			$('.form-newuser .error-oldpasswd').html('请输入旧密码');
			hasError++;
		}
		else if(oldpasswd==passwd){
			$('.form-newuser .error-oldpasswd').html('新密码与旧密码相同');
			hasError++;
		}
		if(passwd.indexOf(" ")>0){
			$('.form-newuser .error-passwd').html('密码不能含空格');
			hasError++;
		}
		else if(passwd!=passwd2){
			$('.form-newuser .error-passwd').html('两次输入的密码不相同');
			$('.form-newuser .error-passwd2').html('两次输入的密码不相同');
			hasError++;
		}
		else if((!(passwd=="")&&passwd.length<8)||passwd.length>25){
			$('.form-newuser .error-passwd').html('密码位数错误');
			hasError++;
		}
		if(user_phone.match(reg_phone)==null&&user_phone!=0&&user_phone!=""){
			$('.form-newuser .error-phone').html('手机号码输入错误');
			hasError++;
		}
		if(hasError>0){
			$('.form-newuser .error-msg').html(hasError+"处错误，请修改");
			$('.form-newuser span.error').show();
			btn.attr('disabled',false);
			return;
		}

		var data={"user_id":user_id,"old_name":old_user_name,"user_name":user_name,"oldpasswd":oldpasswd,"passwd":passwd,"user_phone":user_phone,"is_send":is_send,"user_email":user_email};
		$.ajax({
		        type: "post",
		        url: "pages/users/editself-ajax.php",
		        dataType: "json",	        
		        data: data,
		        //beforeSend: LoadFunction, //加载执行方法    
		        //error: errorFunction,  //错误执行方法    
		        success: function (t) {
		        	if(t.errorsinfo==null||t.errorsinfo.count==0){
		        		$('.form-newuser .success-msg').html("["+user_name+"]资料修改成功").show();
		        		btn.attr('disabled',false);
		        		old_user_name=user_name;
						old_passwd=passwd;
						old_user_phone=user_phone;
						old_is_send=is_send;
						old_user_email=user_email;
		        		return;
		        	}
		        	else {
		        		for(var i=0;i<t.errorsinfo.count;i++){
		        			$('.form-newuser .error-msg').append(t.errorsinfo.errors[i]+'<br />').show();
		        		}
		        	}
		        	btn.attr('disabled',false);
		        },
		        error: function () {
		        	$('.form-newuser .error-msg').html('网络错误，请稍后再试').show();
		        	btn.attr('disabled',false);
		        }
		 });
		
	});
	
})
