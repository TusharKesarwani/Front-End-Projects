function showHidePasscode(isHidden){
    var passcode = document.getElementById('inputPassword')
    var showHide = document.getElementById('show-hide')
    if(isHidden){
        passcode.type = "text"
        showHide.innerHTML = `<i class="bi bi-eye" onclick="showHidePasscode(false)"></i>`
    }else{
        passcode.type = "password"
        showHide.innerHTML = `<i class="bi bi-eye-slash" onclick="showHidePasscode(true)"></i>`
    }
}

function login(){
    var email = document.getElementById('inputEmail').value
    var key = document.getElementById('inputPassword').value
    if(validate(email, key)){
        //go to next page
    }else{
        document.getElementById('login-form').style.animation = 'error .5s ease 1'
        setTimeout(() => {
            document.getElementById('login-form').style.animation = ''
        }, 500);

        document.getElementById('error-box').style.visibility = 'visible';
        setTimeout(() =>{
            document.getElementById('error-box').style.visibility = 'hidden';
        }, 3000);
    }
}

function validate(email, key){
    if(email=='' || key==''){
        return false;
    }
    return true;
}