var winCount = 0;
var totalCount = 0;
//start window js
var select = "";
$(".gameWindow").hide();
$("input[name='category']").change((e) => { select = e.target.value });
$(".start").click(() => {
    if (select == "")
        return;
    $(".gameWindow").show();
    $(".startWindow").hide();
    $(".gameWindow").focus();
    resetGameWindow();
    console.log(select)

})
function toHomepage() {
    location.href = "../index.html"

}

$(".home").click(() => {
    confirm_dialog(
        "Exit Confirmation",
        "<p>Are you sure you want to exit?</p>",
        "toHomepage"
    );

})
$(".back").click(() => {
    $(".wonCount").text(winCount + " / " + totalCount);
    $(".startWindow").show();
    $(".gameWindow").hide();
    // $(".guessDiv").remove();
})
// game window js
function setHangmanImage(count) {
    // console.log(count);
    if (count == "" && isNaN(count)) {
        count = "0";
    }
    $("#hangmanImage").attr("src", "./images/" + count + ".png");
}
function alphaOnly(event) {
    var key = event.keyCode;
    // console.log(key);
    return (key >= 65 && key <= 90) || (key >= 97 && key <= 122);
}
function createBlank(placeHolder, id) {
    let disable = true;
    var guessDiv = $("<div></div>").attr("class", "guessDiv");
    var guessInput = $("<input/>")
        .attr("type", "text")
        .attr("id", "guess" + id)
        .attr("maxlength", "1")
        .attr("minlength", "1")
        .attr("disabled", disable)
        .val(placeHolder)
        .keyup((event) => {
            if (!alphaOnly(event)) {
                $("#guess" + id).val("");
            }
        })
        .addClass(
            "inputField text-center m-1 border-top-0 border-left-0 border-right-0 border-dark"
        );

    guessDiv.append(guessInput);
    $(".guessInp").append(guessDiv);
}


var inputLetterCount = 0;
function createInput(word, blanks) {
    for (let i = 0; i < word.length; i++) {
        if (["-", "@", ":"].includes(word[i])) {
            inputLetterCount++;
            createBlank(word[i], i);
        }
        else {
            createBlank("", i);

        }
    }
}
var word = "";
var wordSize = "";
function myRandomInts(max) {
    return Math.trunc(Math.random() * max);
}
function windowGAME(select) {
    //game window
    var zoneA = $("<div></div>").attr("class", "text-center zoneA");


    for (let i = 65; i < 91; i++) {
        let alphavalue = String.fromCharCode(i);
        let btn = $("<input></input")
            .attr("type", "button")
            .attr("id", alphavalue)
            .attr("value", alphavalue)
            .attr("class", "btn")
            .css("border-color", "black")
            .css("margin", "2px")
            .css("width", "50px")
            .css("border-radius", "0px");
        let event = {
            "key": alphavalue,
            "keyCode": i
        }
        btn.click(() => keyPress(event));
        zoneA.append(btn);
    }
    $(".alphabets").append(zoneA);
    $("#chanceLeftP").text("Left Guess : " + 6);
    console.log("win " + winCount + " total " + totalCount);
    $(".wonCount").text(winCount + " / " + totalCount);
    $(".hide").hide()
    fetch("words.json").then((response) => response.json()).then((data) => {
        word = data[select][myRandomInts(data[select].length)];
        $(".gameHead").text("GUESS: " + select)
        console.log(word)
        wordSize = word.length;
        createInput(word);
    })

}

var imageIndex = 1;
var aleadyGuessInput = [];
function resetGameWindow() {
    imageIndex = 1;
    setHangmanImage(imageIndex);
    imageIndex = 2;
    inputLetterCount = 0;
    aleadyGuessInput = []
    $(".guessDiv").remove();
    $(".zoneA").remove();
    windowGAME(select);

}
function keyPress(e) {


    //check div exist or not
    if (aleadyGuessInput.includes(e.key.toLowerCase()))
        return;
    if ($(' .guessDiv').length) {
        $("#" + (e.key.toUpperCase())).attr("disabled", true).css("text-decoration", "line-through");
        // alphabet input
        if (
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 97 && e.keyCode <= 122)
        )
            aleadyGuessInput.push(e.key);
        // console.log("-->" + String.fromCharCode(eval(e.keyCode + 32)));
        if (word.includes(e.key) || word.includes("" + String.fromCharCode(eval(e.keyCode + 32)))) {
            // console.log(e.key, e);

            let indexes = [];
            let i = 0;

            while (i < word.length) {
                if ((e.key == word[i]) || ("" + String.fromCharCode(eval(e.keyCode + 32))) == word[i]) {
                    // console.log("yo")
                    indexes.push(i);
                }
                i++;
            }
            for (let letterIndex of indexes) {
                // aleadyGuessInput.push(word[letterIndex])

                if
                    (e.keyCode >= 65 && e.keyCode <= 90) {
                    $("#guess" + letterIndex).val(e.key);
                    // console.log(e.key);
                    inputLetterCount++;
                }
                if (e.keyCode >= 97 && e.keyCode <= 122) {
                    $("#guess" + letterIndex).val(String.fromCharCode(eval(e.keyCode - 32)));

                    inputLetterCount++;
                }
                // if (inputLetterCount == wordSize) {
                //     alert("Congrats!");
                // }
                // console.log(inputLetterCount)
                if (inputLetterCount == word.length) {
                    console.log("won");
                    $(".hide").show()
                    $(".wonCount").text(winCount + " / " + totalCount);
                    document.getElementById("result-text").innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${word}</span></p>`;
                    winCount++;
                    totalCount++;


                }
                // console.log(aleadyGuessInput)

            }
        } else if (
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 97 && e.keyCode <= 122)
        ) {
            console.log(imageIndex)
            setHangmanImage(imageIndex);

            $("#chanceLeftP").text("Left Guess : " + eval(7 - imageIndex));
            imageIndex++;

            if (imageIndex >= 8) {
                $(".hide").show();

                document.getElementById("result-text").innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${word}</span></p>`;
                totalCount++;
                console.log("lose");
            }
        }
    }
    else {
        return;
    }
}

function newGame() {
    $(".hide").hide();
    resetGameWindow();
}
$("#new-game-button").click(() => newGame())
document.onkeypress = (e) => {
    if (imageIndex >= 8 || inputLetterCount == word.length) {
        return
    }
    if ((e.keyCode >= 97 && e.keyCode <= 122) || (e.keyCode >= 65 && e.keyCode <= 90))
        keyPress(e);
    else return
};
