const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
        {
          question: "संस्कृत वर्णमाला में वर्ण कितने प्रकार के होते है?",
          choice1: "दो",
          choice2: "तीन",
          choice3: "चार",
          choice4: "पाँच ",
          answer: 1
        },
        {
          question: "संस्कृत वर्णमाला में स्वरों की संख्या होती है?",
          choice1: "13",
          choice2: "14",
          choice3: "15",
          choice4: "16",
          answer: 1
        },
        {
          question: "संस्कृत वर्णमाला में व्यंजनों की संख्या होती है?",
          choice1: "30",
          choice2: "33",
          choice3: "35",
          choice4: "40",
          answer: 2
        },
        
        {
            question: "भाषा की सबसे छोटी ईकाई हैं?",
            choice1: "स्वर",
            choice2: "वर्ण",
            choice3: "व्यंजन",
            choice4: "भाषा",
            answer: 2
          },

          {
            question: "वर्णो के व्यवस्थित समूह को कहते हैं?",
            choice1: "व्यंजन",
            choice2: "स्वर",
            choice3: "क व ख दोनों",
            choice4: "वर्णमाला",
            answer: 4
          },

          {
            question: "दीर्घ स्वर है।",
            choice1: "ई",
            choice2: "इ",
            choice3: "अ",
            choice4: "उ",
            answer: 1
          },

          {
            question: "दो व्यंजनों के मेल से वर्ण बनते है?",
            choice1: "अन्तःस्थ वर्ण",
            choice2: "संयुक्त वर्ण",
            choice3: "स्पर्श वर्ण",
            choice4: "सशक्त वर्ण",
            answer: 2
          },
      
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS)
     {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('result.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

startGame();

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
