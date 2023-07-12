function formvalidation() {
    var uemail =document.forms.signup.eMail.value;
    var pass =document.forms.signup.password.value;
    var cpass=document.forms.signup.cpasswoed.value;
    var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  
     
    if (uemail == "" || !regEmail.test(uemail)) {
        window.alert("Please enter a valid e-mail address.");
        uemail.focus();
        return false;
    }
      
    if (pass == "") {
        alert("Please enter your password");
        pass.focus();
        return false;
    }

    if(pass.length <6){
        alert("Password should be atleast 6 character long");
        pass.focus();
        return false;
    }

    if(pass!=cpass){
        alert("Password does not matched");
        cpass.focus();
        return false;
    }
    
    else{
        alert("YOU ARE REDIRECTING TO THE MAIN PAGE");
        window.location="http://127.0.0.1:5500/websites.html/SARGAM/SARGAM.html";
    return true;
    }
}