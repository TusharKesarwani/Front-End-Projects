// JavaScript for login functionality
document.addEventListener("DOMContentLoaded", function() {
    // Login Form Validation
    var loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
  
        // Retrieve form values
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
  
        // Define pre-defined username and password
        var predefinedUsername = "admin";
        var predefinedPassword = "password";
  
        // Check login credentials
        if (username === predefinedUsername && password === predefinedPassword) {
          // Login success
          console.log("Login successful");
          // Redirect to main page
          window.location.href = "./index.html";
        } else {
          // Login failed
          console.log("Invalid username or password");
          alert("Invalid username or password. Please check your details.");
        }
      });
    }
  });
  