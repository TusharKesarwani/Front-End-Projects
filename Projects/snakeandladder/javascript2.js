var my_turn = 0;                    //TURN FO A PLAYER
var previousFirst = 0;              //PLAYER 1
var previouSecond = 0;              //PLAYER 2
var previousThird = 0;              //PLAYER 3
var previousFourth = 0;             //PLAYER 4
var timervar;

for (var i = 1; i <= 100; i++) {
    document.getElementById(i).innerHTML = i;
}

// var arr = ['<img src="images/redtoken.png">', '<img src="images/greentoken.png">' , '<img src="images/yellowtoken.png">', '<img src="images/bluetoken.png">']

// --------------------------------ARRAY FO DICES -1,2,3,4,5,6 WHICH WILL EB SHOWN UP RADNOMLY ON CLCIKING ROLL BUTTON-------------------
var dice = ['<img src="images/1dice.png" class="sixdice">', '<img src="images/2dice.png" class="sixdice">', '<img src="images/3dice.png" class="sixdice">', '<img src="images/4dice.png" class="sixdice">', '<img src="images/5dice.png" class="sixdice">', '<img src="images/6dice.png" class="sixdice">'];
// var dice = ['<img src="images/1dice.png" id="sixdice">', '<img src="images/2dice.png" id="sixdice">', '<img src="images/3dice.png" id="sixdice">', '<img src="images/4dice.png" id="sixdice">', '<img src="images/5dice.png" id="sixdice">', '<img src="images/6dice.png" id="sixdice">'];

// var turn =0;
// setInterval(() => {
//     turn++;
//     if(turn == 4){
//         turn = 0;
//     }
//     document.getElementById
// }, 3000);

var p1, p2, p3, p4;
var nump;       //number of player
function choose_player() {

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
// -----------------------------DROPDOWDN WILL BE SHOWN ON CLICKING CHOOSE NUMBER OF PLAYERS FROM WHERE WE WILL CHOSSE HOW MANY NUMBER OF PLAYERS WANT TO PLAY---------------------
    document.getElementById("nump").style.visibility = 'visible';
    var select = document.getElementById('nump');
    nump = select.options[select.selectedIndex].value;

    // -------------------------------------SET MARGIN BETWEEN PLAYERS TAG AND HIDE NUMBER OF PLAYERS WHICH ARE NOT PLAYING---------------
    // console.log(nump);
    if (nump == 1) {
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'hidden';
        document.getElementById("player3").style.visibility = 'hidden';
        document.getElementById("player4").style.visibility = 'hidden';
        document.getElementById("player1").style.margin = "8% 0% 2% 0%";
        // document.getElementById("dice").style.visibility='visible';
        // document.getElementById("choose_player").removeAttribute('onclick');

    }
    if (nump == 2) {
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("player3").style.visibility = 'hidden';
        document.getElementById("player4").style.visibility = 'hidden';
        document.getElementById("player1").style.margin = "0% 0% 8% 0%";
        document.getElementById("player2").style.margin = "0% 0% 0% 0%";
        // document.getElementById("dice").style.visibility='visible';
        // document.getElementById("choose_player").removeAttribute('onclick');
    }
    if (nump == 3) {
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("player3").style.visibility = 'visible';
        document.getElementById("player4").style.visibility = 'hidden';
        document.getElementById("player1").style.margin = "0% 0% 4% 0%";
        document.getElementById("player2").style.margin = "0% 0% 4% 0%";
        // document.getElementById("dice").style.visibility='visible';
    }
    if (nump == 4) {
        document.getElementById("player1").style.visibility = 'visible';
        document.getElementById("player2").style.visibility = 'visible';
        document.getElementById("player3").style.visibility = 'visible';
        document.getElementById("player4").style.visibility = 'visible';
        document.getElementById("player1").style.margin = "0% 0% 2% 0%";
        document.getElementById("player2").style.margin = "0% 0% 2% 0%";
        document.getElementById("player3").style.margin = "0% 0% 2% 0%";
        document.getElementById("player4").style.margin = "0% 0% 2% 0%";
        // document.getElementById("dice").style.visibility='visible';
    }
}

