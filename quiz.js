const readline = require('readline-sync');
const EASY_QUESTIONS = require('./questionBanks/easy.json');
const DEFAULT_PROMPTS = require('./questionBanks/default.json');
const VALID_DIFFICULTY = ['1', `2`, `3`, `4`];
const VALID_ANSWER_CHOICE = ['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'];
const VALID_QUESTION_LIMIT = ["1", "5", "10", "20"];
let difficultySelection;
let questionLimit;
let numberOfQuestionsAsked = 0;
let currentQuestion;
const listOfAskedQuestions = [];
// let currentPlayer = 1;

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

function displayCurrentQuestion() {
  console.clear();
  logInBox(`Question: ${currentQuestion['question']}`);
  prompt(`A: ${currentQuestion['A']}`);
  prompt(`B: ${currentQuestion['B']}`);
  prompt(`C: ${currentQuestion['C']}`);
  prompt(`D: ${currentQuestion['D']}`);
}

function selectCurrentQuestion() {
  let bankMax, questionMax, questionNum, questionBank;

  if (difficultySelection === 4) {
    bankMax = Math.floor(Math.random() * 3) + 1;
  } else {
    bankMax = difficultySelection;
  }
  // got to here, trying to make functions that don't have side effects *******
  // also was about to start the question validation loop
  switch (bankMax) {
    case 1:
    default:
      questionBank = EASY_QUESTIONS;
  }
  questionMax = Number(questionBank.general.questionTotal);
  questionNum = 'q' + String(Math.floor((Math.random() * questionMax) + 1));
  currentQuestion = questionBank[questionNum];
}

// Start of game

console.clear();
logInBox('The Simpsons Trivia!');
prompt(`Welcome!\n`);
prompt('Lets determine the questions. What difficulty would you like? (Only Easy Available)\nPlease Select:\n1) Easy\n2) Medium\n3) Hard\n4) Mixed Bag');

difficultySelection = readline.question();
while (!VALID_DIFFICULTY.includes(difficultySelection)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  difficultySelection = readline.question();
}
difficultySelection = +difficultySelection;

prompt('How many questions would you like?\n 1, 5, 10, or 20?');
questionLimit = readline.question();
while (!VALID_QUESTION_LIMIT.includes(questionLimit)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  questionLimit = readline.question();
}
questionLimit = +questionLimit;

// How many players prompt to go here
// howManyPlayers()

// main game loop
while (numberOfQuestionsAsked < questionLimit) {
  // determinePlayerTurn();
  let playerAnswer;

  selectCurrentQuestion();
  listOfAskedQuestions.push(currentQuestion['question']); // for duplicate logic (needed)
  displayCurrentQuestion();

  playerAnswer = readline.question();
  while (!VALID_ANSWER_CHOICE.includes(playerAnswer)) {
    prompt(messages('inputErrorMsg', 'general', 'default'));
    playerAnswer = readline.question();
  }
  numberOfQuestionsAsked += 1;
  console.log(`Questions Asked: ${numberOfQuestionsAsked}`);
  console.log(listOfAskedQuestions);
}