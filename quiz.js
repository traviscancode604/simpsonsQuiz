const readline = require('readline-sync');
const SEASON1 = require('./questionBanks/season1.json');
const DEFAULT_PROMPTS = require('./questionBanks/default.json');

let seasonSelection;

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
    case 'season 1':
      return SEASON1[category][message];

    case 'default':
    default:
      return DEFAULT_PROMPTS[category][message];

  }
}

console.clear();
logInBox('The Simpsons Trivia!');

prompt('Lets determine the questions. What season would you like to go up to?\nPlease type a number between 1 and 10:');
seasonSelection = readline.question();

while (!['1'].includes(seasonSelection)) {
  prompt(messages('inputErrorMsg', 'general', 'default'));
  seasonSelection = readline.question();
}
