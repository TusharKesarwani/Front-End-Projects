
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var num=0;
var started=false;

$(document).keypress(function(){
    if(!started)
    {
       $("#level-title").text("Level " + num);
       nextSequence();
       started = true;
    }
});

$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
    }
    }
    else{
        playSound("wrong");
        
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

function nextSequence(){
    userClickedPattern = [];

    num++;
    $("h1").text("Level " + num);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}
function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}
function animatePress(currentColour){

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver(){
    num=0;
    gamePattern=[];
    started=false;
}

var myModal = document.getElementById('myModal')
  var myInput = document.getElementById('myInput')

  myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
  })
