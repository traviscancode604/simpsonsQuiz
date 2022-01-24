const readline = require('readline-sync');
const EASY_QUESTIONS = require('./questionBanks/easy.json');
const MED_QUESTIONS = require('./questionBanks/medium.json');
const DEFAULT_PROMPTS = require('./questionBanks/default.json');
const VALID_DIFFICULTY = ['1', `2`, `3`, `4`];
const VALID_ANSWER_CHOICE = ['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'];
const VALID_QUESTION_LIMIT = ["1", "5", "10", "20"];
const VALID_PLAYER_LIMIT = ["1", "2", "3", "4"];

let difficultySelection;
let questionLimit;
let playerLimit;
let numberOfQuestionsAsked = 0;
let currentPlayerTurn = 0;
let playerAnswer;
let player1Score;
let player2Score;
let player3Score;
let player4Score;

let currentQuestion;

const listOfAskedQuestions = [];


function displayWelcome() {
  logInBox('The Simpsons Trivia!');
  prompt(`Welcome!\n`);
}

function logInBox(message) {
  let horizontalRule = `+${"-".repeat(message.length + 2)}+`;
  let emptyLine = `|${" ".repeat(message.length + 2)}|`;

  console.log(horizontalRule);
  console.log(emptyLine);
  console.log(`| ${message} |`);
  console.log(emptyLine);
  console.log(horizontalRule);
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function messages(message, category = 'general') {
  return DEFAULT_PROMPTS[category][message];
}

function initializeGame() {
  player1Score = 0;
  player2Score = 0;
  player3Score = 0;
  player4Score = 0;
}

function displayCurrentQuestion() {
  console.clear();
  logInBox(`Question: ${currentQuestion['question']}`);
  prompt(`A: ${currentQuestion['A']}`);
  prompt(`B: ${currentQuestion['B']}`);
  prompt(`C: ${currentQuestion['C']}`);
  prompt(`D: ${currentQuestion['D']}`);
}

/*
Algorithm for selectCurrentQuestion:
Step 1) Determine game difficulty so we know which question banks we can use.
Step 2) Once our question bank has been determined, select a random question.
Step 3) Check if the selecte question has been asked in this around already.
  Step 3A) If not, let this be the current question.
  Step 3B) If it has been used, repeat the random question selection until
  a quesiton that has not yet been used is selected.
*/


function selectCurrentQuestion() {
  // this function and pickFromQuestionBank()
  // can be refactored. Only need the difficulty picked
  // once at the start of the game.
  let questionBankChoice;

  if (difficultySelection === 4) {
    questionBankChoice = Math.floor(Math.random() * 3) + 1;
  } else {
    questionBankChoice = difficultySelection;
  }
  pickFromQuestionBank(questionBankChoice);
}

function pickFromQuestionBank(bankChoice) {
  let questionMax, questionNum, questionBank;
  switch (bankChoice) {
    case 1: questionBank = EASY_QUESTIONS;
      break;
    case 2: questionBank = MED_QUESTIONS;
      break;
  }
  do {
    questionMax = Number(questionBank.general.questionTotal);
    questionNum = 'q' + String(Math.floor((Math.random() * questionMax) + 1));
    currentQuestion = questionBank[questionNum];
    if (!listOfAskedQuestions.includes(currentQuestion['question'])) break;
  } while (1);
  listOfAskedQuestions.push(currentQuestion['question']);
}

function checkIfCorrectAnswer() {
  return currentQuestion['correctAnswer'] === playerAnswer.toUpperCase();
}

function updatePlayerScore(answerIsCorrect) {
  switch (currentPlayerTurn) {
    case 1: player1Score += +answerIsCorrect;
      break;
    case 2: player2Score += +answerIsCorrect;
      break;
    case 3: player3Score += +answerIsCorrect;
      break;
    case 4: player4Score += +answerIsCorrect;
      break;
  }
}

function determinePlayerTurn() {
  currentPlayerTurn = currentPlayerTurn === playerLimit ?
    1 : currentPlayerTurn += 1;
}

function displayCorrectAnswer() {
  prompt(`The correct answer is: ${currentQuestion['correctAnswer']}. You chose: ${playerAnswer.toUpperCase()}`);
}

function displayPlayerScores() {
  let currentPlayerScores = [
    player1Score,
    player2Score,
    player3Score,
    player4Score
  ];
  currentPlayerScores.length = playerLimit;
  currentPlayerScores.forEach((playerScore, idx) => {
    prompt(`Player ${idx + 1}: ${playerScore} points.`);
  });
}

// Start of game
console.clear();
displayWelcome();
prompt('Lets determine the questions. What difficulty would you like? (Only Easy Available)\nPlease Select:\n1) Easy\n2) Medium\n3) Hard\n4) Mixed Bag');

difficultySelection = readline.question();
while (!VALID_DIFFICULTY.includes(difficultySelection)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  difficultySelection = readline.question();
}
difficultySelection = +difficultySelection;

prompt('How many questions each would you like?\n 1, 5, 10, or 20?');
questionLimit = readline.question();
while (!VALID_QUESTION_LIMIT.includes(questionLimit)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  questionLimit = readline.question();
}
questionLimit = +questionLimit;

prompt('How many players?\n 1, 2, 3, or 4?');
playerLimit = readline.question();
while (!VALID_PLAYER_LIMIT.includes(playerLimit)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  playerLimit = readline.question();
}
playerLimit = +playerLimit;

initializeGame();

while (numberOfQuestionsAsked < questionLimit * playerLimit) {

  determinePlayerTurn();
  selectCurrentQuestion();
  displayCurrentQuestion();
  prompt(`Player ${currentPlayerTurn} please select an answer.`);
  playerAnswer = readline.question();
  while (!VALID_ANSWER_CHOICE.includes(playerAnswer)) {
    prompt(messages('inputErrorMsg', 'general', 'default'));
    playerAnswer = readline.question();
  }

  updatePlayerScore(checkIfCorrectAnswer());
  displayCorrectAnswer();
  displayPlayerScores();

  prompt(`Press enter to continue.`);
  readline.question();

  numberOfQuestionsAsked += 1;
  console.log(`Questions Asked: ${numberOfQuestionsAsked}`); // For Testing
  console.log(listOfAskedQuestions); // For Testing
}