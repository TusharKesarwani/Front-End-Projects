//function to show and hide the passcode in the input
function showHidePasscode(isHidden, val) {
    var passcode = (val === 0) ? document.getElementById('inputPassword') : document.getElementById('inputPasswordConf')
    var showHide = (val === 0) ? document.getElementById('show-hide') : document.getElementById('show-hide-conf')
    if (isHidden) {
        passcode.type = "text"
        showHide.innerHTML = `<i class="bi bi-eye" onclick="showHidePasscode(false, ${val})"></i>`
    } else {
        passcode.type = "password"
        showHide.innerHTML = `<i class="bi bi-eye-slash" onclick="showHidePasscode(true, ${val})"></i>`
    }
}

//login function
function login() {
    var email = document.getElementById('inputEmail').value
    var key = document.getElementById('inputPassword').value
    if (validate(email, key)) {
        document.getElementById("error-box").innerHTML = '<i class="bi bi-check2-circle"></i> Login Success!'
        showMessage(1)
    } else {
        document.getElementById("error-box").innerHTML = '<i class="bi bi-exclamation-circle"></i> Please Enter Valid Credentials!'
        showMessage(0)
    }
}

//signup function
//validates email and key
//check key against confirm passwork (key)
function signup() {
    var email = document.getElementById('inputEmail').value
    var key = document.getElementById('inputPassword').value
    var confirm = document.getElementById('inputPasswordConf').value
    if (validate(email, key)) {
        if (key === confirm) {
            document.getElementById("error-box").innerHTML = '<i class="bi bi-check2-circle"></i> Signup Success!'
            showMessage(1)
        } else {
            document.getElementById("error-box").innerHTML = '<i class="bi bi-exclamation-circle"></i> Passwords do not match!'
            showMessage(0)
        }
    } else {
        document.getElementById("error-box").innerHTML = '<i class="bi bi-exclamation-circle"></i> Please Enter Valid Credentials!'
        showMessage(0)
    }
}

//show custom message
//RESPONSE -> 0 for error message
//RESPONSE -> 1 for success
function showMessage(RESPONSE) {
    if (RESPONSE == 0) {
        document.getElementById('login-form').style.animation = 'error .5s ease 1'
        setTimeout(() => {
            document.getElementById('login-form').style.animation = ''
        }, 500);
    }

    document.getElementById('error-box').style.visibility = 'visible'
    setTimeout(() => {
        document.getElementById('error-box').style.visibility = 'hidden'
        if(RESPONSE===1){
            location.reload()
        }
    }, 3000);
}

//validate email and key inputs
function validate(email, key) {
    if (email == '' || key == '') {
        return false;
    }
    return true;
}