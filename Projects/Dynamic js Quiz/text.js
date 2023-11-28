(function () {
  var questions = [
    generateRandomQuestion(),
    generateRandomQuestion(),
    generateRandomQuestion(),
    generateRandomQuestion(),
    generateRandomQuestion(),
  ];

  var questionCounter = 0; // Tracks question number
  var selections = []; // Array containing user choices
  var quiz = $("#quiz"); // Quiz div object
  var navigationPanel = $("#navigation-panel"); // Navigation panel div object

  // Display initial question
  displayNext();

  // Generate navigation buttons
  generateNavigationButtons();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
  e.preventDefault();

  // Suspend click listener during fade animation
  if (quiz.is(':animated')) {
    return false;
  }
  choose();

  questionCounter++;
  displayNext();
  updateNavigationPanel();
});

  // Click handler for the 'prev' button
  $("#prev").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
    updateNavigationPanel();
  });

  // Click handler for the 'Start Over' button
  $("#start").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    updateNavigationPanel();
    $("#start").hide();
    navigationPanel.show(); // Show the navigation panel when starting over
    window.location.reload();

  });

  // Click handler for the navigation buttons
  navigationPanel.on("click", ".navigation-button", function(e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }

    questionCounter = parseInt($(this).attr("data-question"));
    displayNext();
    updateNavigationPanel();
  });

  // Animates buttons on hover
  $(".button").on("mouseenter", function () {
    $(this).addClass("active");
  });
  $(".button").on("mouseleave", function () {
    $(this).removeClass("active");
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $("<div>", {
      id: "question-box",
    });

    var questionHeader = $("<div>", {
      class: "question",
    });

    var qno = $("<p>Question " + (index + 1) + "</p>");
    questionHeader.append(qno);

    var question = $("<p>").append(questions[index].question);
    questionHeader.append(question);

    qElement.append(questionHeader);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $("<ul>");
    var item;
    var label = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      var input = $(
        '<input type="radio" id="option' +
          (i + 1) +
          '" name="answer" value="' +
          i +
          '">'
      );
      label = $(
        '<label for="option' +
          (i + 1) +
          '">' +
          questions[index].choices[i] +
          "</label>"
      );
      item.append(input);
      item.append(label);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    var selectedOption = $('input[name="answer"]:checked').val();
    if (selectedOption !== undefined) {
      selections[questionCounter] = parseInt(selectedOption);
    } else {
      selections[questionCounter] = -1; // indicate unselected option
  }
}

  // Displays next requested element
  // Displays next requested element
function displayNext() {
  quiz.fadeOut(function () {
    $("#question-box").remove();

    if (questionCounter < questions.length) {
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[value="' + selections[questionCounter] + '"]').prop(
          "checked",
          true
        );
      }

      // Controls display of 'prev' button
      if (questionCounter === 1) {
        $("#prev").show();
      } else if (questionCounter === 0) {
        $("#prev").hide();
        $("#next").show();
      }
    } else {
      var scoreElem = displayScore();
      quiz.append(scoreElem).fadeIn();
      $("#next").hide();
      $("#prev").hide();
      $("#start").show();
      navigationPanel.hide(); // Hide the navigation panel on result screen
      // Clear selections when displaying final results
      selections = [];
      questionCounter = 0; // Reset question counter

      // Clear previous result
      $("#result").remove();
    }
  });
}


  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', {
      id: 'question-box'
    });

    var numCorrect = 0;
    var numUnselected = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
      if (selections[i] === -1) {
        numUnselected++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
      questions.length + ' right!');

    if (numUnselected > 0) {
      score.append('<br>' + numUnselected + ' question(s) were left unanswered.');
    }
    // Hide the navigation panel on the result screen
    navigationPanel.hide();

    return score;
}
// Generates navigation buttons based on the number of questions
function generateNavigationButtons() {
  for (var i = 0; i < questions.length; i++) {
    var button = $(
      '<div class="navigation-button" data-question="' +
        i +
        '">' +
        (i + 1) +
        "</div>"
    );
    navigationPanel.append(button);
  }
}

// Updates the active state of the navigation buttons
function updateNavigationPanel() {
  navigationPanel.find(".navigation-button").removeClass("active");
  navigationPanel.find('.navigation-button[data-question="' + questionCounter + '"]').addClass("active");
}
})();

function generateRandomQuestion(){
  let number1 =  getRandomInt(1, 9);
  let number2 =  getRandomInt(1, 9);
  let wrongAnswer1 = getRandomInt(1, 99)
  let wrongAnswer2 = getRandomInt(1, 99)
  let wrongAnswer3 = getRandomInt(1, 99)
  let wrongAnswer4 = getRandomInt(1, 99)
  let choices = [(number1*number2), wrongAnswer1, wrongAnswer2, wrongAnswer3, wrongAnswer4]
  choices = shuffle(choices)
  /* 
      {
      question: "What is 2*5?",
      choices: [2, 5, 10, 15, 20],
      correctAnswer: 2,
    },
  */
  let object = {
      question: `What is ${number1}*${number2}`,
      choices: choices,
      correctAnswer: choices.indexOf(number1*number2)

  }
  return object
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
/*OPEN TRIVIA 
DEFAULT MODE... AND ANOTHERS MODES
https://opentdb.com/api_config.php


*/