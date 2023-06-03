(function () {
  var questions = [
    {
      question: "What is 2*5?",
      choices: [2, 5, 10, 15, 20],
      correctAnswer: 2,
    },
    {
      question: "What is 3*6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4,
    },
    {
      question: "What is 8*9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0,
    },
    {
      question: "What is 1*7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3,
    },
    {
      question: "What is 8*8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4,
    },
  ];

  var questionCounter = 0; // Tracks question number
  var selections = []; // Array containing user choices
  var quiz = $("#quiz"); // Quiz div object

  // Display initial question
  displayNext();

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
    $("#start").hide();
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

    return score;
}
})();
