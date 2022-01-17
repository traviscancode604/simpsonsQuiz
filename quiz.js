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
  let bankMax, questionMax, questionNum, questionBank;

  if (difficultySelection === 4) {
    bankMax = Math.floor(Math.random() * 3) + 1;
  } else {
    bankMax = difficultySelection;
  }

  switch (bankMax) {
    case 1:
    default:
      questionBank = EASY_QUESTIONS;
  }
  do {
    questionMax = Number(questionBank.general.questionTotal);
    questionNum = 'q' + String(Math.floor((Math.random() * questionMax) + 1));
    currentQuestion = questionBank[questionNum];
    if (!listOfAskedQuestions.includes(currentQuestion['question'])) break;
  } while (1);
  listOfAskedQuestions.push(currentQuestion['question']);
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

prompt('How many questions would you like?\n 1, 5, 10, or 20?');
questionLimit = readline.question();
while (!VALID_QUESTION_LIMIT.includes(questionLimit)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  questionLimit = readline.question();
}
questionLimit = +questionLimit;

//
// howManyPlayers() to go here
//

while (numberOfQuestionsAsked < questionLimit) {
  //
  // determinePlayerTurn() to go here
  //
  let playerAnswer;

  selectCurrentQuestion();
  displayCurrentQuestion();
  //
  // inputQuestionAnswer() to go here
  //

  playerAnswer = readline.question();
  while (!VALID_ANSWER_CHOICE.includes(playerAnswer)) {
    prompt(messages('inputErrorMsg', 'general', 'default'));
    playerAnswer = readline.question();
  }
  //
  // updatePlayerScore() to go here
  //

  numberOfQuestionsAsked += 1;
  console.log(`Questions Asked: ${numberOfQuestionsAsked}`); // For Testing
  console.log(listOfAskedQuestions); // For Testing
}