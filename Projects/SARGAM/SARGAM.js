const handlePassword = () => {
    const password = document.getElementById("signup__password").value;
    const cpassword = document.getElementById("signup__cpassword").value;
    const error = document.getElementById("signup__error");
    if(password !== cpassword ) {
        error.innerHTML = "Password did not matched";
    } else {
        error.innerHTML = ""
    }
}

const signUpButton = document.getElementById("submit"); 

signUpButton.addEventListener('click', () => {
  window.location.href = 'http://127.0.0.1:5500/payment.html'; 
});


