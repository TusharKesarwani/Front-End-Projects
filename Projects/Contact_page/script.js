document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    
    alert("Name: " + name + "\nEmail: " + email + "\nSubject: " + subject + "\nMessage: " + message);
    
    // Optionally, you can send the form data to a server using AJAX or perform other operations.
  });
  