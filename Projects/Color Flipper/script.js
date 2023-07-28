//Declaring the colors

const colorsArray = ["red","green","yellow","pink","purple","blue", "orange","lightgray" , "lightpink","black", "white", "gray", "silver", "maroon", "fushsia", "lime", "olive", "navy", "teal", "aqua"];  
      const btn = document.getElementById('btn');  
      const color = document.querySelector('.color');  
      btn.addEventListener("click",function(){  
           const randomNumber = getRandomNumber();  
           document.body.style.backgroundColor = colorsArray[randomNumber];  
           color.textContent = colorsArray[randomNumber]; 
      });  

      //Generating random index number from ColorsArray

      function getRandomNumber(){  
           return Math.floor(Math.random()*colorsArray.length);  
      }  