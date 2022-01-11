const readline = require('readline-sync');
const EASY_QUESTIONS = require('./questionBanks/easy.json');
const DEFAULT_PROMPTS = require('./questionBanks/default.json');

let difficultySelection;
let questionLimit;
let questionsAsked = 0;

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

function messages(message, category = 'general', library = 'default') {
  switch (library) {
    case 'easy':
      return EASY_QUESTIONS[category][message];

    case 'default':
    default:
      return DEFAULT_PROMPTS[category][message];

  }
}
function askQuestion() {
  prompt(`Testing askQuestion invocation`);
}
// Start of game

console.clear();
logInBox('The Simpsons Trivia!');
prompt(`Welcome!\n`);
prompt('Lets determine the questions. What difficulty would you like? (Only Easy Available)\nPlease Select:\n1) Easy\n2) Medium\n3) Hard\n4) Mixed Bag');

difficultySelection = readline.question();
while (!['1'].includes(difficultySelection)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  difficultySelection = readline.question();
}
difficultySelection = +difficultySelection;

//correctAnswersLimit
prompt('How many questions would you like?\n 1, 5, 10, or 20?');
questionLimit = readline.question();
while (!['1', '5', '10', '20'].includes(questionLimit)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  questionLimit = readline.question();
}
questionLimit = +questionLimit;
console.log(typeof questionLimit); // for testing

while (questionsAsked < questionLimit) {
  let playerAnswer;
  askQuestion();
  playerAnswer = readline.question();
  while (!['A', 'B', 'C', 'D'].includes(playerAnswer)) {
    prompt(messages('inputErrorMsg', 'general', 'default'));
    playerAnswer = readline.question();
  }
  questionsAsked += 1;
  console.log(`Questions Asked: ${questionsAsked}`);
}