// ----------------------------WHEN PLAYER CLICK ON START THE CHOSE PLAYERS SO WHAT SHOULD BE HIDDEN OR WHAT SHOULD BE SHOWN ON THE SCREEN-------------------------
function start() {
    document.getElementById("choose_player").disabled = true;
    if (nump == 0) {
        var popup = document.getElementById("myPopup");
        popup.innerHTML = "First Choose number of players!!";
        popup.classList.toggle("show");
    }
    else {
        // ---------------------------------IF TWO PLAYERS COLOUR IS SAME THEN ITS NOT POSSIBLE----------------------
        if (nump == 2) {
            if (document.getElementById('select1').value == document.getElementById('select2').value) {

                var popup = document.getElementById("myPopup");
                popup.innerHTML = "Select two different color !!";
                popup.classList.toggle("show");
            }
            else {
                // ---------------------------IT WILL COUNT TOTAL TIME AFTER CLICKING ON PLAY BUTTON------------------------
                timervar = setInterval(time, 1000);
                var totalseconds = 0;
                // time();
                function time() {
                    ++totalseconds;
                    var hour = Math.floor(totalseconds / 3600);
                    var minute = Math.floor((totalseconds - (hour * 3600)) / 60);
                    var seconds = totalseconds - (hour * 3600 + minute * 60);
                    document.getElementById("timedemo").innerHTML = "Time: " + hour + ":" + minute + ":" + seconds;
                }

                // --------------------------------IF CLICK ON START THEN WHAT SHOULD BE HIDDEN AND DICE WILL BE SHOWN UP ON SCREEN---------------------
                document.getElementById("dice").style.visibility = 'visible';

                if (document.getElementById("red").id != document.getElementById('select1').value && document.getElementById("red").id != document.getElementById('select2').value) {
                    document.getElementById("red").style.visibility = "hidden";
                }
                if (document.getElementById("green").id != document.getElementById('select1').value && document.getElementById("green").id != document.getElementById('select2').value) {
                    document.getElementById("green").style.visibility = "hidden";
                }
                if (document.getElementById("yellow").id != document.getElementById('select1').value && document.getElementById("yellow").id != document.getElementById('select2').value) {
                    document.getElementById("yellow").style.visibility = "hidden";
                }
                if (document.getElementById("blue").id != document.getElementById('select1').value && document.getElementById("blue").id != document.getElementById('select2').value) {
                    document.getElementById("blue").style.visibility = "hidden";
                }
             // --------------------------------IF CLICK ON START THEN ALL SELECTION PROPERTY WILL BE DISABLED AND DICE WILL BE SHOWN UP ON SCREEN---------------------
                document.getElementById("select1").setAttribute("disabled", "disabled");
                document.getElementById("select2").setAttribute("disabled", "disabled");
                //------------------------REMOVE FUCNTIONALITY OF PLAY BUTTON AFTER CLICKING ONCE----------
                document.getElementById("play").removeAttribute('onclick');            
            }
        }


        if (nump == 3) {
        // ---------------------------------IF THREE PLAYER'S COLOUR IS SAME THEN ITS NOT POSSIBLE SO IT WILL GIVE A POPUP MESSAGE----------------------

            if (document.getElementById('select1').value == document.getElementById('select2').value || document.getElementById('select1').value == document.getElementById('select3').value || document.getElementById('select3').value == document.getElementById('select2').value) {

                var popup = document.getElementById("myPopup");
                popup.innerHTML = "Please Choose different color !!";
                popup.classList.toggle("show");
            }
            else {
                // ---------------------------IT WILL COUNT TOTAL TIME AFTER CLICKING ON PLAY BUTTON------------------------
                timervar = setInterval(time, 1000);
                var totalseconds = 0;
                // time();
                function time() {
                    ++totalseconds;
                    var hour = Math.floor(totalseconds / 3600);
                    var minute = Math.floor((totalseconds - (hour * 3600)) / 60);
                    var seconds = totalseconds - (hour * 3600 + minute * 60);
                    document.getElementById("timedemo").innerHTML = "Time: " + hour + ":" + minute + ":" + seconds;
                }

                // --------------------------------IF CLICK ON START THEN WHAT SHOULD BE HIDDEN AND DICE WILL BE SHOWN UP ON SCREEN---------------------
                document.getElementById("dice").style.visibility = 'visible';

                if (document.getElementById("red").id != document.getElementById('select1').value &&
                    document.getElementById("red").id != document.getElementById('select2').value &&
                    document.getElementById("red").id != document.getElementById('select3').value) {
                    document.getElementById("red").style.visibility = "hidden";
                }
                else if (document.getElementById("green").id != document.getElementById('select1').value &&
                    document.getElementById("green").id != document.getElementById('select2').value &&
                    document.getElementById("green").id != document.getElementById('select3').value) {
                    document.getElementById("green").style.visibility = "hidden";
                }
                else if (document.getElementById("yellow").id != document.getElementById('select1').value &&
                    document.getElementById("yellow").id != document.getElementById('select2').value &&
                    document.getElementById("green").id != document.getElementById('select3').value) {
                    document.getElementById("yellow").style.visibility = "hidden";
                }
                else if (document.getElementById("blue").id != document.getElementById('select1').value &&
                    document.getElementById("blue").id != document.getElementById('select2').value &&
                    document.getElementById("green").id != document.getElementById('select3').value) {
                    document.getElementById("blue").style.visibility = "hidden";
                }
             // --------------------------------IF CLICK ON START THEN ALL SELECTION PROPERTY WILL BE DISABLED AND DICE WILL BE SHOWN UP ON SCREEN---------------------
                document.getElementById("select1").setAttribute("disabled", "disabled");
                document.getElementById("select2").setAttribute("disabled", "disabled");
                document.getElementById("select3").setAttribute("disabled", "disabled");
                 //------------------------------------REMOVE FUCNTIONALITY OF PLAY BUTTON AFTER CLICKING ONCE----------------
                document.getElementById("play").removeAttribute('onclick');                 
            }
        }


        if (nump == 4) {
           // ---------------------------------IF ANY TWO POAYERS OF FOUR PLAYER'S COLOUR IS SAME THEN ITS NOT POSSIBLE SO IT WILL GIVE A POPUP MESSAGE----------------------
            if (document.getElementById('select1').value == document.getElementById('select2').value ||
                document.getElementById('select1').value == document.getElementById('select3').value ||
                document.getElementById('select1').value == document.getElementById('select4').value ||
                document.getElementById('select2').value == document.getElementById('select3').value ||
                document.getElementById('select2').value == document.getElementById('select4').value ||
                document.getElementById('select3').value == document.getElementById('select4').value) {

                var popup = document.getElementById("myPopup");
                popup.innerHTML = "Please Choose different color !!";
                popup.classList.toggle("show");
            }
            else {
                // ---------------------------IT WILL COUNT TOTAL TIME AFTER CLICKING ON PLAY BUTTON------------------------
                timervar = setInterval(time, 1000);
                var totalseconds = 0;
                // time();
                function time() {
                    ++totalseconds;
                    var hour = Math.floor(totalseconds / 3600);
                    var minute = Math.floor((totalseconds - (hour * 3600)) / 60);
                    var seconds = totalseconds - (hour * 3600 + minute * 60);
                    document.getElementById("timedemo").innerHTML = "Time: " + hour + ":" + minute + ":" + seconds;
                }

             // --------------------------------IF CLICK ON START THEN ALL SELECTION PROPERTY WILL BE DISABLED AND DICE WILL BE SHOWN UP ON SCREEN---------------------
                document.getElementById("dice").style.visibility = 'visible';
                document.getElementById("select1").setAttribute("disabled", "disabled");
                document.getElementById("select2").setAttribute("disabled", "disabled");
                document.getElementById("select3").setAttribute("disabled", "disabled");
                document.getElementById("select4").setAttribute("disabled", "disabled");
                //------------------------------------REMOVE FUCNTIONALITY OF PLAY BUTTON AFTER CLICKING ONCE----------------
                document.getElementById("play").removeAttribute('onclick');
            }
        }
// -----------------------------ON CLCIK PLAY NUMBER OF PLAYERS SECTION WILL BE DSIABLED WE CANNOT CHANGE ATTRIBUTES OF ANY PLAYER LIKE COLOURS OF PLAYERS ADN ALL AND TOKENS OF PLAYERS WILL BE SHOWN ON THE LEFT BOTTOM SIDE OF BOARD-------------------
        document.getElementById("nump").setAttribute("disabled", "disabled");

        document.getElementById("rolldice").setAttribute("onclick", "play(); disablefxn()");
        p1 = document.getElementById("select1").value;
        p2 = document.getElementById("select2").value;
        p3 = document.getElementById("select3").value;
        p4 = document.getElementById("select4").value;

    }
}

