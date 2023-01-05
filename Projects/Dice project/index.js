var randomNumber1 = Math.floor(Math.random()*6)+1; // 1-6
var randomDiceImage = "dice"+randomNumber1+".png"; //dice1.png -- dice6.pricing
var randomImageSource = "Images/"+ randomDiceImage; // images/dice1.png -- images/dice6.png


// change src attribute of img tag using set attributes

//selecting all html elements with img tag
var image1 = document.querySelectorAll("img")[0];

//change src to randomImageSource
image1.setAttribute("src",randomImageSource);

// finding full address of img
var randomNumber2 = Math.floor(Math.random()*6)+1;
var randomDiceImage2 = "dice"+ randomNumber2+".png";
var randomImageSource2 = "images/"+ randomDiceImage2 ;

//select all img tag elements using querySelectorAll
var image2 = document.querySelectorAll("img")[1];

//use set attribute to change address and change src to randomImageSource2
image2.setAttribute("src",randomImageSource2);


//change the title who have won using innerHTML for h1 tag

if(randomNumber1 > randomNumber2){
  document.querySelector("h1").innerHTML = "🚩 Player 1 wins";
}

else if(randomNumber1 < randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩 Player 2 wins";
}

else {
  // both work one using query selector and id 

  //document.querySelector("h1").innerHTML = "Draw";
  document.getElementById("test").innerHTML ="Draw"; // using id
}
