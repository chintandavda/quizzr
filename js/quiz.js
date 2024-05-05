let quizData = [{
        question: "What is the Capital of Italy?",
        options: ["Rome", "Berlin", "Paris", "Madrid"],
        answer: "Rome"
    },
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        options: ["Elephant", "Tiger", "Lion", "Bear"],
        answer: "Lion"
    },
    {
        question: "What is H2O more commonly known as?",
        options: ["Salt", "Sugar", "Water", "Vinegar"],
        answer: "Water"
    },
    {
        question: "What do you call a baby cat?",
        options: ["Kitten", "Cub", "Pup", "Chick"],
        answer: "Kitten"
    },
    {
        question: "How many colors are there in a rainbow?",
        options: ["5", "6", "8", "7"],
        answer: "7"
    },
]

let currentQuestionIndex = 0;
let userAnswers = [];
let timerLeft = 59;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click", loadNextQuestion);
submitButton.addEventListener("click", showQuizResults);

displayQuestion();
startTimer();

function updateTimer() {
    if (timerLeft > 0) {
        const seconds = timerLeft;
        const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
        timerDisplay.textContent = displaySeconds;
        timerLeft--;
    } else {
        timerDisplay.textContent = "0";
        showQuizResults();
    }
}

function startTimer() {
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function selectAnswer(answer) {
    const optionButtons = document.querySelectorAll(".quiz-option");
    optionButtons.forEach((button) => button.classList.remove("selected"));
    const selectedOption = optionsContainer.querySelector(
        `.quiz-option[data-option="${answer}"]`
    );
    selectedOption.classList.add("selected");
    userAnswers[currentQuestionIndex] = answer;
}

function loadNextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showQuizResults();
    }
}

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion["question"];

    optionsContainer.innerHTML = "";
    const optionLetters = ["A", "B", "C", "D"];

    currentQuestion.options.forEach((option, index) => {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("quiz-card");

        const optionLabel = document.createElement("span");
        optionLabel.textContent = optionLetters[index];
        optionLabel.classList.add("option-label");
        optionContainer.appendChild(optionLabel);

        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("quiz-option");
        optionButton.setAttribute("data-option", option);
        optionContainer.addEventListener("click", () => selectAnswer(option));
        optionContainer.appendChild(optionButton);

        optionsContainer.appendChild(optionContainer);
    });
}

function evaluateUserAnswers() {
    let score = 0;
    quizData.forEach((question, index) => {
        console.log(question);
        if (userAnswers[index] === question.answer) {
            score += 10;
        }
    });
    return score;
}

function showQuizResults() {
    timerLeft = 0;
    const userScore = evaluateUserAnswers();
    scoreContainer.textContent = `Your Score ${userScore} out of ${quizData.length*10}`;
}