function disablefxn(){
    document.getElementById("play").disabled = true;
}

// function rotate(){
//     console.log("heyy");
//     for(var i=1;i<11;i++)
//     {
//         setInterval(function(){
//             document.getElementsByClassName("sixdice").style.WebkitTransitionDuration="2s";
//             document.getElementsByClassName("sixdice").style.webkitTransform = 'rotate(160deg)';
//         },100)
//     }
// }

// console.log("akjndm",previouSecond);
// previouSecond=5;

// --------------------------------------------PLAY FUNCTION HOW MANY PLAYERS PLAYING-------------------- 
function play() {
    var rand_num = Math.floor(Math.random() * 6);
    document.getElementById("faces").innerHTML = dice[rand_num];
    new Audio('images/diceroll.mp3').play();
    if (nump == 2) {
        if (my_turn == 0) {
            document.getElementById("turn").innerHTML = "Player1's turn...";
            if (previousFirst > 0) {
                if (100 - previousFirst < rand_num + 1) {
                    my_turn++;
                    return;
                }
                else {
                    document.getElementById((previousFirst).toString()).innerHTML = previousFirst;
                    document.getElementById((previousFirst).toString()).style.color = 'black';
                }
            }
            document.getElementById((previousFirst + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
            document.getElementById((previousFirst + rand_num + 1).toString()).style.color = p1;
            if ((previousFirst + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player1 is winner");
                    document.getElementById("winner").innerHTML ="<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player1 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previousFirst = previousFirst + rand_num + 1;

            previousFirst = snake(previousFirst, p1, previousFirst);
            previousFirst = ladder(previousFirst, p1, previousFirst);
            document.getElementById("lead1").innerHTML = "&#11088; player1: " + previousFirst;
            my_turn++;
        }
        else {
            document.getElementById("turn").innerHTML = "Player2's turn...";
            if (previouSecond > 0) {
                if (100 - previouSecond < rand_num + 1) {
                    my_turn--;
                    return;
                }
                else {
                    document.getElementById((previouSecond).toString()).innerHTML = previouSecond;
                    document.getElementById((previouSecond).toString()).style.color = 'black';
                }
            }
            document.getElementById((previouSecond + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";

            document.getElementById((previouSecond + rand_num + 1).toString()).style.color = p2;
            if ((previouSecond + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player2 is winner");
                    // window.location.reload();
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player2 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previouSecond = previouSecond + rand_num + 1;
            previouSecond = snake(previouSecond, p2, previouSecond);
            previouSecond = ladder(previouSecond, p2, previouSecond);
            document.getElementById("lead2").innerHTML = "&#11088; player2: " + previouSecond;
            my_turn--;
        }
    }

    else if (nump == 3) {
        if (my_turn == 0) {
            document.getElementById("turn").innerHTML = "Player1's turn...";
            if (previousFirst > 0) {
                if (100 - previousFirst < rand_num + 1) {
                    my_turn++;
                    return;
                }
                else {
                    document.getElementById((previousFirst).toString()).innerHTML = previousFirst;
                    document.getElementById((previousFirst).toString()).style.color = 'black';
                }
            }
            document.getElementById((previousFirst + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
            document.getElementById((previousFirst + rand_num + 1).toString()).style.color = p1;
            if ((previousFirst + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player1 is winner");
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player1 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previousFirst = previousFirst + rand_num + 1;

            previousFirst = snake(previousFirst, p1, previousFirst);
            previousFirst = ladder(previousFirst, p1, previousFirst);
            document.getElementById("lead1").innerHTML = "&#11088; player1: " + previousFirst;
            my_turn++;
        }
        else if (my_turn == 1) {
            document.getElementById("turn").innerHTML = "Player2's turn...";
            if (previouSecond > 0) {
                if (100 - previouSecond < rand_num + 1) {
                    my_turn++;
                    return;
                }
                else {
                    document.getElementById((previouSecond).toString()).innerHTML = previouSecond;
                    document.getElementById((previouSecond).toString()).style.color = 'black';
                }
            }
            document.getElementById((previouSecond + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
            document.getElementById((previouSecond + rand_num + 1).toString()).style.color = p2;
            if ((previouSecond + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player1 is winner");
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player2 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previouSecond = previouSecond + rand_num + 1;

            previouSecond = snake(previouSecond, p2, previouSecond);
            previouSecond = ladder(previouSecond, p2, previouSecond);
            document.getElementById("lead2").innerHTML = "&#11088; player2: " + previouSecond;
            my_turn++;
        }
        else {
            document.getElementById("turn").innerHTML = "Player3's turn...";
            if (previousThird > 0) {
                if (100-previousThird < rand_num + 1) {
                    my_turn=0;
                    return;
                }
                else {
                    document.getElementById((previousThird).toString()).innerHTML = previousThird;
                    document.getElementById((previousThird).toString()).style.color = 'black';
                }
            }
            document.getElementById((previousThird + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";

            document.getElementById((previousThird + rand_num + 1).toString()).style.color = p3;
            if ((previousThird + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player2 is winner");
                    // window.location.reload();
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player3 has won!!";

                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previousThird = previousThird + rand_num + 1;
            previousThird = snake(previousThird, p3, previousThird);
            previousThird = ladder(previousThird, p3, previousThird);
            document.getElementById("lead3").innerHTML = "&#11088; player3: " + previousThird;
            my_turn = 0;
        }
    }

    else {
        if (my_turn == 0) {
            document.getElementById("turn").innerHTML = "Player1's turn...";
            if (previousFirst > 0) {
                if (100 - previousFirst < rand_num + 1) {
                    my_turn++;
                    return;
                }
                else {
                    document.getElementById((previousFirst).toString()).innerHTML = previousFirst;
                    document.getElementById((previousFirst).toString()).style.color = 'black';
                }
            }
            document.getElementById((previousFirst + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
            document.getElementById((previousFirst + rand_num + 1).toString()).style.color = p1;
            if ((previousFirst + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player1 is winner");
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player1 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previousFirst = previousFirst + rand_num + 1;

            previousFirst = snake(previousFirst, p1, previousFirst);
            previousFirst = ladder(previousFirst, p1, previousFirst);
            document.getElementById("lead1").innerHTML = "&#11088; player1: " + previousFirst;
            my_turn++;
        }
        else if (my_turn == 1) {
            document.getElementById("turn").innerHTML = "Player2's turn...";
            if (previouSecond > 0) {
                if (100 - previouSecond < rand_num + 1) {
                    my_turn++;
                    return;
                }
                else {
                    document.getElementById((previouSecond).toString()).innerHTML = previouSecond;
                    document.getElementById((previouSecond).toString()).style.color = 'black';
                }
            }
            document.getElementById((previouSecond + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
            document.getElementById((previouSecond + rand_num + 1).toString()).style.color = p2;
            if ((previouSecond + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player1 is winner");
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player2 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previouSecond = previouSecond + rand_num + 1;

            previouSecond = snake(previouSecond, p2, previouSecond);
            previouSecond = ladder(previouSecond, p2, previouSecond);
            document.getElementById("lead2").innerHTML = "&#11088; player2: " + previouSecond;
            my_turn++;
        }
        else if(my_turn == 2){
            document.getElementById("turn").innerHTML = "Player3's turn...";
            if (previousThird > 0) {
                if (100-previousThird < rand_num + 1) {
                    my_turn=0;
                    return;
                }
                else {
                    document.getElementById((previousThird).toString()).innerHTML = previousThird;
                    document.getElementById((previousThird).toString()).style.color = 'black';
                }
            }
            document.getElementById((previousThird + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";

            document.getElementById((previousThird + rand_num + 1).toString()).style.color = p3;
            if ((previousThird + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player2 is winner");
                    // window.location.reload();
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player3 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);
            }
            previousThird = previousThird + rand_num + 1;
            previousThird = snake(previousThird, p3, previousThird);
            previousThird = ladder(previousThird, p3, previousThird);
            document.getElementById("lead3").innerHTML = "&#11088; player3: " + previousThird;
            my_turn ++;
        }
        else {
            document.getElementById("turn").innerHTML = "Player4's turn...";
            if (previousFourth > 0) {
                if (100-previousFourth < rand_num + 1) {
                    my_turn=0;
                    return;
                }
                else {
                    document.getElementById((previousFourth).toString()).innerHTML = previousFourth;
                    document.getElementById((previousFourth).toString()).style.color = 'black';
                }
            }
            document.getElementById((previousFourth + rand_num + 1).toString()).innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";

            document.getElementById((previousFourth + rand_num + 1).toString()).style.color = p4;
            if ((previousFourth + rand_num + 1) == 100) {
                setTimeout(() => {
                    // alert("player2 is winner");
                    // window.location.reload();
                    document.getElementById("winner").innerHTML = "<img src=images/winner.png >" + "<br>" + "HURRAAYYY " + "<br>" + "Player4 has won!!";
                }, 800);
                document.getElementById("rolldice").disabled = true;
                clearInterval(timervar);

            }
            previousFourth = previousFourth + rand_num + 1;
            previousFourth = snake(previousFourth, p4, previousFourth);
            previousFourth = ladder(previousFourth, p4, previousFourth);
            document.getElementById("lead4").innerHTML = "&#11088; player4: " + previousFourth;
            my_turn =0;
        }
    }

}

// --------------------------FUNCTION OF SNAKES IF PLAYER IS ON THE TOP OF SNAKE THEN WHERE IT WILL GO -----------------------
function snake(place_no, color_given, previous_player) {
    if (place_no == 14) {
        document.getElementById("14").innerHTML = 14;
        document.getElementById("14").style.color = 'black';
        document.getElementById("4").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("4").style.color = color_given;
        return 4;
    }
    else if (place_no == 61) {
        document.getElementById("61").innerHTML = 61;
        document.getElementById("61").style.color = 'black';
        document.getElementById("17").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        // document.getElementById("17").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("17").style.color = color_given;
        return 17;
    }
    else if (place_no == 74) {
        document.getElementById("74").innerHTML = 74;
        document.getElementById("74").style.color = 'black';
        document.getElementById("36").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("36").style.color = color_given;
        return 36;
    }
    else if (place_no == 64) {
        document.getElementById("64").innerHTML = 64;
        document.getElementById("64").style.color = 'black';
        document.getElementById("60").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("60").style.color = color_given;
        return 60;
    }
    else if (place_no == 93) {
        document.getElementById("93").innerHTML = 93;
        document.getElementById("93").style.color = 'black';
        document.getElementById("71").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("71").style.color = color_given;
        return 71;
    }
    else if (place_no == 95) {
        document.getElementById("95").innerHTML = 95;
        document.getElementById("95").style.color = 'black';
        document.getElementById("76").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("76").style.color = color_given;
        return 76;
    }
    else if (place_no == 98) {
        document.getElementById("98").innerHTML = 98;
        document.getElementById("98").style.color = 'black';
        document.getElementById("79").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("79").style.color = color_given;
        return 79;
    }
    else {
        return previous_player;
    }
}

// --------------------------------FUNCTION OF LADDERS THAT IF PLAYER IS ON THE BOTTOM OF LADDER THGEN WHERE IT WILL GO--------------------
function ladder(place_no, color_given, previous_player) {
    if (place_no == 2) {
        document.getElementById("2").innerHTML = 2;
        document.getElementById("2").style.color = 'black';
        document.getElementById("37").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("37").style.color = color_given;
        return 37;
    }
    else if (place_no == 7) {
        document.getElementById("7").innerHTML = 7;
        document.getElementById("7").style.color = 'black';
        document.getElementById("31").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("31").style.color = color_given;
        return 31;
    }
    else if (place_no == 21) {
        document.getElementById("21").innerHTML = 21;
        document.getElementById("21").style.color = 'black';
        document.getElementById("42").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("42").style.color = color_given;
        return 42;
    }
    else if (place_no == 28) {
        document.getElementById("28").innerHTML = 28;
        document.getElementById("28").style.color = 'black';
        document.getElementById("84").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("84").style.color = color_given;
        return 84;
    }
    else if (place_no == 52) {
        document.getElementById("52").innerHTML = 52;
        document.getElementById("52").style.color = 'black';
        document.getElementById("66").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("66").style.color = color_given;
        return 66;
    }
    else if (place_no == 72) {
        document.getElementById("72").innerHTML = 72;
        document.getElementById("72").style.color = 'black';
        document.getElementById("91").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("91").style.color = color_given;
        return 91;
    }
    else if (place_no == 80) {
        document.getElementById("80").innerHTML = 80;
        document.getElementById("80").style.color = 'black';
        document.getElementById("99").innerHTML = "<i class='fas fa-chess-pawn' style=font-size:50px;></i>";
        document.getElementById("99").style.color = color_given;
        return 99;
    }
    else {
        return previous_player;
    }
}
