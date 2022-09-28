"use strict";

const startButton = document.querySelector('.start-button');
const viewScores = document.querySelector('.highscores');

const choiceList = document.querySelector('.answers');
const choiceResult = document.querySelector('.result');
const timerEl = document.querySelector('.time');
const quizScore = document.querySelector('.quiz-score');
const submitInitials = document.querySelector('.submit-initials');

/* Gets cards */
const startCard = document.querySelector('.start-card');
const quizCard = document.querySelector('.quiz-card');
const resultsCard = document.querySelector('.result-card');

/* Questions Maps */

const questionBank = new Map([
    [1, 
        [['question', 'Arrays in JavaScript can be used to store:'],
        [1, 'Numbers and Strings'],
        [2, 'Other Arrays'],
        [3, 'Booleans'],
        [4, 'All of the Above'],
        ['answer', 4],
        [true, 'Correct! 🎉'],
        [false, 'Wrong! The answer is "All of the Above"']]],

    [2, 
        [['question', 'String values must be enclosed within ____ when being assigned to variables'],
        [1, 'Commas'],
        [2, 'Curly Brackets'],
        [3, 'Quotes'],
        [4, 'Parenthesis'],
        ['answer', 3],
        [true, 'Correct! 🎉'],
        [false, 'Wrong! The answer is "Quotes"']]],

    [3, 
        [['question', 'Commonly used data types DO NOT include:'],
        [1, 'Strings'],
        [2, 'Booleans'],
        [3, 'Alerts'],
        [4, 'Numbers'],
        ['answer', 3],
        [true, 'Correct! 🎉'],
        [false, 'Wrong! The answer is "Alerts"']]],
    [4, 
        [['question', 'The condition of an if/else statement is enclosed with:'],
        [1, 'Quotes'],
        [2, 'Curly Brackets'],
        [3, 'Parenthesis'],
        [4, 'Square Brackets'],
        ['answer', 3],
        [true, 'Correct! 🎉'],
        [false, 'Wrong! The answer is "Parenthesis"']]]
]);

let currentQuestion = 1;

/* Timer Object */

const timer = {
    timeRemaining: 60,
    interval: undefined,

    // This method starts the timer for the first time when it's called after the 'start button' is clicked.
    start(time) {
        this.timeRemaining = time;
        const timerInterval = setInterval(() => {
            this.interval = timerInterval;
            this.timeRemaining--;
            timerEl.textContent = this.timeRemaining;
            if (this.timeRemaining<1) {
                this.stopTimer();
                finishQuiz();
            }
        }, 1000);
    },

    // This method allows the timer to be decreased and is called if the user answers a question incorrectly.
    decreasetime() {
        this.timeRemaining -= 10;
    },

    // This method stops the timer and is called if the time remaining falls to/below zero, or all questions have been answered.
    stopTimer() {
        clearInterval(this.interval);
    }
};

const scores = {

}

/* Functions */

// Closes welcome message, loads quiz card, and initiates the timer.
const startQuiz = function () {
    startCard.classList.add('hidden');
    quizCard.classList.remove('hidden');
    timer.start(60);
}

// Closes quiz card, loads results card, and changes quiz score to reflect performance.
const finishQuiz = function () {
    quizCard.classList.add('hidden');
    resultsCard.classList.remove('hidden');
    quizScore.textContent = timer.timeRemaining;
    timer.stopTimer();
    saveScore();
}

// Loads question based on the question number entered from the questionBank map. Resets choices to '' after each question. 
const loadQuestion = function (question) {
    document.querySelector('.answers').innerHTML = '';

    // Destructures question array into a key, value pair. Displays the question and possible choices.

    for (const [key, value] of question) {
        if (typeof key === 'number') {
            let choice = document.createElement('li');
            let answerButton = document.createElement('button');
            answerButton.textContent = `${value}`;
            document.querySelector('.answers').appendChild(choice).appendChild(answerButton);
            answerButton.setAttribute('choice-index', key);
        }
        
        if (key === 'question') {
            document.querySelector('.question').textContent = `${currentQuestion}. ${value}`;
        }
    }
}

const checkAnswer = function (event) {
    const element = event.target;
    if (element.tagName === 'BUTTON') {
        const choiceSelected = element.getAttribute('choice-index');
        const question = new Map(questionBank.get(currentQuestion));
        choiceResult.textContent = question.get(question.get('answer') == choiceSelected);
        if (choiceResult.textContent !== 'Correct! 🎉') {
            timer.decreasetime();
        }
        choiceResult.classList.remove('hidden');
    }
    setTimeout(() => {
        choiceResult.classList.add('hidden');
        if (currentQuestion<[...questionBank.keys()].length) {
            currentQuestion+=1;
            loadQuestion(questionBank.get(currentQuestion));
        } else {
            finishQuiz();
            timer.stopTimer();
        }
    }, 1500);
}

const saveScore = function () {
    const initials = document.getElementById('initials').value;
    scores[initials] = Number(quizScore.textContent);
    console.log(scores[`${initials}`]);
    localStorage.setItem(initials, JSON.stringify(scores));
    printScores();
}

const printScores = function () {
    const keys = [];
    for (const key in localStorage) {
        keys.push(key);
    }
    console.log(keys);
};

/* Event Listeners */

startButton.addEventListener('click', startQuiz);
loadQuestion(questionBank.get(currentQuestion));

document.querySelector('.answers').addEventListener('click', checkAnswer);
submitInitials.addEventListener('click', saveScore);