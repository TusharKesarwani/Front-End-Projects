const input = document.querySelector("input"),
      showHide = document.querySelector(".show_hide"),
      color_box = document.querySelector(".color_box"),
      iconText = document.querySelector(".icon-text"),
      text = document.querySelector(".text");
                  
showHide.addEventListener("click", ()=>{
  if(input.type === "password"){
    input.type = "text";
    showHide.classList.replace("fa-eye-slash","fa-eye");
  }else {
    input.type = "password";
    showHide.classList.replace("fa-eye","fa-eye-slash");
  }
});

let alphabet = /[a-zA-Z]/, 
    numbers = /[0-9]/, 
    scharacters = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~]/; 

input.addEventListener("keyup", ()=>{
  color_box.classList.add("active");

  let val = input.value;
  if(val.match(alphabet) || val.match(numbers) || val.match(scharacters)){
    text.textContent = "Password is weak";
    input.style.borderColor = "#FF6333";
    showHide.style.color = "#FF6333";
    iconText.style.color = "#FF6333";
  }
  if(val.match(alphabet) && val.match(numbers) && val.length >= 6){
    text.textContent = "Password is medium";
    input.style.borderColor = "#cc8500";
    showHide.style.color = "#cc8500";
    iconText.style.color = "#cc8500";
  }
  if(val.match(alphabet) && val.match(numbers) && val.match(scharacters) && val.length >= 8){
    text.textContent = "Password is strong";
    input.style.borderColor = "#22C32A";
    showHide.style.color = "#22C32A";
    iconText.style.color = "#22C32A";
  }
  if(val == ""){
    color_box.classList.remove("active");
    input.style.borderColor = "#A6A6A6";
    showHide.style.color = "#A6A6A6";
    iconText.style.color = "#A6A6A6";
  }
});
